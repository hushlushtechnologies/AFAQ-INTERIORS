export type Product = { slug: string; title: string; text: string; image: string; alt: string };

export const productsIntro = {
  eyebrow: "Our Products",
  title: ["Every Space.", "Designed Around", "You."], // placeholder: duplicate of Our Work
  body: "From complete residences to highly personalized lifestyle spaces, Afaq Al Manzel Interiors creates interiors that balance function, comfort, technology, and character.",
} as const;

export const products: Product[] = [
  {
    slug: "kitchen",
    title: "Kitchen",
    text: "Custom kitchen interiors combining layout planning, storage, cabinetry, worktops, lighting, and finishes into one functional and refined space.",
    image: "/images/products/kitchen.jpg",
    alt: "Dark navy kitchen with timber ceiling slats and pendant lights",
  },
  {
    slug: "dining",
    title: "Dining",
    text: "Dining spaces designed around comfort, proportion, lighting, furniture, and material harmony for everyday meals and special occasions.",
    image: "/images/products/dining.jpg",
    alt: "Elegant dining room with upholstered chairs",
  },
  {
    slug: "bedroom",
    title: "Bedroom",
    text: "Personalized bedroom interiors combining comfort, storage, lighting, custom furniture, and calming material palettes.",
    image: "/images/products/bedroom.jpg",
    alt: "Warm-toned bedroom with a chandelier and window seat",
  },
  {
    slug: "living",
    title: "Living",
    text: "Living spaces designed for relaxation, hosting, and everyday connection with thoughtful layouts, furniture, lighting, and custom details.",
    image: "/images/products/living.jpg",
    alt: "Bright living room with a white sofa and indoor plants",
  },
  {
    slug: "kids-room",
    title: "Kids Room",
    text: "Creative and functional kids' spaces built around play, study, storage, safety, and changing needs.",
    image: "/images/products/kids-room.jpg",
    alt: "Calm kids' room with a study table and wall art",
  },
  {
    slug: "gaming",
    title: "Gaming Setup",
    text: "Immersive gaming environments combining custom desks, ergonomic planning, display solutions, ambient lighting, storage, and technology integration.",
    image: "/images/products/gaming.jpg",
    alt: "Gaming room with RGB-lit desk setup and multiple screens",
  },
  {
    slug: "theatre",
    title: "Theatre Setup",
    text: "Complete theatre environments designed around seating, acoustics, lighting, AV integration, wall treatments, and immersive comfort.",
    image: "/images/products/theatre.jpg",
    alt: "Private home theatre with red recliner seating",
  },
];