import Image from "next/image";
import Link from "next/link";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

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
  return (
    <header
      className={cn(
        "flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8",
        className,
      )}
    >
      {/* Logo — links back to home */}
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

      {/* Sound toggle (optional) */}
      {showSoundToggle && onSoundToggle && (
        <button
          onClick={onSoundToggle}
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
          className="p-2 rounded-full hover:bg-[#E0F5F2] text-[#3BBFB0] transition-colors"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </button>
      )}
    </header>
  );
}
