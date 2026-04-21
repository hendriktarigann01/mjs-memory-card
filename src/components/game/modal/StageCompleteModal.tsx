import { motion } from "framer-motion";
import { StageNumber } from "@/types/game";
import { formatTime } from "@/lib/utils";

interface StageCompleteModalProps {
  completedStage: StageNumber;
  timeLeft: number;
  onNextStage: () => void;
}

export function StageCompleteModal({
  completedStage,
  timeLeft,
  onNextStage,
}: StageCompleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative bg-[#0D1F3C] border-2 border-brand-primary w-full max-w-sm flex flex-col items-center justify-center gap-8 px-8 py-10 overflow-hidden"
      >
        {/* Inner dashed border */}
        <div className="absolute inset-3 border-2 border-dashed border-brand-primary/60 pointer-events-none" />

        {/* Title */}
        <h2 className="relative z-10 font-mono text-3xl text-brand-primary uppercase tracking-[0.3em] text-center leading-tight">
          Stage {completedStage} Complete
        </h2>

        {/* Time display */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <p className="font-mono text-xs text-brand-primary/60 uppercase tracking-widest">
            Time Left
          </p>
          <div className="px-10 py-3 border border-brand-primary/40 bg-brand-primary/10">
            <span className="font-mono text-2xl text-brand-primary tracking-widest">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Next stage button */}
        <button
          onClick={onNextStage}
          className="relative z-10 w-full py-3 border-2 border-brand-primary bg-brand-primary/10 font-mono text-sm text-brand-primary uppercase tracking-widest hover:bg-brand-primary/20 transition-colors"
        >
          Next Stage
        </button>
      </motion.div>
    </div>
  );
}
