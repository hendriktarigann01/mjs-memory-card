export type Difficulty = "easy" | "normal" | "hard";

export interface Card {
  id: string;
  icon: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: string[];
  moves: number;
  time: number;
  score: number;
  isPlaying: boolean;
  isPaused: boolean;
  difficulty: Difficulty;
  settings: GameSettings;
}

export interface GameSettings {
  soundEnabled: boolean;
  hintEnabled: boolean;
  timerEnabled: boolean;
}

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  score: number;
  moves: number;
  time: number;
  difficulty: Difficulty;
  created_at: string;
}
