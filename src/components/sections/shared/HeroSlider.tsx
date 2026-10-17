"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/content/hero";
import { Container } from "@/components/ui/Container";

type Theme = "dark" | "light";
type Layout = "center" | "bottom";

type Props = {
  slides: readonly HeroSlide[];
  tagline?: string;
  eyebrow?: string;
  actions?: React.ReactNode;
  theme?: Theme;
  layout?: Layout;
  ariaLabel?: string;
  interval?: number;
};

const styles: Record<Theme, { text: string; body: string; dotIdle: string }> = {
  dark: { text: "text-cream", body: "text-white/90", dotIdle: "bg-white/80 group-hover:bg-white" },
  light: { text: "text-ink", body: "text-ink", dotIdle: "bg-ink/80 group-hover:bg-ink" },
};

const pad = (n: number) => String(n).padStart(2, "0");

export function HeroSlider({
  slides,
  tagline,
  eyebrow,
  actions,
  theme = "dark",
  layout = "center",
  ariaLabel = "Featured interiors",
  interval = 6000,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { amount: 0.3 });
  const s = styles[theme];

  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  const total = slides.length;
  const slide = slides[index];
  const kenBurns = interval / 1000 + 1.5;

  const goTo = (i: number) => {
    setStarted(true);
    setIndex(i);
  };

  useEffect(() => {
    const onChange = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  useEffect(() => {
    if (reduce || !inView || !pageVisible || total < 2) return;
    const id = window.setTimeout(() => {
      setStarted(true);
      setIndex((i) => (i + 1) % total);
    }, interval);
    return () => window.clearTimeout(id);
  }, [index, reduce, inView, pageVisible, total, interval]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const titleKey = slide.title.join("|");
  const fadeUp = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: ease.out, delay },
  });

  /* ---------- Shared pieces ---------- */

  const eyebrowEl = eyebrow && (
    <motion.p className="mb-3 text-base md:text-lg" {...fadeUp(0.5)}>
      {eyebrow}
    </motion.p>
  );

  const headlineEl = (
    <h1
      className={cn(
        "font-display leading-[1.08]",
        layout === "bottom"
          ? "text-[36px] sm:text-5xl lg:text-6xl xl:text-[72px]"
          : "text-[36px] sm:text-5xl lg:text-7xl xl:text-[88px]",
      )}
    >
      <AnimatePresence mode="wait">
        <motion.span key={titleKey} className="block" initial="hidden" animate="visible" exit="exit">
          {slide.title.map((line, li) => (
            <span key={li} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className="block"
                variants={{
                  hidden: { y: reduce ? "0%" : "110%", opacity: reduce ? 0 : 1 },
                  visible: {
                    y: "0%",
                    opacity: 1,
                    transition: { duration: 1.1, ease: ease.out, delay: (started ? 0.1 : 0.7) + li * 0.12 },
                  },
                  exit: {
                    y: reduce ? "0%" : "-110%",
                    opacity: reduce ? 0 : 1,
                    transition: { duration: 0.6, ease: ease.inOut, delay: li * 0.06 },
                  },
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </h1>
  );

  const taglineEl = tagline && (
    <p className={cn("max-w-[680px] text-lg leading-snug md:text-[22px]", s.body)}>{tagline}</p>
  );

  const dotsEl = total > 1 && (
    <div className="mt-6 flex items-center gap-4">
      <div className="flex items-center">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === index}
            className="group grid size-4 cursor-pointer place-items-center"
          >
            <span
              className={cn(
                "size-2 rounded-full transition-all duration-500",
                i === index ? "scale-125 bg-accent" : s.dotIdle,
              )}
            />
          </button>
        ))}
      </div>
      <p className="font-display text-xl tabular-nums">
        <span className="sr-only">Slide {index + 1} of {total}</span>
        <span aria-hidden className="inline-flex">
          <span className="relative inline-flex overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={index}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                exit={{ y: "-100%" }}
                transition={{ duration: 0.6, ease: ease.out }}
              >
                {pad(index + 1)}
              </motion.span>
            </AnimatePresence>
          </span>
          /{pad(total)}
        </span>
      </p>
    </div>
  );

  const actionsEl = actions && <div className="flex flex-wrap gap-4 md:gap-6">{actions}</div>;

  return (
    <section
      ref={ref}
      aria-roledescription={total > 1 ? "carousel" : undefined}
      aria-label={ariaLabel}
      className={cn("relative h-svh min-h-[640px] overflow-hidden", theme === "dark" ? "bg-background" : "bg-ivory")}
    >
      {/* ---------- Background slides ---------- */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: imageY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: ease.out }}
      >
        {slides.map((sl, i) => {
          const active = i === index;
          return (
            <motion.div
              key={sl.image}
              aria-hidden={!active}
              className="absolute inset-0"
              initial={{ opacity: i === 0 ? 1 : 0, scale: reduce ? 1 : 1.1 }}
              animate={{
                opacity: active ? 1 : 0,
                scale: reduce ? 1 : active ? 1 : 1.1,
                transition: {
                  opacity: { duration: 1.4, ease: ease.inOut },
                  scale: active ? { duration: kenBurns, ease: "easeOut" } : { duration: 0, delay: 1.4 },
                },
              }}
            >
              <Image src={sl.image} alt={sl.alt} fill priority={i === 0} sizes="100vw" quality={85} className="object-cover" />
            </motion.div>
          );
        })}
        {theme === "dark" ? (
          layout === "bottom" ? (
            // Text at the bottom → darken from the bottom up, keep the top of the photo vivid
            <>
              <div aria-hidden className="absolute inset-0 bg-black/15" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
            </>
          ) : (
            <>
              <div aria-hidden className="absolute inset-0 bg-black/25" />
              <div aria-hidden className="absolute inset-0 bg-linear-to-b from-background/85 via-background/30 to-background/60" />
            </>
          )
        ) : (
          <div
            aria-hidden
            className={cn(
              "absolute inset-0 bg-linear-to-b",
              layout === "bottom" ? "from-white/20 via-transparent to-white/55" : "from-white/30 via-transparent to-white/40",
            )}
          />
        )}
      </motion.div>

      {/* ---------- Content ---------- */}
      <motion.div
        className={cn("relative z-10 h-full", s.text)}
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        {layout === "center" ? (
          <Container className="flex h-full flex-col pb-10 pt-32 md:pb-16 xl:pb-[100px]">
            <div className="flex flex-1 items-center">
              <div className="lg:pl-[128px]">
                {eyebrowEl}
                {headlineEl}
              </div>
            </div>
            <motion.div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between" {...fadeUp(1.1)}>
              <div>
                {taglineEl}
                {dotsEl}
              </div>
              {actionsEl}
            </motion.div>
          </Container>
        ) : (
          <Container className="flex h-full flex-col justify-end pb-12 pt-32 md:pb-16 xl:pb-[100px]">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                {eyebrowEl}
                {headlineEl}
                {taglineEl && <motion.div className="mt-6" {...fadeUp(1.1)}>{taglineEl}</motion.div>}
                {dotsEl}
              </div>
              {actionsEl && <motion.div className="lg:pb-2" {...fadeUp(1.1)}>{actionsEl}</motion.div>}
            </div>
          </Container>
        )}
      </motion.div>
    </section>
  );
}