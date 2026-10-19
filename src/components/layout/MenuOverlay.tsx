"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { legalLinks, navLinks } from "@/content/navigation";
import { Container } from "@/components/ui/Container";
import { ServicesPanel } from "./ServicesPanel";

const linkText = "font-display   text-4xl leading-tight text-foreground md:text-5xl xl:text-[56px]";

const reveal = (i: number) => ({
  initial: { y: "110%" },
  animate: { y: "0%", transition: { duration: 0.9, ease: ease.out, delay: 0.2 + i * 0.07 } },
  exit: { y: "110%", transition: { duration: 0.45, ease: ease.inOut, delay: i * 0.03 } },
});

export function MenuOverlay({ onClose }: { onClose: () => void }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <motion.div
      id="site-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      data-lenis-prevent
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-background/60 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.6, ease: ease.out } }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: ease.inOut, delay: 0.25 } }}
    >
      <nav aria-label="Main" className="flex flex-1 items-center pb-12 pt-28 md:pt-36">
        <Container>
          <ul className="group/menu flex flex-col items-start gap-4 md:gap-6 lg:pl-[120px]">
            {navLinks.map((link, i) => {
              const isServices = link.submenu === "services";

              return (
                <li
                  key={link.href}
                  className="relative transition-opacity duration-500 group-hover/menu:opacity-40 hover:opacity-100!"
                  onPointerEnter={isServices ? (e) => e.pointerType === "mouse" && setServicesOpen(true) : undefined}
                  onPointerLeave={isServices ? (e) => e.pointerType === "mouse" && setServicesOpen(false) : undefined}
                >
                                    <div className="overflow-y-clip pb-[0.15em] pr-4">
                    <motion.div {...reveal(i)}>
                      {isServices ? (
                        <button
                          type="button"
                          onClick={() => setServicesOpen((o) => !o)}
                          aria-expanded={servicesOpen}
                          aria-controls="services-menu services-menu-mobile"
                          className={cn(linkText, "inline-flex cursor-pointer items-center gap-4 md:gap-5")}
                        >
                          {link.label}
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden
                            className={cn(
                              "size-6 fill-none stroke-gold stroke-2 transition-transform duration-500 md:size-7",
                              servicesOpen && "rotate-90 lg:rotate-180",
                            )}
                          >
                            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className={cn(linkText, "inline-block transition-transform duration-500 hover:translate-x-2")}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.div>
                  </div>

                  {isServices && <ServicesPanel open={servicesOpen} onNavigate={onClose} />}
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      <motion.div
        className="pb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.6 } }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
      >
        <Container className="flex justify-center gap-8 text-xs text-white/70 lg:justify-end lg:pr-24">
          {legalLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={onClose} className="transition-colors hover:text-gold">
              {l.label}
            </Link>
          ))}
        </Container>
      </motion.div>
    </motion.div>
  );
}