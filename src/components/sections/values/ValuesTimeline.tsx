"use client";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  title: string;
  subtitle: string;
  text: string;
  tags?: readonly string[];
};

function NodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" aria-hidden className={cn("size-full", className)}>
      <circle cx="9" cy="9" r="9" fill="currentColor" />
      <path
        d="M5.5 9.5 Q9 13 12.5 9.5"
        fill="none"
        stroke="var(--color-background)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TimelineRow({
  item,
  index,
  total,
  progress,
  reduce,
}: {
  item: TimelineItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const fill = useTransform(progress, [start, end], [0, 1]);
  const nodeOn = useTransform(progress, [start - 0.02, start], [0, 1]);
  const nodeScale = useTransform(nodeOn, [0, 1], [0.6, 1]);
  const opacity = useTransform(progress, [start - 0.06, start], [0.35, 1]);

  return (
    <li className="grid grid-cols-[18px_1fr] gap-x-8 lg:gap-x-[46px]">
      <div className="flex flex-col items-center">
        <span className="relative size-[18px] shrink-0">
          <NodeIcon className="absolute inset-0 text-white/45" />
          <motion.span
            className="absolute inset-0"
            style={reduce ? undefined : { opacity: nodeOn, scale: nodeScale }}
          >
            <NodeIcon className="text-gold" />
          </motion.span>
        </span>
        <span className="relative mb-2 mt-2 w-[3px] flex-1 overflow-hidden rounded-full bg-white/35">
          <motion.span
            className="absolute inset-0 origin-top bg-gold"
            style={reduce ? undefined : { scaleY: fill }}
          />
        </span>
      </div>

      <motion.div className="pb-14 pt-7 lg:pb-[70px]" style={reduce ? undefined : { opacity }}>
        <h3 className="font-display text-2xl text-gold xl:text-[26px]">{item.title}</h3>
        <p className="mt-3 text-lg text-white xl:text-xl">{item.subtitle}</p>
        <p className="mt-5 max-w-[620px] text-base leading-snug text-cream/85 xl:text-[17px]">{item.text}</p>
        {item.tags && item.tags.length > 0 && (
          <p className="mt-6 font-display text-sm uppercase tracking-[0.2em] text-white/85">
            {item.tags.join(" · ")}
          </p>
        )}
      </motion.div>
    </li>
  );
}

export function ValuesTimeline({ items }: { items: readonly TimelineItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.65", "end 0.65"] });

  return (
    <ol ref={ref}>
      {items.map((item, i) => (
        <TimelineRow
          key={item.title}
          item={item}
          index={i}
          total={items.length}
          progress={scrollYProgress}
          reduce={reduce}
        />
      ))}
    </ol>
  );
}