import { useState, useEffect, useCallback, useRef } from "react";
import { Card, StageNumber } from "@/types/game";
import { useGameStore } from "@/store/gameStore";
import { shuffleArray } from "@/lib/utils";
import { audioManager } from "@/lib/audio";
import {
  STAGE_CONFIG,
  FLIP_DELAY_MS,
  HINT_DURATION_MS,
} from "@/constants/gameConfig";
import { CARD_IMAGES } from "@/constants/gameImages";

interface UseGameLogicOptions {
  onWin: (payload: { elapsedMs: number }) => void;
  onGameOver: () => void;
}

export function useGameLogic({ onWin, onGameOver }: UseGameLogicOptions) {
  const { currentStage, settings } = useGameStore();

  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const pendingWinRef = useRef(false);

  const onWinRef = useRef(onWin);
  const onGameOverRef = useRef(onGameOver);
  const timeLeftRef = useRef(timeLeft);
  const totalCardsRef = useRef(0);
  const onWinSnapshotRef = useRef(onWin);
  const stageStartMsRef = useRef<number>(0); 

  useEffect(() => {
    onWinRef.current = onWin;
  });
  useEffect(() => {
    onGameOverRef.current = onGameOver;
  });

  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // ------ Initialize ----------------------------------------

  const initializeGame = useCallback(
    (stage: StageNumber = currentStage) => {
      const config = STAGE_CONFIG[stage];
      const selected = shuffleArray([...CARD_IMAGES]).slice(0, config.pairs);
      const cardPairs = selected.flatMap((imageId, index) => [
        { id: `${index}-a`, imageId, isFlipped: false, isMatched: false },
        { id: `${index}-b`, imageId, isFlipped: false, isMatched: false },
      ]);
      const shuffled = shuffleArray(cardPairs);
      totalCardsRef.current = shuffled.length;
      setCards(shuffled);
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setTimeLeft(config.durationSeconds);
      stageStartMsRef.current = Date.now();
      setIsPlaying(true);
    },
    [currentStage],
  );

  // ------ Timer ---------------------------------------------

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          onGameOverRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // ------ Win detection — runs AFTER render, safe to call setState --------

  useEffect(() => {
    if (!pendingWinRef.current) return;
    pendingWinRef.current = false;
    setIsPlaying(false);
    if (settings.soundEnabled) setTimeout(() => audioManager.play("win"), 500);
    onWinSnapshotRef.current({ elapsedMs: timeLeftRef.current });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchedCards]);

  // ------ Card flip -----------------------------------------

  const handleCardFlip = useCallback(
    (cardId: string) => {
      if (!isPlaying) return;
      if (flippedCards.length >= 2) return;
      if (flippedCards.includes(cardId)) return;
      if (matchedCards.includes(cardId)) return;

      const newFlipped = [...flippedCards, cardId];
      setFlippedCards(newFlipped);
      if (settings.soundEnabled) audioManager.play("flip");

      if (newFlipped.length === 2) {
        setMoves((prev) => prev + 1);
        const first = cards.find((c) => c.id === newFlipped[0]);
        const second = cards.find((c) => c.id === newFlipped[1]);

        if (first && second && first.imageId === second.imageId) {
          if (settings.soundEnabled)
            setTimeout(() => audioManager.play("match"), 300);

          const next = [...matchedCards, newFlipped[0], newFlipped[1]];
          setMatchedCards(next);
          setFlippedCards([]);

          // Capture timeLeft NOW — before any re-render can change it
          if (next.length === totalCardsRef.current) {
            timeLeftRef.current = Date.now() - stageStartMsRef.current; // real elapsed ms
            onWinSnapshotRef.current = onWin;
            pendingWinRef.current = true;
          }
        } else {
          if (settings.soundEnabled)
            setTimeout(() => audioManager.play("wrong"), 300);
          setTimeout(() => setFlippedCards([]), FLIP_DELAY_MS);
        }
      }
    },
    [
      isPlaying,
      flippedCards,
      matchedCards,
      cards,
      settings.soundEnabled,
      onWin,
    ],
  );

  // ------ Hint ----------------------------------------------

  const useHint = useCallback(() => {
    if (!isPlaying) return;
    const unmatched = cards.filter((c) => !matchedCards.includes(c.id));
    if (unmatched.length < 2) return;
    const first = unmatched[0];
    const pair = unmatched.find(
      (c) => c.id !== first.id && c.imageId === first.imageId,
    );
    if (pair) {
      setFlippedCards([first.id, pair.id]);
      setTimeout(() => setFlippedCards([]), HINT_DURATION_MS);
    }
  }, [isPlaying, cards, matchedCards]);

  return {
    cards,
    flippedCards,
    matchedCards,
    moves,
    timeLeft,
    isPlaying,
    initializeGame,
    handleCardFlip,
    useHint,
  };
}
