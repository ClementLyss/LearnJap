import { prisma } from "@/lib/db";
import { unstable_cache } from "next/cache";

const kanjiInclude = {
  readings: true,
  examples: true,
  radicals: { include: { radical: true } },
} as const;

export const getKanjiByJlptLevel = unstable_cache(
  async (level: number) => {
    return prisma.kanji.findMany({
      where: { jlptLevel: level },
      include: kanjiInclude,
      orderBy: { id: "asc" },
    });
  },
  ["kanji-by-level"],
  { revalidate: 3600 } // 1 hour
);

export const getKanjiById = unstable_cache(
  async (id: number) => {
    return prisma.kanji.findUnique({
      where: { id },
      include: kanjiInclude,
    });
  },
  ["kanji-by-id"],
  { revalidate: 3600 }
);

export const getRelatedKanji = unstable_cache(
  async (kanjiId: number) => {
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
  },
  ["related-kanji"],
  { revalidate: 3600 }
);

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
