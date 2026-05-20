import { motion } from "framer-motion";
import { formatTimeMs } from "@/lib/utils";

interface WinModalProps {
  stage1TimeMs: number;
  stage2TimeMs: number;
  totalTimeMs: number;
  onLeaderboard: () => void;
  submitting?: boolean;
}

const TimeDisplay = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center gap-1.5 flex-1">
    <p className="font-sans text-xs text-brand-primary font-bold uppercase tracking-wide">
      {label}
    </p>
    <div className="flex items-center justify-center gap-3 w-full mt-2 py-3 rounded-full bg-white border-[3px] border-brand-primary shadow-[0_4px_0_0_#191B34] font-sans text-lg text-brand-primary font-extrabold uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed">
      <span className="font-sans text-lg text-brand-primary font-extrabold tracking-widest">
        {value}
      </span>
    </div>
  </div>
);

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
        className="relative flex flex-col items-center justify-center w-full max-w-lg mt-24"
      >
        {/* Kartu Utama */}
        <div className="relative bg-white border-[3px] border-brand-primary rounded-[32px] w-full flex flex-col items-center justify-center gap-6 px-10 pt-12 pb-10 z-10">
          <h2 className="font-sans text-3xl text-brand-primary font-bold uppercase tracking-tight text-center">
            Congratulations!
          </h2>

          <div className="flex gap-4 justify-center w-full">
            <TimeDisplay label="Stage 1" value={formatTimeMs(stage1TimeMs)} />
            <TimeDisplay label="Stage 2" value={formatTimeMs(stage2TimeMs)} />
          </div>

          <div className="w-full">
            <TimeDisplay label="Total Time" value={formatTimeMs(totalTimeMs)} />
          </div>

          <motion.button
            onClick={onLeaderboard}
            disabled={submitting}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-3 w-full mt-2 py-3 rounded-full bg-white border-[3px] border-brand-primary shadow-[0_4px_0_0_#191B34] font-sans text-lg text-brand-primary font-extrabold uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"></path>
              <path d="m15 11 1 10-4-2.5-4 2.5 1-10"></path>
            </svg>
            {submitting ? "Submitting…" : "View Leaderboard"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
