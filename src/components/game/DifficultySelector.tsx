import { Difficulty } from "@/types/game";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

interface DifficultySelectorProps {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  disabled?: boolean;
}

export function DifficultySelector({
  selected,
  onSelect,
  disabled,
}: DifficultySelectorProps) {
  const difficulties: {
    value: Difficulty;
    label: string;
    description: string;
  }[] = [
    { value: "easy", label: "Easy", description: "16 Cards" },
    { value: "normal", label: "Normal", description: "24 Cards" },
    { value: "hard", label: "Hard", description: "36 Cards" },
  ];

  return (
    <div className="flex gap-3 flex-wrap justify-center">
      {difficulties.map((diff) => (
        <button
          key={diff.value}
          onClick={() => onSelect(diff.value)}
          disabled={disabled}
          className={cn(
            "px-6 py-3 rounded-xl transition-all duration-200",
            "border backdrop-blur-md",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            selected === diff.value
              ? "bg-white/20 border-white/40 scale-105"
              : "bg-white/5 border-white/10 hover:bg-white/10",
          )}
        >
          <div className="font-semibold text-white/90">{diff.label}</div>
          <div className="text-xs text-white/60 mt-1">{diff.description}</div>
        </button>
      ))}
    </div>
  );
}
