import { prisma } from "@/lib/db";

export async function getKanjiByJlptLevel(level: number) {
  return prisma.kanji.findMany({
    where: { jlptLevel: level },
    include: {
      readings: true,
      examples: true,
      radicals: {
        include: { radical: true },
      },
    },
    orderBy: { id: "asc" },
  });
}

export async function getKanjiById(id: number) {
  return prisma.kanji.findUnique({
    where: { id },
    include: {
      readings: true,
      examples: true,
      radicals: {
        include: { radical: true },
      },
    },
  });
}

export async function getRelatedKanji(kanjiId: number) {
  // Find kanji sharing at least one radical with the given kanji
  const kanji = await prisma.kanji.findUnique({
    where: { id: kanjiId },
    select: { radicals: { select: { radicalId: true } } },
  });
  if (!kanji || kanji.radicals.length === 0) return [];

  const radicalIds = kanji.radicals.map((r) => r.radicalId);

  return prisma.kanji.findMany({
    where: {
      id: { not: kanjiId },
      radicals: { some: { radicalId: { in: radicalIds } } },
    },
    include: {
      readings: true,
      radicals: { include: { radical: true } },
    },
    orderBy: { jlptLevel: "desc" },
    take: 12,
  });
}

export async function searchKanji(query: string) {
  return prisma.kanji.findMany({
    where: {
      OR: [
        { character: query },
        { meaningFr: { contains: query, mode: "insensitive" } },
        { meaningEn: { contains: query, mode: "insensitive" } },
      ],
    },
    include: {
      readings: true,
      examples: true,
      radicals: {
        include: { radical: true },
      },
    },
  });
}
