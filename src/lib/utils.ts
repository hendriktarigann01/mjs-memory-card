import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Format seconds into MM:SS display.
 * Used for the in-game countdown timer.
 * e.g. 65 → "01:05"
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Format milliseconds into MM:SS.mmm display.
 * Used for leaderboard and result modals.
 * e.g. 62390 → "01:02.390"
 */
export function formatTimeMs(ms: number): string {
  if (!ms || isNaN(ms)) return "00:00.00";
  const totalSeconds = Math.floor(ms / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  // Take only 2 significant digits of milliseconds (e.g. 870 → 87)
  const millis = Math.floor((ms % 1000) / 10);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}.${millis.toString().padStart(2, "0")}`;
}

/**
 * Legacy score calculation — kept for reference but no longer stored in DB.
 */
export function calculateScore(
  moves: number,
  timeRemaining: number,
  isPerfect: boolean,
): number {
  const baseScore = 1000;
  const movePenalty = moves * 5;
  const timeBonus = timeRemaining * 10;
  const perfectBonus = isPerfect ? 500 : 0;
  return Math.max(0, baseScore - movePenalty + timeBonus + perfectBonus);
}
