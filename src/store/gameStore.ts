import { create } from "zustand";
import { GameState, Difficulty } from "@/types/game";

interface GameStore extends GameState {
  setDifficulty: (difficulty: Difficulty) => void;
  setSettings: (settings: Partial<GameState["settings"]>) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  cards: [],
  flippedCards: [],
  moves: 0,
  time: 0,
  score: 0,
  isPlaying: false,
  isPaused: false,
  difficulty: "normal",
  settings: {
    soundEnabled: true,
    hintEnabled: false,
    timerEnabled: true,
  },
  setDifficulty: (difficulty) => set({ difficulty }),
  setSettings: (settings) =>
    set((state) => ({
      settings: { ...state.settings, ...settings },
    })),
  resetGame: () =>
    set({
      cards: [],
      flippedCards: [],
      moves: 0,
      time: 0,
      score: 0,
      isPlaying: false,
      isPaused: false,
    }),
}));
