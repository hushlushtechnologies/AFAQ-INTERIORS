import { Fragment } from "react";
import { Container } from "@/components/ui/Container";
import { ColumnLines } from "@/components/motion/ColumnLines";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { StepDots } from "@/components/motion/StepDots";
import { aboutPage } from "@/content/about-page";

const { purpose } = aboutPage;

export function VisionMission() {
  return (
    <section
      aria-labelledby="purpose-heading"
      className="relative bg-ivory py-24 text-ink md:py-32 xl:pb-[160px] xl:pt-[190px]"
    >
      <ColumnLines lineClassName="bg-ink/15" />

      <Container className="relative">
        <LineReveal
          id="purpose-heading"
          as="h2"
          lines={purpose.title}
          className="font-display text-[36px] leading-[1.1] sm:text-5xl xl:text-[60px]"
        />

        {/* Staircase: text on the right, its photo below on the left */}
        <div className="mt-16 grid gap-y-10 lg:mt-[150px] lg:grid-cols-4">
                 {purpose.items.map((item, i) => (
            <Fragment key={item.title}>
              {/* Text: rows 1, 3, 5… */}
              <div className="lg:col-span-2 lg:col-start-3" style={{ gridRow: i * 2 + 1 }}>
                <StepDots total={purpose.dots} active={i} />
                <LineReveal
                  as="h3"
                  lines={[item.title]}
                  className="mt-4 font-display text-2xl text-terracotta xl:text-[30px]"
                />
                <Reveal delay={0.15}>
                  <p className="mt-6 max-w-[640px] text-lg leading-snug md:text-[21px] lg:mt-[70px]">
                    {item.text}
                  </p>
                </Reveal>
              </div>

              {/* Photo: rows 2, 4, 6… directly below its own text */}
              <ParallaxImage
                {...item.image}
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                fade={false}
                speed={50}
                direction="left"
                wrapperClassName="aspect-[640/436]"
                className="mb-6 lg:col-span-2 lg:col-start-1 lg:mb-0"
                style={{ gridRow: i * 2 + 2 }}
              />
            </Fragment>
          ))}
        </div>
      </Container>
    </section>
  );
}