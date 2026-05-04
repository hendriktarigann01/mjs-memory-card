"use client";

import { useEffect, useState } from "react";
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative flex flex-col items-center justify-center w-full max-w-lg mt-20"
      >
        <div className="relative bg-white border-[3px] border-brand-primary rounded-[32px] w-full flex flex-col items-center justify-center gap-8 px-10 pt-16 pb-12 z-10 aspect-[16/9]">
          <h2 className="font-sans text-5xl text-brand-primary font-extrabold uppercase tracking-tight text-center leading-none">
            Stage {stage}
          </h2>

          <div className="relative flex items-center justify-center mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/30"
              >
                <span className="text-4xl font-extrabold text-white">
                  {count}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
