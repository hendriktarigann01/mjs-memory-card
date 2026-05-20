"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { StageNumber } from "@/types/game";

interface StageCountdownProps {
  stage: StageNumber;
  onComplete: () => void;
}

const COUNTDOWN_START = 5;

export function StageCountdown({ stage, onComplete }: StageCountdownProps) {
  const [count, setCount] = useState(COUNTDOWN_START);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#303030B2]/70 z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative flex flex-col items-center justify-center w-full max-w-lg mt-20"
      >
        <div className="absolute top-20 -right-15 -translate-y-[85%] z-20">
          <Image
            src="/card/product-1.webp"
            alt="Rabbit"
            width={220}
            height={220}
            priority
          />
        </div>
        <div className="relative border-[3px] border-white shadow-[0_6px_0_0_#FFFFFF] rounded-[32px] w-full flex flex-col items-center justify-center gap-8 px-10 pt-16 pb-12 z-10 aspect-[16/9] overflow-hidden">
          <Image
            src="/common/background-modal.webp"
            alt="Modal Background"
            fill
            priority
            className="object-cover z-0"
          />

          <h2 className="font-sans text-5xl text-white font-black uppercase tracking-widest text-center leading-none z-10">
            Stage {stage}
          </h2>

          <div className="relative flex items-center justify-center mt-2 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-24 h-24 rounded-full bg-[#624072] border-[3px] border-white shadow-[0_4px_0_0_#FFFFFF] flex items-center justify-center"
              >
                <span className="text-4xl font-black text-white">{count}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
