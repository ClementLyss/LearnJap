export type GameMode = "kanji-to-french" | "kanji-to-japanese" | "french-to-kanji";

export interface QuizQuestion {
  id: number;
  character: string;
  correctAnswer: string;
  type: GameMode;
}

export interface QuizResult {
  questionId: number;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  quality: number; // SM-2 quality rating (0-5)
}

export interface GameSession {
  mode: GameMode;
  questions: QuizQuestion[];
  results: QuizResult[];
  currentIndex: number;
}

export interface QuizQuestionWithOptions {
  kanjiId: number;
  prompt: string;
  correctAnswer: string;
  options: string[];
  mode: GameMode;
}
