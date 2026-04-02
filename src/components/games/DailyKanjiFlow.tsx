"use client";

import { useState } from "react";
import type { KanjiWithDetails } from "@/types/kanji";
import KanjiStudyCard from "./KanjiStudyCard";
import KanjiRedrawStep from "./KanjiRedrawStep";
import KanjiWriteStep from "./KanjiWriteStep";
import KanjiComplete from "./KanjiComplete";

type Step = "study" | "redraw" | "write" | "complete";

interface DailyKanjiFlowProps {
  kanji: KanjiWithDetails;
}

const stepLabels: Record<Step, string> = {
  study: "1. Découverte",
  redraw: "2. Redessin",
  write: "3. Exemples",
  complete: "Terminé",
};

export default function DailyKanjiFlow({ kanji }: DailyKanjiFlowProps) {
  const [step, setStep] = useState<Step>("study");
  const [score, setScore] = useState(0);

  const steps: Step[] = ["study", "redraw", "write", "complete"];
  const currentIndex = steps.indexOf(step);

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8 flex items-center gap-2">
        {steps.slice(0, 3).map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                i < currentIndex
                  ? "bg-green-500 text-white"
                  : i === currentIndex
                  ? "bg-red-600 text-white"
                  : "bg-zinc-200 text-zinc-500 dark:bg-zinc-700"
              }`}
            >
              {i < currentIndex ? "✓" : i + 1}
            </div>
            <span
              className={`hidden text-sm sm:block ${
                i === currentIndex
                  ? "font-medium text-zinc-900 dark:text-white"
                  : "text-zinc-400"
              }`}
            >
              {stepLabels[s]}
            </span>
            {i < 2 && (
              <div
                className={`h-0.5 flex-1 ${
                  i < currentIndex ? "bg-green-500" : "bg-zinc-200 dark:bg-zinc-700"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Steps */}
      {step === "study" && (
        <KanjiStudyCard kanji={kanji} onNext={() => setStep("redraw")} />
      )}
      {step === "redraw" && (
        <KanjiRedrawStep kanji={kanji} onNext={() => setStep("write")} />
      )}
      {step === "write" && (
        <KanjiWriteStep
          kanji={kanji}
          onNext={(writeScore) => {
            setScore(writeScore);
            setStep("complete");
          }}
        />
      )}
      {step === "complete" && <KanjiComplete kanji={kanji} score={score} />}
    </div>
  );
}
