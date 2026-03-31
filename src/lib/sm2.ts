/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Quality ratings:
 *   0 - Total blackout
 *   1 - Incorrect, but remembered upon seeing the answer
 *   2 - Incorrect, but the answer seemed easy to recall
 *   3 - Correct with serious difficulty
 *   4 - Correct with some hesitation
 *   5 - Perfect response
 */

interface SM2Input {
  repetitions: number;
  easeFactor: number;
  interval: number; // in days
}

interface SM2Result {
  repetitions: number;
  easeFactor: number;
  interval: number;
  nextReview: Date;
}

export function sm2(input: SM2Input, quality: number): SM2Result {
  const { repetitions, easeFactor, interval } = input;

  let newRepetitions: number;
  let newEaseFactor: number;
  let newInterval: number;

  if (quality >= 3) {
    // Correct response
    switch (repetitions) {
      case 0:
        newInterval = 1;
        break;
      case 1:
        newInterval = 6;
        break;
      default:
        newInterval = Math.round(interval * easeFactor);
    }
    newRepetitions = repetitions + 1;
  } else {
    // Incorrect response — reset
    newRepetitions = 0;
    newInterval = 1;
  }

  // Update ease factor
  newEaseFactor =
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Minimum ease factor is 1.3
  if (newEaseFactor < 1.3) newEaseFactor = 1.3;

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + newInterval);

  return {
    repetitions: newRepetitions,
    easeFactor: newEaseFactor,
    interval: newInterval,
    nextReview,
  };
}
