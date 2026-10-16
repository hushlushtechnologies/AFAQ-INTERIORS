"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

type Props = { paragraphs: readonly string[]; className?: string; from?: number };

export function ScrollRevealText({ paragraphs, className, from = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  if (reduce) {
    return (
      <div className={className}>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    );
  }

  const split = paragraphs.map((p) => p.split(" "));
  const total = split.reduce((n, w) => n + w.length, 0);
  const offsets = split.map((_, i) => split.slice(0, i).reduce((n, w) => n + w.length, 0));

  return (
    <div ref={ref} className={className}>
      {split.map((words, pi) => (
        <p key={pi}>
          {words.map((word, wi) => {
            const i = offsets[pi] + wi;
            return (
              <Word key={wi} progress={scrollYProgress} range={[i / total, (i + 1) / total]} from={from}>
                {word}
              </Word>
            );
          })}
        </p>
      ))}
    </div>
  );
}

function Word({ children, progress, range, from }: {
  children: string; progress: MotionValue<number>; range: [number, number]; from: number;
}) {
  const opacity = useTransform(progress, range, [from, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}