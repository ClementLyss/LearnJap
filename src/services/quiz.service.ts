import { prisma } from "@/lib/db";
import { getKanjiByJlptLevel } from "./kanji.service";
import type { GameMode, QuizQuestionWithOptions } from "@/types/game";

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Pick the most representative reading for a kanji */
function pickReading(readings: { type: string; reading: string }[]): string {
  const kun = readings.find((r) => r.type === "kun");
  if (kun) return kun.reading;
  const on = readings.find((r) => r.type === "on");
  return on?.reading ?? "—";
}

/**
 * Get kanji the user should be quizzed on (want_to_learn + learning).
 * Returns full kanji objects with readings.
 */
export async function getQuizzableKanji(userId: string, limit = 10) {
  const progress = await prisma.userProgress.findMany({
    where: {
      userId,
      kanjiId: { not: null },
      status: { in: ["want_to_learn", "learning"] },
    },
    include: {
      kanji: {
        include: {
          readings: true,
          examples: true,
        },
      },
    },
    take: limit * 2, // fetch more, then shuffle & slice
  });

  const kanji = progress
    .filter((p) => p.kanji !== null)
    .map((p) => p.kanji!);

  return shuffle(kanji).slice(0, limit);
}

/**
 * Build quiz questions with 6 options each (1 correct + 5 distractors).
 * Uses cached getKanjiByJlptLevel for distractors → no extra DB queries.
 */
export async function buildQuizQuestions(
  userId: string,
  mode: GameMode,
  limit = 10
): Promise<QuizQuestionWithOptions[]> {
  const targets = await getQuizzableKanji(userId, limit);
  if (targets.length === 0) return [];

  // Collect all JLPT levels we need
  const levels = [...new Set(targets.map((k) => k.jlptLevel))];
  const kanjiByLevel = new Map<number, typeof targets>();
  await Promise.all(
    levels.map(async (level) => {
      const all = await getKanjiByJlptLevel(level);
      kanjiByLevel.set(level, all);
    })
  );

  return targets.map((target) => {
    const pool = kanjiByLevel.get(target.jlptLevel) ?? [];

    // Build correct answer + prompt based on mode
    let prompt: string;
    let correctAnswer: string;
    let distractorExtractor: (k: typeof target) => string;

    switch (mode) {
      case "kanji-to-japanese":
        prompt = target.character;
        correctAnswer = pickReading(target.readings);
        distractorExtractor = (k) => pickReading(k.readings);
        break;
      case "french-to-kanji":
        prompt = target.meaningFr;
        correctAnswer = target.character;
        distractorExtractor = (k) => k.character;
        break;
      case "kanji-to-french":
        prompt = target.character;
        correctAnswer = target.meaningFr;
        distractorExtractor = (k) => k.meaningFr;
        break;
    }

    // Pick 5 unique distractors different from correct answer
    const distractors: string[] = [];
    const candidates = shuffle(pool.filter((k) => k.id !== target.id));
    for (const c of candidates) {
      if (distractors.length >= 5) break;
      const val = distractorExtractor(c);
      if (val !== correctAnswer && !distractors.includes(val)) {
        distractors.push(val);
      }
    }

    // If not enough distractors at same level, pad from other levels
    if (distractors.length < 5) {
      for (const [, levelKanji] of kanjiByLevel) {
        if (distractors.length >= 5) break;
        for (const k of shuffle(levelKanji)) {
          if (distractors.length >= 5) break;
          const val = distractorExtractor(k);
          if (val !== correctAnswer && !distractors.includes(val)) {
            distractors.push(val);
          }
        }
      }
    }

    const options = shuffle([correctAnswer, ...distractors]);

    return {
      kanjiId: target.id,
      prompt,
      correctAnswer,
      options,
      mode,
    };
  });
}
