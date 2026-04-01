"use client";

import { useState } from "react";
import type { KanjiStatus } from "@/services/progress.service";

interface KanjiStatusButtonProps {
  kanjiId: number;
  initialStatus: KanjiStatus;
}

const statusConfig: Record<KanjiStatus, { label: string; next: KanjiStatus; style: string }> = {
  unseen: {
    label: "Ajouter à ma liste",
    next: "want_to_learn",
    style: "border-zinc-300 text-zinc-700 hover:border-blue-400 hover:text-blue-600 dark:border-zinc-600 dark:text-zinc-300",
  },
  want_to_learn: {
    label: "A apprendre",
    next: "learning",
    style: "border-blue-400 bg-blue-50 text-blue-700 hover:bg-blue-100 dark:border-blue-600 dark:bg-blue-950 dark:text-blue-300",
  },
  learning: {
    label: "En apprentissage",
    next: "known",
    style: "border-amber-400 bg-amber-50 text-amber-700 hover:bg-amber-100 dark:border-amber-600 dark:bg-amber-950 dark:text-amber-300",
  },
  known: {
    label: "Connu !",
    next: "unseen",
    style: "border-green-400 bg-green-50 text-green-700 hover:bg-green-100 dark:border-green-600 dark:bg-green-950 dark:text-green-300",
  },
};

export default function KanjiStatusButton({ kanjiId, initialStatus }: KanjiStatusButtonProps) {
  const [status, setStatus] = useState<KanjiStatus>(initialStatus);
  const [loading, setLoading] = useState(false);

  const config = statusConfig[status];

  async function handleClick() {
    setLoading(true);
    const newStatus = config.next;

    try {
      const res = await fetch(`/api/kanji/${kanjiId}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setStatus(newStatus);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`mt-4 w-full rounded-lg border-2 px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${config.style}`}
    >
      {loading ? "..." : config.label}
    </button>
  );
}
