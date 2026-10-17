type Img = { src: string; alt: string };
import type { ServiceBeforeAfter } from "./service-pages";

export type FeaturedItem = { title: string; subtitle: string; image: Img };

export type GalleryProject = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  type: string;
  images: Img[];   // first image = card cover (poster for videos)
  video?: string;  // ← NEW: set for video projects
};

const p = (file: string, alt: string): Img => ({ src: `/images/gallery/projects/${file}.png`, alt });


export const gallery = {
  hero: {
    video: {
      eyebrow: "Transformation Story",
      title: "Video Gallery",
      cta: { label: "View Gallery", href: "#video-gallery" },
      image: {
        src: "/images/gallery/video-cover.png",
        alt: "Living room with a circular feature wall, cove lighting and navy armchairs",
      },
    },
    eyebrow: "Our Star Interiors",
    title: ["Spaces, Details, and", "Transformations."],
    // Placeholder captions: the design repeats "Luxury Residences" on every card
    featured: [
      { title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", image: { src: "/images/gallery/featured-1.png", alt: "Sunlit living room with a channel-tufted sofa" } },
      { title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", image: { src: "/images/gallery/featured-2.png", alt: "Living room with a sectional sofa and a brass chandelier" } },
      { title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", image: { src: "/images/gallery/featured-3.png", alt: "Lounge with a curved sofa, fireplace and indoor plants" } },
      { title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", image: { src: "/images/gallery/featured-4.png", alt: "Contemporary living room by Afaq Interiors" } },
      { title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", image: { src: "/images/gallery/featured-1.png", alt: "Contemporary living room by Afaq Interiors" } },
      { title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", image: { src: "/images/gallery/featured-2.png", alt: "Contemporary living room by Afaq Interiors" } },
    ] satisfies FeaturedItem[],
  },
} as const;


 export const designGallery = {
  eyebrow: "Gallery",
  title: "Design Gallery",
  projects: [
    { id: "p01", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Dubai", type: "Villa", images: [p("p01-1", "Living room with a sculpted coffee table and timber slats")] },
    { id: "p02", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Dubai", type: "Apartment", images: [p("p02-1", "Lounge with a curved sofa and abstract artwork")] },
    { id: "p03", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Abu Dhabi", type: "Villa", images: [p("p03-1", "Double-height living room with a linear fireplace")] },
    { id: "p04", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Dubai", type: "Apartment", images: [p("p04-1", "Open-plan living and kitchen with track lighting")] },
    { id: "p05", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Dubai", type: "Penthouse", images: [p("p05-1", "Living room with marble fireplace and gold accents")] },
    { id: "p06", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Sharjah", type: "Villa", images: [p("p06-1", "Lounge with an orange modular sofa")] },
    { id: "p07", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Hospitality", location: "Dubai", type: "Lounge", images: [p("p07-1", "Terracotta lounge with green armchairs")] },
    { id: "p08", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Abu Dhabi", type: "Villa", images: [p("p08-1", "Living room with green and burgundy walls")] },
    { id: "p09", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Commercial", location: "Dubai", type: "Office", images: [p("p09-1", "Reception lounge with sculptural wall art")] },
    { id: "p10", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Dubai", type: "Apartment", images: [p("p10-1", "Living room with a curved timber wall and pendants")] },
    { id: "p11", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Sharjah", type: "Villa", images: [p("p11-1", "Arched living room with a curved sofa")] },
    { id: "p12", title: "Luxury Residences", subtitle: "Tailored for Exceptional Living.", category: "Residential", location: "Dubai", type: "Penthouse", images: [p("p12-1", "Penthouse living room with a boucle sofa and bold artwork")] },
  ] satisfies GalleryProject[],
};


 // Temporary placeholders: every card uses the same poster and video for now
const PLACEHOLDER_POSTER = "/images/gallery/videos/placeholder.png";
const PLACEHOLDER_VIDEO = "/videos/gallery/placeholder.mp4";

const v = (n: string, alt: string, meta: Pick<GalleryProject, "category" | "location" | "type">): GalleryProject => ({
  id: `v${n}`,
  title: "Luxury Residences",
  subtitle: "Tailored for Exceptional Living.",
  ...meta,
  images: [{ src: PLACEHOLDER_POSTER, alt }],
  video: PLACEHOLDER_VIDEO,
});

// Placeholder videos: replace titles, tags and files with the real projects
export const videoGallery = {
  eyebrow: "Gallery",
  title: "Video Design Gallery",
  projects: [
    v("01", "Video tour of a living room with a sculptural pendant", { category: "Residential", location: "Dubai", type: "Villa" }),
    v("02", "Video tour of a luxury apartment", { category: "Residential", location: "Dubai", type: "Apartment" }),
    v("03", "Video tour of a villa interior", { category: "Residential", location: "Abu Dhabi", type: "Villa" }),
    v("04", "Video tour of a penthouse", { category: "Residential", location: "Dubai", type: "Penthouse" }),
    v("05", "Video tour of a hospitality lounge", { category: "Hospitality", location: "Dubai", type: "Lounge" }),
    v("06", "Video tour of an office fit-out", { category: "Commercial", location: "Dubai", type: "Office" }),
    v("07", "Video tour of a villa renovation", { category: "Residential", location: "Sharjah", type: "Villa" }),
    v("08", "Video tour of an apartment interior", { category: "Residential", location: "Abu Dhabi", type: "Apartment" }),
    v("09", "Video tour of a restaurant interior", { category: "Hospitality", location: "Dubai", type: "Restaurant" }),
    v("10", "Video tour of a penthouse living room", { category: "Residential", location: "Dubai", type: "Penthouse" }),
    v("11", "Video tour of a showroom", { category: "Commercial", location: "Sharjah", type: "Showroom" }),
    v("12", "Video tour of a villa living room", { category: "Residential", location: "Dubai", type: "Villa" }),
  ],
};



 

export const galleryBeforeAfter: ServiceBeforeAfter = {
  eyebrow: "Before & After",
  title: ["See What Your", "Space Could", "Become."],
  body: "Every renovation starts with potential. We rework layouts, materials, lighting, finishes, and details to transform existing spaces into refined, functional environments.",
  projects: [
    {
      id: "gallery-living",
      title: "Private Villa Renovation",
      location: "Dubai, UAE",
      scope: ["Full Interior Renovation", "Fit-Out", "Furnishing"],
      before: { src: "/images/services/property-transformation/before-after/living-before.png", alt: "Living room before: empty space with herringbone flooring and bare walls" },
      after: { src: "/images/services/property-transformation/before-after/living-after.png", alt: "Living room after: sectional sofa, dining area, artwork and cove lighting" },
    },
    {
      // Placeholder details: same as above in the design; update when confirmed
      id: "gallery-hallway",
      title: "Private Villa Renovation",
      location: "Dubai, UAE",
      scope: ["Full Interior Renovation", "Fit-Out", "Furnishing"],
      before: { src: "/images/services/property-transformation/before-after/hallway-before.png", alt: "Hallway before: exposed plasterboard and an open ceiling under construction" },
      after: { src: "/images/services/property-transformation/before-after/hallway-after.png", alt: "Hallway after: linear ceiling lights, timber slats and a backlit mirror" },
    },
  ],
};