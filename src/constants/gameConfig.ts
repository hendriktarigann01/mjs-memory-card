import { Difficulty } from "@/types/game";

export const GRID_CONFIG = {
  easy: { rows: 4, cols: 4, pairs: 8 },
  normal: { rows: 4, cols: 6, pairs: 12 },
  hard: { rows: 6, cols: 6, pairs: 18 },
};

export const SCORE_CONFIG = {
  matchBonus: 100,
  timeBonus: 10, // per second remaining
  movePenalty: 5,
  perfectMatchBonus: 500,
};

export const GAME_DURATION = 180; // 3 minutes in seconds
export const FLIP_DELAY = 1000; // 1 second
export const HINT_DURATION = 2000; // 2 seconds
