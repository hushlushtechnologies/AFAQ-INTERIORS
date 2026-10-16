import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
 
import { SolutionBlock } from "./SolutionBlock";
import { SolutionIndex } from "./SolutionIndex";
import { cn } from "@/lib/utils";
import type { ServiceSpaces as Spaces, Solution } from "@/content/service-pages";

export function ServiceSpaces({ data }: { data: Spaces }) {
  const total = data.solutions.length;

    const pairs: Solution[][] = [];
  for (let i = 0; i < data.solutions.length; i += 2) pairs.push(data.solutions.slice(i, i + 2));

  return (
    <section
      aria-labelledby="spaces-heading"
      className="relative overflow-x-clip bg-ivory pb-24 pt-16 text-ink md:pb-32 xl:pb-[200px] xl:pt-[120px]"
    >
      <ColumnLines lineClassName="bg-terracotta/30" />

      {/* ---------- Intro ---------- */}
      <Container className="relative">
        <Reveal>
          <p className="text-base text-accent">{data.eyebrow}</p>
        </Reveal>
        <LineReveal
          id="spaces-heading"
          as="h2"
          lines={data.title}
          className="mt-3 font-display text-[36px] leading-[1.1] sm:text-5xl xl:text-[60px]"
        />

        <div className="mt-12 grid gap-10 lg:mt-[260px] lg:grid-cols-4 lg:gap-0">
          <Reveal className="lg:col-span-2 lg:col-start-3 lg:row-start-1">
            <p className="text-lg leading-snug md:text-[22px]">{data.body}</p>
          </Reveal>
          <div className="grid grid-cols-2 items-end lg:col-span-2 lg:row-start-2">
            <ParallaxImage
              {...data.images[0]}
              fill
              sizes="(min-width: 1024px) 320px, 50vw"
              fade={false}
              speed={40}
              wrapperClassName="aspect-[320/435]"
            />
            <ParallaxImage
              {...data.images[1]}
              fill
              sizes="(min-width: 1024px) 270px, 45vw"
              fade={false}
              speed={90}
              direction="right"
              wrapperClassName="aspect-[267/346]"
              className="ml-3 lg:ml-[18px] lg:w-[83%]"
            />
          </div>
        </div>
      </Container>

      {/* ---------- Index ---------- */}
      <div className="relative mt-20 lg:mt-[120px]">
        <SolutionIndex solutions={data.solutions} />
      </div>

      {/* ---------- Solutions ---------- */}
      {/* <Container className="relative mt-24 lg:mt-[215px]">
        {data.solutions.map((s, i) => (
          <SolutionBlock
            key={s.id}
            s={s}
            index={i}
            total={total}
            // A Layout-B block tucks straight under the previous photo; a new A block gets breathing room
            className={i === 0 ? undefined : i % 2 === 1 ? "mt-16 lg:mt-0" : "mt-24 lg:mt-[160px]"}
          />
        ))}
      </Container> */}

            {/* ---------- Solutions: grouped in pairs, each pair can be light or dark ---------- */}
      <div className="mt-24 lg:mt-[215px]">
        {pairs.map((pair, p) => {
          const dark = pair[0].theme === "dark";
          return (
            // Not "relative" on purpose → the section's column lines stay visible on the dark band
            <div
              key={pair[0].id}
              className={cn(
                dark && "bg-background py-24 text-cream lg:py-[240px]",
                !dark && p > 0 && "pt-24 lg:pt-[165px]",
                !dark && p < pairs.length - 1 && "pb-24 lg:pb-[160px]",
              )}
            >
              <Container className="relative">
                {pair.map((s, j) => (
                  <SolutionBlock
                    key={s.id}
                    s={s}
                    index={p * 2 + j}
                    total={total}
                    theme={dark ? "dark" : "light"}
                    className={j === 1 ? "mt-16 lg:mt-0" : undefined}
                  />
                ))}
              </Container>
            </div>
          );
        })}
      </div>

    </section>
  );
}