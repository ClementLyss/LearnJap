"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { QuizQuestionWithOptions, GameMode } from "@/types/game";

interface QuizGameProps {
  questions: QuizQuestionWithOptions[];
  mode: GameMode;
}

const modeLabels: Record<GameMode, string> = {
  "kanji-to-japanese": "Deviner la lecture",
  "french-to-kanji": "Deviner le kanji",
  "kanji-to-french": "Kanji → Français",
};

export default function QuizGame({ questions, mode }: QuizGameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<boolean[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIndex];

  const handleSelect = useCallback(
    (option: string) => {
      if (selected !== null) return; // already answered
      setSelected(option);

      const isCorrect = option === question.correctAnswer;
      setResults((prev) => [...prev, isCorrect]);

      // Update SM-2 progress in background (fire-and-forget)
      fetch(`/api/kanji/${question.kanjiId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quality: isCorrect ? 5 : 1 }),
      }).catch(() => {}); // silent fail

      // Auto-advance after feedback delay
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((i) => i + 1);
          setSelected(null);
        } else {
          setIsFinished(true);
        }
      }, 1000);
    },
    [selected, question, currentIndex, questions.length]
  );

  // Finished screen
  if (isFinished) {
    const correctCount = results.filter(Boolean).length;
    const total = results.length;
    const ratio = total > 0 ? correctCount / total : 0;
    const emoji = ratio === 1 ? "🎯" : ratio >= 0.7 ? "👍" : ratio >= 0.4 ? "💪" : "📚";
    const message =
      ratio === 1
        ? "Parfait ! Sans faute !"
        : ratio >= 0.7
        ? "Bien joué ! Continue comme ça."
        : ratio >= 0.4
        ? "Pas mal, encore un effort !"
        : "Continue de réviser, tu vas y arriver !";

    return (
      <div className="mx-auto max-w-xl">
        <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-center">
            <p className="text-6xl">{emoji}</p>
            <h2 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
              Quiz terminé !
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{message}</p>
          </div>

          <div className="mb-6 rounded-lg bg-zinc-50 p-4 text-center dark:bg-zinc-800">
            <p className="text-3xl font-bold text-zinc-900 dark:text-white">
              {correctCount}/{total}
            </p>
            <p className="text-sm text-zinc-500">réponses correctes</p>
          </div>

          {/* Per-question breakdown */}
          <div className="mb-6 space-y-2">
            {questions.map((q, i) => (
              <div
                key={i}
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  results[i]
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                    : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
                }`}
              >
                <span className="font-medium">{q.prompt}</span>
                <span>{q.correctAnswer}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/games/kanji-quiz?mode=${mode}`}
              className="w-full rounded-lg bg-red-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              Rejouer
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

  // Active question
  const isPromptKanji = mode === "kanji-to-japanese" || mode === "kanji-to-french";

  return (
    <div className="mx-auto max-w-xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {modeLabels[mode]}
        </h2>
        <span className="text-sm text-zinc-500">
          {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-2 rounded-full bg-red-500 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question prompt */}
      <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <span
          className={`font-medium text-zinc-900 dark:text-white ${
            isPromptKanji ? "text-7xl" : "text-2xl"
          }`}
        >
          {question.prompt}
        </span>
      </div>

      {/* Options grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {question.options.map((option, i) => {
          let style: string;

          if (selected === null) {
            // Not answered yet
            style =
              "border-zinc-200 bg-white hover:border-red-300 hover:bg-red-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-red-700 dark:hover:bg-red-950";
          } else if (option === question.correctAnswer) {
            // Always show correct answer in green
            style =
              "border-green-400 bg-green-50 ring-2 ring-green-300 dark:border-green-600 dark:bg-green-950 dark:ring-green-700";
          } else if (option === selected) {
            // Wrong selection in red
            style =
              "border-red-400 bg-red-50 ring-2 ring-red-300 dark:border-red-600 dark:bg-red-950 dark:ring-red-700";
          } else {
            // Other options dimmed
            style =
              "border-zinc-200 bg-white opacity-40 dark:border-zinc-700 dark:bg-zinc-800";
          }

          const isOptionKanji = mode === "french-to-kanji";

          return (
            <button
              key={i}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
              className={`rounded-xl border p-4 text-center transition-all ${style} ${
                selected === null ? "cursor-pointer active:scale-95" : "cursor-default"
              }`}
            >
              <span
                className={`font-medium text-zinc-900 dark:text-white ${
                  isOptionKanji ? "text-3xl" : "text-lg"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
