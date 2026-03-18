// ------ Player -----------------------------------------------

export type AvatarId =
  | "profile-1"
  | "profile-2"
  | "profile-3"
  | "profile-4"
  | "profile-5"
  | "profile-6";

export interface Player {
  name: string;
  avatar: AvatarId;
}

// ------ Stage ------------------------------------------------

export type StageNumber = 1 | 2;

export interface StageConfig {
  stage: StageNumber;
  label: string;
  durationSeconds: number;
  pairs: number;
  cols: number;
  rows: number;
}

// ------ Card -------------------------------------------------

export type CardImageId =
  | "product-1"
  | "product-2"
  | "product-3"
  | "product-4"
  | "product-5"
  | "product-6"
  | "product-7"
  | "product-8"
  | "product-9"
  | "product-10"
  | "product-11"
  | "product-12";

export interface Card {
  id: string;
  imageId: CardImageId;
  isFlipped: boolean;
  isMatched: boolean;
}

// ------ Game Settings ----------------------------------------

export interface GameSettings {
  soundEnabled: boolean;
}

// ------ Game State -------------------------------------------

export interface GameState {
  player: Player;
  cards: Card[];
  flippedCards: string[];
  moves: number;
  time: number;
  accumulatedTimeMs: number;
  currentStage: StageNumber;
  isPlaying: boolean;
  isPaused: boolean;
  settings: GameSettings;
}

// ------ Leaderboard ------------------------------------------

export interface LeaderboardEntry {
  id: string;
  player_name: string;
  avatar: AvatarId;
  time_ms: number;
  moves: number;
  stage: number;
  created_at: string;
}
