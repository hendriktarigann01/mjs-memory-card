
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /**
   * variant:
   *   default — white bg with subtle teal border (main use)
   *   teal    — light teal bg (#E0F5F2), used for stat boxes / highlights
   *   outline — transparent bg with teal border
   */
  variant?: "default" | "teal" | "outline";
}

export function GlassCard({
  children,
  className,
  variant = "default",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variant === "default" && "bg-white border border-[#A8DDD6] shadow-sm",
        variant === "teal" && "bg-[#E0F5F2] border border-[#A8DDD6]",
        variant === "outline" && "bg-transparent border-2 border-[#3BBFB0]",
        className,
      )}
    >
      {children}
    </div>
  );
}
