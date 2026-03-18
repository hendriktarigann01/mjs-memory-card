"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StageNumber } from "@/types/game";

interface StageCountdownProps {
  stage: StageNumber;
  /** Called once the countdown reaches 0 and the game should begin */
  onComplete: () => void;
}

const COUNTDOWN_START = 5;

export function StageCountdown({ stage, onComplete }: StageCountdownProps) {
  const [count, setCount] = useState(COUNTDOWN_START);

  useEffect(() => {
    // Tick every second
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // Small delay so the player sees "1" before the game appears
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
        className="bg-white rounded-3xl border-2 border-[#3BBFB0] shadow-2xl w-full max-w-lg px-12 py-16 text-center space-y-10"
      >
        {/* Stage label */}
        <h2 className="text-4xl font-black text-[#3BBFB0] uppercase tracking-wider">
          Stage {stage}
        </h2>

        {/* Countdown number */}
        <div className="flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-24 h-24 rounded-full bg-[#3BBFB0] flex items-center justify-center shadow-lg"
            >
              <span className="text-4xl font-black text-white">
                {count > 0 ? count : ""}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
