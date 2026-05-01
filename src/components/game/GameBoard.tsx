import { memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Card as CardType } from "@/types/game";
import { Card } from "./Card";

/**
 * Desktop:  4 cols × 3 rows (landscape, timer beside)
 * Signage:  3 cols × 4 rows (portrait-style, centered on big screen)
 */
const COLS = { default: 4, signage: 3 };

interface GameBoardProps {
  cards: CardType[];
  flippedCards: string[];
  matchedCards: string[];
  onCardClick: (cardId: string) => void;
  variant?: "default" | "signage";
}

export const GameBoard = memo(function GameBoard({
  cards,
  flippedCards,
  matchedCards,
  onCardClick,
  variant = "default",
}: GameBoardProps) {
  const cols = COLS[variant];
  const isSignage = variant === "signage";

  // O(1) lookup — re-computed only when the arrays change identity
  const flippedSet = useMemo(
    () => new Set(flippedCards),
    [flippedCards],
  );
  const matchedSet = useMemo(
    () => new Set(matchedCards),
    [matchedCards],
  );

  // Stable callback reference — avoids re-creating a closure per-card per-render
  const handleClick = useCallback(
    (cardId: string) => onCardClick(cardId),
    [onCardClick],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="w-full"
    >
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            imageId={card.imageId}
            isFlipped={flippedSet.has(card.id)}
            isMatched={matchedSet.has(card.id)}
            onClick={handleClick}
            size={isSignage ? "signage" : "default"}
          />
        ))}
      </div>
    </motion.div>
  );
});

GameBoard.displayName = "GameBoard";
