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
  onClick: () => void;
  size?: "default" | "signage";
}

export function Card({
  id,
  imageId,
  isFlipped,
  isMatched,
  onClick,
  size = "default",
}: CardProps) {
  return (
    <motion.div
      layoutId={id}
      onClick={onClick}
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
          className="relative w-full h-full bg-brand-primary flex items-center justify-center overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative w-full h-full p-4 flex items-center justify-center">
            <Image
              src="/common/logo-card.webp"
              alt="Logo Card"
              fill 
              className="object-contain p-2" 
              priority
            />
          </div>
        </div>

        {/* ── Card Front ────────────────────────────────────── */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden flex items-center justify-center",
            isMatched ? "bg-[#C0E6F9]" : "bg-white",
          )}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            src={getCardImageSrc(imageId)}
            alt={imageId}
            fill
            className="object-contain"
          />

          {/* Matched shimmer overlay */}
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
}
