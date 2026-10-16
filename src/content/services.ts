export type Service = {
  title: readonly string[];
  items: readonly string[];
  cta: string;
  href: string;
  image: string;
  alt: string;
};

export const servicesIntro = {
  eyebrow: "What We Do",
  title: ["From Vision to", "Reality.", "We Handle Every", "Detail."],
  image: "/images/services/intro.jpg",
  alt: "Open-plan office interior with circular pendant lights and a green lounge sofa",
  signature: "Afaq Al Manzel Interiors",
  subtitle: ["One Vision. Every", "Detail Considered."],
  body: "Afaq Al Manzel Interiors brings design, construction, engineering and furnishing together under one roof — creating seamless spaces from the first concept to final handover.",
} as const;

export const serviceRows: Service[] = [
  {
    title: ["Interior Design"],
    items: ["Residential Design", "Commercial Design", "Hospitality Design", "Gaming Room Setup", "Home Theatre Setup", "Majlis Setup", "Luxury Space Setup"],
    cta: "Explore Interior Design",
    href: "/services/interior-design",
    image: "/images/services/interior-design.jpg",
    alt: "Bright double-height living room with white sofas and skylights",
  },
  {
    title: ["Design & Build"],
    items: ["Architecture Solutions", "Planning Setup", "Construction Overview", "Project Management", "Turnkey Delivery"],
    cta: "Explore Design & Build",
    href: "/services/design-build",
    image: "/images/services/design-build.jpg",
    alt: "Architects reviewing floor plans at a desk",
  },
  {
    title: ["Renovation &", "Fit-Out"],
    items: ["Villa Renovation", "Apartment Renovation", "Office Fit-Out", "Retail", "Hospitality", "Kitchen & Bathroom"],
    cta: "Explore Renovation & Fit-Out",
    href: "/services/renovation-fit-out",
    image: "/images/services/renovation.jpg",
    alt: "Black joinery wall with illuminated copper display niches",
  },
  {
    title: ["Furnishing"],
    items: ["Furniture Solutions", "Custom Joinery", "Lighting & Accessories"],
    cta: "Explore Furnishing Solutions",
    href: "/services/furnishing",
    image: "/images/services/furnishing.jpg",
    alt: "Custom furniture and joinery by Afaq Interiors",
  },
];

export const mepService: Service = {
  title: ["MEP Solutions"],
  items: ["Mechanical Engineering", "Electrical Solutions", "Plumbing Solutions", "HVAC Solutions", "Lighting & Technical Solutions", "Kitchen & Bathroom"],
  cta: "Explore MEP Solutions",
  href: "/services/mep",
  image: "/images/services/mep.jpg",
  alt: "Engineers in safety gear inspecting rooftop building services",
};

export const propertyService: Service = {
  title: ["Property", "Transformation"],
  items: ["Interior Design", "Renovation", "Fit-Out", "Furnishing", "Space Planning"],
  cta: "Explore Property Transformation",
  href: "/services/property-transformation",
  image: "/images/services/property.jpg",
  alt: "Couple in a renovated loft kitchen with exposed beams and skylights",
};