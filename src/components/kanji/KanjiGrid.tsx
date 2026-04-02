"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import KanjiCard from "./KanjiCard";
import type { KanjiStatus } from "@/services/progress.service";

interface KanjiItem {
  id: number;
  character: string;
  meaningFr: string;
}

interface KanjiGridProps {
  kanjiList: KanjiItem[];
  initialStatuses: Record<number, KanjiStatus>;
  isLoggedIn: boolean;
}

const statusFilters: { value: "all" | KanjiStatus; label: string; color: string }[] = [
  { value: "all", label: "Tous", color: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
  { value: "unseen", label: "Non vus", color: "bg-zinc-100 text-zinc-500" },
  { value: "want_to_learn", label: "A apprendre", color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" },
  { value: "learning", label: "En cours", color: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300" },
  { value: "known", label: "Connus", color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" },
];

export default function KanjiGrid({ kanjiList, initialStatuses, isLoggedIn }: KanjiGridProps) {
  const router = useRouter();
  const [statuses, setStatuses] = useState<Record<number, KanjiStatus>>(initialStatuses);
  const [filter, setFilter] = useState<"all" | KanjiStatus>("all");

  // Prefetch all kanji detail pages on mount for instant navigation
  useEffect(() => {
    kanjiList.forEach((k) => {
      router.prefetch(`/kanji/${k.id}`);
    });
  }, [kanjiList, router]);

  const handleStatusChange = useCallback(async (kanjiId: number, newStatus: KanjiStatus) => {
    // Optimistic update
    setStatuses((prev) => ({ ...prev, [kanjiId]: newStatus }));

    try {
      const res = await fetch(`/api/kanji/${kanjiId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        // Revert on error
        setStatuses((prev) => ({ ...prev, [kanjiId]: initialStatuses[kanjiId] ?? "unseen" }));
      }
    } catch {
      setStatuses((prev) => ({ ...prev, [kanjiId]: initialStatuses[kanjiId] ?? "unseen" }));
    }
  }, [initialStatuses]);

  const filteredKanji = filter === "all"
    ? kanjiList
    : kanjiList.filter((k) => (statuses[k.id] ?? "unseen") === filter);

  // Count per status
  const counts = kanjiList.reduce(
    (acc, k) => {
      const s = statuses[k.id] ?? "unseen";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div>
      {/* Filter bar */}
      {isLoggedIn && (
        <div className="mb-4 flex flex-wrap gap-2">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                filter === f.value
                  ? f.color + " ring-2 ring-offset-1 ring-zinc-400"
                  : f.color + " opacity-60 hover:opacity-100"
              }`}
            >
              {f.label}
              {f.value !== "all" && (
                <span className="ml-1">({counts[f.value] || 0})</span>
              )}
              {f.value === "all" && (
                <span className="ml-1">({kanjiList.length})</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Hint for long press */}
      {isLoggedIn && (
        <p className="mb-4 text-xs text-zinc-400 dark:text-zinc-500">
          Maintenez appuyé sur un kanji grisé pour l&apos;ajouter à votre liste d&apos;apprentissage.
        </p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {filteredKanji.map((kanji) => (
          <KanjiCard
            key={kanji.id}
            id={kanji.id}
            character={kanji.character}
            meaningFr={kanji.meaningFr}
            status={statuses[kanji.id] ?? "unseen"}
            isLoggedIn={isLoggedIn}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {filteredKanji.length === 0 && (
        <p className="mt-8 text-center text-zinc-400">
          Aucun kanji dans cette catégorie.
        </p>
      )}
    </div>
  );
}
