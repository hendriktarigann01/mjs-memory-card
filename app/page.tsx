"use client";
export const dynamic = "force-dynamic";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import { AvatarId } from "@/types/game";
import { getAvatarImageSrc } from "@/constants/gameImages";
import { useLayoutVariant } from "@/hooks/useLayoutVariant";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const AVATARS: AvatarId[] = [
  "profile-1",
  "profile-2",
  "profile-3",
  "profile-4",
  "profile-5",
  "profile-6",
];

// ── Avatar Grid ──────────────────────────────────────────────

interface AvatarGridProps {
  selected: AvatarId;
  onSelect: (id: AvatarId) => void;
  size?: "sm" | "lg";
}

function AvatarGrid({ selected, onSelect, size = "sm" }: AvatarGridProps) {
  const dimension = size === "lg" ? "w-20 h-20" : "w-16 h-16";

  return (
    <div className="grid grid-cols-3 gap-3">
      {AVATARS.map((id) => (
        <motion.button
          key={id}
          onClick={() => onSelect(id)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className={cn(
            "flex items-center justify-center rounded-full overflow-hidden border-4 transition-all duration-200 relative",
            dimension,
            selected === id
              ? "border-white ring-4 ring-brand-primary/40 shadow-xl"
              : "border-white/60 opacity-60 hover:opacity-90",
          )}
        >
          <Image
            src={getAvatarImageSrc(id)}
            alt={id}
            fill
            className="object-cover"
          />
        </motion.button>
      ))}
    </div>
  );
}

// ── Reusable name input ──────────────────────────────────────

interface NameInputProps {
  value: string;
  onChange: (v: string) => void;
  onEnter: () => void;
  inputClassName?: string;
}

function NameInput({
  value,
  onChange,
  onEnter,
  inputClassName,
}: NameInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={20}
      placeholder="INPUT YOUR NAME"
      className={cn(
        "w-full text-center font-black bg-brand-primary text-white rounded-full",
        "border-[4px] border-white shadow-[0_6px_0_0_#FFFFFF]",
        "uppercase tracking-[0.15em] placeholder:text-white/30 focus:outline-none",
        "transition-all",
        inputClassName,
      )}
      onKeyDown={(e) => e.key === "Enter" && value.trim() && onEnter()}
    />
  );
}

