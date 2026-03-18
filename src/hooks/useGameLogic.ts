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
  onWin: (payload: { stage: StageNumber; timeLeft: number }) => void;
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

  // Keep callbacks fresh without re-triggering effects
  const onWinRef = useRef(onWin);
  const onGameOverRef = useRef(onGameOver);
  useEffect(() => {
    onWinRef.current = onWin;
  });
  useEffect(() => {
    onGameOverRef.current = onGameOver;
  });

  // Stage ref — always reflects latest value inside async closures
  const stageRef = useRef(currentStage);
  const timeLeftRef = useRef(0);
  useEffect(() => {
    stageRef.current = currentStage;
  }, [currentStage]);
  useEffect(() => {
    timeLeftRef.current = timeLeft;
  }, [timeLeft]);

  // ------ Initialize ----------------------------------------

  const initializeGame = useCallback(
    (stage: StageNumber = currentStage) => {
      const config = STAGE_CONFIG[stage];
      // Randomly pick `pairs` images from the full pool each game
      const selected = shuffleArray([...CARD_IMAGES]).slice(0, config.pairs);
      const cardPairs = selected.flatMap((imageId, index) => [
        { id: `${index}-a`, imageId, isFlipped: false, isMatched: false },
        { id: `${index}-b`, imageId, isFlipped: false, isMatched: false },
      ]);
      setCards(shuffleArray(cardPairs));
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setTimeLeft(config.durationSeconds);
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
          setMatchedCards((prev) => [...prev, newFlipped[0], newFlipped[1]]);
          setFlippedCards([]);
        } else {
          if (settings.soundEnabled)
            setTimeout(() => audioManager.play("wrong"), 300);
          setTimeout(() => setFlippedCards([]), FLIP_DELAY_MS);
        }
      }
    },
    [isPlaying, flippedCards, matchedCards, cards, settings.soundEnabled],
  );

  // ------ Win condition -------------------------------------

  useEffect(() => {
    if (!isPlaying) return;
    if (matchedCards.length === 0 || matchedCards.length !== cards.length)
      return;

    setIsPlaying(false);
    if (settings.soundEnabled) setTimeout(() => audioManager.play("win"), 500);

    // Pass only stage — timing is measured in game page via Date.now()
    onWinRef.current({
      stage: stageRef.current,
      timeLeft: timeLeftRef.current,
    });
  }, [matchedCards, cards, isPlaying, settings.soundEnabled]);

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
