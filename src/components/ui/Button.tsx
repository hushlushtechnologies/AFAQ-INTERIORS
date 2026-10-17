import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "light" | "accent" | "outline" | "outlineLight";

const styles: Record<Variant, { base: string; fill: string; hoverText: string }> = {
  light:        { base: "bg-white text-accent",              fill: "bg-accent", hoverText: "group-hover:text-white" },
  accent:       { base: "bg-accent text-white",              fill: "bg-white",  hoverText: "group-hover:text-accent" },
  outline:      { base: "border border-accent text-accent",  fill: "bg-accent", hoverText: "group-hover:text-white" },
  outlineLight: { base: "border border-cream/80 text-gold",  fill: "bg-gold",   hoverText: "group-hover:text-ink" }, // ← NEW: for dark backgrounds
};

type Props = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

export function Button({ variant = "accent", className, children, ...link }: Props) {
  const s = styles[variant];
  return (
    <Link
      {...link}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full",
        "px-6 py-2.5 text-base font-medium md:px-7 md:py-3 md:text-lg",
        s.base,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500",
          "ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100",
          s.fill,
        )}
      />
      <span className={cn("relative z-10 transition-colors duration-500", s.hoverText)}>{children}</span>
    </Link>
  );
}