// ── Main Page ────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();
  const { player, setPlayer } = useGameStore();
  const variant = useLayoutVariant();

  const [name, setName] = useState(player.name);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>(player.avatar);

  const canPlay = useMemo(() => name.trim().length > 0, [name]);

  const handlePlayGame = useCallback(() => {
    if (!canPlay) return;
    setPlayer({ name: name.trim(), avatar: selectedAvatar });
    router.push("/game");
  }, [canPlay, name, selectedAvatar, setPlayer, router]);

  const handleViewLeaderboard = useCallback(
    () => router.push("/leaderboard"),
    [router],
  );
  // ── Digital Signage Layout (≥ 1280 px) ─────────────────────
  if (variant === "desktop") {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden">
        <Image
          src="/common/background.webp"
          alt="background"
          fill
          className="object-cover z-0"
          priority
        />

        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-16 gap-18 relative">
          {/* Title */}
          <div className="text-center flex flex-col gap-4">
            <h1
              className="text-white max-w-[720px] font-black leading-none text-center tracking-wider uppercase"
              style={{ fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)" }}
            >
              Memory Games
            </h1>
            <p
              className="text-white text-center font-black mt-2 uppercase tracking-widest"
              style={{ fontSize: "1.35rem" }}
            >
              Match all cards as fast as you can!
            </p>
          </div>

          {/* Name + Avatar side by side */}
          <div className="flex items-start gap-24">
            <div className="flex flex-col items-center gap-6">
              <label
                className="text-white uppercase tracking-[0.2em] font-black"
                style={{ fontSize: "1.35rem" }}
              >
                Enter Your Name
              </label>
              <NameInput
                value={name}
                onChange={setName}
                onEnter={handlePlayGame}
                inputClassName="w-72 h-20 text-xl font-black"
              />
            </div>

            <div className="flex flex-col items-center gap-6">
              <label
                className="text-white uppercase tracking-[0.2em] font-black"
                style={{ fontSize: "1.35rem" }}
              >
                Select Your Avatar
              </label>
              <AvatarGrid
                selected={selectedAvatar}
                onSelect={setSelectedAvatar}
                size="lg"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-6">
            <motion.button
              onClick={handlePlayGame}
              disabled={!canPlay}
              whileHover={canPlay ? { scale: 1.02 } : {}}
              whileTap={canPlay ? { scale: 0.97 } : {}}
              className={cn(
                "px-14 py-5 rounded-full font-black text-2xl uppercase tracking-[0.2em] transition-all",
                "bg-transparent border-[4px] border-white shadow-[0_6px_0_0_#FFFFFF] text-white",
                "active:translate-y-[3px] active:shadow-[0_3px_0_0_#FFFFFF]",
                !canPlay && "opacity-40 cursor-not-allowed",
              )}
            >
              Play Game
            </motion.button>

            <span className="text-white/60 font-black uppercase text-lg tracking-widest">
              or
            </span>

            <motion.button
              onClick={handleViewLeaderboard}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "flex rounded-full items-center gap-3 px-14 py-5 font-black text-2xl uppercase tracking-[0.2em] transition-all",
                "bg-transparent border-[4px] border-white shadow-[0_6px_0_0_#FFFFFF] text-white",
                "active:translate-y-[3px] active:shadow-[0_3px_0_0_#FFFFFF]",
              )}
            >
              View Leaderboard
            </motion.button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Desktop / Mobile Layout ─────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col">
      <Image
        src="/common/background.webp"
        alt="background"
        fill
        className="object-cover z-0"
        priority
      />

      <Header />
      <main className="flex-1 flex flex-col z-20 items-center justify-center px-6 gap-14 py-10">
        {/* Title */}
        <div className="text-center flex flex-col gap-4">
          <h1
            className="text-white max-w-[720px] font-black leading-none text-center tracking-wider uppercase"
            style={{ fontSize: "clamp(3.5rem, 5.5vw, 5.5rem)" }}
          >
            Memory Games
          </h1>
          <p
            className="text-white text-center font-black mt-2 uppercase tracking-widest"
            style={{ fontSize: "1.35rem" }}
          >
            Match all cards as fast as you can!
          </p>
        </div>

        {/* Name input */}
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <label className="text-white uppercase tracking-[0.2em] font-black text-lg">
            Enter Your Name
          </label>
          <NameInput
            value={name}
            onChange={setName}
            onEnter={handlePlayGame}
            inputClassName="w-full h-20 text-xl font-black"
          />
        </div>

        {/* Avatar selector */}
        <div className="flex flex-col items-center gap-4">
          <label className="text-white uppercase tracking-[0.2em] font-black text-lg">
            Select Your Avatar
          </label>
          <AvatarGrid selected={selectedAvatar} onSelect={setSelectedAvatar} />
        </div>

        {/* Play button */}
        <motion.button
          onClick={handlePlayGame}
          disabled={!canPlay}
          whileHover={canPlay ? { scale: 1.02 } : {}}
          whileTap={canPlay ? { scale: 0.97 } : {}}
          className={cn(
            "w-full max-w-sm h-20 rounded-full uppercase tracking-[0.2em] font-black text-2xl transition-all",
            "bg-transparent border-[4px] border-white shadow-[0_6px_0_0_#FFFFFF] text-white",
            "active:translate-y-[3px] active:shadow-[0_3px_0_0_#FFFFFF]",
            !canPlay && "opacity-40 cursor-not-allowed",
          )}
        >
          Play Game
        </motion.button>

        <p className="text-white/60 font-black uppercase text-xl">or</p>

        {/* Leaderboard button */}
        <motion.button
          onClick={handleViewLeaderboard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "flex items-center justify-center gap-3 w-full max-w-sm h-20 rounded-full uppercase tracking-[0.2em] font-black text-2xl transition-all",
            "bg-transparent border-[4px] border-white shadow-[0_6px_0_0_#FFFFFF] text-white",
            "active:translate-y-[3px] active:shadow-[0_3px_0_0_#FFFFFF]",
          )}
        >
          View Leaderboard
        </motion.button>
      </main>
      <Footer />
    </div>
  );
}
