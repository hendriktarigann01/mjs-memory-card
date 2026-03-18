
import Link from "next/link";
import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface GameOverModalProps {
  /** Time used when game ended (seconds elapsed, not remaining) */
  timeUsed: number;
  onLeaderboard: () => void;
  onRetry: () => void;
}

/**
 * Shown when the player fails to complete a stage before time runs out.
 *
 * Design spec:
 *   - Title:  GAME OVER  (teal)
 *   - Label:  TIME
 *   - Value:  mm:ss in a pill (light teal bg)
 *   - Buttons: LEADERBOARD (primary) | RETRY (secondary)
 */
export function GameOverModal({
  timeUsed,
  onLeaderboard,
  onRetry,
}: GameOverModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="bg-white rounded-3xl border-2 border-[#3BBFB0] shadow-2xl w-full max-w-sm px-8 py-10 text-center space-y-8"
      >
        {/* Title */}
        <h2 className="text-3xl font-black text-[#3BBFB0] uppercase tracking-wider">
          Game Over
        </h2>

        {/* Time display */}
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
            Time
          </p>
          <div className="mx-auto w-fit px-10 py-3 rounded-full bg-[#E0F5F2] border border-[#A8DDD6]">
            <span className="text-2xl font-black text-[#3BBFB0] tracking-widest">
              {formatTime(timeUsed)}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onLeaderboard}
            className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-[#3BBFB0] text-white font-black text-base uppercase tracking-widest hover:bg-[#2A9D8F] transition-colors shadow-md"
          >
            <Medal className="w-5 h-5" />
            Leaderboard
          </button>
          <div className="flex gap-2">
            <button
              
              className="w-full py-4 rounded-full bg-[#2A9D8F] text-white font-black text-base uppercase tracking-widest hover:bg-[#1E8A7C] transition-colors shadow-md"
            >  <Link
                href={"/"}
                aria-label="Home"
              >
              Home</Link>
            </button>
            <button
              onClick={onRetry}
              className="w-full py-4 rounded-full bg-[#2A9D8F] text-white font-black text-base uppercase tracking-widest hover:bg-[#1E8A7C] transition-colors shadow-md"
            >
              Retry
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
