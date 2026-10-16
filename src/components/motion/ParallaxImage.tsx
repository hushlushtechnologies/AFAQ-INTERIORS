"use client";
import { useRef, type ComponentProps } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { ImageReveal } from "./ImageReveal";

export const FADE_BOTTOM = "[mask-image:linear-gradient(to_bottom,black_75%,transparent)]";

type Props = ComponentProps<typeof ImageReveal> & {
  speed?: number;
  className?: string;
  fade?: boolean;
  style?: React.CSSProperties;
};

export function ParallaxImage({
  speed = 80,
  className,
  fade = true,
  wrapperClassName,
  style, // ← NEW: taken out so it goes on the outer box, not the image
  ...image
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);

  return (
    <div ref={ref} className={className} style={style /* ← NEW */}>
      <motion.div className="h-full" style={isDesktop && !reduce ? { y } : undefined}>
        <ImageReveal {...image} wrapperClassName={cn(fade && FADE_BOTTOM, wrapperClassName)} />
      </motion.div>
    </div>
  );
}