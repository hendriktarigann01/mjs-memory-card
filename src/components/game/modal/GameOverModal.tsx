import Link from "next/link";
import { motion } from "framer-motion";
import { formatTime } from "@/lib/utils";
import Image from "next/image";

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
    <div className="fixed inset-0 bg-[#303030B2]/70 z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative flex flex-col items-center justify-center w-full max-w-lg"
      >
        {/* Card Body */}
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
            Game Over
          </h2>

          <div className="flex flex-col items-center gap-2 w-full max-w-[400px] z-10">
            <p className="font-sans text-xl text-white font-bold uppercase tracking-widest">
              Time Used
            </p>
            <div className="w-full min-h-12 flex items-center justify-center py-2.5 rounded-full bg-[#624072] border-[2px] border-white shadow-[0_3px_0_0_#FFFFFF]">
              <span className="font-sans text-lg text-white font-extrabold tracking-widest">
                {formatTime(timeUsed)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-8 w-full max-w-[400px] z-10">
            <motion.button
              onClick={onLeaderboard}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex min-h-12 items-center justify-center gap-3 w-full py-2.5 rounded-full bg-[#624072] border-[2px] border-white shadow-[0_4px_0_0_#FFFFFF] font-sans text-base text-white font-extrabold uppercase tracking-widest transition-all"
            >
              Leaderboard
            </motion.button>
            <div className="flex gap-3 w-full">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-1/2"
              >
                <Link
                  href="/"
                  className="flex min-h-12 items-center justify-center w-full py-2.5 rounded-full bg-[#624072] border-[2px] border-white shadow-[0_4px_0_0_#FFFFFF] font-sans text-base text-white font-extrabold uppercase tracking-widest transition-all"
                >
                  Home
                </Link>
              </motion.div>
              <motion.button
                onClick={onRetry}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="w-1/2 min-h-12 py-2.5 rounded-full bg-[#624072] border-[2px] border-white shadow-[0_4px_0_0_#FFFFFF] font-sans text-base text-white font-extrabold uppercase tracking-widest transition-all"
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
