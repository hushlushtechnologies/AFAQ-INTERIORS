"use client";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useLenis } from "lenis/react";
import { ease } from "@/lib/motion";

type Img = { src: string; alt: string };
type Props = { open: boolean; images: readonly Img[]; title: string; onClose: () => void };

const useMounted = () => useSyncExternalStore(() => () => {}, () => true, () => false);

export function ImageLightbox({ open, images, title, onClose }: Props) {
  const mounted = useMounted();
  const lenis = useLenis();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(0);
  const total = images.length;

  const go = useCallback(
    (d: number) => {
      setDir(d);
      setIndex((i) => (i + d + total) % total);
    },
    [total],
  );

  // Start from the first photo each time it opens
  useEffect(() => {
    if (open) {
      setIndex(0);
      setDir(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && total > 1) go(1);
      if (e.key === "ArrowLeft" && total > 1) go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, go, lenis, total]);

  if (!mounted) return null;
  const current = images[index] ?? images[0];

  const arrow = "absolute top-1/2 z-10 grid size-12 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-cream/10 text-cream transition-colors hover:bg-accent";

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          className="fixed inset-0 z-[70] flex flex-col bg-background/95 text-cream backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 md:px-10">
            <p className="font-display text-lg md:text-xl">
              {title}
              {total > 1 && <span className="ml-3 font-sans text-sm tabular-nums text-cream/60">{index + 1} / {total}</span>}
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close gallery"
              autoFocus
              className="grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-accent"
            >
              <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Photo */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={dir} mode="popLayout">
              <motion.div
                key={current.src}
                custom={dir}
                className="absolute inset-x-4 inset-y-2 md:inset-x-24 md:inset-y-6"
                variants={{
                  enter: (d: number) => ({ x: d >= 0 ? "6%" : "-6%", opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (d: number) => ({ x: d >= 0 ? "-6%" : "6%", opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: ease.out }}
                drag={total > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
              >
                <Image src={current.src} alt={current.alt} fill sizes="100vw" draggable={false} className="pointer-events-none object-contain" />
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className={`${arrow} left-3 md:left-8`}>
                  <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden><path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Next photo" className={`${arrow} right-3 md:right-8`}>
                  <svg viewBox="0 0 24 24" className="size-5 fill-none stroke-current stroke-2" aria-hidden><path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}