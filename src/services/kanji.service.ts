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
