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
        variant === "default" && "bg-white shadow-sm",
        variant === "teal" && "bg-brand-primary-light",
        variant === "outline" && "bg-transparent border-2 border-brand-primary",
        className,
      )}
    >
      {children}
    </div>
  );
}
