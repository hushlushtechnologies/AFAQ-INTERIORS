"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ease } from "@/lib/motion";
import { careers } from "@/content/careers";
import { Container } from "@/components/ui/Container";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { WireGlobe } from "./WireGlobe";

const { hero } = careers;

function Rise({ children, delay, reduce }: { children: React.ReactNode; delay: number; reduce: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className="inline-block whitespace-nowrap"
        initial={reduce ? false : { y: "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.2, ease: ease.out, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Pill({ src, delay, reduce }: { src: string; delay: number; reduce: boolean }) {
  return (
    <motion.span
      aria-hidden
      className="relative inline-block h-[0.77em] w-[1.8em] shrink-0 overflow-hidden rounded-full"
      initial={reduce ? false : { clipPath: "inset(0% 50% 0% 50% round 999px)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 999px)" }}
      transition={{ duration: 1.1, ease: ease.inOut, delay }}
    >
      <motion.span
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.35 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: ease.out, delay }}
      >
        <Image src={src} alt="" fill priority sizes="220px" className="object-cover" />
      </motion.span>
    </motion.span>
  );
}

export function CareersHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = !!useReducedMotion();

  // Mouse parallax (−0.5 → 0.5), smoothed with a spring
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const leftGlowX = useTransform(sx, (v) => v * 70);
  const leftGlowY = useTransform(sy, (v) => v * 50);
  const rightGlowX = useTransform(sx, (v) => v * -70);
  const rightGlowY = useTransform(sy, (v) => v * -50);
  const globeX = useTransform(sx, (v) => v * -24);
  const globeY = useTransform(sy, (v) => v * -24);

  // Scroll
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const breathe = reduce
    ? undefined
    : { scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] };

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="careers-hero-title"
      className="relative flex min-h-svh items-center overflow-hidden bg-background text-cream"
    >
      {/* ---------- Glows ---------- */}
      <div aria-hidden className="pointer-events-none absolute left-[22%] top-[48%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="size-[min(700px,80vw)] rounded-full bg-[#c4562a]/55 blur-[110px]"
          style={reduce ? undefined : { x: leftGlowX, y: leftGlowY }}
          animate={breathe}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-[20%] top-[44%] translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="size-[min(620px,75vw)] rounded-full bg-gold/45 blur-[110px]"
          style={reduce ? undefined : { x: rightGlowX, y: rightGlowY }}
          animate={breathe}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* ---------- Globe ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center">
        <motion.div style={reduce ? undefined : { x: globeX, y: globeY, scale: globeScale }}>
          <WireGlobe className="w-[min(1100px,130vw)]" />
        </motion.div>
      </div>

      {/* Fade into the next section */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-background to-transparent" />

      {/* ---------- Content ---------- */}
      <motion.div
        className="relative z-10 w-full pb-20 pt-36 md:pt-40"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <Container>
          <h1
            id="careers-hero-title"
            className="font-display text-[40px] leading-[1.05] sm:text-6xl lg:text-[92px] xl:text-[112px]"
          >
            <span className="flex flex-wrap items-center gap-x-[0.15em]">
              <Rise delay={0.4} reduce={reduce}>{hero.lines[0]}</Rise>
              <Pill src={hero.pills[0].src} delay={1.0} reduce={reduce} />
            </span>
            <span className="mt-[0.08em] flex flex-wrap items-center justify-end gap-x-[0.15em]">
              <Pill src={hero.pills[1].src} delay={1.15} reduce={reduce} />
              <Rise delay={0.6} reduce={reduce}>{hero.lines[1]}</Rise>
            </span>
          </h1>

          <motion.div
            className="mt-16 flex flex-col items-center text-center md:mt-24"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: ease.out, delay: 1.3 }}
          >
            <p className="max-w-[650px] text-lg leading-snug md:text-[22px]">{hero.body}</p>
            <div className="mt-6">
              <CopyEmailButton email={hero.email} />
            </div>
          </motion.div>
        </Container>
      </motion.div>
    </section>
  );
}