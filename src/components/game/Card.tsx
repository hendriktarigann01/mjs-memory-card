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
  const sizeClasses = {
    default: "w-full aspect-[1/1]",
    signage: "w-full aspect-[1/1]",
  };

  return (
    <motion.div
      layoutId={id}
      onClick={onClick}
      className={cn(
        sizeClasses[size],
        "relative cursor-pointer select-none",
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
        {/* ── Card Back ──────────────────────────────────────── */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl",
            "bg-[#E0F5F2] border border-[#A8DDD6]",
            "flex items-center justify-center",
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            src="/mjs_logo_text.png"
            width={80}
            height={80}
            alt="MJ Solution Indonesia"
            className="w-3/5 h-auto opacity-60"
            priority
          />
        </div>

        {/* ── Card Front ─────────────────────────────────────── */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl overflow-hidden",
            "flex items-center justify-center",
            isMatched
              ? "bg-[#C8EDE9] border-2 border-[#3BBFB0]"
              : "bg-white border border-[#A8DDD6]",
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src={getCardImageSrc(imageId)}
            alt={imageId}
            fill
            className="object-contain p-3"
          />

          {/* Matched shimmer overlay */}
          {isMatched && (
            <motion.div
              className="absolute inset-0 rounded-2xl bg-[#3BBFB0]/20"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
