const whatsappNumber = "971545713199";
const whatsappMessage = "Hello Afaq Al Manzel Interiors, I'd like to discuss a project.";

export const site = {
  name: "Afaq Al Manzel Interiors",
  email: "info@afaqalmanzelinteriors.com",
  phone: "+971 54 571 3199",
  phoneHref: "tel:+971545713199",
  whatsappHref: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  address: ["Office No. 501, Al Zarouni Business Centre", "Al Barsha 1, Sheikh Zayed Road", "Dubai, UAE"],
   // Dummy map links: replace once the final address is confirmed
  mapHref: "https://www.google.com/maps?q=Barsha+Heights,+Dubai",
  mapEmbed:
    "https://maps.google.com/maps?q=Barsha%20Heights%2C%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed",
  // Placeholders: replace with real profiles
  socials: [
    { label: "Instagram", handle: "@afaqinteriors", href: "https://instagram.com/" },
    { label: "LinkedIn", handle: "Afaq Al Manzel Interiors", href: "https://linkedin.com/" },
    { label: "Facebook", handle: "Afaq Al Manzel Interiors", href: "https://facebook.com/" },
  ],
} as const;