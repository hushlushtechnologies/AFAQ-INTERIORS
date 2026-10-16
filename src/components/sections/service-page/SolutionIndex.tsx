"use client";
import { useLenis } from "lenis/react";
import type { Solution } from "@/content/service-pages";
import { Container } from "@/components/ui/Container";
import { Rail } from "@/components/motion/Rail";
import { StepDots } from "@/components/motion/StepDots";

export function SolutionIndex({ solutions }: { solutions: readonly Solution[] }) {
  const lenis = useLenis();
  const rows: Solution[][] = [];
  for (let i = 0; i < solutions.length; i += 4) rows.push(solutions.slice(i, i + 4));

  const go = (e: React.MouseEvent, id: string) => {
    if (!lenis) return; // no smooth scroll (reduced motion) → normal anchor jump
    e.preventDefault();
    lenis.scrollTo(`#${id}`, { offset: -120 });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav aria-label="Interior solutions">
      {rows.map((row, r) => (
        <div key={r} className={r > 0 ? "mt-[50px]" : undefined}>
          <Rail />
          <Container>
            <ul className="grid grid-cols-2 gap-y-8 py-6 lg:h-[130px] lg:grid-cols-4 lg:py-0">
              {row.map((s, j) => {
                const i = r * 4 + j;
                return (
                  <li key={s.id} className="lg:pr-6">
                    <a href={`#${s.id}`} onClick={(e) => go(e, s.id)} className="group flex h-full flex-col justify-between gap-6">
                      <StepDots total={solutions.length} active={i} delay={j * 0.1} className="lg:-mt-1" />
                      <span className="pb-1.5">
                        <span className="block font-display text-base text-terracotta transition-colors duration-300 group-hover:text-accent xl:text-lg">
                          {s.title}
                        </span>
                        <span className="mt-1 block text-xs xl:text-[13px]">{s.subtitle}</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </Container>
          <Rail />
        </div>
      ))}
    </nav>
  );
}