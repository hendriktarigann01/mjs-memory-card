import { StageConfig, StageNumber } from "@/types/game";

/**
 * Two stages, fixed 4-col × 3-row grid (12 cards / 6 pairs).
 * Each game randomly picks 6 from 12 available product images.
 * Stage 2 has less time to raise the challenge.
 */
export const STAGE_CONFIG: Record<StageNumber, StageConfig> = {
  1: {
    stage: 1,
    label: "Stage 1",
    // durationSeconds: 60,
    durationSeconds: 60,
    pairs: 6,
    cols: 4,
    rows: 3,
  },
  2: {
    stage: 2,
    label: "Stage 2",
    // durationSeconds: 45,
    durationSeconds: 45,
    pairs: 6,
    cols: 4,
    rows: 3,
  },
};

export const FLIP_DELAY_MS = 1000;
export const HINT_DURATION_MS = 2000;
