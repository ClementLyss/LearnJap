import Link from "next/link";
import { getKanjiByJlptLevel } from "@/services/kanji.service";

const jlptLevels = [5, 4, 3, 2, 1];

export default async function KanjiPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>;
}) {
  const params = await searchParams;
  const selectedLevel = params.level ? parseInt(params.level) : 5;
  const kanjiList = await getKanjiByJlptLevel(selectedLevel);

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
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {kanjiList.map((kanji) => (
            <Link
              key={kanji.id}
              href={`/kanji/${kanji.id}`}
              className="group flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-4 transition-all hover:border-red-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-red-700"
            >
              <span className="text-3xl font-medium text-zinc-900 dark:text-white">
                {kanji.character}
              </span>
              <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {kanji.meaningFr}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
