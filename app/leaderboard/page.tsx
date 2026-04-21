"use client";
export const dynamic = "force-dynamic";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RefreshCw, ArrowLeft } from "lucide-react";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useLayoutVariant } from "@/hooks/useLayoutVariant";
import { PodiumPlayer } from "@/components/leaderboard/PodiumPlayer";
import { RankRow } from "@/components/leaderboard/RankRow";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LeaderboardEntry } from "@/types/game";

// ── Leaderboard content ───────────────────────────────────────

interface LeaderboardContentProps {
  entries: LeaderboardEntry[];
  layout: "default" | "signage";
}

function LeaderboardContent({ entries, layout }: LeaderboardContentProps) {
  if (entries.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-gray-400 font-semibold">
        No scores yet. Be the first!
      </div>
    );
  }

  const [first, second, third, ...rest] = entries;

  const podium = (
    <div className="flex items-end justify-center">
      {third && <PodiumPlayer entry={third} rank={3} />}
      {first && <PodiumPlayer entry={first} rank={1} />}
      {second && <PodiumPlayer entry={second} rank={2} />}
    </div>
  );

  const rankList = rest.length > 0 && (
    <div className="space-y-2">
      {rest.map((entry, i) => (
        <RankRow key={entry.id} entry={entry} rank={i + 4} />
      ))}
    </div>
  );

  if (layout === "signage") {
    return (
      <div className="flex items-stretch gap-16">
        <div className="flex-1 flex flex-col justify-end">{podium}</div>
        <div className="flex-1 flex flex-col justify-center gap-2 pt-4">
          {rankList}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {podium}
      {rankList}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────

export default function LeaderboardPage() {
  const router = useRouter();
  const variant = useLayoutVariant();
  const { leaderboard, loading, refetch } = useLeaderboard();

  const handlePlayAgain = () => router.push("/");

  // ── Desktop: landscape 1920×1080 ─────────────────────────────
  if (variant === "desktop") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col justify-center items-center px-16 py-6 gap-8">
          <div className="flex items-center">
            <div className="flex gap-2 border-[3px] border-brand-primary rounded-full px-16 py-4 shadow-[0_4px_0_0_#3BBFB0]">
              <Link
                href="/"
                className="p-2 rounded-full hover:bg-brand-primary-light text-brand-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-4xl font-black text-brand-primary tracking-widest uppercase">
                Leaderboard
              </h1>
              <button
                onClick={refetch}
                className="p-2 rounded-full hover:bg-brand-primary-light text-brand-primary transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {loading ? (
                <div className="flex items-center justify-center py-16 text-brand-primary font-semibold">
                  Loading leaderboard…
                </div>
              ) : (
                <LeaderboardContent entries={leaderboard} layout="signage" />
              )}
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ── Signage: portrait 1080×1920 ──────────────────────────────
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6 max-w-lg mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="border-2 border-brand-primary rounded-full px-10 py-3">
            <h1 className="text-2xl font-black text-brand-primary tracking-widest uppercase">
              Leaderboard
            </h1>
          </div>
          <button
            onClick={refetch}
            className="p-2 rounded-full hover:bg-brand-primary-light text-brand-primary transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full"
        >
          {loading ? (
            <div className="flex items-center justify-center py-16 text-brand-primary font-semibold">
              Loading leaderboard…
            </div>
          ) : (
            <LeaderboardContent entries={leaderboard} layout="default" />
          )}
        </motion.div>
        <button
          onClick={handlePlayAgain}
          className="px-14 py-4 rounded-full bg-brand-primary text-white font-black uppercase tracking-widest text-lg shadow-md hover:bg-brand-primary transition-colors"
        >
          Play Again
        </button>
      </main>
      <Footer />
    </div>
  );
}
