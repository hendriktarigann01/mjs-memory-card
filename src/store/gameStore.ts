import { create } from "zustand";
import { GameState, Player, StageNumber, AvatarId } from "@/types/game";

interface GameStore extends GameState {
  setPlayer: (player: Partial<Player>) => void;
  setStage: (stage: StageNumber) => void;
  advanceStage: () => void;
  setSettings: (settings: Partial<GameState["settings"]>) => void;
  resetGame: () => void;
}

const DEFAULT_PLAYER: Player = {
  name: "",
  avatar: "profile-1" as AvatarId,
};

export const useGameStore = create<GameStore>((set) => ({
  player: DEFAULT_PLAYER,
  cards: [],
  flippedCards: [],
  moves: 0,
  time: 0,
  accumulatedTimeMs: 0, 
  currentStage: 1,
  isPlaying: false,
  isPaused: false,
  settings: {
    soundEnabled: true,
  },

  setPlayer: (partial) =>
    set((state) => ({ player: { ...state.player, ...partial } })),

  setStage: (stage) => set({ currentStage: stage }),

  advanceStage: () =>
    set((state) => ({
      currentStage:
        state.currentStage < 2 ? ((state.currentStage + 1) as StageNumber) : 2,
    })),

  setSettings: (partial) =>
    set((state) => ({ settings: { ...state.settings, ...partial } })),

  resetGame: () =>
    set({
      cards: [],
      flippedCards: [],
      moves: 0,
      time: 0,
      accumulatedTimeMs: 0,
      currentStage: 1,
      isPlaying: false,
      isPaused: false,
    }),
}));
