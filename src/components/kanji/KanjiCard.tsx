"use client";

import Link from "next/link";
import { useRef, useCallback } from "react";
import type { KanjiStatus } from "@/services/progress.service";

interface KanjiCardProps {
  id: number;
  character: string;
  meaningFr: string;
  status: KanjiStatus;
  isLoggedIn: boolean;
  onStatusChange?: (kanjiId: number, status: KanjiStatus) => void;
}

const statusStyles: Record<KanjiStatus, string> = {
  unseen:
    "border-zinc-200 bg-white opacity-50 dark:border-zinc-800 dark:bg-zinc-900",
  want_to_learn:
    "border-blue-400 bg-blue-50 ring-1 ring-blue-200 dark:border-blue-600 dark:bg-blue-950 dark:ring-blue-800",
  learning:
    "border-amber-400 bg-amber-50 ring-1 ring-amber-200 dark:border-amber-600 dark:bg-amber-950 dark:ring-amber-800",
  known:
    "border-green-400 bg-green-50 ring-1 ring-green-200 dark:border-green-600 dark:bg-green-950 dark:ring-green-800",
};

const statusDot: Record<KanjiStatus, string> = {
  unseen: "bg-zinc-300 dark:bg-zinc-600",
  want_to_learn: "bg-blue-500",
  learning: "bg-amber-500",
  known: "bg-green-500",
};

export default function KanjiCard({
  id,
  character,
  meaningFr,
  status,
  isLoggedIn,
  onStatusChange,
}: KanjiCardProps) {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const didLongPress = useRef(false);

  const startPress = useCallback(() => {
    if (!isLoggedIn || !onStatusChange) return;
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      if (status === "unseen") {
        onStatusChange(id, "want_to_learn");
      } else if (status === "want_to_learn") {
        onStatusChange(id, "unseen");
      }
    }, 500);
  }, [id, status, isLoggedIn, onStatusChange]);

  const endPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      if (didLongPress.current) {
        e.preventDefault();
      }
    },
    []
  );

  return (
    <Link
      href={`/kanji/${id}`}
      onClick={handleClick}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      className={`group relative flex flex-col items-center rounded-xl border p-4 transition-all hover:shadow-md select-none ${statusStyles[status]}`}
    >
      {status !== "unseen" && (
        <span
          className={`absolute right-1.5 top-1.5 h-2 w-2 rounded-full ${statusDot[status]}`}
        />
      )}
      <span
        className={`text-3xl font-medium ${
          status === "unseen"
            ? "text-zinc-400 dark:text-zinc-600"
            : "text-zinc-900 dark:text-white"
        }`}
      >
        {character}
      </span>
      <span
        className={`mt-1 text-xs ${
          status === "unseen"
            ? "text-zinc-400 dark:text-zinc-600"
            : "text-zinc-500 dark:text-zinc-400"
        }`}
      >
        {meaningFr}
      </span>
    </Link>
  );
}
