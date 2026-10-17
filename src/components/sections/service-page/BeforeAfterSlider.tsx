"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { ease } from "@/lib/motion";

type Img = { src: string; alt: string };
type Props = { before: Img; after: Img; label: string; sizes: string };

const clamp = (v: number) => Math.min(100, Math.max(0, v));
const CLOSED = "inset(0% 0% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";

export function BeforeAfterSlider({ before, after, label, sizes }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show = reduce || inView;

  const pos = useMotionValue(50);
  const [value, setValue] = useState(50);
  const demo = useRef<AnimationPlaybackControls | null>(null);
  const touched = useRef(false);
  const dragging = useRef(false);

  useEffect(() => pos.on("change", (v) => setValue(Math.round(v))), [pos]);

  useEffect(() => {
    if (!inView || reduce || touched.current) return;
    demo.current = animate(pos, [50, 28, 72, 50], { duration: 2.6, ease: "easeInOut", delay: 1.3 });
    return () => demo.current?.stop();
  }, [inView, reduce, pos]);

  const clip = useTransform(pos, (v) => `inset(0% ${100 - v}% 0% 0%)`);
  const left = useTransform(pos, (v) => `${v}%`);

  const takeOver = () => {
    touched.current = true;
    demo.current?.stop();
  };

  const setFromX = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    pos.set(clamp(((clientX - r.left) / r.width) * 100));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5;
    let v = pos.get();
    if (e.key === "ArrowLeft") v -= step;
    else if (e.key === "ArrowRight") v += step;
    else if (e.key === "Home") v = 0;
    else if (e.key === "End") v = 100;
    else return;
    e.preventDefault();
    takeOver();
    animate(pos, clamp(v), { duration: 0.3, ease: ease.out });
  };

  return (
    // Outer box: never clipped. Gives the size, is watched for "in view", handles dragging
    <div
      ref={ref}
      className="relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none bg-[#e8e2d9] md:aspect-[960/488]"
      onPointerDown={(e) => {
        takeOver();
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      {/* Inner layer: the curtain reveal */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ clipPath: reduce ? OPEN : CLOSED }}
        animate={{ clipPath: show ? OPEN : CLOSED }}
        transition={{ duration: 1.2, ease: ease.inOut }}
      >
        {/* After: underneath */}
        <Image src={after.src} alt={after.alt} fill sizes={sizes} draggable={false} className="pointer-events-none object-cover" />

        {/* Before: on top, clipped to the left of the divider */}
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <Image src={before.src} alt={before.alt} fill sizes={sizes} draggable={false} className="pointer-events-none object-cover" />
        </motion.div>

        {/* Divider */}
        <motion.div aria-hidden className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-gold/80" style={{ left }} />

        {/* Handle */}
        <motion.div
          role="slider"
          tabIndex={0}
          aria-label={`${label}: compare before and after`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={value}
          aria-valuetext={`${value}% before, ${100 - value}% after`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#250c07] text-terracotta shadow-xl outline-none transition-[scale] duration-300 hover:scale-105 focus-visible:ring-2 focus-visible:ring-gold md:size-[120px]"
          style={{ left }}
        >
          <svg viewBox="0 0 48 24" aria-hidden className="w-10 fill-none stroke-current stroke-[1.5] md:w-14">
            <path d="M10 6l-6 6 6 6M17 6l-6 6 6 6M31 6l6 6-6 6M38 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}