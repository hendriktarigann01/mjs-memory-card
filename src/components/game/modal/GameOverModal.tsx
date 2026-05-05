import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Medal } from "lucide-react";
import { formatTime } from "@/lib/utils";

interface GameOverModalProps {
  timeUsed: number;
  onLeaderboard: () => void;
  onRetry: () => void;
}

export function GameOverModal({
  timeUsed,
  onLeaderboard,
  onRetry,
}: GameOverModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex flex-col items-center justify-center w-full max-w-sm mt-20"
      >
        {/* Card Body */}
        <div className="relative bg-white border-[3px] border-brand-primary rounded-[32px] w-full flex flex-col items-center gap-6 px-8 pt-12 pb-10 z-10">
          <h2 className="font-sans text-3xl text-brand-primary font-extrabold uppercase tracking-tight text-center">
            Game Over
          </h2>

          <div className="flex flex-col items-center gap-1.5 w-full">
            <p className="font-sans text-xs text-brand-primary font-bold uppercase">
              Time Used
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-center w-full py-3 rounded-full bg-white border-[3px] border-brand-primary shadow-[0_4px_0_0_#191B34] transition-all"
            >
              <span className="font-sans text-lg text-brand-primary font-extrabold tracking-widest">
                {formatTime(timeUsed)}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-col gap-6 w-full">
            <motion.button
              onClick={onLeaderboard}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full bg-white border-[3px] border-brand-primary shadow-[0_4px_0_0_#191B34] font-sans text-md text-brand-primary font-extrabold uppercase tracking-widest transition-all"
            >
              <Medal className="w-5 h-5" />
              Leaderboard
            </motion.button>
            <div className="flex gap-3">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full"
              >
                <Link
                  href="/"
                  className="flex items-center justify-center w-full py-3 rounded-full bg-white border-[3px] border-brand-primary shadow-[0_4px_0_0_#191B34] font-sans text-md text-brand-primary font-extrabold uppercase tracking-widest transition-all"
                >
                  Home
                </Link>
              </motion.div>
              <motion.button
                onClick={onRetry}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-3 rounded-full bg-white border-[3px] border-brand-primary shadow-[0_4px_0_0_#191B34] font-sans text-md text-brand-primary font-extrabold uppercase tracking-widest transition-all"
              >
                Retry
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
