"use client";
import { useCallback, useId, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { GalleryProject } from "@/content/gallery";
import { Container } from "@/components/ui/Container";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { Rail } from "@/components/motion/Rail";
import { Reveal } from "@/components/motion/Reveal";

const ALL = "__all";
const PAGE = 12;
type Kind = "photo" | "video";
type FilterKey = "category" | "location" | "type";
type Filters = Record<FilterKey, string>;
const EMPTY: Filters = { category: ALL, location: ALL, type: ALL };

const unique = (values: string[]) => [...new Set(values)].sort();

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const id = useId();
  const active = value !== ALL;
  return (
    <div className="relative -ml-px border-x border-terracotta/30">
      <label htmlFor={id} className="sr-only">Filter by {label.toLowerCase()}</label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "h-[60px] cursor-pointer appearance-none bg-transparent pl-6 pr-12 text-base outline-none transition-colors focus-visible:bg-white/60 md:pl-7 md:text-lg",
          active ? "text-ink" : "text-ink/55",
        )}
      >
        <option value={ALL}>{label}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute right-5 top-1/2 size-5 -translate-y-1/2 fill-none stroke-ink/60 stroke-[1.5]">
        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {active && <span aria-hidden className="absolute left-2.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-accent" />}
    </div>
  );
}

function ProjectCard({ project, kind, onOpen }: { project: GalleryProject; kind: Kind; onOpen: () => void }) {
  const cover = project.images[0];
  const count = project.images.length;
  const isVideo = kind === "video";

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={
        isVideo
          ? `Play video: ${project.title}`
          : `Open ${project.title}: ${count} ${count === 1 ? "photo" : "photos"}`
      }
      className={cn("group block w-full border border-ink/40 bg-ivory text-left", isVideo ? "cursor-pointer" : "cursor-zoom-in")}
    >
      <span className={cn("relative block overflow-hidden", isVideo ? "aspect-[266/173]" : "aspect-[266/280]")}>
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />

        {isVideo && (
          <span aria-hidden className="absolute inset-0 grid place-items-center">
            <span className="relative grid size-14 place-items-center rounded-full bg-terracotta text-white shadow-lg transition-transform duration-500 group-hover:scale-110">
              <span className="absolute inset-0 animate-ping rounded-full bg-terracotta/40 opacity-0 transition-opacity group-hover:opacity-100 [animation-duration:2s]" />
              <svg viewBox="0 0 24 24" className="relative ml-0.5 size-5 fill-current">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        )}

        {!isVideo && count > 1 && (
          <span className="absolute right-2 top-2 rounded-full bg-black/55 px-2 py-0.5 text-[11px] tabular-nums text-white">
            1/{count}
          </span>
        )}
      </span>

      <span className="block px-3 py-2.5 text-center">
        <span className="block font-display text-lg text-terracotta transition-colors group-hover:text-accent xl:text-xl">
          {project.title}
        </span>
        <span className="mt-0.5 block text-sm">{project.subtitle}</span>
      </span>
    </button>
  );
}

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  projects: readonly GalleryProject[];
  kind?: Kind;
};

export function MediaGallery({ id, eyebrow, title, projects, kind = "photo" }: Props) {
  const reduce = useReducedMotion();
  const headingId = `${id}-heading`;

  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [visible, setVisible] = useState(PAGE);
  const [active, setActive] = useState<GalleryProject | null>(null);
  const [open, setOpen] = useState(false);

  const options = useMemo(
    () => ({
      category: unique(projects.map((p) => p.category)),
      location: unique(projects.map((p) => p.location)),
      type: unique(projects.map((p) => p.type)),
    }),
    [projects],
  );

  const filtered = projects.filter(
    (p) =>
      (filters.category === ALL || p.category === filters.category) &&
      (filters.location === ALL || p.location === filters.location) &&
      (filters.type === ALL || p.type === filters.type),
  );
  const shown = filtered.slice(0, visible);
  const anyActive = Object.values(filters).some((v) => v !== ALL);
  const noun = kind === "video" ? "video" : "project";

  const setFilter = (key: FilterKey, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setVisible(PAGE);
  };
  const reset = () => {
    setFilters(EMPTY);
    setVisible(PAGE);
  };
  const close = useCallback(() => setOpen(false), []);

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative scroll-mt-24 overflow-x-clip bg-ivory pb-24 pt-24 text-ink md:pb-32 xl:pb-[200px] xl:pt-[200px]"
    >
      <ColumnLines lineClassName="bg-terracotta/30" />

      {/* ---------- Heading ---------- */}
      <Container className="relative">
        <div className="lg:pl-[128px]">
          <Reveal>
            <p className="text-base text-accent">{eyebrow}</p>
          </Reveal>
          <LineReveal
            id={headingId}
            as="h2"
            lines={[title]}
            className="mt-3 font-display text-[40px] leading-[1.1] sm:text-5xl xl:text-[64px]"
          />
        </div>
      </Container>

      {/* ---------- Filter bar ---------- */}
      <div className="relative mt-14 lg:mt-[85px]">
        <Rail />
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-6 lg:pl-[128px]">
            <div className="flex flex-wrap">
              <FilterSelect label="Category" value={filters.category} options={options.category} onChange={(v) => setFilter("category", v)} />
              <FilterSelect label="Location" value={filters.location} options={options.location} onChange={(v) => setFilter("location", v)} />
              <FilterSelect label="Type" value={filters.type} options={options.type} onChange={(v) => setFilter("type", v)} />
            </div>
            <div className="flex items-center gap-8 py-3 lg:py-0">
              {anyActive && (
                <button type="button" onClick={reset} className="link-underline cursor-pointer text-sm text-accent">
                  Clear filters
                </button>
              )}
              <Image
                src="/images/logo-horizontal.svg"
                alt=""
                width={182}
                height={40}
                unoptimized
                className="hidden h-10 w-auto lg:block xl:mr-[128px]"
              />
            </div>
          </div>
        </Container>
        <Rail />
      </div>

      {/* ---------- Grid ---------- */}
      <Container className="relative mt-14 lg:mt-[85px]">
        <div className="lg:pl-[128px]">
          <p role="status" className="sr-only">
            {filtered.length} {filtered.length === 1 ? noun : `${noun}s`} shown
          </p>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-display text-2xl">No {noun}s match these filters.</p>
              <button type="button" onClick={reset} className="link-underline mt-4 cursor-pointer text-accent">
                Clear filters
              </button>
            </div>
          ) : (
            <motion.ul layout className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {shown.map((project, i) => (
                  <motion.li
                    key={project.id}
                    layout={!reduce}
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
                    transition={{ duration: 0.6, ease: ease.out, delay: (i % 4) * 0.06 }}
                  >
                    <ProjectCard
                      project={project}
                      kind={kind}
                      onOpen={() => {
                        setActive(project);
                        setOpen(true);
                      }}
                    />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}

          {visible < filtered.length && (
            <div className="mt-14 text-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE)}
                className="cursor-pointer rounded-full border border-accent px-8 py-3 text-base font-medium text-accent transition-colors hover:bg-accent hover:text-white md:text-lg"
              >
                Load more
              </button>
            </div>
          )}
        </div>
      </Container>

      {/* ---------- Viewer ---------- */}
      {active &&
        (kind === "video" && active.video ? (
          <VideoLightbox open={open} onClose={close} src={active.video} title={active.title} />
        ) : (
          <ImageLightbox open={open} images={active.images} title={active.title} onClose={close} />
        ))}
    </section>
  );
}