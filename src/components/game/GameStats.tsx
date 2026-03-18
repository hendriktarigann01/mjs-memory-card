import { Clock, Move, Target, Lightbulb } from "lucide-react";
import { GlassCard } from "../ui/GlassCard";
import { formatTime } from "@/lib/utils";
import { Button } from "../ui/Button";

interface GameStatsProps {
  moves: number;
  time: number;
  score: number;
  onHintClick?: () => void;
  hintEnabled: boolean;
  timerEnabled: boolean;
}

export function GameStats({
  moves,
  time,
  score,
  onHintClick,
  hintEnabled,
  timerEnabled,
}: GameStatsProps) {
  return (
    <GlassCard className="p-4 mb-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5 text-blue-300" />
            <div>
              <p className="text-xs text-white/60">Moves</p>
              <p className="text-lg font-bold">{moves}</p>
            </div>
          </div>

          {timerEnabled && (
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-300" />
              <div>
                <p className="text-xs text-white/60">Time</p>
                <p className="text-lg font-bold">{formatTime(time)}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-green-300" />
            <div>
              <p className="text-xs text-white/60">Score</p>
              <p className="text-lg font-bold">{score}</p>
            </div>
          </div>
        </div>

        {hintEnabled && onHintClick && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onHintClick}
            className="flex items-center gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            Use Hint
          </Button>
        )}
      </div>
    </GlassCard>
  );
}
