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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pathname = usePathname();
  return (
    <header
      className={cn(
        "flex items-center z-20 justify-between px-6 pt-6 md:px-10 md:pt-8",
        className,
      )}
    >
      <div className="w-full flex items-center">
        <div className="flex gap-6 w-full">
          <Link href="/" aria-label="Home">
            <Image
              src="/mjs-white.webp"
              width={140}
              height={56}
              alt="Vision Works"
              className="h-10 w-auto md:h-14"
              priority
            />
          </Link>
          <Link href="/" aria-label="Home">
            <Image
              src="/in-lite.webp"
              width={140}
              height={56}
              alt="Inabuyer"
              className="h-10 w-auto md:h-14"
              priority
            />
          </Link>
        </div>
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
    </header>
  );
}
