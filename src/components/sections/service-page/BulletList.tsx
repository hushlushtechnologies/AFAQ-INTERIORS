"use client";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { ease, stagger } from "@/lib/motion";
import { cn } from "@/lib/utils";

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
};

export function BulletList({ items, className }: { items: readonly string[]; className?: string }) {
  const reduce = useReducedMotion();
  const rows = Math.ceil(items.length / 2);

  return (
    <motion.ul
      // Fills column 1 top-to-bottom, then column 2, like the design
      className={cn("grid auto-cols-[minmax(0,1fr)] grid-flow-col gap-x-8 gap-y-3 text-base xl:text-[17px]", className)}
      style={{ gridTemplateRows: `repeat(${rows}, auto)` }}
      variants={stagger(0.05, 0.1)}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {items.map((label, i) => (
        <motion.li key={`${label}-${i}`} variants={item} className="flex items-center gap-2.5">
          <span aria-hidden className="size-2 shrink-0 rounded-full bg-gold" />
          {label}
        </motion.li>
      ))}
    </motion.ul>
  );
}