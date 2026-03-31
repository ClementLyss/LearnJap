export interface VocabularyItem {
  id: number;
  word: string;
  reading: string;
  meaningFr: string;
  category: string;
  jlptLevel?: number | null;
}

export type VocabularyCategory =
  | "work"
  | "adjectives"
  | "verbs"
  | "food"
  | "travel"
  | "daily"
  | "numbers"
  | "family"
  | "body"
  | "nature";
