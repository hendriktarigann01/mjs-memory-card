import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { LeaderboardEntry, AvatarId } from "@/types/game";

/**
 * Unified leaderboard — no stage filter.
 * Ranked by time_ms ASC (lowest total milliseconds = fastest = rank 1).
 */
export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("leaderboard")
        .select("*")
        .order("time_ms", { ascending: true })
        .limit(10);

      if (fetchError) throw fetchError;
      setLeaderboard(data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch leaderboard",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  /**
   * Submit a completed game session.
   * time_ms = total elapsed milliseconds across all stages.
   */
  const addScore = async (params: {
    playerName: string;
    avatar: AvatarId;
    time_ms: number;
    moves: number;
    stage: number;
  }): Promise<boolean> => {
    try {
      const { error: insertError } = await supabase.from("leaderboard").insert({
        player_name: params.playerName,
        avatar: params.avatar,
        time_ms: params.time_ms,
        moves: params.moves,
        stage: params.stage,
      });

      if (insertError) throw insertError;
      await fetchLeaderboard();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add score");
      return false;
    }
  };

  /**
   * Returns true if time_ms would rank in the top-10.
   * Lower is better.
   */
  const isTopScore = (timeMs: number): boolean => {
    if (leaderboard.length < 10) return true;
    return timeMs < leaderboard[leaderboard.length - 1].time_ms;
  };

  return {
    leaderboard,
    loading,
    error,
    addScore,
    isTopScore,
    refetch: fetchLeaderboard,
  };
}
