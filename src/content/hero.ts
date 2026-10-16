export const HERO_INTERVAL = 6000; // ms per slide

export const heroTagline =
  "Luxury interiors, thoughtful architecture and complete turnkey solutions crafted in Dubai";

export type HeroSlide = { image: string; alt: string; title: string[] };

// Slides 2–4 are placeholders: replace with the real images and headlines from Figma
export const heroSlides: HeroSlide[] = [
  {
    image: "/images/hero/hero-1.jpg",
    alt: "Modern office lounge with a timber slat partition, red feature wall and white armchairs",
    title: ["Spaces Designed", "Beyond Expectation"],
  },
  {
    image: "/images/hero/hero-2.jpg",
    alt: "Luxury living room interior by Afaq Interiors",
    title: ["Crafted With", "Timeless Detail"],
  },
  {
    image: "/images/hero/hero-3.jpg",
    alt: "Contemporary dining space interior by Afaq Interiors",
    title: ["Where Vision", "Becomes Home"],
  },
  {
    image: "/images/hero/hero-4.jpg",
    alt: "Turnkey commercial fit-out by Afaq Interiors",
    title: ["Turnkey Interiors", "Delivered Flawlessly"],
  },
];
