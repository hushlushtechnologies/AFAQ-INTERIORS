"use client";
import { useId, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { about } from "@/content/about";
import { ImageReveal } from "@/components/motion/ImageReveal";

const ARROW = "M82 72 C 84 100, 100 122, 130 118 S 180 104, 200 108";
const HEAD = "M195 102 L207 109 L195 115 Z";
const fade = "[mask-image:linear-gradient(to_bottom,black_75%,transparent)]";

export function AboutCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const enabled = isDesktop && !reduce;
  const maskId = `arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yLeft = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yRight = useTransform(scrollYProgress, [0, 1], [140, -140]);
  const yNote = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const draw = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const headOpacity = useTransform(draw, [0.9, 1], [0, 1]);

  const [left, right] = about.collage;

  return (
    <div ref={ref} className="relative mt-20 grid gap-10 md:mt-24 md:grid-cols-2 md:gap-0">
      {/* Left image: slower */}
      <motion.div style={enabled ? { y: yLeft } : undefined} className="md:mt-[168px] md:w-[71%]">
        <ImageReveal
          src={left.image}
          alt={left.alt}
          fill
          sizes="(min-width: 768px) 408px, 100vw"
          wrapperClassName={cn("aspect-[408/424]", fade)}
        />
      </motion.div>

      {/* Right image: faster */}
      <motion.div style={enabled ? { y: yRight } : undefined} className="relative md:ml-[7%] md:w-[71%]">
        <ImageReveal
          src={right.image}
          alt={right.alt}
          fill
          sizes="(min-width: 768px) 408px, 100vw"
          direction="right"
          wrapperClassName={cn("aspect-[408/425]", fade)}
        />

        {/* Handwritten note + arrow */}
        <motion.div
          aria-hidden
          style={enabled ? { y: yNote } : undefined}
          className="pointer-events-none absolute -left-[216px] -top-6 hidden h-[125px] w-[216px] lg:block"
        >
          <p className="absolute left-0 top-6 origin-bottom-left -rotate-[14deg] font-script text-2xl leading-tight text-ink">
            {about.note[0]}
            <br />
            <span className="pl-2">{about.note[1]}</span>
          </p>

          <svg viewBox="0 0 216 125" fill="none" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="216" height="125">
                <motion.path
                  d={ARROW}
                  stroke="white"
                  strokeWidth={4}
                  style={{ pathLength: enabled ? draw : 1 }}
                />
              </mask>
            </defs>
            <path
              d={ARROW}
              stroke="var(--color-accent)"
              strokeWidth={1.5}
              strokeDasharray="4 5"
              strokeLinecap="round"
              mask={`url(#${maskId})`}
            />
            <motion.path d={HEAD} fill="var(--color-accent)" style={{ opacity: enabled ? headOpacity : 1 }} />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}