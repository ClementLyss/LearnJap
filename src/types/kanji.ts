export interface KanjiReading {
  id: number;
  type: "on" | "kun";
  reading: string;
  romaji: string;
}

export interface KanjiExample {
  id: number;
  word: string;
  reading: string;
  meaningFr: string;
  sentence?: string | null;
  sentenceFr?: string | null;
}

export interface KanjiWithDetails {
  id: number;
  character: string;
  jlptLevel: number;
  grade?: number | null;
  strokeCount: number;
  strokeOrder?: unknown;
  meaningFr: string;
  meaningEn?: string | null;
  readings: KanjiReading[];
  examples: KanjiExample[];
  radicals: {
    radical: {
      id: number;
      character: string;
      meaningFr: string;
    };
  }[];
}
