"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import type { Band } from "@/content/signature";
import { Button } from "@/components/ui/Button";

export function SignatureBand({ band, className }: { band: Band; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isFeature = !!band.feature;

  // 0 = band just entering from the bottom, 1 = band centred in the viewport
  const { scrollYProgress: raw } = useScroll({ target: ref, offset: ["start 0.95", "center 0.5"] });
  const p = useTransform(raw, (v) => (reduce ? 1 : v));

  // Photo drift (separate, full-pass range)
  const { scrollYProgress: pass } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(pass, [0, 1], ["-8%", "8%"]);

  // Label journey: bottom-left → centre, small → large
  const left = useTransform(p, [0, 1], [isDesktop ? "25%" : "8%", "50%"]);
  const top = useTransform(p, [0, 1], ["88%", "50%"]);
  const x = useTransform(p, [0, 1], ["0%", "-50%"]);
  const fontSize = useTransform(p, [0, 1], [17, isDesktop ? 64 : 30]);

  const lineScale = useTransform(p, [0, 0.4], [1, 0]);
  const smallOpacity = useTransform(p, [0.35, 0.65], [1, 0]);
  const titleOpacity = useTransform(p, [0.45, 0.8], [0, isFeature ? 0 : 1]);
  const groupOpacity = useTransform(p, [0.5, 0.8], [1, isFeature ? 0 : 1]);
  const shade = useTransform(p, [0.4, 1], [0, 0.25]);

  // Feature circle (middle band)
  const circleScale = useTransform(p, [0.3, 0.9], [0.55, 1]);
  const circleOpacity = useTransform(p, [0.3, 0.6], [0, 1]);
  const scriptClip = useTransform(p, [0.6, 1], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const ctaOpacity = useTransform(p, [0.8, 1], [0, 1]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", band.height, className)}>
      {/* Photo */}
      <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={reduce ? undefined : { y: imageY }}>
        <Image src={band.image.src} alt={band.image.alt} fill sizes="100vw" className="object-cover" />
      </motion.div>
      <motion.div aria-hidden className="absolute inset-0 bg-black" style={{ opacity: shade }} />

      {/* Grid lines (thirds) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute inset-y-0 left-1/3 w-px bg-ink/70" />
        <span className="absolute inset-y-0 left-2/3 w-px bg-ink/70" />
      </div>

      {/* Travelling label → title */}
      <motion.div
        className="absolute z-20 whitespace-nowrap leading-none"
        style={{ left, top, x, y: "-50%", fontSize, opacity: groupOpacity }}
      >
        <motion.span
          aria-hidden
          className="absolute right-full top-1/2 mr-3 hidden h-0.5 w-14 origin-right bg-ink md:block"
          style={{ scaleX: lineScale }}
        />
        <span className="grid">
          <motion.span
            aria-hidden
            className="font-sans font-medium text-ink [grid-area:1/1]"
            style={{ opacity: smallOpacity }}
          >
            {band.label}
          </motion.span>
          <motion.h3
            className="font-display text-cream [grid-area:1/1] [text-shadow:0_2px_24px_rgb(0_0_0/0.35)]"
            style={{ opacity: titleOpacity }}
          >
            {band.label}
          </motion.h3>
        </span>
      </motion.div>

      {/* Frosted feature circle */}
      {band.feature && (
        <motion.div
          className="absolute left-1/2 top-1/2 z-10 grid aspect-square h-[85%] place-items-center rounded-full bg-terracotta/55 backdrop-blur-xl md:h-full"
          style={{ x: "-50%", y: "-50%", scale: circleScale, opacity: circleOpacity }}
        >
          <div className="flex flex-col items-center">
            <motion.p
              className="-rotate-[14deg] font-script text-4xl text-white md:text-6xl xl:text-7xl"
              style={{ clipPath: scriptClip }}
            >
              {band.feature.script}
            </motion.p>
            <motion.div className="mt-10 md:mt-14" style={{ opacity: ctaOpacity }}>
              <Button href={band.feature.cta.href} variant="accent" className="md:text-base">
                {band.feature.cta.label}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}