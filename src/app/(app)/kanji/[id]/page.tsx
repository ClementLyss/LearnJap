import { notFound } from "next/navigation";
import Link from "next/link";
import { getKanjiById, getRelatedKanji } from "@/services/kanji.service";
import { getKanjiProgress } from "@/services/progress.service";
import { auth } from "@/lib/auth";
import KanjiStatusButton from "@/components/kanji/KanjiStatusButton";
import type { KanjiStatus } from "@/services/progress.service";

export default async function KanjiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kanjiId = parseInt(id);

  // Parallelize all independent queries
  const [kanji, relatedKanji, session] = await Promise.all([
    getKanjiById(kanjiId),
    getRelatedKanji(kanjiId),
    auth(),
  ]);

  if (!kanji) notFound();

  // User progress needs session, so it runs after
  let currentStatus: KanjiStatus = "unseen";
  if (session?.user?.id) {
    const progress = await getKanjiProgress(session.user.id, kanjiId);
    currentStatus = (progress?.status as KanjiStatus) ?? "unseen";
  }

  const onReadings = kanji.readings.filter((r) => r.type === "on");
  const kunReadings = kanji.readings.filter((r) => r.type === "kun");

  return (
    <div>
      <Link
        href={`/kanji?level=${kanji.jlptLevel}`}
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
      >
        &larr; Retour aux kanji N{kanji.jlptLevel}
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Card */}
        <div className="flex flex-col items-center rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-1">
          <span className="text-8xl text-zinc-900 dark:text-white">{kanji.character}</span>
          <p className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
            {kanji.meaningFr}
          </p>
          {kanji.meaningEn && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{kanji.meaningEn}</p>
          )}
          <div className="mt-4 flex gap-2">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
              JLPT N{kanji.jlptLevel}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {kanji.strokeCount} traits
            </span>
            {kanji.grade && (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                Grade {kanji.grade}
              </span>
            )}
          </div>

          {/* Radicals */}
          {kanji.radicals.length > 0 && (
            <div className="mt-6 w-full">
              <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Radicaux
              </h3>
              <div className="flex flex-wrap gap-2">
                {kanji.radicals.map(({ radical }) => (
                  <span
                    key={radical.id}
                    className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                  >
                    <span className="mr-1 text-lg">{radical.character}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">{radical.meaningFr}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status Button */}
          {session?.user && (
            <KanjiStatusButton kanjiId={kanji.id} initialStatus={currentStatus} />
          )}
        </div>

        {/* Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Readings */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">Lectures</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  On&apos;yomi (音読み) — Lecture sino-japonaise
                </h3>
                {onReadings.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {onReadings.map((r) => (
                      <span
                        key={r.id}
                        className="rounded-lg bg-orange-50 px-3 py-1.5 text-sm dark:bg-orange-900/30"
                      >
                        <span className="font-medium text-orange-700 dark:text-orange-300">
                          {r.reading}
                        </span>
                        <span className="ml-1 text-zinc-400">({r.romaji})</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-400">Aucune</p>
                )}
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Kun&apos;yomi (訓読み) — Lecture japonaise
                </h3>
                {kunReadings.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {kunReadings.map((r) => (
                      <span
                        key={r.id}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm dark:bg-blue-900/30"
                      >
                        <span className="font-medium text-blue-700 dark:text-blue-300">
                          {r.reading}
                        </span>
                        <span className="ml-1 text-zinc-400">({r.romaji})</span>
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-zinc-400">Aucune</p>
                )}
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
              Mots d&apos;exemple
            </h2>
            {kanji.examples.length > 0 ? (
              <div className="space-y-3">
                {kanji.examples.map((ex) => (
                  <div
                    key={ex.id}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-800/50"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="text-lg font-medium text-zinc-900 dark:text-white">
                        {ex.word}
                      </span>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {ex.reading}
                      </span>
                      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        {ex.meaningFr}
                      </span>
                    </div>
                    {ex.sentence && (
                      <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-zinc-700">
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">{ex.sentence}</p>
                        {ex.sentenceFr && (
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {ex.sentenceFr}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-400">Aucun exemple pour le moment.</p>
            )}
          </div>

          {/* Related Kanji */}
          {relatedKanji.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
                Kanji liés (radicaux communs)
              </h2>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
                {relatedKanji.map((related) => {
                  const sharedRadicals = related.radicals
                    .filter((r) =>
                      kanji.radicals.some((kr) => kr.radicalId === r.radicalId)
                    )
                    .map((r) => r.radical.character);

                  return (
                    <Link
                      key={related.id}
                      href={`/kanji/${related.id}`}
                      className="flex flex-col items-center rounded-lg border border-zinc-100 bg-zinc-50 p-3 transition-colors hover:border-red-300 hover:bg-red-50 dark:border-zinc-800 dark:bg-zinc-800/50 dark:hover:border-red-700 dark:hover:bg-red-950"
                    >
                      <span className="text-2xl text-zinc-900 dark:text-white">
                        {related.character}
                      </span>
                      <span className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {sharedRadicals.join(" ")}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
