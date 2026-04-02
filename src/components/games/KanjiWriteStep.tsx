"use client";

import { useState, useRef, useEffect } from "react";
import { toHiragana } from "wanakana";
import * as wanakana from "wanakana";
import type { KanjiWithDetails } from "@/types/kanji";

interface KanjiWriteStepProps {
  kanji: KanjiWithDetails;
  onNext: (score: number) => void;
}

interface ExerciseState {
  userInput: string;
  isCorrect: boolean | null;
  showAnswer: boolean;
}

function normalizeReading(s: string): string {
  // Remove dots, spaces, and normalize to hiragana for comparison
  return toHiragana(s.replace(/[.\s・、。]/g, "").toLowerCase());
}

export default function KanjiWriteStep({ kanji, onNext }: KanjiWriteStepProps) {
  const examples = kanji.examples.filter((ex) => ex.sentence);
  // If no examples with sentences, use the word readings instead
  const exercises = examples.length > 0
    ? examples.map((ex) => ({
        prompt: ex.sentence!,
        answer: ex.reading,
        hint: ex.meaningFr,
        word: ex.word,
      }))
    : kanji.examples.slice(0, 2).map((ex) => ({
        prompt: ex.word,
        answer: ex.reading,
        hint: ex.meaningFr,
        word: ex.word,
      }));

  const [states, setStates] = useState<ExerciseState[]>(
    exercises.map(() => ({ userInput: "", isCorrect: null, showAnswer: false }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Bind wanakana to inputs
  useEffect(() => {
    const ref = inputRefs.current[currentIndex];
    if (ref) {
      wanakana.bind(ref, { IMEMode: true });
      ref.focus();
      return () => {
        wanakana.unbind(ref);
      };
    }
  }, [currentIndex]);

  const handleCheck = (index: number) => {
    const exercise = exercises[index];
    const userNormalized = normalizeReading(states[index].userInput);
    const answerNormalized = normalizeReading(exercise.answer);
    const isCorrect = userNormalized === answerNormalized;

    setStates((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], isCorrect };
      return next;
    });
  };

  const handleShowAnswer = (index: number) => {
    setStates((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], showAnswer: true, isCorrect: false };
      return next;
    });
  };

  const handleNextExercise = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const allDone = states.every((s) => s.isCorrect !== null);
  const correctCount = states.filter((s) => s.isCorrect === true).length;

  // SM-2 quality: 5 = all correct first try, 3 = some correct, 1 = mostly wrong
  const getQuality = () => {
    if (exercises.length === 0) return 4;
    const ratio = correctCount / exercises.length;
    if (ratio === 1) return 5;
    if (ratio >= 0.5) return 3;
    return 1;
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-center">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Ecris les lectures des exemples
          </h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Tape en romaji — la conversion en hiragana est automatique.
          </p>
        </div>

        <div className="space-y-6">
          {exercises.map((exercise, index) => {
            const state = states[index];
            const isCurrent = index === currentIndex;
            const isDone = state.isCorrect !== null;

            return (
              <div
                key={index}
                className={`rounded-lg border p-4 transition-colors ${
                  isDone
                    ? state.isCorrect
                      ? "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950"
                      : "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950"
                    : isCurrent
                    ? "border-red-200 bg-white dark:border-red-800 dark:bg-zinc-800"
                    : "border-zinc-100 bg-zinc-50 opacity-50 dark:border-zinc-800 dark:bg-zinc-900"
                }`}
              >
                {/* Prompt */}
                <div className="mb-3">
                  <span className="text-lg font-medium text-zinc-900 dark:text-white">
                    {exercise.word}
                  </span>
                  <span className="ml-2 text-sm text-zinc-500">({exercise.hint})</span>
                </div>

                {/* Input */}
                <div className="flex gap-2">
                  <input
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    value={state.userInput}
                    onChange={(e) => {
                      if (isDone) return;
                      setStates((prev) => {
                        const next = [...prev];
                        next[index] = { ...next[index], userInput: e.target.value };
                        return next;
                      });
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isDone && isCurrent) {
                        handleCheck(index);
                      }
                    }}
                    disabled={!isCurrent || isDone}
                    placeholder="Tape la lecture en romaji..."
                    className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-lg font-medium text-zinc-900 placeholder:text-zinc-400 disabled:opacity-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-white"
                  />
                  {isCurrent && !isDone && (
                    <button
                      onClick={() => handleCheck(index)}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Vérifier
                    </button>
                  )}
                </div>

                {/* Feedback */}
                {isDone && (
                  <div className="mt-2">
                    {state.isCorrect ? (
                      <p className="text-sm font-medium text-green-600 dark:text-green-400">
                        Correct !
                      </p>
                    ) : (
                      <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">
                          Incorrect
                        </p>
                        {state.showAnswer && (
                          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            Réponse : <strong>{exercise.answer}</strong>
                          </p>
                        )}
                        {!state.showAnswer && (
                          <button
                            onClick={() => handleShowAnswer(index)}
                            className="mt-1 text-sm text-zinc-500 underline"
                          >
                            Voir la réponse
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Next button when current exercise is done but more remain */}
                {isDone && isCurrent && index < exercises.length - 1 && (
                  <button
                    onClick={handleNextExercise}
                    className="mt-3 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                  >
                    Exercice suivant →
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Summary & next */}
        {allDone && (
          <div className="mt-6">
            <div className="mb-4 rounded-lg bg-zinc-50 p-4 text-center dark:bg-zinc-800">
              <p className="text-lg font-semibold text-zinc-900 dark:text-white">
                {correctCount}/{exercises.length} correct{correctCount > 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={() => onNext(getQuality())}
              className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700 transition-colors"
            >
              Terminer l&apos;étude
            </button>
          </div>
        )}

        {exercises.length === 0 && (
          <div className="text-center">
            <p className="mb-4 text-zinc-500">Pas d&apos;exemple disponible pour ce kanji.</p>
            <button
              onClick={() => onNext(4)}
              className="rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white hover:bg-red-700"
            >
              Terminer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
