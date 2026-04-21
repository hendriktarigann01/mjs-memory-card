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
        className="relative bg-[#0D1F3C] border-2 border-brand-primary w-full max-w-lg aspect-[16/9] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-3 border-2 border-dashed border-brand-primary/60 pointer-events-none" />

        {/* Konten Stage */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          <h2 className="text-4xl font-mono text-brand-primary uppercase tracking-[0.3em]">
            Stage {stage}
          </h2>

          {/* Countdown Circle */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--brand-primary-rgb),0.4)]"
              >
                <span className="text-3xl font-bold text-white">{count}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
