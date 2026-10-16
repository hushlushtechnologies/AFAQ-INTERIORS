"use client";
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";

type Props = {
  lines: readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
  className?: string;
  delay?: number;
  underline?: boolean;
};

export function LineReveal({ lines, as: Tag = "h2", id, className, delay = 0, underline = false }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const show = reduce || inView;

  return (
    <Tag ref={ref} id={id} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className={underline ? "relative inline-block" : "block"}
            initial={{ y: reduce ? "0%" : "110%" }}
            animate={{ y: show ? "0%" : "110%" }}
            transition={{ duration: 1.1, ease: ease.out, delay: delay + i * 0.1 }}
          >
            {line}
            {underline && (
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-[0.12em] h-[max(2px,0.035em)] origin-left bg-current"
                initial={{ scaleX: reduce ? 1 : 0 }}
                animate={{ scaleX: show ? 1 : 0 }}
                transition={{ duration: 0.9, ease: ease.inOut, delay: delay + i * 0.1 + 0.6 }}
              />
            )}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}