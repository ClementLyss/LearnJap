"use client";

import { useState } from "react";
import type { KanjiWithDetails } from "@/types/kanji";

interface KanjiRedrawStepProps {
  kanji: KanjiWithDetails;
  onNext: () => void;
}

export default function KanjiRedrawStep({ kanji, onNext }: KanjiRedrawStepProps) {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Redessine le kanji
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Sur un papier ou un tableau, essaie de redessiner le kanji de mémoire.
          </p>
        </div>

        {/* Meaning as hint */}
        <div className="mb-8 text-center">
          <p className="text-lg text-zinc-700 dark:text-zinc-300">
            Signification : <strong>{kanji.meaningFr}</strong>
          </p>
          <p className="text-sm text-zinc-500">
            {kanji.strokeCount} traits
          </p>
        </div>

        {/* Drawing area placeholder */}
        <div className="mb-6 flex h-48 items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
          <p className="text-zinc-400 dark:text-zinc-500">
            Dessine le kanji sur papier ou dans une app de dessin
          </p>
        </div>

        {/* Show/hide the kanji for verification */}
        <div className="mb-6 text-center">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm text-zinc-500 underline hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            {showHint ? "Cacher" : "Voir"} le kanji pour vérifier
          </button>
          {showHint && (
            <div className="mt-4">
              <span className="text-8xl text-zinc-900 dark:text-white">
                {kanji.character}
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onNext}
            className="flex-1 rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            J&apos;ai redessiné, passer aux exemples
          </button>
        </div>
      </div>
    </div>
  );
}
