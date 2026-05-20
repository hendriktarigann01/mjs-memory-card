import { memo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getCardImageSrc } from "@/constants/gameImages";
import { CardImageId } from "@/types/game";

interface CardProps {
  id: string;
  imageId: CardImageId;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: (cardId: string) => void;
  size?: "default" | "signage";
}

export const Card = memo(function Card({
  id,
  imageId,
  isFlipped,
  isMatched,
  onClick,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  size = "default",
}: CardProps) {
  return (
    <motion.div
      layoutId={id}
      onClick={() => onClick(id)}
      className={cn(
        "relative w-full aspect-square cursor-pointer select-none",
        isMatched && "cursor-default",
      )}
      whileHover={!isFlipped && !isMatched ? { scale: 1.04 } : {}}
      whileTap={!isFlipped && !isMatched ? { scale: 0.96 } : {}}
    >
      {/* 3-D flip container */}
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{
          duration: 0.35,
          type: "spring",
          stiffness: 200,
          damping: 20,
        }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* ── Card Back ─────────────────────────────────────── */}
        <div
          className="relative w-full h-full bg-brand-primary flex items-center justify-center overflow-hidden rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/in-lite.webp"
              alt="Logo Card"
              fill
              className="object-contain p-12"
              priority
            />
          </div>
        </div>

        {/* ── Card Front ────────────────────────────────────── */}
        <div
          className="absolute inset-0 overflow-hidden flex items-center justify-center bg-transparent"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "2px solid #972D59",
          }}
        >
          <Image
            src={getCardImageSrc(imageId)}
            alt={imageId}
            fill
            className="object-contain p-5"
          />
          {isMatched && (
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
});

Card.displayName = "Card";
