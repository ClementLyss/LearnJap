"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { KanjiWithDetails } from "@/types/kanji";

interface KanjiCompleteProps {
  kanji: KanjiWithDetails;
  score: number;
}

export default function KanjiComplete({ kanji, score }: KanjiCompleteProps) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function saveProgress() {
      try {
        // Update SM-2 progress
        const progressRes = await fetch(`/api/kanji/${kanji.id}/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quality: score }),
        });
        if (!progressRes.ok) throw new Error("progress");

        // Set status to learning (if not already known)
        await fetch(`/api/kanji/${kanji.id}/status`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "learning" }),
        });

        setSaved(true);
      } catch {
        setError(true);
      }
    }

    saveProgress();
  }, [kanji.id, score]);

  const emoji = score >= 5 ? "🎯" : score >= 3 ? "👍" : "💪";
  const message =
    score >= 5
      ? "Parfait ! Tu maîtrises ce kanji !"
      : score >= 3
      ? "Bien joué ! Continue comme ça."
      : "Pas grave, la répétition est la clé !";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <p className="text-6xl">{emoji}</p>
          <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
            Étude terminée !
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{message}</p>
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-lg bg-zinc-50 p-4 dark:bg-zinc-800">
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <span className="text-4xl font-medium text-zinc-900 dark:text-white">
                {kanji.character}
              </span>
              <p className="mt-1 text-sm text-zinc-500">{kanji.meaningFr}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {score}/5
              </p>
              <p className="text-sm text-zinc-500">Score</p>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mb-6 text-center text-sm text-zinc-500">
          {error ? (
            <p className="text-red-500">
              Erreur lors de la sauvegarde. Réessaie plus tard.
            </p>
          ) : saved ? (
            <p className="text-green-600 dark:text-green-400">
              Progression sauvegardée ! Prochaine révision planifiée.
            </p>
          ) : (
            <p>Sauvegarde en cours...</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link
            href="/games/daily-kanji"
            className="w-full rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-red-700 transition-colors"
          >
            Kanji suivant
          </Link>
          <Link
            href={`/kanji/${kanji.id}`}
            className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-center text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
          >
            Voir la fiche du kanji
          </Link>
          <Link
            href="/games"
            className="text-center text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            Retour aux jeux
          </Link>
        </div>
      </div>
    </div>
  );
}
