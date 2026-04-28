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
        {/* Rabbit Mascot */}
        <div className="absolute -top-2 right-5 -translate-y-[85%] z-20">
          <Image
            src="/common/rabbit.webp"
            alt="Rabbit"
            width={100}
            height={100}
          />
        </div>

        {/* Card Body */}
        <div className="relative bg-white border-[3px] border-[#0F5A7F] rounded-[32px] w-full flex flex-col items-center gap-6 px-8 pt-12 pb-10 z-10">
          <h2 className="font-sans text-3xl text-[#0F5A7F] font-extrabold uppercase tracking-tight text-center">
            Game Over
          </h2>

          <div className="flex flex-col items-center gap-1.5 w-full">
            <p className="font-sans text-xs text-[#0F5A7F] font-bold uppercase">
              Time Used
            </p>
            <div className="w-full flex justify-center py-3 rounded-full bg-[#D1EAF8] border border-[#0F5A7F]">
              <span className="font-sans text-2xl text-[#0F5A7F] font-bold">
                {formatTime(timeUsed)}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <button
              onClick={onLeaderboard}
              className="flex items-center justify-center gap-3 w-full py-3 rounded-full border-[3px] border-[#0F5A7F] bg-[#BBE2F7] font-sans text-sm text-[#0F5A7F] font-extrabold uppercase hover:bg-[#A9D8F2] transition-colors"
            >
              <Medal className="w-4 h-4" />
              Leaderboard
            </button>
            <div className="flex gap-3">
              <Link
                href="/"
                className="flex items-center justify-center w-full py-3 rounded-full border-[3px] border-[#0F5A7F] bg-white font-sans text-sm text-[#0F5A7F] font-extrabold uppercase hover:bg-gray-50 transition-colors"
              >
                Home
              </Link>
              <button
                onClick={onRetry}
                className="w-full py-3 rounded-full border-[3px] border-[#0F5A7F] bg-[#BBE2F7] font-sans text-sm text-[#0F5A7F] font-extrabold uppercase hover:bg-[#A9D8F2] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
