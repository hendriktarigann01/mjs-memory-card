import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

/**
 * Shared button component.
 *
 * Variants:
 *   primary  — teal fill, white text  (main CTA)
 *   secondary — darker teal fill      (secondary CTA)
 *   outline  — teal border + text     (tertiary action)
 *   ghost    — no border, subtle hover (nav / icon buttons)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base
          "inline-flex items-center justify-center rounded-full font-bold",
          "uppercase tracking-wider transition-all duration-200",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          "active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50",

          // Variants
          variant === "primary" && [
            "bg-brand-primary text-white shadow-md",
            "hover:bg-brand-primary hover:shadow-lg",
          ],
          variant === "secondary" && [
            "bg-brand-primary text-white shadow-md",
            "hover:bg-[#1E8A7C] hover:shadow-lg",
          ],
          variant === "outline" && [
            "border-2 border-brand-primary text-brand-primary bg-transparent",
            "hover:bg-brand-primary-light",
          ],
          variant === "ghost" && [
            "text-gray-500 bg-transparent",
            "hover:bg-gray-100 hover:text-gray-700",
          ],

          // Sizes
          size === "sm" && "px-5 py-2 text-xs",
          size === "md" && "px-8 py-3 text-sm",
          size === "lg" && "px-10 py-4 text-base",

          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
