import { prisma } from "@/lib/db";

/**
 * Get the daily kanji for a user.
 *
 * Priority:
 * 1. A kanji due for review today (SM-2 nextReview <= now)
 * 2. A kanji marked "want_to_learn" that hasn't been studied yet
 * 3. A random unseen kanji (no UserProgress record)
 *
 * Uses the date as a stable seed so the same kanji is shown all day.
 */
export async function getDailyKanji(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Check for kanji due for review
  const dueKanji = await prisma.userProgress.findFirst({
    where: {
      userId,
      kanjiId: { not: null },
      status: { in: ["learning", "want_to_learn"] },
      nextReview: { lte: new Date() },
    },
    include: {
      kanji: {
        include: {
          readings: true,
          examples: true,
          radicals: { include: { radical: true } },
        },
      },
    },
    orderBy: { nextReview: "asc" },
  });

  if (dueKanji?.kanji) return dueKanji.kanji;

  // 2. Check for kanji marked "want_to_learn" with no review yet
  const wantToLearn = await prisma.userProgress.findFirst({
    where: {
      userId,
      kanjiId: { not: null },
      status: "want_to_learn",
      lastReviewed: null,
    },
    include: {
      kanji: {
        include: {
          readings: true,
          examples: true,
          radicals: { include: { radical: true } },
        },
      },
    },
  });

  if (wantToLearn?.kanji) return wantToLearn.kanji;

  // 3. Pick a random unseen kanji (stable for the day using date seed)
  const studiedKanjiIds = await prisma.userProgress.findMany({
    where: { userId, kanjiId: { not: null } },
    select: { kanjiId: true },
  });

  const excludeIds = studiedKanjiIds
    .map((p) => p.kanjiId)
    .filter((id): id is number => id !== null);

  const unseenKanji = await prisma.kanji.findMany({
    where: excludeIds.length > 0 ? { id: { notIn: excludeIds } } : {},
    include: {
      readings: true,
      examples: true,
      radicals: { include: { radical: true } },
    },
    orderBy: { id: "asc" },
  });

  if (unseenKanji.length === 0) return null;

  // Use date as stable index so same kanji shows all day
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % unseenKanji.length;

  return unseenKanji[index];
}
