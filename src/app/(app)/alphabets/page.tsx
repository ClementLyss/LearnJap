"use client";

import { useState } from "react";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import type { KanaChar } from "@/data/kana";

const groups = ["vowel", "k", "s", "t", "n", "h", "m", "y", "r", "w", "special"] as const;

const groupLabels: Record<string, string> = {
  vowel: "Voyelles",
  k: "K",
  s: "S",
  t: "T",
  n: "N",
  h: "H",
  m: "M",
  y: "Y",
  r: "R",
  w: "W",
  special: "Spécial",
};

function KanaGrid({ characters }: { characters: KanaChar[] }) {
  const [revealed, setRevealed] = useState<Set<string>>(new Set());

  const toggle = (char: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(char)) next.delete(char);
      else next.add(char);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {groups.map((group) => {
        const chars = characters.filter((c) => c.group === group);
        if (chars.length === 0) return null;
        return (
          <div key={group}>
            <h3 className="mb-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {groupLabels[group]}
            </h3>
            <div className="flex flex-wrap gap-2">
              {chars.map((char) => (
                <button
                  key={char.character}
                  onClick={() => toggle(char.character)}
                  className="flex h-16 w-16 flex-col items-center justify-center rounded-lg border border-zinc-200 bg-white text-center transition-all hover:border-zinc-400 hover:shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  <span className="text-xl font-medium text-zinc-900 dark:text-white">
                    {char.character}
                  </span>
                  <span
                    className={`text-xs transition-opacity ${
                      revealed.has(char.character)
                        ? "text-zinc-500 opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {char.romaji}
                  </span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function AlphabetsPage() {
  const [tab, setTab] = useState<"hiragana" | "katakana">("hiragana");

  return (
    <div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">Alphabets</h1>
      <p className="mb-6 text-zinc-600 dark:text-zinc-400">
        Cliquez sur un caractère pour révéler sa lecture en romaji.
      </p>

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab("hiragana")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "hiragana"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Hiragana (あ)
        </button>
        <button
          onClick={() => setTab("katakana")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            tab === "katakana"
              ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
              : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          Katakana (ア)
        </button>
      </div>

      <KanaGrid characters={tab === "hiragana" ? hiragana : katakana} />
    </div>
  );
}
