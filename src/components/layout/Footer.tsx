import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "px-6 pb-5 text-xs font-light text-brand-primary uppercase tracking-widest",
        "text-center",
        className,
      )}
    >
      By MJ Solution Indonesia
    </footer>
  );
}
