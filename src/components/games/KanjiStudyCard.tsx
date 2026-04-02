"use client";

import type { KanjiWithDetails } from "@/types/kanji";

interface KanjiStudyCardProps {
  kanji: KanjiWithDetails;
  onNext: () => void;
}

export default function KanjiStudyCard({ kanji, onNext }: KanjiStudyCardProps) {
  const onReadings = kanji.readings.filter((r) => r.type === "on");
  const kunReadings = kanji.readings.filter((r) => r.type === "kun");

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        {/* Kanji character */}
        <div className="mb-6 text-center">
          <span className="text-9xl font-medium text-zinc-900 dark:text-white">
            {kanji.character}
          </span>
          <p className="mt-4 text-2xl font-semibold text-zinc-700 dark:text-zinc-300">
            {kanji.meaningFr}
          </p>
          {kanji.meaningEn && (
            <p className="text-sm text-zinc-500">({kanji.meaningEn})</p>
          )}
          <div className="mt-3 flex justify-center gap-2">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:bg-red-900 dark:text-red-300">
              JLPT N{kanji.jlptLevel}
            </span>
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {kanji.strokeCount} traits
            </span>
          </div>
        </div>

        {/* Readings */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              On&apos;yomi (音読み)
            </h3>
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
              {onReadings.length === 0 && (
                <span className="text-sm text-zinc-400">—</span>
              )}
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Kun&apos;yomi (訓読み)
            </h3>
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
              {kunReadings.length === 0 && (
                <span className="text-sm text-zinc-400">—</span>
              )}
            </div>
          </div>
        </div>

        {/* Examples */}
        {kanji.examples.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Mots d&apos;exemple
            </h3>
            <div className="space-y-2">
              {kanji.examples.map((ex) => (
                <div
                  key={ex.id}
                  className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800/50"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-medium text-zinc-900 dark:text-white">
                      {ex.word}
                    </span>
                    <span className="text-sm text-zinc-500">{ex.reading}</span>
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {ex.meaningFr}
                    </span>
                  </div>
                  {ex.sentence && (
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {ex.sentence}
                      {ex.sentenceFr && (
                        <span className="ml-2 text-zinc-400">— {ex.sentenceFr}</span>
                      )}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Radicals */}
        {kanji.radicals.length > 0 && (
          <div className="mb-6">
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
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {radical.meaningFr}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="mb-4 text-center text-sm text-zinc-400">
          Prends le temps de bien mémoriser ce kanji, ses lectures et ses exemples.
        </p>

        <button
          onClick={onNext}
          className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
        >
          J&apos;ai mémorisé, passer au redessin
        </button>
      </div>
    </div>
  );
}
