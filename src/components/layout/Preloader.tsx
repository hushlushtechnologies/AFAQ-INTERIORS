"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useLenis } from "lenis/react";
import { ease } from "@/lib/motion";

/* ---------- "Intro ready" signal for the rest of the site ---------- */

const IntroContext = createContext(true);
export const useIntroReady = () => useContext(IntroContext);

const STORAGE_KEY = "afaq-intro";
const TAGLINE = "Al Manzel Interior Design";

/* ---------- Preloader ---------- */

function Preloader({ onReveal }: { onReveal: () => void }) {
  const reduce = useReducedMotion();
  const lenis = useLenis();
  const [phase, setPhase] = useState<"loading" | "exit" | "done">("loading");

  const progress = useMotionValue(0);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const lineScale = useTransform(progress, [0, 100], [0, 1]);

  // Keep scrolling locked while visible
  useEffect(() => {
    if (phase !== "done") lenis?.stop();
  }, [lenis, phase]);

  useEffect(() => {
    // Already seen this session → skip instantly
    if (document.documentElement.dataset.intro === "skip") {
      setPhase("done");
      onReveal();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    let cancelled = false;

    // Crawl towards 85% while the page loads…
    const crawl = animate(progress, 85, { duration: reduce ? 0.3 : 1.6, ease: "easeOut" });

    const pageLoaded = new Promise<void>((resolve) =>
      document.readyState === "complete" ? resolve() : window.addEventListener("load", () => resolve(), { once: true }),
    );
    const fontsLoaded = document.fonts?.ready ?? Promise.resolve();
    const minTime = new Promise((r) => setTimeout(r, reduce ? 300 : 2000));
    const giveUp = new Promise((r) => setTimeout(r, 4000)); // never trap visitors

    Promise.race([Promise.all([pageLoaded, fontsLoaded, minTime]), giveUp]).then(async () => {
      if (cancelled) return;
      crawl.stop();
      // …then finish to 100% and lift the curtain
      await animate(progress, 100, { duration: reduce ? 0.2 : 0.5, ease: "easeOut" });
      if (cancelled) return;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
      setPhase("exit");
      onReveal(); // page animations start as the curtain lifts
    });

    return () => {
      cancelled = true;
      crawl.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    setPhase("done");
    document.documentElement.style.overflow = "";
    lenis?.start();
  };

  if (phase === "done") return null;
  const exiting = phase === "exit";
  const wipe = { duration: reduce ? 0.4 : 1, ease: ease.inOut };

  return (
    <div className="preloader fixed inset-0 z-[100]" aria-hidden={exiting}>
      <span role="status" className="sr-only">{exiting ? "" : "Loading Afaq Al Manzel Interiors"}</span>

      {/* Trailing terracotta curtain */}
      <motion.div
        className="absolute inset-0 bg-terracotta"
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={exiting ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
        transition={{ ...wipe, delay: reduce ? 0 : 0.15 }}
        onAnimationComplete={() => exiting && finish()}
      />

      {/* Main dark curtain */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center bg-background text-cream"
        initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
        animate={exiting ? { clipPath: "inset(0% 0% 100% 0%)" } : undefined}
        transition={wipe}
      >
        <motion.div
          className="flex flex-col items-center"
          animate={exiting ? { opacity: 0, y: -30 } : undefined}
          transition={{ duration: 0.5, ease: ease.out }}
        >
          {/* Crest */}
          <motion.div
            initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)", scale: 1.1 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
            transition={{ duration: 1.2, ease: ease.out, delay: 0.2 }}
          >
            <Image src="/images/logo-mark.svg" alt="" width={64} height={60} priority unoptimized className="h-auto w-[72px] md:w-[88px]" />
          </motion.div>

          {/* Tagline, letter by letter */}
          <p className="mt-4 flex whitespace-pre font-display text-[10px] uppercase tracking-[0.35em] text-gold md:text-xs" aria-hidden>
            {TAGLINE.split("").map((char, i) => (
              <motion.span
                key={i}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: ease.out, delay: 0.7 + i * 0.03 }}
              >
                {char}
              </motion.span>
            ))}
          </p>

          {/* Progress line */}
          <div className="mt-8 h-px w-[180px] overflow-hidden bg-cream/15 md:w-[220px]">
            <motion.div className="h-full origin-left bg-gold" style={{ scaleX: lineScale }} />
          </div>
        </motion.div>

        {/* Corner details */}
        <motion.p
          className="absolute bottom-6 left-5 text-xs uppercase tracking-[0.3em] text-cream/50 md:bottom-10 md:left-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          transition={{ duration: 0.8, delay: exiting ? 0 : 0.5 }}
        >
          Dubai · UAE
        </motion.p>
        <motion.p
          className="absolute bottom-3 right-5 font-display text-[clamp(56px,9vw,140px)] leading-none tabular-nums text-cream/90 md:bottom-6 md:right-10"
          animate={exiting ? { opacity: 0, y: 20 } : undefined}
          transition={{ duration: 0.4 }}
        >
          {counter}
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ---------- Provider: wraps the site ---------- */

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <IntroContext.Provider value={ready}>
      <Preloader onReveal={() => setReady(true)} />
      {children}
    </IntroContext.Provider>
  );
}