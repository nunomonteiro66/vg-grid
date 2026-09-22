import { getItem, setItem } from "../wrapper";

type Progress = {
  [day: number]: Day;
};

type Day = {
  lives: number;
  lost: boolean;
  gridWon: number[];
};

type Game = {
  name: string;
  id: number;
};

const PROGRESS_KEY = "gameGridProgress";

const defaultProgress: Progress = {};

export default class GameGridStorageClass {
  PROGRESS_KEY = "gameGridProgress";
  defaultProgress: Progress = {};
  dayId: number = 0;
  progress: Progress = {};

  constructor(dayId: number) {}

  loadProgress() {
    return getItem(PROGRESS_KEY, defaultProgress);
  }

  loadProgressDayId(dayId: number) {
    return this.loadProgress()[dayId];
  }

  saveCurretLives(dayId: number, lives: number) {
    const currentProgress = this.loadProgress();

    currentProgress[dayId].lives = lives;

    setItem(PROGRESS_KEY, currentProgress);
  }

  saveWonSquare(dayId: number) {}
}
