"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
        className="relative flex flex-col items-center justify-center w-full max-w-lg mt-20"
      >
        {/* Rabbit Mascot - Diposisikan secara absolut di atas kartu */}
        <div className="absolute -top-2 right-5 -translate-y-[85%] z-20">
          <Image
            src="/common/rabbit.webp"
            alt="Rabbit"
            width={100}
            height={100}
            priority
          />
        </div>

        {/* Card Body - Menggunakan gaya yang sama dengan modal lainnya */}
        <div className="relative bg-white border-[3px] border-[#0F5A7F] rounded-[32px] w-full flex flex-col items-center justify-center gap-8 px-10 pt-16 pb-12 z-10 shadow-xl aspect-[16/9]">
          {/* Judul Stage */}
          <h2 className="font-sans text-5xl text-[#0F5A7F] font-extrabold uppercase tracking-tight text-center leading-none">
            Stage {stage}
          </h2>

          {/* Countdown Circle - Menggunakan desain baru */}
          <div className="relative flex items-center justify-center mt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={count}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.35 }}
                // Lingkaran biru tua dengan bayangan kuat, persis seperti di desain target
                className="w-20 h-20 rounded-full bg-[#0F5A7F] flex items-center justify-center shadow-lg shadow-[#0F5A7F]/30"
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
