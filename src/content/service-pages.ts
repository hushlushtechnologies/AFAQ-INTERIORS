type Img = { src: string; alt: string };

export type Solution = {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  items: string[];
  images: Img[]; // Layout A uses 1, Layout B uses 2
  theme?: "light" | "dark"; // ← NEW
};

export type ServiceSpaces = {
  eyebrow: string;
  title: string[];
  body: string;
  images: [Img, Img];
  solutions: Solution[];
};

export type ServicePage = {
  slug: string;
  eyebrow: string;
  title: string;
  categories: string[];
  image: Img;
  watermark: string;
  body: string;
  primaryCta: string;
  metaDescription: string;
  spaces?: ServiceSpaces; 
  styles?: ServiceStyles 
};

export type DesignStyle = {
  id: string;
  title: string;
  subtitle: string;
  images: Img[]; // collages use 3, banner and cards use 1
};

export type ServiceStyles = {
  eyebrow: string;
  title: string[];
  body: string;
  items: DesignStyle[];
};

export const servicePages: Record<string, ServicePage> = {
  "interior-design": {
    slug: "interior-design",
    eyebrow: "Interior Design",
    title: "Spaces Designed Around the Way You Live.",
    categories: [
      "Residential",
      "Commercial",
      "Hospitality",
      "Specialized Interiors",
    ],
    image: {
      src: "/images/services/interior-design-hero.jpg",
      alt: "Executive office with a walnut desk, display shelving and framed artwork",
    },
    watermark: "Luxury Art",
    body: "From luxury residences and commercial environments to gaming rooms, home theatres, majlis, and highly personalized lifestyle spaces, Afaq Al Manzel Interiors creates interiors that balance beauty, function, comfort, and character.",
    primaryCta: "Start your Interior Project",
    metaDescription:
      "Residential, commercial, hospitality, and specialized interior design in Dubai — spaces designed around the way you live.",

    spaces: {
      eyebrow: "Spaces We Design",
      title: ["Every Space. Every", "Possibility."],
      body: "From complete homes and workplaces to entertainment, hospitality, and highly personalized spaces, we design interiors around how each environment needs to look, feel, and perform.",
      images: [
        {
          src: "/images/services/interior-design/spaces-1.jpg",
          alt: "Warm neutral living room with timber panelling and sculptural pendants",
        },
        {
          src: "/images/services/interior-design/spaces-2.jpg",
          alt: "Green arched alcove with a boucle chair and pendant light",
        },
      ],
      solutions: [
        {
          id: "residential",
          title: "Residential Solution",
          subtitle: "Spaces Made for Living.",
          text: "Thoughtfully planned residential interiors that bring comfort, functionality, and personal character into every part of the home.",
          items: [
            "Luxury Villas",
            "Apartments",
            "Penthouses",
            "Master Suites",
            "Dining Rooms",
            "Bedrooms",
            "Balconies & Terraces",
            "Living Rooms",
            "Family Lounges",
            "Bedrooms",
            "Kitchens",
            "Bathrooms",
            "Powder Rooms",
            "Majlis",
          ],
          images: [
            {
              src: "/images/services/interior-design/residential.jpg",
              alt: "Bright open-plan living room with a leather sectional sofa",
            },
          ],
        },
        {
          id: "entertainment",
          title: "Entertainment Solution",
          subtitle: "Designed for How You Unwind.",
          text: "Immersive entertainment environments where technology, comfort, acoustics, lighting, and atmosphere come together.",
          items: [
            "Gaming Rooms",
            "Media Rooms",
            "Music Rooms",
            "Podcast Studios",
            "Home Theatres",
            "Entertainment Lounges",
            "Streaming Rooms",
            "Home Bars",
          ],
          images: [
            {
              src: "/images/services/interior-design/entertainment-1.jpg",
              alt: "Gaming setup with RGB lighting",
            },
            {
              src: "/images/services/interior-design/entertainment-2.jpg",
              alt: "Private home theatre with recliner seating",
            },
          ],
        },
        // ---- Placeholder content below: replace when designs arrive ----
        {
          id: "lifestyle",
          theme: "dark",
          title: "Lifestyle Solution",
          subtitle: "Designed Around Your Routine.",
          text: "Personalized spaces that support the rituals, interests, and experiences that make a home uniquely yours.",
          items: [
            "Walk-In Wardrobes",
            "Dressing Rooms",
            "Home Offices",
            "Libraries",
            "Private Gyms",
            "Yoga Rooms",
            "Spa Rooms",
            "Kids Rooms",
            "Playrooms",
            "Prayer Rooms",
            "Art & Hobby Rooms",
            "Wellness Spaces",
          ],
          images: [
            {
              src: "/images/services/interior-design/lifestyle.jpg",
              alt: "Spa room with two pedicure chairs set in lit terracotta arches",
            },
          ],
        },
        {
          id: "commercial",
          theme: "dark",
          title: "Commercial Solution",
          subtitle: "Spaces That Work for Business.",
          text: "Commercial interiors designed to support productivity, strengthen brand identity, and create memorable experiences for employees and customers.",
          items: [
            "Corporate Offices",
            "Executive Offices",
            "Meeting Rooms",
            "Conference Rooms",
            "Retail Stores",
            "Luxury Boutiques",
            "Reception Areas",
            "Co-working Spaces",
            "Business Centers",
            "Showrooms",
            "Luxury Boutiques",
            "Clinics",
          ],
          images: [
            {
              src: "/images/services/interior-design/commercial-1.jpg",
              alt: "Clinic treatment room with medical equipment",
            },
            {
              src: "/images/services/interior-design/commercial-2.jpg",
              alt: "Glass-walled meeting room in an open-plan office",
            },
          ],
        },
        {
          id: "hospitality",
          title: "Hospitality Solution",
          subtitle: "Designed to Be Remembered.",
          text: "Hospitality interiors that balance atmosphere, comfort, functionality, and identity to create memorable guest experiences.",
          items: [
            "Hotel Rooms",
            "Hotel Suites",
            "Cafés",
            "Coffee Shops",
            "Private Dining Rooms",
            "Hotel Lobbies",
            "Restaurants",
            "Fine Dining",
            "Lounges",
            "Hospitality Reception Areas",
          ],
          images: [
            {
              src: "/images/services/interior-design/hospitality.jpg",
              alt: "Hotel lounge with banquette seating and timber screens",
            },
          ],
        },
        {
          id: "specialized",
          title: "Specialized Solution",
          subtitle: "For Spaces Beyond the Ordinary.",
          text: "Highly customized interiors designed around unique collections, hobbies, technology, and lifestyle requirements.",
          items: [
            "Luxury Garages",
            "Collector Rooms",
            "Sneaker Display Rooms",
            "Content Creator Studios",
            "Private Libraries",
            "Special Experience Spaces",
            "Car Display Rooms",
            "Trophy Rooms",
            "Recording Studios",
            "Photography Studios",
            "Custom Hobby Rooms",
          ],
          images: [
            {
              src: "/images/services/interior-design/specialized-1.jpg",
              alt: "Bright showroom with glossy floors and geometric ceiling lights",
            },
            {
              src: "/images/services/interior-design/specialized-2.jpg",
              alt: "Mezzanine walk-in wardrobe with glass balustrade",
            },
          ],
        },
      ],
    },

        styles: {
      eyebrow: "Interior Design Styles",
      title: ["A Style That Feels", "Like You."],
      body: "Every client sees luxury differently. From clean contemporary spaces to timeless traditional interiors, we shape each design around your taste, property, and lifestyle.",
      items: [
        {
          id: "contemporary",
          title: "Contemporary Design",
          subtitle: "Clean. Refined. Effortless.",
          images: [
            { src: "/images/services/interior-design/styles/contemporary-1.png", alt: "Contemporary living room with sculptural ceiling and curved sofa" },
            { src: "/images/services/interior-design/styles/contemporary-2.png", alt: "Contemporary hallway with bold abstract artwork" },
            { src: "/images/services/interior-design/styles/contemporary-3.png", alt: "Double-height contemporary lounge with a curved sectional" },
          ],
        },
        {
          id: "modern",
          title: "Modern Design",
          subtitle: "Simple Forms. Strong Character.",
          images: [
            { src: "/images/services/interior-design/styles/modern-1.png", alt: "Modern entrance with a timber door and backlit round mirror" },
            { src: "/images/services/interior-design/styles/modern-2.png", alt: "Modern console with an organic backlit mirror" },
            { src: "/images/services/interior-design/styles/modern-3.png", alt: "Lit arched niches in a marble wall" },
          ],
        },
        {
          id: "minimalist",
          title: "Minimalist Design",
          subtitle: "Less, Considered Better.",
          images: [{ src: "/images/services/interior-design/styles/minimalist.jpg", alt: "Minimalist dining space with a white table and potted plants" }],
        },
        {
          id: "traditional",
          title: "Traditional Design",
          subtitle: "Timeless by Design.",
          images: [{ src: "/images/services/interior-design/styles/traditional.png", alt: "Traditional living room with a crystal chandelier and arched doors" }],
        },
        {
          id: "mediterranean",
          title: "Mediterranean Design",
          subtitle: "Relaxed. Natural. Timeless.",
          images: [{ src: "/images/services/interior-design/styles/mediterranean.png", alt: "Mediterranean lounge with arched windows and timber beams" }],
        },
        {
          id: "industrial",
          title: "Industrial Design",
          subtitle: "Raw Materials. Refined Thinking.",
          images: [{ src: "/images/services/interior-design/styles/industrial.png", alt: "Industrial loft with a steel staircase and leather seating" }],
        },
        {
          id: "nautical",
          title: "Nautical Design",
          subtitle: "Light. Calm. Coastal.",
          images: [{ src: "/images/services/interior-design/styles/nautical.png", alt: "Coastal living room with navy sofas and a ship's wheel" }],
        },
      ],
    },
  },

  // Add "design-build", "renovation-fit-out", "furnishing", "mep",
  // "property-transformation" here as their designs arrive.
};
