 import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { GridBackdrop } from "@/components/motion/GridBackdrop";
import { LineReveal } from "@/components/motion/LineReveal";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import type { LegalDoc } from "@/content/legal";
import { site } from "@/content/site";

const text = "text-lg leading-[1.8] md:text-[22px]";
const link = "text-accent link-underline";

export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <ScrollProgress />

      <section
        aria-labelledby="legal-title"
        className="relative overflow-x-clip bg-ivory pt-[clamp(120px,15vw,285px)] text-ink lg:[--cell:calc((100vw_-_4rem)/4)] xl:[--cell:min(320px,25vw)]"
      >
        <ColumnLines lineClassName="bg-terracotta/30" />

        {/* Everything below shares one grid that starts exactly at the first line */}
        <div className="relative pb-24 lg:pb-[250px]">
          <GridBackdrop />

          <Container className="relative">
            {/* ---------- Title (one cell tall) ---------- */}
            <div className="pb-14 pt-2 lg:h-[var(--cell)] lg:pb-0">
              <div className="inline-flex flex-col items-end">
                <LineReveal
                  id="legal-title"
                  as="h1"
                  lines={[doc.title]}
                  className="font-display text-[44px] leading-[0.95] sm:text-6xl xl:text-[106px]"
                />
                <Reveal delay={0.4}>
                  <p className="mt-3 text-sm uppercase tracking-[0.08em] md:text-base">{site.name}</p>
                </Reveal>
              </div>
            </div>

            {/* ---------- Intro ---------- */}
            <div className="lg:grid lg:grid-cols-4">
              <Reveal delay={0.5} className="pt-2 lg:col-span-2 lg:col-start-3">
                <p className="text-lg font-medium leading-snug md:text-[22px]">{doc.intro}</p>
                <p className="mt-4 text-sm text-ink/60">Last updated: {doc.updated}</p>
              </Reveal>
            </div>

            {/* ---------- Sections ---------- */}
            <div className="mt-16 max-w-[1150px] space-y-12 lg:mt-[120px] lg:pl-[128px] lg:pr-10">
              {doc.sections.map((s, i) => (
                <Reveal key={s.title}>
                  <section aria-labelledby={`legal-s${i + 1}`}>
                    <h2 id={`legal-s${i + 1}`} className="text-lg font-medium md:text-[22px]">
                      {i + 1}. {s.title}
                    </h2>

                    {s.body.map((p) => (
                      <p key={p.slice(0, 32)} className={text}>
                        {p}
                      </p>
                    ))}

                    {/* ← NEW: optional bullet list */}
                    {s.list && (
                      <ul className={`${text} mt-1 space-y-0.5`}>
                        {s.list.map((item) => (
                          <li key={item} className="flex gap-3 pl-3">
                            <span aria-hidden className="mt-[0.85em] size-1 shrink-0 rounded-full bg-ink" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {s.contact && (
                      <address className={`${text} not-italic`}>
                        {site.name}
                        <br />
                        {site.address.join(", ")}
                        <br />
                        <a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a>
                        <br />
                        <a href={site.phoneHref} className={link}>{site.phone}</a>
                      </address>
                    )}
                  </section>
                </Reveal>
              ))}
            </div>
          </Container>
        </div>
      </section>
    </>
  );
}