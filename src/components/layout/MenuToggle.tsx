"use client";
import { motion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const t = { duration: 0.5, ease: ease.inOut };

type Props = { open: boolean; onToggle: () => void; color?: string };

export function MenuToggle({ open, onToggle, color = "bg-white" }: Props) {
  const line = cn("absolute left-0 h-[3px] w-full rounded-full transition-colors duration-500", color);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-menu"
      className="relative h-10 w-9 cursor-pointer md:w-11"
    >
      <motion.span className={line} style={{ top: 6 }}  animate={open ? { y: 12, rotate: 45 } : { y: 0, rotate: 0 }} transition={t} />
      <motion.span className={line} style={{ top: 18 }} animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }} transition={t} />
      <motion.span className={line} style={{ top: 30 }} animate={open ? { y: -12, rotate: -45 } : { y: 0, rotate: 0 }} transition={t} />
    </button>
  );
}