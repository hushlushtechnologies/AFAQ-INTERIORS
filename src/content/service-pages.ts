 import type { HeroSlide } from "./hero";

type Img = { src: string; alt: string };

/* ---------- Spaces We Design ---------- */

export type Solution = {
  id: string;
  title: string;
  subtitle: string;
  text: string;
  items: string[];
  images: Img[]; // Layout A uses 1, Layout B uses 2
  theme?: "light" | "dark";
};

export type ServiceSpaces = {
  eyebrow: string;
  title: string[];
  body: string;
  images: [Img, Img];
  solutions: Solution[];
};

/* ---------- Design Styles ---------- */

export type DesignStyle = {
  id: string;
  title: string;
 
   subtitle?: string;
  images: Img[]; // collages use 3, banner and cards use 1
};

export type ServiceStyles = {
  eyebrow: string;
  title: string[];
  body: string;
  items: DesignStyle[];
};

/* ---------- Service page ---------- */

type ServiceBase = {
  slug: string;
  eyebrow: string;
  body: string;
  primaryCta: string;
  // ← NEW: overrides the default "Explore Our Work" button
  secondaryCta?: { label: string; href: string; external?: boolean };
  metaDescription: string;
  spaces?: ServiceSpaces;
  styles?: ServiceStyles;
  beforeAfter?: ServiceBeforeAfter;
  details?: ServiceDetails;
};
// Interior Design style hero: title, category row, wide photo, watermark
type GridHero = {
  hero: "grid";
  title: string;
  categories: string[];
  image: Img;
  watermark: string;
};

// Design & Build style hero: full-screen photo slideshow
type SliderHero = {
  hero: "slider";
  slides: HeroSlide[];
  heroLayout?: "center" | "bottom";
  heroTheme?: "light" | "dark"; // ← NEW (default: light)
};

export type BeforeAfterProject = {
  id: string;
  title: string;
  location: string;
  scope: string[];
  before: Img;
  after: Img;
};

export type ServiceBeforeAfter = {
  eyebrow: string;
  title: string[];
  body: string;
  projects: BeforeAfterProject[];
};

export type ServiceDetails = {
  title: string[];
  body: string;
  items: { title: string; text: string; image: string; detail: Img }[];
};

export type ServicePage = ServiceBase & (GridHero | SliderHero);
export type GridService = Extract<ServicePage, { hero: "grid" }>;
export type SliderService = Extract<ServicePage, { hero: "slider" }>;

/* ---------- Content ---------- */

