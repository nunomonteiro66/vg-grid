import { getItem, setItem } from "./wrapper";

type Progress = {
  [day: number]: Day;
};

type Day = {
  guesses: Game[];
  hints: string[];
  won: boolean;
};

type Game = {
  name: string;
  id: number;
};

const PROGRESS_KEY = "gameProgress";

const defaultProgress: Progress = {};

export function loadProgress() {
  return getItem(PROGRESS_KEY, defaultProgress);
}

export function loadProgressDay(day: number): Day | undefined {
  return loadProgress()[day];
}

export function saveProgress(
  day: number,
  guesses: Game[],
  hints: string[],
  won = false,
) {
  const currentProgress = loadProgress();

  const updated: Progress = {
    ...currentProgress,
    [day]: {
      guesses: guesses,
      hints: hints,
      won: won,
    },
  };

  setItem(PROGRESS_KEY, updated);
}

export function saveGuess(day: number, guess: Game) {
  const currentProgress = loadProgress();

  currentProgress[day].guesses.push(guess);

  setItem(PROGRESS_KEY, currentProgress);
}

export function saveHint(day: number, hint: string) {
  const currentProgress = loadProgress();

  currentProgress[day].hints.push(hint);

  setItem(PROGRESS_KEY, currentProgress);
}

export function saveWon(day: number) {
  const currentProgress = loadProgress();

  currentProgress[day].won = true;

  setItem(PROGRESS_KEY, currentProgress);
}
