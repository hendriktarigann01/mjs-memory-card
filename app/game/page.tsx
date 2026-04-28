"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useLayoutVariant } from "@/hooks/useLayoutVariant";
import { audioManager } from "@/lib/audio";
import { GameBoard } from "@/components/game/GameBoard";
import { StageCountdown } from "@/components/game/StageCountdown";
import { WinModal } from "@/components/game/modal/WinModal";
import { GameOverModal } from "@/components/game/modal/GameOverModal";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { STAGE_CONFIG } from "@/constants/gameConfig";
import Image from "next/image";
import { formatTime, cn } from "@/lib/utils";

type OverlayKind = "countdown" | "win" | "game-over" | null;

// ── TimerBar ──────────────────────────────────────────────────────────────────

function TimerBar({
  timeLeft,
  totalTime,
}: {
  timeLeft: number;
  totalTime: number;
}) {
  const pct = Math.max(0, (timeLeft / totalTime) * 100);
  const isWarning = pct < 30;
  return (
    <div className="w-full space-y-3 mt-10">
      {/* Label Waktu */}
      <p className="text-center font-sans font-extrabold text-[#0F5A7F] text-xl uppercase tracking-tight">
        Time Left:&nbsp;
        <span
          className={cn(
            "font-extrabold",
            isWarning ? "text-red-500" : "text-[#0F5A7F]",
          )}
        >
          {formatTime(timeLeft)}
        </span>
      </p>

      <div className="relative w-full h-6 bg-[#D1EAF8] rounded-full border-2 border-[#0F5A7F] shadow-sm">
        <div className="absolute top-0 right-2 -translate-y-[90%] z-10">
          <Image
            src="/common/cat-full.webp"
            alt="Cat Mascot"
            width={65}
            height={65}
            className="object-contain"
          />
        </div>

        {/* Progress Fill */}
        <motion.div
          className={cn(
            "h-full rounded-full",
            isWarning ? "bg-red-500" : "bg-white",
          )}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

// ── GamePage ──────────────────────────────────────────────────────────────────

export default function GamePage() {
  const router = useRouter();
  const {
    player,
    currentStage,
    settings,
    advanceStage,
    setSettings,
    resetGame,
  } = useGameStore();
  const variant = useLayoutVariant();

  const [overlay, setOverlay] = useState<OverlayKind>("countdown");
  const [finalTotalMs, setFinalTotalMs] = useState(0);
  const [stage1ElapsedMs, setStage1ElapsedMs] = useState(0);
  const [countdownKey, setCountdownKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const accumulatedMsRef = useRef<number>(0);
  const totalMsRef = useRef<number>(0);

  // ── Side-effects ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!player.name) router.replace("/");
  }, [player.name, router]);

  useEffect(() => {
    audioManager.setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // ── Game-event handlers ───────────────────────────────────────────────────

  const handleWin = useCallback(
    ({ elapsedMs }: { elapsedMs: number }) => {
      accumulatedMsRef.current += elapsedMs;

      if (currentStage === 1) {
        setStage1ElapsedMs(elapsedMs);
        advanceStage();
        setCountdownKey((k) => k + 1);
        setOverlay("countdown");
      } else {
        const total = accumulatedMsRef.current;
        totalMsRef.current = total;
        setFinalTotalMs(total);
        setOverlay("win");
      }
    },
    [currentStage, advanceStage],
  );

  const handleGameOver = useCallback(() => setOverlay("game-over"), []);

  const {
    cards,
    flippedCards,
    matchedCards,
    moves,
    timeLeft,
    initializeGame,
    handleCardFlip,
  } = useGameLogic({ onWin: handleWin, onGameOver: handleGameOver });

  const { addScore } = useLeaderboard();
  const stageConfig = STAGE_CONFIG[currentStage];

  // ── Overlay handlers ──────────────────────────────────────────────────────

  const handleCountdownComplete = useCallback(() => {
    setOverlay(null);
    initializeGame(currentStage);
  }, [initializeGame, currentStage]);

  const handleRetry = useCallback(() => {
    resetGame();
    accumulatedMsRef.current = 0;
    totalMsRef.current = 0;
    setCountdownKey((k) => k + 1);
    setOverlay("countdown");
  }, [resetGame]);

  const handleGoLeaderboard = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    await addScore({
      playerName: player.name,
      avatar: player.avatar,
      time_ms: totalMsRef.current,
      moves,
      stage: currentStage,
    });
    resetGame();
    accumulatedMsRef.current = 0;
    totalMsRef.current = 0;
    router.push("/leaderboard");
  }, [submitting, addScore, player, moves, currentStage, resetGame, router]);

  const handleSoundToggle = () =>
    setSettings({ soundEnabled: !settings.soundEnabled });

  // ── Overlay renderer ──────────────────────────────────────────────────────

  const renderOverlay = () => {
    switch (overlay) {
      case "countdown":
        return (
          <StageCountdown
            key={countdownKey}
            stage={currentStage}
            onComplete={handleCountdownComplete}
          />
        );
      case "win":
        return (
          <WinModal
            stage1TimeMs={stage1ElapsedMs}
            stage2TimeMs={finalTotalMs - stage1ElapsedMs}
            totalTimeMs={finalTotalMs}
            onLeaderboard={handleGoLeaderboard}
            submitting={submitting}
          />
        );
      case "game-over":
        return (
          <GameOverModal
            timeUsed={stageConfig.durationSeconds - timeLeft}
            onLeaderboard={() => router.push("/leaderboard")}
            onRetry={handleRetry}
          />
        );
      default:
        return null;
    }
  };

  // ── Shared wrapper ────────────────────────────────────────────────────────

  const pageWrapper = (children: React.ReactNode) => (
    <div className="min-h-screen bg-brand-primary-dark flex flex-col relative overflow-hidden">
      <Image
        src="/common/background.png"
        alt="background"
        fill
        className="object-cover z-0"
        priority
      />
      <Header
        showSoundToggle
        soundEnabled={settings.soundEnabled}
        onSoundToggle={handleSoundToggle}
      />
      {children}
      <Footer />
      {renderOverlay()}
    </div>
  );

  // ── Digital Signage Layout ────────────────────────────────────────────────

  if (variant === "signage") {
    return pageWrapper(
      <main className="flex-1 flex flex-col items-center justify-center px-16 py-4 gap-6 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl font-light text-brand-primary tracking-wider uppercase">
            Memory Games
          </h1>
          <h2 className="text-xl font-light text-brand-primary mt-1 uppercase tracking-widest opacity-70">
            {stageConfig.label}
          </h2>
        </div>
        <div className="w-full max-w-2xl">
          <GameBoard
            cards={cards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            onCardClick={handleCardFlip}
            variant="signage"
          />
        </div>
        <div className="w-full max-w-2xl">
          <TimerBar
            timeLeft={timeLeft}
            totalTime={stageConfig.durationSeconds}
          />
        </div>
      </main>,
    );
  }

  // ── Default / Mobile Layout ───────────────────────────────────────────────

  return pageWrapper(
    <main className="flex-1 flex flex-col items-center justify-center px-10 py-6 gap-6 relative z-10">
      <div className="text-center">
        <h1 className="text-4xl font-light text-brand-primary tracking-wider uppercase">
          Memory Games
        </h1>
        <h2 className="text-lg font-light text-brand-primary mt-1 uppercase tracking-widest opacity-70">
          {stageConfig.label}
        </h2>
      </div>
      <div className="flex items-center gap-12 w-full max-w-4xl">
        <div className="flex-1">
          <GameBoard
            cards={cards}
            flippedCards={flippedCards}
            matchedCards={matchedCards}
            onCardClick={handleCardFlip}
            variant="default"
          />
        </div>
        <div className="w-56 shrink-0">
          <TimerBar
            timeLeft={timeLeft}
            totalTime={stageConfig.durationSeconds}
          />
        </div>
      </div>
    </main>,
  );
}
