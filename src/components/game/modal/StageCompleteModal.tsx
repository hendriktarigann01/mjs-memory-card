import { motion } from "framer-motion";
import { StageNumber } from "@/types/game";
import { formatTime } from "@/lib/utils";

interface StageCompleteModalProps {
  /** The stage the player just completed */
  completedStage: StageNumber;
  /** Time remaining on the clock when all pairs were matched */
  timeLeft: number;
  onNextStage: () => void;
}

/**
 * Shown when the player completes Stage 1 (not the final stage).
 *
 * Design spec:
 *   - Title:  STAGE {n} COMPLETE  (teal)
 *   - Label:  TIME
 *   - Value:  mm:ss pill
 *   - Button: NEXT STAGE
 */
export function StageCompleteModal({
  completedStage,
  timeLeft,
  onNextStage,
}: StageCompleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm px-8 py-10 text-center space-y-8"
      >
        {/* Title */}
        <h2 className="text-3xl font-black text-brand-primary uppercase tracking-wider leading-tight">
          Stage {completedStage} Complete
        </h2>

        {/* Time display */}
        <div className="space-y-2">
          <p className="text-sm font-bold text-gray-700 uppercase tracking-widest">
            Time
          </p>
          <div className="mx-auto w-fit px-10 py-3 rounded-full bg-brand-primary-light">
            <span className="text-2xl font-black text-brand-primary tracking-widest">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Next stage button */}
        <button
          onClick={onNextStage}
          className="w-full py-4 rounded-full bg-brand-primary text-white font-black text-base uppercase tracking-widest hover:bg-brand-primary transition-colors shadow-md"
        >
          Next Stage
        </button>
      </motion.div>
    </div>
  );
}
