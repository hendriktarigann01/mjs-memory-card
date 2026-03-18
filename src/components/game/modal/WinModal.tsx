import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { formatTimeMs } from "@/lib/utils";

interface WinModalProps {
  stage1TimeMs: number;
  stage2TimeMs: number;
  totalTimeMs: number;
  onLeaderboard: () => void;
  submitting?: boolean;
}

/**
 * Shown when the player completes Stage 2 (the final stage).
 */
export function WinModal({
  stage1TimeMs,
  stage2TimeMs,
  totalTimeMs,
  onLeaderboard,
  submitting = false,
}: WinModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="bg-white rounded-3xl border-2 border-[#3BBFB0] shadow-2xl w-full max-w-md px-5 py-6 md:px-8 md:py-10 text-center space-y-4 md:space-y-8"
      >
        <h2 className="text-xl md:text-3xl font-black text-[#3BBFB0] uppercase tracking-wider">
          Congratulations!
        </h2>

        <div className="flex gap-3 md:gap-5 justify-center">
          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
              Stage 1
            </p>
            <div className="mx-auto w-fit px-4 py-2 md:px-6 md:py-3 rounded-full bg-[#E0F5F2] border border-[#A8DDD6]">
              <span className="text-lg md:text-2xl font-black text-[#3BBFB0] tracking-widest">
                {formatTimeMs(stage1TimeMs)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
              Stage 2
            </p>
            <div className="mx-auto w-fit px-4 py-2 md:px-6 md:py-3 rounded-full bg-[#E0F5F2] border border-[#A8DDD6]">
              <span className="text-lg md:text-2xl font-black text-[#3BBFB0] tracking-widest">
                {formatTimeMs(stage2TimeMs)}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
            Total Time
          </p>
          <div className="mx-auto w-fit px-8 py-2 md:px-10 md:py-3 rounded-full bg-[#E0F5F2] border border-[#A8DDD6]">
            <span className="text-lg md:text-2xl font-black text-[#3BBFB0] tracking-widest">
              {formatTimeMs(totalTimeMs)}
            </span>
          </div>
        </div>

        <button
          onClick={onLeaderboard}
          disabled={submitting}
          className="flex items-center justify-center gap-3 w-full py-3 md:py-4 rounded-full bg-[#3BBFB0] text-white font-black text-base uppercase tracking-widest hover:bg-[#2A9D8F] transition-colors shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Medal className="w-5 h-5" />
          Leaderboard
        </button>
      </motion.div>
    </div>
  );
}
