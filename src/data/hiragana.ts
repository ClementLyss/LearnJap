import { KanaChar } from "./kana";

export const hiragana: KanaChar[] = [
  // Vowels
  { character: "あ", romaji: "a", group: "vowel" },
  { character: "い", romaji: "i", group: "vowel" },
  { character: "う", romaji: "u", group: "vowel" },
  { character: "え", romaji: "e", group: "vowel" },
  { character: "お", romaji: "o", group: "vowel" },

  // K group
  { character: "か", romaji: "ka", group: "k" },
  { character: "き", romaji: "ki", group: "k" },
  { character: "く", romaji: "ku", group: "k" },
  { character: "け", romaji: "ke", group: "k" },
  { character: "こ", romaji: "ko", group: "k" },

  // S group
  { character: "さ", romaji: "sa", group: "s" },
  { character: "し", romaji: "shi", group: "s" },
  { character: "す", romaji: "su", group: "s" },
  { character: "せ", romaji: "se", group: "s" },
  { character: "そ", romaji: "so", group: "s" },

  // T group
  { character: "た", romaji: "ta", group: "t" },
  { character: "ち", romaji: "chi", group: "t" },
  { character: "つ", romaji: "tsu", group: "t" },
  { character: "て", romaji: "te", group: "t" },
  { character: "と", romaji: "to", group: "t" },

  // N group
  { character: "な", romaji: "na", group: "n" },
  { character: "に", romaji: "ni", group: "n" },
  { character: "ぬ", romaji: "nu", group: "n" },
  { character: "ね", romaji: "ne", group: "n" },
  { character: "の", romaji: "no", group: "n" },

  // H group
  { character: "は", romaji: "ha", group: "h" },
  { character: "ひ", romaji: "hi", group: "h" },
  { character: "ふ", romaji: "fu", group: "h" },
  { character: "へ", romaji: "he", group: "h" },
  { character: "ほ", romaji: "ho", group: "h" },

  // M group
  { character: "ま", romaji: "ma", group: "m" },
  { character: "み", romaji: "mi", group: "m" },
  { character: "む", romaji: "mu", group: "m" },
  { character: "め", romaji: "me", group: "m" },
  { character: "も", romaji: "mo", group: "m" },

  // Y group
  { character: "や", romaji: "ya", group: "y" },
  { character: "ゆ", romaji: "yu", group: "y" },
  { character: "よ", romaji: "yo", group: "y" },

  // R group
  { character: "ら", romaji: "ra", group: "r" },
  { character: "り", romaji: "ri", group: "r" },
  { character: "る", romaji: "ru", group: "r" },
  { character: "れ", romaji: "re", group: "r" },
  { character: "ろ", romaji: "ro", group: "r" },

  // W group
  { character: "わ", romaji: "wa", group: "w" },
  { character: "を", romaji: "wo", group: "w" },

  // Special
  { character: "ん", romaji: "n", group: "special" },
];
