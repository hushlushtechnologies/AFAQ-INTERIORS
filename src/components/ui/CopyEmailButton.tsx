"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Variant = "gold" | "outline";

const variants: Record<Variant, { base: string; fill: string; hoverText: string; status: string }> = {
  gold:    { base: "bg-gold text-ink",            fill: "bg-cream",  hoverText: "",                       status: "text-white/70" },
  outline: { base: "border border-ink text-accent", fill: "bg-accent", hoverText: "group-hover:text-white", status: "text-ink/60" },
};

type Props = {
  email: string;
  label?: string;
  subject?: string;                   // used if we fall back to opening the mail app
  variant?: Variant;
  statusPlacement?: "below" | "inline";
  className?: string;
};

export function CopyEmailButton({
  email,
  label = "Copy the Email",
  subject,
  variant = "gold",
  statusPlacement = "below",
  className,
}: Props) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const v = variants[variant];
  const inline = statusPlacement === "inline";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      const query = subject ? `?subject=${encodeURIComponent(subject)}` : "";
      window.location.href = `mailto:${email}${query}`;
    }
  };

  return (
    <div className={cn("relative", inline ? "inline-flex items-center" : "flex flex-col items-center", className)}>
      <button
        type="button"
        onClick={copy}
        className={cn(
          "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full px-7 py-3 text-base font-medium md:text-lg",
          inline && "md:py-2.5 md:text-base",
          v.base,
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 origin-bottom scale-y-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100",
            v.fill,
          )}
        />
        <span className={cn("relative z-10 block overflow-hidden transition-colors duration-500", v.hoverText)}>
          <span className="invisible">{label}</span>
          <AnimatePresence initial={false}>
            <motion.span
              key={copied ? "copied" : "idle"}
              className="absolute inset-0 text-center"
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.35, ease: ease.out }}
            >
              {copied ? "Copied!" : label}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <div
        role="status"
        aria-live="polite"
        className={
          inline
            ? "absolute left-0 top-full mt-2 whitespace-nowrap md:left-full md:top-1/2 md:ml-4 md:mt-0 md:-translate-y-1/2"
            : "mt-3 h-5"
        }
      >
        <AnimatePresence>
          {copied && (
            <motion.p
              className={cn("text-sm", v.status)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {email} copied
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}