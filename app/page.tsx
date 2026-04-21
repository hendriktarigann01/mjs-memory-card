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
        "w-full rounded-full text-center font-bold text-brand-primary",
        "border-[3px] border-brand-primary bg-brand-primary-light",
        "px-6 py-4 text-base",
        "focus:outline-none",
        "shadow-[0_4px_0_0_#3AAFA9]",
        "transition-all",
        "placeholder:!text-brand-primary/30",
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
      <div className="min-h-screen bg-white flex flex-col relative overflow-hidden">
        {/* Decorative wave background */}
        <div className="absolute inset-0 pointer-events-none">
          <Image
            src="/wave-background.png"
            alt="Wave Background"
            fill
            priority
            className="object-contain"
          />
        </div>

        <Header />

        <main className="flex-1 flex flex-col items-center justify-center px-16 gap-18 relative">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-6xl font-black text-brand-primary tracking-wider uppercase">
              Memory Games
            </h1>
            <p className="text-xl font-bold text-gray-600 mt-3 uppercase tracking-widest">
              Match all cards as fast as you can!
            </p>
          </div>

          {/* Name + Avatar side by side */}
          <div className="flex items-start gap-24">
            <div className="flex flex-col items-center gap-4">
              <label className="text-lg font-bold text-brand-primary uppercase tracking-widest">
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
              <label className="text-lg font-bold text-brand-primary uppercase tracking-widest">
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
                "px-14 py-4 rounded-full font-black text-xl uppercase tracking-widest",
                "bg-brand-primary text-white shadow-lg transition-all",
                !canPlay && "opacity-40 cursor-not-allowed",
              )}
            >
              Play Game
            </motion.button>

            <span className="text-gray-400 font-bold uppercase text-lg">
              or
            </span>

            <motion.button
              onClick={handleViewLeaderboard}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-3 px-14 py-4 rounded-full font-black text-xl uppercase tracking-widest bg-brand-primary text-white shadow-lg"
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
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center px-6 gap-15 py-8">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl font-black text-brand-primary tracking-wider uppercase">
            Memory Games
          </h1>
          <p className="text-sm font-bold text-gray-600 mt-2 uppercase tracking-widest">
            Match all cards as fast as you can!
          </p>
        </div>

        {/* Name input */}
        <div className="flex flex-col items-center gap-2 w-full max-w-xs">
          <label className="text-sm font-bold text-brand-primary uppercase tracking-widest">
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
          <label className="text-sm font-bold text-brand-primary uppercase tracking-widest">
            Select Your Avatar
          </label>
          <AvatarGrid selected={selectedAvatar} onSelect={setSelectedAvatar} />
        </div>

        {/* Play button */}
        <motion.button
          onClick={handlePlayGame}
          disabled={!canPlay}
          whileHover={canPlay ? { scale: 1.03 } : {}}
          whileTap={canPlay ? { scale: 0.97 } : {}}
          className={cn(
            "px-12 py-3 rounded-full font-bold text-lg uppercase tracking-widest dest bg-brand-primary border-[3px] border-brand-primary-dark shadow-[0_4px_0_0_#3AAFA9] text-white transition-all",
            !canPlay && "opacity-40 cursor-not-allowed",
          )}
        >
          Play Game
        </motion.button>

        <p className="text-gray-400 font-bold uppercase text-sm">or</p>

        {/* Leaderboard button */}
        <motion.button
          onClick={handleViewLeaderboard}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-3 px-12 py-3 rounded-full font-bold text-lg uppercase tracking-widest bg-brand-primary border-[3px] border-brand-primary-dark shadow-[0_4px_0_0_#3AAFA9] text-white transition-all"
        >
          <Trophy className="w-5 h-5" />
          View Leaderboard
        </motion.button>
      </main>

      <Footer />
    </div>
  );
}
