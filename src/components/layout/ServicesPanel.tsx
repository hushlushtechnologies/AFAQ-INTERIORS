"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ease } from "@/lib/motion";
import { services } from "@/content/navigation";

type Props = { open: boolean; onNavigate: () => void };

export function ServicesPanel({ open, onNavigate }: Props) {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!open) setPlaying(false);
  }, [open]);

  return (
    <>
      {/* Desktop: side panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="services-panel"
            id="services-menu"
            className="absolute left-full top-1/2 z-10 hidden pl-12 lg:block xl:pl-16"
            style={{ y: "-50%" }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0, transition: { duration: 0.6, ease: ease.out } }}
            exit={{ opacity: 0, x: -10, transition: { duration: 0.3, ease: ease.inOut } }}
          >
            <motion.div
              className="flex w-[560px] gap-6 border-hairline border-white/10 bg-background/95 p-3 pl-6 shadow-2xl shadow-black/40 xl:w-[660px]"
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.8, ease: ease.inOut } }}
            >
              <ul className="flex flex-1 flex-col justify-center gap-4 py-4">
                {services.map((s, i) => (
                  <motion.li
                    key={s.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + i * 0.05, duration: 0.5, ease: ease.out } }}
                  >
                    <Link
                      href={s.href}
                      onClick={onNavigate}
                      className="group/item inline-flex items-center gap-2 text-sm text-white/80 transition-colors duration-300 hover:text-gold"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-300 group-hover/item:w-4" />
                      {s.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="relative aspect-[25/26] w-[260px] shrink-0 overflow-hidden xl:w-[300px]">
                {playing ? (
                  <video
                    src="/videos/showreel.mp4"
                    autoPlay
                    controls
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.15 }}
                      animate={{ scale: 1, transition: { duration: 1.2, ease: ease.out } }}
                    >
                      <Image
                        src="/images/menu/services-preview.jpg"
                        alt="Afaq Interiors project preview"
                        fill
                        sizes="300px"
                        className="object-cover"
                      />
                    </motion.div>
                    <button
                      type="button"
                      onClick={() => setPlaying(true)}
                      aria-label="Play showreel"
                      className="absolute left-1/2 top-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-accent text-white shadow-lg transition-transform duration-500 hover:scale-110"
                    >
                      <svg viewBox="0 0 24 24" className="ml-0.5 size-5 fill-current" aria-hidden>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile / tablet: accordion */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="services-mobile"
            id="services-menu-mobile"
            className="overflow-hidden lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: ease.inOut }}
          >
            <ul className="flex flex-col gap-3 pb-2 pl-1 pt-4">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} onClick={onNavigate} className="text-base text-white/75 transition-colors hover:text-gold">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}