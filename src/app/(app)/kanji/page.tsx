import Link from "next/link";
import { getKanjiByJlptLevel } from "@/services/kanji.service";
import { getKanjiProgressByLevel } from "@/services/progress.service";
import { auth } from "@/lib/auth";
import KanjiGrid from "@/components/kanji/KanjiGrid";
import type { KanjiStatus } from "@/services/progress.service";

const jlptLevels = [5, 4, 3, 2, 1];

export default async function KanjiPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const selectedLevel = params.level ? parseInt(params.level) : 5;

  const session = await auth();
  const kanjiList = await getKanjiByJlptLevel(selectedLevel);

  // Fetch user progress if logged in
  let statusMap: Record<number, KanjiStatus> = {};
  if (session?.user?.id) {
    const progress = await getKanjiProgressByLevel(session.user.id, selectedLevel);
    statusMap = Object.fromEntries(
      progress
        .filter((p) => p.kanjiId !== null)
        .map((p) => [p.kanjiId!, p.status as KanjiStatus])
    );
  }

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">Kanji</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Explorez les kanji par niveau JLPT. Cliquez sur un kanji pour voir ses détails.
      </p>

      {/* JLPT Level Tabs */}
      <div className="mb-6 flex gap-2">
        {jlptLevels.map((level) => (
          <Link
            key={level}
            href={`/kanji?level=${level}`}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              selectedLevel === level
                ? "bg-red-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            JLPT N{level}
          </Link>
        ))}
      </div>

      {/* Kanji Grid */}
      {kanjiList.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-700 dark:bg-zinc-900">
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Aucun kanji pour le niveau N{selectedLevel} pour le moment.
          </p>
          <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
            Les kanji seront ajoutés via le seed de la base de données.
          </p>
        </div>
      ) : (
        <KanjiGrid
          kanjiList={kanjiList.map((k) => ({
            id: k.id,
            character: k.character,
            meaningFr: k.meaningFr,
          }))}
          initialStatuses={statusMap}
          isLoggedIn={!!session?.user}
        />
      )}
    </div>
  );
}
