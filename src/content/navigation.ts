export type NavLink = { label: string; href: string; submenu?: "services" };

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", submenu: "services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

export const services = [
  { label: "Interior Design", href: "/services/interior-design" },
  { label: "Design & Build", href: "/services/design-build" },
  { label: "Renovation & Fit Out", href: "/services/renovation-fit-out" },
  { label: "Furnishing", href: "/services/furnishing" },
  { label: "MEP Solution", href: "/services/mep" },
  { label: "Property Transformation", href: "/services/property-transformation" },
];

export const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const contactHref = "/contact";


export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  { title: "Services", links: services },
  {
    title: "What We Do",
    links: [
      { label: "Kitchen", href: "/products/kitchen" },
      { label: "Bedroom", href: "/products/bedroom" },
      { label: "Living", href: "/products/living" },
      { label: "Dining", href: "/products/dining" },
    ],
  },
];

