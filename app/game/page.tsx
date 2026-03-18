"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
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
import { StageNumber } from "@/types/game";
import { formatTime, cn } from "@/lib/utils";

// "countdown" — 3-2-1 screen shown before every stage (including the stage 1 → 2 transition)
// "win"       — player cleared both stages
// "game-over" — timer ran out
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
    <div className="w-full space-y-2">
      <p className="text-center font-bold text-gray-700 text-xl">
        Time Left:&nbsp;
        <span
          className={cn(
            "font-black",
            isWarning ? "text-red-500" : "text-gray-900",
          )}
        >
          {formatTime(timeLeft)}
        </span>
      </p>
      <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isWarning ? "bg-red-400" : "bg-[#3BBFB0]",
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
    setStage,
    setSettings,
  } = useGameStore();
  const variant = useLayoutVariant();

  const [overlay, setOverlay] = useState<OverlayKind>("countdown");
  const [finalTotalMs, setFinalTotalMs] = useState(0);
  const [stage1ElapsedMs, setStage1ElapsedMs] = useState(0);

  // Timing refs — synchronous reads inside callbacks, never stale
  const stageStartMsRef = useRef<number>(0); // Date.now() when current stage started
  const accumulatedMsRef = useRef<number>(0); // running sum of completed-stage durations
  const totalMsRef = useRef<number>(0); // final value used by WinModal + leaderboard
  const currentStageRef = useRef(currentStage);
  currentStageRef.current = currentStage;

  // ── Side-effects ────────────────────────────────────────────────────────────

  // Redirect unauthenticated visitors back to home
  useEffect(() => {
    if (!player.name) router.replace("/");
  }, [player.name, router]);

  // Keep audio manager in sync with user preference
  useEffect(() => {
    audioManager.setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  // ── Game-event handlers ─────────────────────────────────────────────────────

  const handleWin = useCallback(
    ({ stage }: { stage: StageNumber; timeLeft: number }) => {
      const elapsedMs = Date.now() - stageStartMsRef.current;
      accumulatedMsRef.current += elapsedMs;

      if (stage === 1) {
        // Record stage-1 split, advance to stage 2, then show the countdown before stage 2 starts
        setStage1ElapsedMs(elapsedMs);
        advanceStage();
        setOverlay("countdown");
      } else {
        // Stage 2 complete — surface win screen
        const total = accumulatedMsRef.current;
        totalMsRef.current = total;
        setFinalTotalMs(total);
        setOverlay("win");
      }
    },
    [advanceStage],
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

  const { addScore, isTopScore } = useLeaderboard();
  const stageConfig = STAGE_CONFIG[currentStage];

  // ── Overlay handlers ────────────────────────────────────────────────────────

  // Called when the 3-2-1 countdown finishes; starts whichever stage is current (1 or 2)
  const handleCountdownComplete = useCallback(() => {
    setOverlay(null);
    stageStartMsRef.current = Date.now();
    initializeGame(currentStageRef.current);
  }, [initializeGame]);

  // Reset all accumulated state and restart from stage 1
  const handleRetry = useCallback(() => {
    accumulatedMsRef.current = 0;
    totalMsRef.current = 0;
    setStage(1);
    setOverlay("countdown");
  }, [setStage]);

  // Persist score (if a top score) then navigate to leaderboard
  const handleGoLeaderboard = useCallback(async () => {
    const totalMs = totalMsRef.current;
    if (isTopScore(totalMs)) {
      await addScore({
        playerName: player.name,
        avatar: player.avatar,
        time_ms: totalMs,
        moves,
        stage: currentStage,
      });
    }
    router.push("/leaderboard");
  }, [isTopScore, addScore, player, moves, currentStage, router]);

  const handleSoundToggle = () =>
    setSettings({ soundEnabled: !settings.soundEnabled });

  // ── Overlay renderer ────────────────────────────────────────────────────────

  const renderOverlay = () => {
    switch (overlay) {
      case "countdown":
        return (
          <StageCountdown
            key={`countdown-${currentStage}`}
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

  // ── Render ──────────────────────────────────────────────────────────────────

  // Signage layout — portrait 1080×1920
  if (variant === "signage") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header
          showSoundToggle
          soundEnabled={settings.soundEnabled}
          onSoundToggle={handleSoundToggle}
        />
        <main className="flex-1 flex flex-col items-center justify-center px-16 py-4 gap-6">
          <div className="text-center">
            <h1 className="text-5xl font-black text-[#3BBFB0] tracking-wider uppercase">
              Memory Games
            </h1>
            <h2 className="text-2xl font-bold text-gray-600 mt-1 uppercase tracking-widest">
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
        </main>
        <Footer />
        {renderOverlay()}
      </div>
    );
  }

  // Default layout — desktop / mobile
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        showSoundToggle
        soundEnabled={settings.soundEnabled}
        onSoundToggle={handleSoundToggle}
      />
      <main className="flex-1 flex flex-col items-center justify-center px-10 py-6 gap-6">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#3BBFB0] tracking-wider uppercase">
            Memory Games
          </h1>
          <h2 className="text-lg font-bold text-gray-600 mt-1 uppercase tracking-widest">
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
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors font-semibold text-sm"
        >
          <Home className="w-4 h-4" />
          Back to Menu
        </button>
      </main>
      <Footer />
      {renderOverlay()}
    </div>
  );
}