export const servicePages: Record<string, ServicePage> = {
  "interior-design": {
    hero: "grid",
    slug: "interior-design",
    eyebrow: "Interior Design",
    title: "Spaces Designed Around the Way You Live.",
    categories: ["Residential", "Commercial", "Hospitality", "Specialized Interiors"],
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
            { src: "/images/services/interior-design/entertainment-1.jpg", alt: "Gaming setup with RGB lighting" },
            { src: "/images/services/interior-design/entertainment-2.jpg", alt: "Private home theatre with recliner seating" },
          ],
        },
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
            { src: "/images/services/interior-design/commercial-1.jpg", alt: "Clinic treatment room with medical equipment" },
            { src: "/images/services/interior-design/commercial-2.jpg", alt: "Glass-walled meeting room in an open-plan office" },
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

  "design-build": {
    hero: "slider",
    slug: "design-build",
    eyebrow: "Design & Build",
    slides: [
      {
        image: "/images/services/design-build/hero-1.jpg",
        alt: "Sunlit double-height lounge with white sculptural chairs",
        title: ["One Vision.", "Designed, Built, and", "Delivered."],
      },
      // Slides 2–4: same headline for now; give each its own when designed
      {
        image: "/images/services/design-build/hero-2.jpg",
        alt: "Design and build project by Afaq Interiors",
        title: ["One Vision.", "Designed, Built, and", "Delivered."],
      },
      {
        image: "/images/services/design-build/hero-3.jpg",
        alt: "Design and build project by Afaq Interiors",
        title: ["One Vision.", "Designed, Built, and", "Delivered."],
      },
      {
        image: "/images/services/design-build/hero-4.jpg",
        alt: "Design and build project by Afaq Interiors",
        title: ["One Vision.", "Designed, Built, and", "Delivered."],
      },
    ],
    body: "From concept and technical planning to construction, fit-out, and final handover, Afaq Al Manzel Interiors provides a coordinated design-and-build approach for residential and commercial projects across Dubai and the UAE.",
    primaryCta: "Start your Design Project",
    metaDescription:
      "Design and build services in Dubai — one coordinated team from concept and technical planning to construction, fit-out, and handover.",


          spaces: {
      eyebrow: "What We Deliver",
      title: ["Complete Capability.", "One Coordinated", "Process."],
      body: "From early design decisions to technical coordination, construction, finishing, and handover, every stage is connected through one team to keep the project clear, efficient, and consistent.",
      images: [
        { src: "/images/services/design-build/intro-1.png", alt: "Designers reviewing stone samples and floor plans" },
        { src: "/images/services/design-build/intro-2.png", alt: "Architectural model resting on rolled drawings" },
      ],
      solutions: [
        {
          id: "concept-planning",
          title: "Concept & Space Planning",
          subtitle: "Start With the Right Foundation.",
          text: "We develop the spatial direction of the project around functionality, movement, lifestyle, and the overall design vision.",
          items: ["Space Planning", "Design Direction", "Material Concepts", "Layout Development", "Moodboards"],
          images: [{ src: "/images/services/design-build/concept.png", alt: "Top-down view of a living room layout" }],
        },
        {
          id: "technical-design",
          title: "Technical Design",
          subtitle: "Turning Ideas Into Buildable Detail.",
          text: "Creative concepts are developed into coordinated technical information that guides accurate execution on site.",
          items: ["Technical Drawings", "Flooring Layouts", "Wall Details", "Ceiling Plans", "Lighting Plans", "Joinery Drawings"],
          images: [
            { src: "/images/services/design-build/technical-1.png", alt: "Technical sketch overlay of a living room" },
            { src: "/images/services/design-build/technical-2.png", alt: "Architectural line drawing of a double-height interior" },
          ],
        },
        {
          id: "mep-coordination",
          theme: "dark",
          title: "MEP Coordination",
          subtitle: "Performance Behind the Design.",
          text: "Mechanical, electrical, and plumbing requirements are coordinated with the interior design to keep technical systems aligned with the final space.",
          items: ["HVAC Coordination", "Lighting Coordination", "Power & Data", "Electrical Planning", "Plumbing", "Service Integration"],
          images: [{ src: "/images/services/design-build/mep.png", alt: "Plant room with ductwork, pipework and electrical panels" }],
        },
        {
          id: "procurement",
          theme: "dark",
          title: "Procurement & Materials",
          subtitle: "The Right Elements, Carefully Selected.",
          text: "Materials, finishes, fixtures, and project components are coordinated around design intent, performance, availability, and project requirements.",
          items: ["Stone", "Metal", "Lighting", "Hardware", "Timber", "Glass", "Fixtures"],
          images: [
            { src: "/images/services/design-build/procurement-1.png", alt: "Electrical materials and cable reels ready for a project" },
            { src: "/images/services/design-build/procurement-2.png", alt: "Warehouse shelving stocked with project materials" },
          ],
        },
        {
          id: "construction-fit-out",
          title: "Construction & Fit-Out",
          subtitle: "Where the Design Takes Shape.",
          text: "Our execution teams coordinate civil works, fit-out, installations, and finishing to bring the approved design into the physical space.",
          items: ["Civil Works", "Ceilings", "Painting", "Installation", "Partitions", "Flooring", "MEP Works"],
          images: [{ src: "/images/services/design-build/construction.png", alt: "Office shown half under construction and half completed" }],
        },
        {
          id: "custom-joinery",
          title: "Custom Joinery",
          subtitle: "Made Specifically for the Space.",
          text: "Bespoke joinery is designed around exact dimensions, functionality, materials, and the character of the interior.",
          items: ["Wardrobes", "Media Units", "Shelving", "Feature Joinery", "Cabinetry", "Wall Panels", "Doors"],
          images: [
            { src: "/images/services/design-build/joinery-1.png", alt: "Bedroom wardrobe with integrated vanity" },
            { src: "/images/services/design-build/joinery-2.png", alt: "Backlit walk-in wardrobe with glass doors" },
          ],
        },
        {
          id: "furnishing-styling",
          theme: "dark",
          title: "Furnishing & Styling",
          subtitle: "Complete the Experience.",
          text: "Furniture, lighting, fabrics, décor, and accessories are coordinated to give the finished space a cohesive and complete identity.",
          items: ["Furniture", "Rugs", "Artwork", "Final Styling", "Curtains", "Lighting", "Accessories"],
          images: [{ src: "/images/services/design-build/furnishing.png", alt: "Styled lounge with a channel-tufted sofa and rattan tables" }],
        },
        {
          id: "project-management",
          theme: "dark",
          title: "Project Management",
          subtitle: "One Point of Coordination.",
          text: "Project activities are coordinated across teams, trades, procurement, and site execution to maintain clarity throughout delivery.",
          items: ["Site Coordination", "Scheduling", "Procurement Tracking", "Contractor Coordination", "Progress Reviews", "Client Communication"],
          images: [
            { src: "/images/services/design-build/management-1.png", alt: "Handshake at a project meeting" },
            { src: "/images/services/design-build/management-2.png", alt: "Team meeting around a round table in a high-rise office" },
          ],
        },
      ],
    },
        styles: {
      eyebrow: "Construction & Fit-Out",
      title: ["Where Design", "Becomes Reality."],
      body: "From structural adjustments and technical installations to finishes, joinery, and final detailing, our team coordinates every stage of execution to bring the approved design to life with precision.",
      items: [
        {
          id: "civil-structural",
          title: "Civil & Structural Works",
          subtitle: "Partitions, wall modifications, ceilings, flooring preparation, surface works, and site adjustments required to shape the space.",
          images: [
            { src: "/images/services/design-build/fitout/civil-1.png", alt: "Workers installing a glass staircase on site" },
            { src: "/images/services/design-build/fitout/civil-2.png", alt: "Timber formwork for a concrete staircase" },
            { src: "/images/services/design-build/fitout/civil-3.png", alt: "Building under construction at sunset with tower cranes" },
          ],
        },
        {
          id: "mep-execution",
          title: "MEP Execution",
          subtitle: "Mechanical, electrical, plumbing, HVAC, lighting, and service installations coordinated with the interior design.",
          images: [
            { src: "/images/services/design-build/fitout/mep-1.png", alt: "Project budget planning with a calculator and building model" },
            { src: "/images/services/design-build/fitout/mep-2.png", alt: "Engineers reviewing a 3D MEP coordination model" },
            { src: "/images/services/design-build/fitout/mep-3.png", alt: "Modern villa nearing completion" },
          ],
        },
        {
          id: "interior-fit-out",
          title: "Interior Fit-Out",
          subtitle: "Ceilings, flooring, wall finishes, painting, decorative treatments, fixtures, and complete interior finishing.",
          images: [{ src: "/images/services/design-build/fitout/interior-fitout.jpg", alt: "Finished office lounge with curved banquette seating" }],
        },
        {
          id: "fitout-joinery",
          title: "Custom Joinery",
          images: [{ src: "/images/services/design-build/fitout/joinery.png", alt: "Timber and glass display joinery" }],
        },
        {
          id: "finishes-installation",
          title: "Finishes & Installation",
          images: [{ src: "/images/services/design-build/fitout/finishes.png", alt: "Feature wall with backlit decorative panels" }],
        },
        {
          id: "site-coordination",
          title: "Site Coordination",
          images: [{ src: "/images/services/design-build/fitout/site.png", alt: "Project team reviewing drawings at sunset" }],
        },
      ],
    },
  },

  "renovation-fit-out": {
    hero: "grid",
    slug: "renovation-fit-out",
    eyebrow: "Renovation & Fit-Out",
    title: "Transform What Exists Into What Could Be.",
    categories: [
      "Full Property Renovation",
      "Interior Reconfiguration",
      "Flooring Replacement",
      "Custom Joinery & Lighting",
    ],
    image: {
      src: "/images/services/renovation-fit-out/hero.jpg",
      alt: "Renovated dining area with orange armchairs, a glass staircase and timber wall cladding",
    },
    watermark: "Luxury Art",
    body: "From villas and apartments to offices, retail, and hospitality spaces, Afaq Al Manzel Interiors delivers complete renovation and fit-out solutions designed around your property, lifestyle, and goals.",
    primaryCta: "Start your Renovation",
    metaDescription:
      "Villa, apartment, office, retail, and hospitality renovation and fit-out in Dubai — transforming what exists into what could be.",

          spaces: {
      eyebrow: "What We Do",
      title: ["Complete Renovation.", "Thoughtfully Executed."],
      body: "We reimagine existing spaces through design, technical coordination, fit-out, and finishing — bringing every stage together to improve how the property looks, feels, and functions.",
      images: [
        { src: "/images/services/renovation-fit-out/intro-1.png", alt: "Unfinished room overlaid with design sketch annotations" },
        { src: "/images/services/renovation-fit-out/intro-2.png", alt: "Finished TV wall with stone cladding and timber slats" },
      ],
      solutions: [
        {
          id: "full-property",
          title: "Full Property Renovation",
          subtitle: "Transform the Entire Space.",
          text: "Complete renovation solutions for villas, apartments, commercial properties, and hospitality environments.",
          items: ["Layout Improvements", "Ceilings", "Lighting", "MEP Modifications", "Flooring", "Wall Finishes", "Joinery", "Furnishing"],
          images: [{ src: "/images/services/renovation-fit-out/full-property.png", alt: "Villa shown as an architectural model and as a finished interior" }],
        },
        {
          id: "reconfiguration",
          title: "Interior Reconfiguration",
          subtitle: "Make the Space Work Better.",
          text: "We rethink layouts to improve circulation, functionality, privacy, storage, and the overall use of available space.",
          items: ["Partition Changes", "Open-Plan Conversion", "Space Optimization", "Room Replanning", "Storage Planning"],
          images: [
            { src: "/images/services/renovation-fit-out/reconfiguration-1.png", alt: "Room shown half bare concrete and half finished" },
            { src: "/images/services/renovation-fit-out/reconfiguration-2.png", alt: "Line drawing of a living room blending into a finished render" },
          ],
        },
        {
          id: "kitchen",
          theme: "dark",
          title: "Kitchen Renovation",
          subtitle: "Function Meets Refined Design.",
          text: "Complete kitchen transformations designed around layout, storage, materials, appliances, and everyday usability.",
          items: ["Cabinetry", "Kitchen Islands", "Lighting", "Appliance Integration", "Worktops", "Storage", "Backsplashes"],
          images: [{ src: "/images/services/renovation-fit-out/kitchen.jpg", alt: "White kitchen with a marble island and industrial pendants" }],
        },
        {
          id: "bathroom",
          theme: "dark",
          title: "Bathroom Renovation",
          subtitle: "A Better Everyday Experience.",
          text: "Bathroom interiors refreshed through improved layouts, modern fixtures, materials, lighting, and technical upgrades.",
          items: ["Vanities", "Sanitary Ware", "Showers", "Tiles", "Lighting", "Storage", "Plumbing"],
          images: [
            { src: "/images/services/renovation-fit-out/bathroom-1.jpg", alt: "Vessel basin on a white vanity with a round mirror" },
            { src: "/images/services/renovation-fit-out/bathroom-2.jpg", alt: "Green-tiled bathroom vanity with stone basins and pendants" },
          ],
        },
        {
          id: "interior-fit-out",
          title: "Interior Fit-Out",
          subtitle: "From Empty Space to Complete Interior.",
          text: "We transform shell-and-core or unfinished properties into fully functional, finished environments.",
          items: ["Partitions", "Flooring", "MEP", "Lighting", "Ceilings", "Painting", "Joinery", "Fixtures"],
          images: [{ src: "/images/services/renovation-fit-out/fit-out.png", alt: "Finished executive office with marble floors and backlit panels" }],
        },
        {
          id: "mep-modification",
          title: "MEP Modification",
          subtitle: "Upgrade What Works Behind the Space.",
          text: "Mechanical, electrical, plumbing, HVAC, lighting, and service requirements can be adjusted to support the new interior.",
          items: ["Electrical", "HVAC", "Power & Data", "Plumbing", "Lighting", "Service Relocation"],
          images: [
            { src: "/images/services/renovation-fit-out/mep-1.png", alt: "Copper and steel pipework in a plant room" },
            { src: "/images/services/renovation-fit-out/mep-2.png", alt: "Row of insulated pipes and valves in a service corridor" },
          ],
        },
        {
          id: "finishes-styling",
          title: "Finishes & Styling",
          subtitle: "Complete the Transformation.",
          text: "The final layers of materials, furniture, lighting, fabrics, and accessories bring the renovated space together.",
          items: ["Furniture", "Rugs", "Artwork", "Final Styling", "Curtains", "Lighting", "Accessories"],
          images: [{ src: "/images/services/renovation-fit-out/finishes.jpg", alt: "Material board with timber, stone, fabric and metal samples" }],
        },
      ],
    },
        beforeAfter: {
      eyebrow: "Before & After",
      title: ["See What Your", "Space Could", "Become."],
      body: "Every renovation starts with potential. We rework layouts, materials, lighting, finishes, and details to transform existing spaces into refined, functional environments.",
      projects: [
        {
          id: "villa-hall",
          title: "Private Villa Renovation",
          location: "Dubai, UAE",
          scope: ["Full Interior Renovation", "Fit-Out", "Furnishing"],
          before: { src: "/images/services/renovation-fit-out/before-after/villa-hall-before.jpg", alt: "Villa hallway before renovation: bare white walls and empty floor" },
          after: { src: "/images/services/renovation-fit-out/before-after/villa-hall-after.png", alt: "Villa hallway after renovation: warm lighting, artwork, timber console and rug" },
        },
        {
          // Placeholder details: same as above in the design; update when confirmed
          id: "villa-bedroom",
          title: "Private Villa Renovation",
          location: "Dubai, UAE",
          scope: ["Full Interior Renovation", "Fit-Out", "Furnishing"],
          before: { src: "/images/services/renovation-fit-out/before-after/villa-bedroom-before.jpg", alt: "Bedroom before renovation: empty room with laminate floor" },
          after: { src: "/images/services/renovation-fit-out/before-after/villa-bedroom-after.png", alt: "Bedroom after renovation: upholstered bed, curtains, artwork and pendant lights" },
        },
      ],
    },
  },

    furnishing: {
    hero: "slider",
    heroLayout: "bottom",
    slug: "furnishing",
    eyebrow: "Furnishing",
    slides: [
      {
        image: "/images/services/furnishing/hero-1.jpg",
        alt: "Furnished room with a white geometric shelving unit, a terracotta chest of drawers and a floor mirror",
        title: ["The Final Layer That", "Makes a Space Feel", "Complete."],
      },
    ],
    // Not shown in this hero; kept for future sections and consistency
    body: "Furniture, lighting, fabrics, décor, and accessories selected and coordinated to give every space a cohesive, finished identity.",
    primaryCta: "Furnish your Space",
    metaDescription:
      "Furnishing and styling services in Dubai — furniture, lighting, fabrics, and accessories that make a space feel complete.",
          spaces: {
      eyebrow: "What We Furnish",
      title: ["Every Space,", "Thoughtfully", "Completed."],
      body: "From complete homes to individual rooms and commercial environments, we curate furniture, lighting, textiles, and finishing details to create spaces that feel cohesive, functional, and fully considered.",
      images: [
        { src: "/images/services/furnishing/intro-1.png", alt: "Sculptural armchair with a timber frame beside a vase of dried branches" },
        { src: "/images/services/furnishing/intro-2.png", alt: "Pair of boucle armchairs with a round timber side table" },
      ],
      solutions: [
        {
          id: "furnishing-residential",
          title: "Residential Spaces",
          subtitle: "Made for Everyday Living.",
          text: "Complete furnishing solutions designed around comfort, proportion, lifestyle, and the character of your home.",
          items: ["Living Rooms", "Master Suites", "Kitchens", "Guest Rooms", "Family Lounges", "Bedrooms", "Dining Rooms", "Majlis", "Kids Rooms", "Entrance & Foyer"],
          images: [{ src: "/images/services/furnishing/residential.png", alt: "Living room with timber-panelled walls, neutral sofas and garden views" }],
        },
        {
          id: "furnishing-lifestyle",
          title: "Lifestyle Spaces",
          subtitle: "Furnished Around the Way You Live.",
          text: "Personalized furnishing solutions for spaces created around entertainment, wellness, productivity, and lifestyle.",
          items: ["Gaming Rooms", "Home Offices", "Walk-In Wardrobes", "Wellness Rooms", "Home Bars", "Home Theatres", "Libraries", "Private Gyms", "Entertainment Lounges"],
          images: [
            { src: "/images/services/furnishing/lifestyle-1.png", alt: "Lounge with a dark timber wall and a low white sofa" },
            { src: "/images/services/furnishing/lifestyle-2.png", alt: "Double-height lounge with a sectional sofa and bamboo by the window" },
          ],
        },
        {
          id: "furnishing-commercial",
          theme: "dark",
          title: "Commercial Spaces",
          subtitle: "Furniture That Works for Business.",
          text: "Functional furniture and styling solutions created to support productivity, customer experience, and brand identity.",
          items: ["Corporate Offices", "Meeting Rooms", "Co-working Spaces", "Retail Stores", "Executive Offices", "Reception Areas", "Business Centers", "Showrooms"],
          images: [{ src: "/images/services/furnishing/commercial.png", alt: "Office breakout area with a curved terracotta sofa and circular wall art" }],
        },
        {
          id: "furnishing-hospitality",
          theme: "dark",
          title: "Hospitality Spaces",
          subtitle: "Comfort Guests Remember.",
          text: "Furniture and styling solutions that create welcoming, comfortable, and distinctive hospitality environments.",
          items: ["Hotels", "Suites", "Cafés", "Reception Areas", "Hotel Rooms", "Restaurants", "Lounges", "Private Dining Spaces"],
          images: [
            { src: "/images/services/furnishing/hospitality-1.png", alt: "Lounge with an organic mirror, curved sofa and arched window" },
            { src: "/images/services/furnishing/hospitality-2.png", alt: "Hotel lounge with a curved sofa, artwork and timber slat walls" },
          ],
        },
      ],
    },
        styles: {
      eyebrow: "Styling by Space",
      title: ["A Different Mood", "for Every Room."],
      body: "Every space has its own rhythm, function, and personality. We style each room through furniture, lighting, textiles, accessories, and finishes that work together as one complete composition.",
      items: [
        {
          id: "styling-living-room",
          title: "Living Room",
          subtitle: "Comfort, Conversation, Character.",
          images: [
            { src: "/images/services/furnishing/styling/living-1.png", alt: "Open-plan living room with a sectional sofa and timber wall panelling" },
            { src: "/images/services/furnishing/styling/living-2.png", alt: "Modular sofa with a low dark coffee table and wall sconce" },
            { src: "/images/services/furnishing/styling/living-3.png", alt: "Lounge with dark panelling, a sectional sofa and forest views" },
          ],
        },
        {
          id: "styling-bedroom",
          title: "Bedroom",
          subtitle: "Calm by Design.",
          images: [
            { src: "/images/services/furnishing/styling/bedroom-1.png", alt: "Dressing area with a backlit round mirror and walk-in wardrobe" },
            { src: "/images/services/furnishing/styling/bedroom-2.png", alt: "Bedroom with a sculpted wave wall behind the bed" },
            { src: "/images/services/furnishing/styling/bedroom-3.png", alt: "Bedroom with curved plaster wall and floating shelves" },
          ],
        },
        {
          id: "styling-dining",
          title: "Dining",
          subtitle: "Made for Moments Together.",
          images: [{ src: "/images/services/furnishing/styling/dining.jpg", alt: "Marble dining table with velvet tub chairs" }],
        },
        {
          id: "styling-majlis",
          title: "Majlis",
          subtitle: "Hospitality With Character.",
          images: [{ src: "/images/services/furnishing/styling/majlis.png", alt: "Majlis with patterned seating, carved screens and a gilded mirror" }],
        },
        {
          id: "styling-kids-room",
          title: "Kids Room",
          subtitle: "Playful. Practical. Personal.",
          images: [{ src: "/images/services/furnishing/styling/kids-room.jpg", alt: "Kids room with a house-shaped bookcase and soft toys" }],
        },
        {
          id: "styling-home-office",
          title: "Home Office",
          subtitle: "Designed to Help You Focus.",
          images: [{ src: "/images/services/furnishing/styling/home-office.png", alt: "Home office with a sculpted desk and city views" }],
        },
        {
          id: "styling-gaming-room",
          title: "Gaming Room",
          subtitle: "Built Around the Experience.",
          images: [{ src: "/images/services/furnishing/styling/gaming-room.png", alt: "Gaming room with a starry ceiling and RGB-lit shelving" }],
        },
      ],
    },
  },
    mep: {
    hero: "slider",
    heroLayout: "bottom",
    heroTheme: "dark",
    slug: "mep",
    eyebrow: "MEP Solution",
    slides: [
      {
        image: "/images/services/mep/hero-1.jpg",
        alt: "Insulated pipework, valves and a circulation pump in a plant room",
        title: ["Engineered for Comfort.", "Designed to Perform."],
      },
    ],
    // Not shown in this hero; kept for future sections
    body: "Mechanical, electrical, and plumbing solutions coordinated with the interior design for comfort, performance, and reliability.",
    primaryCta: "Discuss your MEP Project",
    metaDescription:
      "MEP solutions in Dubai — mechanical, electrical, plumbing, and HVAC engineered for comfort and designed to perform.",
          spaces: {
      eyebrow: "Our MEP Expertise",
      title: ["Three Disciplines. One", "Coordinated Solution."],
      body: "Our mechanical, electrical, and plumbing expertise is planned as one integrated system, helping every part of the space work together efficiently, safely, and seamlessly.",
      images: [
        { src: "/images/services/mep/intro-1.png", alt: "Plant room with red fire-protection pipework and air handling units" },
        { src: "/images/services/mep/intro-2.png", alt: "Corridor lined with electrical switchgear panels" },
      ],
      solutions: [
        {
          id: "mep-mechanical",
          title: "Mechanical",
          subtitle: "Comfort Starts With the Environment.",
          text: "We coordinate mechanical systems to support cooling, ventilation, airflow, and overall comfort while aligning equipment and services with the interior design.",
          items: ["HVAC Systems", "Air Conditioning", "Equipment Placement", "Temperature Control", "Ventilation", "Air Distribution", "Ducting Coordination", "Mechanical Maintenance"],
          images: [{ src: "/images/services/mep/mechanical.png", alt: "Mechanical equipment hall with automated systems" }],
        },
        {
          id: "mep-electrical",
          title: "Electrical",
          subtitle: "Power Behind Every Experience.",
          text: "From essential power distribution to lighting and technology requirements, electrical systems are planned around the way the space will be used.",
          items: ["Power Distribution", "Power Points", "Control Systems", "Electrical Upgrades", "Lighting Systems", "Data & Communication", "Emergency Lighting", "Equipment Connections"],
          images: [
            { src: "/images/services/mep/electrical-1.png", alt: "Electrician testing a distribution board with a multimeter" },
            { src: "/images/services/mep/electrical-2.png", alt: "Technician working on an electrical control panel" },
          ],
        },
        {
          id: "mep-plumbing",
          title: "Plumbing",
          subtitle: "Reliable Systems, Seamlessly Integrated.",
          text: "Plumbing solutions are coordinated across kitchens, bathrooms, sanitary areas, and utility spaces to support reliable everyday performance.",
          items: ["Water Supply", "Sanitary Systems", "Bathroom Plumbing", "Water Heaters", "Drainage", "Kitchen Plumbing", "Fixture Installation", "Pump Coordination"],
          images: [{ src: "/images/services/mep/plumbing.png", alt: "Building cutaway showing integrated MEP services" }],
        },
      ],
    },
        details: {
      title: ["The Difference Is", "in the Detail."],
      // Design repeated the About page paragraph (stone, timber, fabrics); MEP-specific copy below
      body: "From early design and technical drawings to installation, testing, and handover, every MEP stage is planned and checked so the systems behind your space perform reliably for years.",
      items: [
        {
          title: "MEP Design",
          text: "Mechanical, electrical, and plumbing systems are developed around the property layout, usage requirements, and interior design.",
          image: "/images/services/mep/process/design.png",
          detail: { src: "/images/services/mep/process/design-detail.png", alt: "Project team reviewing plans on a construction site" },
        },
        {
          title: "Technical Drawings",
          text: "Coordinated drawings help define system routes, equipment locations, lighting points, plumbing connections, and other technical requirements.",
          image: "/images/services/mep/process/drawings.png",
          detail: { src: "/images/services/mep/process/drawings-detail.png", alt: "Architectural sketch blending into a finished building" },
        },
        // Placeholder descriptions below: replace with final copy
        {
          title: "System Coordination",
          text: "MEP services are coordinated with structure, ceilings, joinery, and finishes to avoid clashes and keep every system working together.",
          image: "/images/services/mep/process/coordination.png",
          detail: { src: "/images/services/mep/process/coordination-detail.png", alt: "Engineers reviewing a 3D services model" },
        },
        {
          title: "Cost Estimation",
          text: "Clear estimates for equipment, materials, and labour help plan budgets and support informed decisions before work begins.",
          image: "/images/services/mep/process/estimation.png",
          detail: { src: "/images/services/mep/process/estimation-detail.png", alt: "Engineer calculating costs over technical drawings" },
        },
        {
          title: "Installation & Execution",
          text: "Our site teams install and connect systems to the approved drawings, working in close coordination with other trades.",
          image: "/images/services/mep/process/installation.png",
          detail: { src: "/images/services/mep/process/installation-detail.png", alt: "Technician installing ceiling services on site" },
        },
        {
          title: "Testing & Quality Checks",
          text: "Systems are tested, commissioned, and checked against specifications to confirm safe and reliable performance.",
          image: "/images/services/mep/process/testing.png",
          detail: { src: "/images/services/mep/process/testing-detail.png", alt: "Inspector completing a quality checklist" },
        },
        {
          title: "Documentation & Handover",
          text: "As-built drawings, manuals, and warranties are handed over so your systems can be operated and maintained with confidence.",
          image: "/images/services/mep/process/handover.png",
          detail: { src: "/images/services/mep/process/handover-detail.png", alt: "Handover documents being signed" },
        },
      ],
    },
    
  },
    "property-transformation": {
    hero: "grid",
    slug: "property-transformation",
    eyebrow: "Property Transformation",
    title: "From Property Handover to a Home That Feels Truly Yours.",
    categories: ["New Properties", "Existing Homes", "Luxury Residences", "Commercial Properties"],
    image: {
      src: "/images/services/property-transformation/hero.jpg",
      alt: "Modern white villa with floor-to-ceiling glazing overlooking a swimming pool",
    },
    watermark: "Luxury Art",
    body: "Whether you’ve purchased a new property or want to completely rethink an existing one, Afaq Al Manzel Interiors transforms villas, apartments, and commercial spaces through interior design, renovation, fit-out, furnishing, and final styling.",
    primaryCta: "Transform your Property",
    secondaryCta: {
      label: "Visit Our Real Estate Service",
      href: "/contact", // ← placeholder: replace with the real estate service link
      // external: true,  // ← uncomment if it's a separate website
    },
    metaDescription:
      "Property transformation in Dubai — interior design, renovation, fit-out, and furnishing that turn a new or existing property into a home that feels truly yours.",
          spaces: {
      eyebrow: "Properties We Transform",
      title: ["Every Property Has New", "Potential."],
      body: "From newly handed-over homes to existing residences and commercial spaces, we transform properties around how they need to look, feel, and perform.",
      images: [
        { src: "/images/services/property-transformation/intro-1.png", alt: "Contemporary villa at dusk with a lawn in front" },
        { src: "/images/services/property-transformation/intro-2.png", alt: "Modern villa with dark cladding and a reflecting pool" },
      ],
      solutions: [
        {
          id: "new-properties",
          title: "New Properties",
          subtitle: "From Handover to Home.",
          text: "Newly purchased villas, apartments, and townhouses can be personalized through interior design, lighting, joinery, furnishing, and complete fit-out.",
          items: ["New Villas", "Townhouses", "Shell & Core Units", "Apartments", "Penthouses"],
          images: [{ src: "/images/services/property-transformation/new-properties.jpg", alt: "Newly built brick home with large black-framed glazing" }],
        },
        {
          id: "existing-homes",
          title: "Existing Homes",
          subtitle: "Reimagine What You Already Own.",
          text: "We redesign and renovate existing homes to improve layout, functionality, finishes, comfort, and overall character.",
          items: ["Villa Renovation", "Kitchen Upgrades", "Layout Changes", "Apartment Renovation", "Bathroom Renovation", "Full Interior Refresh"],
          images: [
            { src: "/images/services/property-transformation/existing-homes-1.png", alt: "Renovated open-plan living room with timber beams and a staircase" },
            { src: "/images/services/property-transformation/existing-homes-2.png", alt: "Double-height living room with a stone fireplace wall" },
          ],
        },
        {
          id: "luxury-residences",
          title: "Luxury Residences",
          subtitle: "Tailored for Exceptional Living.",
          text: "Premium residences are transformed through bespoke design, custom joinery, refined materials, integrated lighting, furnishing, and detailed styling.",
          items: ["Luxury Villas", "Private Residences", "Signature Spaces", "Penthouses", "High-End Apartments"],
          images: [{ src: "/images/services/property-transformation/luxury-residences.png", alt: "Luxury living room with gold accents and statement artwork" }],
        },
        {
          id: "commercial-properties",
          title: "Commercial Properties",
          subtitle: "Transform Spaces for Business.",
          text: "Offices, retail units, showrooms, and other commercial properties can be redesigned and fitted out around operational needs and brand experience.",
          items: ["Offices", "Retail", "Showrooms", "Business Centers", "Reception Areas", "Commercial Units"],
          images: [
            { src: "/images/services/property-transformation/commercial-1.png", alt: "Double-height commercial lounge with industrial windows" },
            { src: "/images/services/property-transformation/commercial-2.png", alt: "Open-plan office with a mezzanine level" },
          ],
        },
      ],
    },
        beforeAfter: {
      eyebrow: "Before & After",
      title: ["See What Your", "Space Could", "Become."],
      body: "Every renovation starts with potential. We rework layouts, materials, lighting, finishes, and details to transform existing spaces into refined, functional environments.",
      projects: [
        {
          id: "pt-living",
          title: "Private Villa Renovation",
          location: "Dubai, UAE",
          scope: ["Full Interior Renovation", "Fit-Out", "Furnishing"],
          before: { src: "/images/services/property-transformation/before-after/living-before.png", alt: "Living room before: empty space with herringbone flooring and bare walls" },
          after: { src: "/images/services/property-transformation/before-after/living-after.png", alt: "Living room after: sectional sofa, dining area, artwork and cove lighting" },
        },
        {
          // Placeholder details: same as above in the design; update when confirmed
          id: "pt-hallway",
          title: "Private Villa Renovation",
          location: "Dubai, UAE",
          scope: ["Full Interior Renovation", "Fit-Out", "Furnishing"],
          before: { src: "/images/services/property-transformation/before-after/hallway-before.png", alt: "Hallway before: exposed plasterboard and an open ceiling under construction" },
          after: { src: "/images/services/property-transformation/before-after/hallway-after.png", alt: "Hallway after: linear ceiling lights, timber slats and a backlit mirror" },
        },
      ],
    },
  },
 
};