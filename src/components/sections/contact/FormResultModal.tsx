"use client";
import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Kind = "success" | "error";
type Props = { open: boolean; kind: Kind; message: string; onClose: () => void };

const useMounted = () => useSyncExternalStore(() => () => {}, () => true, () => false);

const copy: Record<Kind, { title: string; button: string }> = {
  success: { title: "Thank You", button: "Close" },
  error: { title: "Something Went Wrong", button: "Try Again" },
};

export function FormResultModal({ open, kind, message, onClose }: Props) {
  const mounted = useMounted();
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, lenis]);

  if (!mounted) return null;
  const isSuccess = kind === "success";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] grid place-items-center bg-background/60 p-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="form-result-title"
            aria-describedby="form-result-message"
            className="relative w-full max-w-[460px] bg-ivory px-8 pb-9 pt-10 text-center text-ink shadow-2xl"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.5, ease: ease.out }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated icon */}
            <svg viewBox="0 0 64 64" aria-hidden className="mx-auto size-16">
              <motion.circle
                cx="32"
                cy="32"
                r="29"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: ease.inOut, delay: 0.2 }}
              />
              {isSuccess ? (
                <motion.path
                  d="M20 33l8 8 16-17"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: ease.out, delay: 0.9 }}
                />
              ) : (
                <>
                  <motion.path
                    d="M32 18v18"
                    stroke="var(--color-accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.4, ease: ease.out, delay: 0.9 }}
                  />
                  <motion.circle
                    cx="32"
                    cy="45"
                    r="2.2"
                    fill="var(--color-accent)"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.2 }}
                  />
                </>
              )}
            </svg>

            <h2 id="form-result-title" className="mt-6 font-display text-3xl md:text-4xl">
              {copy[kind].title}
            </h2>
            <p id="form-result-message" className="mx-auto mt-3 max-w-[360px] text-base leading-snug md:text-lg">
              {message}
            </p>

            <button
              type="button"
              onClick={onClose}
              autoFocus
              className={cn(
                "mt-8 inline-flex min-w-[160px] cursor-pointer items-center justify-center rounded-full px-8 py-3 text-base font-medium transition-[filter,background-color,color] duration-300",
                isSuccess
                  ? "text-white [background:radial-gradient(50%_50%_at_50%_0%,rgb(255_255_255/0.25),transparent),var(--color-accent)] hover:brightness-110"
                  : "border border-accent text-accent hover:bg-accent hover:text-white",
              )}
            >
              {copy[kind].button}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}