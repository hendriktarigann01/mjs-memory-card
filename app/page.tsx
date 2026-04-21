"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
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
              ? "border-brand-primary ring-2 ring-brand-primary/40"
              : "border-transparent opacity-60 hover:opacity-90",
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
      placeholder="Your name here"
      className={cn(
        "w-full text-center font-light text-brand-primary-dark",
        "bg-brand-primary",
        "px-6 py-4 text-base",
        "placeholder:!text-brand-primary-dark",
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

  const canPlay = name.trim().length > 0;

  const handlePlayGame = () => {
    if (!canPlay) return;
    setPlayer({ name: name.trim(), avatar: selectedAvatar });
    router.push("/game");
  };

  const handleViewLeaderboard = () => router.push("/leaderboard");
  // ── Digital Signage Layout (≥ 1280 px) ─────────────────────
  if (variant === "desktop") {
    return (
      <div className="min-h-screen bg-brand-primary-dark flex flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 h-full w-full 
                    bg-[linear-gradient(to_right,#002965_1px,transparent_1px),linear-gradient(to_bottom,#002965_1px,transparent_1px)] 
                    bg-[size:45px_45px]"
        ></div>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-16 gap-18 relative">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-xl font-light text-brand-primary tracking-wider uppercase">
              Memory Games
            </h1>
            <p className="text-xl font-light text-brand-primary mt-3 uppercase tracking-widest">
              Match all cards as fast as you can!
            </p>
          </div>

          {/* Name + Avatar side by side */}
          <div className="flex items-start gap-24">
            <div className="flex flex-col items-center gap-4">
              <label className="text-lg font-light text-brand-primary uppercase tracking-widest">
                Enter Your Name
              </label>
              <NameInput
                value={name}
                onChange={setName}
                onEnter={handlePlayGame}
                inputClassName="w-72 px-6 py-4 text-lg"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <label className="text-lg font-light text-brand-primary uppercase tracking-widest">
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
              whileHover={canPlay ? { scale: 1.04 } : {}}
              whileTap={canPlay ? { scale: 0.96 } : {}}
              className={cn(
                "px-14 py-4 font-light text-xl uppercase tracking-widest",
                "bg-brand-primary text-white shadow-lg transition-all",
                !canPlay && "opacity-40 cursor-not-allowed",
              )}
            >
              Play Game
            </motion.button>

            <span className="text-gray-400 font-light uppercase text-lg">
              or
            </span>

            <motion.button
              onClick={handleViewLeaderboard}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 px-14 py-4 font-light text-xl uppercase tracking-widest bg-brand-primary text-white shadow-lg"
            >
              <Trophy className="w-6 h-6" />
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
    <div className="min-h-screen bg-brand-primary-dark flex flex-col">
      <div
        className="absolute inset-0 h-full w-full 
                    bg-[linear-gradient(to_right,#002965_1px,transparent_1px),linear-gradient(to_bottom,#002965_1px,transparent_1px)] 
                    bg-[size:45px_45px]"
      ></div>
      <Header />
      <main className="flex-1 flex flex-col z-20 items-center justify-center px-6 gap-15 py-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-xl font-light text-brand-primary tracking-wider uppercase">
            Memory Games
          </h1>
          <p className="text-xl font-light text-brand-primary mt-2 uppercase tracking-widest">
            Match all cards as fast as you can!
          </p>
        </div>

        {/* Name input */}
        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <label className="text-sm font-light text-brand-primary uppercase tracking-widest">
            Enter Your Name
          </label>
          <NameInput
            value={name}
            onChange={setName}
            onEnter={handlePlayGame}
            inputClassName="w-full px-5 py-3"
          />
        </div>

        {/* Avatar selector */}
        <div className="flex flex-col items-center gap-2">
          <label className="text-sm font-light text-brand-primary uppercase tracking-widest">
            Select Your Avatar
          </label>
          <AvatarGrid selected={selectedAvatar} onSelect={setSelectedAvatar} />
        </div>

        {/* Play button */}
        <motion.button
          onClick={handlePlayGame}
          disabled={!canPlay}
          whileHover={canPlay ? { scale: 1.04 } : {}}
          whileTap={canPlay ? { scale: 0.96 } : {}}
          className={cn(
            "relative flex items-center justify-center px-14 py-4 font-mono text-xl uppercase tracking-[0.2em]",
            "bg-[#0a192f] text-brand-primary border-2 border-brand-primary transition-all",
            !canPlay ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
          )}
        >
          <div className="absolute inset-1 border-2 border-dashed border-brand-primary pointer-events-none" />

          <span className="relative">Play Game</span>
        </motion.button>

        <p className="text-gray-400 font-light uppercase text-sm">or</p>

        {/* Leaderboard button */}
        <motion.button
          onClick={handleViewLeaderboard}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="relative flex items-center justify-center px-12 py-4 
             bg-[#0a192f] text-brand-primary
             border-2 border-brand-primary
             transition-all group"
        >
          <div className="absolute inset-1 border-2 border-dashed border-brand-primarypointer-events-none" />

          <span className="relative flex items-center gap-3 font-mono text-xl tracking-[0.2em] uppercase">
            <Trophy className="w-5 h-5" />
            View Leaderboard
          </span>
        </motion.button>
      </main>

      <Footer />
    </div>
  );
}
