import { motion } from "framer-motion";
import Image from "next/image";
import { formatTimeMs } from "@/lib/utils";

interface WinModalProps {
  stage1TimeMs: number;
  stage2TimeMs: number;
  totalTimeMs: number;
  onLeaderboard: () => void;
  submitting?: boolean;
}

const TimeDisplay = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center gap-2 flex-1 z-10">
    <p className="font-sans text-sm text-white font-bold uppercase tracking-widest">
      {label}
    </p>
    <div className="w-full min-h-12 flex items-center justify-center py-2.5 rounded-full bg-[#624072] border-[2px] border-white shadow-[0_3px_0_0_#FFFFFF]">
      <span className="font-sans text-lg text-white font-extrabold tracking-widest">
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
    <div className="fixed inset-0 bg-[#303030B2]/70 z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative flex flex-col items-center justify-center w-full max-w-lg"
      >
        <div className="relative min-h-[450px] justify-center border-[3px] border-white rounded-[32px] w-full flex flex-col items-center gap-8 px-6 sm:px-10 pt-10 pb-8 z-10 mx-auto overflow-hidden">
          <Image
            src="/common/background-modal.webp"
            alt="Modal Background"
            fill
            priority
            sizes="(max-width: 512px) 100vw, 512px"
            className="object-cover z-0"
          />

          <h2 className="text-2xl sm:text-3xl text-white font-bold uppercase tracking-tight text-center leading-tight z-10">
            Congratulations!
          </h2>

          <div className="flex flex-col gap-8 w-full max-w-[400px] z-10">
            <div className="flex gap-4 justify-center w-full">
              <TimeDisplay label="Stage 1" value={formatTimeMs(stage1TimeMs)} />
              <TimeDisplay label="Stage 2" value={formatTimeMs(stage2TimeMs)} />
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              <p className="font-sans text-sm text-white font-bold uppercase tracking-widest">
                Total Time
              </p>
              <div className="w-full min-h-12 flex items-center justify-center py-2.5 rounded-full bg-[#624072] border-[2px] border-white shadow-[0_3px_0_0_#FFFFFF]">
                <span className="font-sans text-lg text-white font-extrabold tracking-widest">
                  {formatTimeMs(totalTimeMs)}
                </span>
              </div>
            </div>
          </div>

          <motion.button
            onClick={onLeaderboard}
            disabled={submitting}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="flex min-h-12 items-center justify-center gap-3 w-full max-w-[400px] py-2.5 rounded-full bg-[#624072] border-[2px] border-white shadow-[0_4px_0_0_#FFFFFF] font-sans text-base text-white font-extrabold uppercase tracking-widest transition-all z-10"
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
              className="w-5 h-5 text-white"
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
