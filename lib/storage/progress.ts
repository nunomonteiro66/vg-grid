import { DEFAULT_GRID_LIVES } from "../constants";
import { getItem, setItem } from "./wrapper";

class Base<T> {
  dayId: number;
  key: string;
  progress: Record<number, T> = {};
  progressDay: T;

  constructor(dayId: number, key: string) {
    this.dayId = dayId;
    this.key = key;

    this.progress = this.loadProgress();

    this.progressDay = this.progress[dayId];
  }

  loadProgress() {
    return getItem(this.key, this.progress);
  }

  saveProgress() {
    setItem(this.key, this.progress);
  }

  addToProgress(newEntry: Record<number, T>) {
    this.progress = {
      ...this.progress,
      ...newEntry,
    };

    this.saveProgress();
  }
}

type Day = {
  lives: number;
  lost: boolean;
  gridWon: boolean[];
};

type Game = {
  name: string;
  id: number;
};

const PROGRESS_KEY = "gameGridProgress";

export class GameGridStorageClass extends Base<Day> {
  constructor(dayId: number) {
    super(dayId, PROGRESS_KEY);

    if (!this.progressDay) {
      this.addToProgress({
        [dayId]: {
          lives: DEFAULT_GRID_LIVES,
          lost: false,
          gridWon: Array<boolean>(9).fill(false),
        },
      });
    }
  }

  saveCurrentLives(lives: number) {
    this.progressDay.lives = lives;
    this.saveProgress();
  }

  saveWonSquare(gridWon: boolean[]) {
    this.progressDay.gridWon = gridWon;
    this.saveProgress();
  }
}
