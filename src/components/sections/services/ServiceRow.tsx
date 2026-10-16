import type { Service } from "@/content/services";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { ScrollArrow } from "@/components/motion/ScrollArrow";
import { ServiceText } from "./ServiceText";
import { arrowDown, arrowUp } from "./arrows";

type Props = { service: Service; reverse?: boolean; speed?: number };

export function ServiceRow({ service, reverse = false, speed = 80 }: Props) {
  const image = (
    <ParallaxImage
      src={service.image}
      alt={service.alt}
      fill
      sizes="(min-width: 1024px) 495px, 100vw"
      speed={speed}
      direction={reverse ? "left" : "right"}
      wrapperClassName="aspect-[495/508]"
      className={reverse ? "lg:ml-[5%] lg:w-[39%]" : "lg:order-2 lg:ml-auto lg:mr-[5%] lg:w-[39%]"}
    />
  );

  return (
    <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-0">
      {image}
      <ServiceText
        service={service}
        className={reverse ? "lg:ml-[12%] lg:w-[30%]" : "lg:order-1 lg:ml-[16%] lg:w-[30%]"}
      />
      <ScrollArrow
        {...(reverse ? arrowDown : arrowUp)}
        className={
          reverse
            ? "pointer-events-none absolute left-[39%] top-[55%] z-10 hidden w-[15.4%] lg:block"
            : "pointer-events-none absolute left-[31.6%] top-[51%] z-10 hidden w-[18.5%] lg:block"
        }
      />
    </div>
  );
}