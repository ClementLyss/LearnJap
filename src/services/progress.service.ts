import { prisma } from "@/lib/db";
import { sm2 } from "@/lib/sm2";

export type KanjiStatus = "unseen" | "want_to_learn" | "learning" | "known";

export async function getKanjiProgress(userId: string, kanjiId: number) {
  return prisma.userProgress.findUnique({
    where: { userId_kanjiId: { userId, kanjiId } },
  });
}

export async function getKanjiProgressByLevel(userId: string, jlptLevel: number) {
  return prisma.userProgress.findMany({
    where: {
      userId,
      kanji: { jlptLevel },
    },
    select: {
      kanjiId: true,
      status: true,
    },
  });
}

export async function setKanjiStatus(userId: string, kanjiId: number, status: KanjiStatus) {
  return prisma.userProgress.upsert({
    where: { userId_kanjiId: { userId, kanjiId } },
    update: { status },
    create: { userId, kanjiId, status },
  });
}

export async function updateKanjiProgress(
  userId: string,
  kanjiId: number,
  quality: number
) {
  const existing = await getKanjiProgress(userId, kanjiId);

  const current = {
    repetitions: existing?.repetitions ?? 0,
    easeFactor: existing?.easeFactor ?? 2.5,
    interval: existing?.interval ?? 0,
  };

  const result = sm2(current, quality);

  // Determine status from SM-2 result
  let status: KanjiStatus = "learning";
  if (result.interval >= 21) status = "known";

  return prisma.userProgress.upsert({
    where: { userId_kanjiId: { userId, kanjiId } },
    update: {
      status,
      repetitions: result.repetitions,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview: result.nextReview,
      lastReviewed: new Date(),
      attempts: { increment: 1 },
      score: quality >= 3 ? { increment: 1 } : undefined,
    },
    create: {
      userId,
      kanjiId,
      status,
      repetitions: result.repetitions,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview: result.nextReview,
      lastReviewed: new Date(),
      attempts: 1,
      score: quality >= 3 ? 1 : 0,
    },
  });
}

export async function getDueKanji(userId: string, limit: number = 20) {
  return prisma.userProgress.findMany({
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
    take: limit,
  });
}
