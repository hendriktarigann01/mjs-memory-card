import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface HeaderProps {
  showSoundToggle?: boolean;
  soundEnabled?: boolean;
  onSoundToggle?: () => void;
  className?: string;
}

export function Header({
  showSoundToggle = false,
  soundEnabled = true,
  onSoundToggle,
  className,
}: HeaderProps) {
  const pathname = usePathname();
  return (
    <header
      className={cn(
        "flex items-center z-20 justify-between px-6 pt-6 md:px-10 md:pt-8",
        className,
      )}
    >
      <div className="flex gap-5">
        <Link href="/" aria-label="Home">
          <Image
            src="/mjs_logo_text.png"
            width={120}
            height={48}
            alt="MJ Solution Indonesia"
            className="h-10 w-auto md:h-14"
            priority
          />
        </Link>
        <Link href="/" aria-label="Home">
          <Image
            src="/arch_id.png"
            width={120}
            height={48}
            alt="Arch ID"
            className="h-10 w-auto md:h-14"
            priority
          />
        </Link>
      </div>

      {/* Sound toggle (optional) */}
      {showSoundToggle && onSoundToggle && (
        <button
          onClick={onSoundToggle}
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          className="p-2 rounded-full hover:bg-brand-primary-light text-brand-primary transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}
      {pathname === "/leaderboard" && (
        <Link
          href="https://mjs-spin-wheel.vercel.app/"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/30 transition"
        >
          Spin Wheel
        </Link>
      )}
    </header>
  );
}
