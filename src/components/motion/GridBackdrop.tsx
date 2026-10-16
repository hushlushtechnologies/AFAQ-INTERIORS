"use client";
import { motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

// One line every --cell (the column width), drawn with a repeating gradient: no extra elements needed
const lines =
  "repeating-linear-gradient(to bottom, color-mix(in srgb, var(--color-terracotta) 30%, transparent) 0 1px, transparent 1px var(--cell))";

export function GridBackdrop() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden lg:block"
      style={{ backgroundImage: lines }}
      initial={reduce ? false : { clipPath: "inset(0% 100% 0% 0%)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1.6, ease: ease.inOut, delay: 0.2 }}
    />
  );
}