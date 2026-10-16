import { Container } from "@/components/ui/Container";
import { LineReveal } from "@/components/motion/LineReveal";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Reveal } from "@/components/motion/Reveal";
import { ShapeBand, type BandShape } from "@/components/motion/ShapeBand";
import { WriteOn } from "@/components/motion/WriteOn";
import { aboutPage } from "@/content/about-page";

const toneA = "bg-[#250c07]/95";
const toneB = "bg-[#170504]/95";

// Positions traced from the 1920px design, in vw
const topShapes: BandShape[] = [
  { left: 23.33, width: 21.56, corners: ["tl", "bl"], tone: toneA },
  { left: 46.3, width: 39.9, corners: ["tl", "tr", "br"], tone: toneB },
  { left: 87.6, width: 21.56, corners: ["bl"], tone: toneA },
];

const bottomShapes: BandShape[] = [
  { left: 0, width: 12.3, corners: ["tl"], tone: toneB },
  { left: 13.85, width: 39.8, corners: ["tl", "tr", "br"], tone: toneA },
  { left: 55.1, width: 21.56, corners: ["tr", "br"], tone: toneB },
];

const { story } = aboutPage;
const sizes = "(min-width: 1024px) 368px, 50vw";

export function AboutStory() {
  return (
    <section
      aria-labelledby="about-story-heading"
      className="overflow-x-clip bg-ivory py-14 text-ink md:py-16"
    >
      <ShapeBand shapes={topShapes} direction="left" />

      <Container className="py-20 md:py-28 xl:py-[130px]">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-[368fr_40fr_96fr_367fr_41fr_368fr] lg:gap-x-0 lg:gap-y-5">
          <WriteOn
            lines={story.script}
            className="order-1 col-span-2 font-script text-2xl leading-snug lg:col-span-1 lg:col-start-1 lg:row-start-1 xl:text-[28px]"
          />

          <LineReveal
            id="about-story-heading"
            as="h2"
            lines={story.title}
            className="order-2 col-span-2 mb-4 font-display text-3xl leading-[1.15] lg:col-span-2 lg:col-start-3 lg:row-start-2 lg:mb-0 lg:pt-11 xl:text-[40px]"
          />

          {/* Middle column: medium speed */}
          <ParallaxImage
            {...story.images.office}
            fill
            sizes={sizes}
            fade={false}
            speed={70}
            wrapperClassName="aspect-[367/435]"
            className="order-3 lg:col-start-4 lg:row-start-1"
          />

          {/* Left column: slow */}
          <ParallaxImage
            {...story.images.boardroom}
            fill
            sizes={sizes}
            fade={false}
            speed={30}
            direction="left"
            wrapperClassName="aspect-[368/436]"
            className="order-4 lg:col-start-1 lg:row-start-2"
          />

          {/* Right column: tall, spans two rows */}
          <ParallaxImage
            {...story.images.gaming}
            fill
            sizes={sizes}
            fade={false}
            speed={40}
            direction="right"
            wrapperClassName="aspect-[368/436] lg:aspect-auto lg:h-full"
            className="order-5 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:h-full"
          />

          <ParallaxImage
            {...story.images.lounge}
            fill
            sizes={sizes}
            fade={false}
            speed={70}
            wrapperClassName="aspect-[367/436]"
            className="order-6 lg:col-start-4 lg:row-start-3"
          />

          <Reveal className="order-7 col-span-2 mt-6 lg:col-span-1 lg:col-start-6 lg:row-start-3 lg:mt-0 lg:pt-12">
            <div className="max-w-[370px] space-y-6 text-base leading-snug xl:text-[19px]">
              {story.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>

      <ShapeBand shapes={bottomShapes} direction="right" letters="AFAQ" />
    </section>
  );
}