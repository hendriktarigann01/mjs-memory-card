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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative bg-[#0D1F3C] border-2 border-brand-primary w-full max-w-md flex flex-col items-center justify-center gap-8 px-8 py-10 overflow-hidden"
      >
        {/* Inner dashed border */}
        <div className="absolute inset-3 border-2 border-dashed border-brand-primary/60 pointer-events-none" />

        {/* Title */}
        <h2 className="relative z-10 font-mono text-3xl text-brand-primary uppercase tracking-[0.3em] text-center">
          Congratulations!
        </h2>

        {/* Stage times */}
        <div className="relative z-10 flex gap-5 justify-center w-full">
          {[
            { label: "Stage 1", value: formatTimeMs(stage1TimeMs) },
            { label: "Stage 2", value: formatTimeMs(stage2TimeMs) },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <p className="font-mono text-xs text-brand-primary/60 uppercase tracking-widest">
                {label}
              </p>
              <div className="w-full flex justify-center px-4 py-2 border border-brand-primary/40 bg-brand-primary/10">
                <span className="font-mono text-lg text-brand-primary tracking-widest">
                  {value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total time */}
        <div className="relative z-10 flex flex-col items-center gap-2 w-full">
          <p className="font-mono text-xs text-brand-primary/60 uppercase tracking-widest">
            Total Time
          </p>
          <div className="w-full flex justify-center px-10 py-3 border border-brand-primary/40 bg-brand-primary/10">
            <span className="font-mono text-2xl text-brand-primary tracking-widest">
              {formatTimeMs(totalTimeMs)}
            </span>
          </div>
        </div>

        {/* Leaderboard button */}
        <button
          onClick={onLeaderboard}
          disabled={submitting}
          className="relative z-10 flex items-center justify-center gap-3 w-full py-3 border-2 border-brand-primary bg-brand-primary/10 font-mono text-sm text-brand-primary uppercase tracking-widest hover:bg-brand-primary/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Medal className="w-4 h-4" />
          {submitting ? "Submitting…" : "Leaderboard"}
        </button>
      </motion.div>
    </div>
  );
}
