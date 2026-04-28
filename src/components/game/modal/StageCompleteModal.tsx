import Image from "next/image";
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
        <div className="relative bg-white border-[3px] border-[#0F5A7F] rounded-[32px] w-full flex flex-col items-center gap-6 px-8 pt-12 pb-10 z-10 shadow-xl">
          {/* Layout dari image_1.png */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-sans text-4xl text-[#0F5A7F] font-extrabold uppercase tracking-tight">
              STAGE {completedStage}
            </h2>
            {/* Circle Badge untuk angka panggung */}
            <div className="w-12 h-12 rounded-full bg-[#0F5A7F] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {completedStage}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1.5 w-full">
            <p className="font-sans text-xs text-[#0F5A7F] font-bold uppercase">
              Time Left
            </p>
            <div className="w-full flex justify-center py-2.5 rounded-full bg-[#D1EAF8] border border-[#0F5A7F]">
              <span className="font-sans text-xl text-[#0F5A7F] font-bold">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <button
            onClick={onNextStage}
            className="w-full py-4 rounded-full border-[3px] border-[#0F5A7F] bg-[#BBE2F7] font-sans text-base text-[#0F5A7F] font-extrabold uppercase hover:bg-[#A9D8F2] transition-colors"
          >
            Next Stage
          </button>
        </div>
      </motion.div>
    </div>
  );
}
