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

export function GameBoard({
  cards,
  flippedCards,
  matchedCards,
  onCardClick,
  variant = "default",
}: GameBoardProps) {
  const cols = COLS[variant];

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
            isFlipped={flippedCards.includes(card.id)}
            isMatched={matchedCards.includes(card.id)}
            onClick={() => onCardClick(card.id)}
            size={variant === "signage" ? "signage" : "default"}
          />
        ))}
      </div>
    </motion.div>
  );
}
