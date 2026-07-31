import type { NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "ZENIZZ",
  tagline: "We take this craft very seriously.",
  description:
    "ZENIZZ is a modern barbershop atelier in Amsterdam. Precision cuts, calm rituals, and a chair experience built around craft — not speed.",
  url: "https://zenizz.nl",
  email: "hello@zenizz.nl",
  phone: "+31 20 123 4567",
  phoneHref: "tel:+31201234567",
  address: {
    street: "Prinsengracht 312",
    city: "Amsterdam",
    postal: "1016 HX",
    country: "Nederland",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  openingHours: [
    { day: "Maandag", hours: "Gesloten" },
    { day: "Dinsdag", hours: "10:00 – 19:00" },
    { day: "Woensdag", hours: "10:00 – 19:00" },
    { day: "Donderdag", hours: "10:00 – 20:00" },
    { day: "Vrijdag", hours: "10:00 – 20:00" },
    { day: "Zaterdag", hours: "09:00 – 17:00" },
    { day: "Zondag", hours: "Gesloten" },
  ],
};

export const navigation: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const images = {
  hero: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=2400&q=80",
  about: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=80",
  aboutSecondary:
    "https://images.unsplash.com/photo-1633681926022-84c1038a2c84?auto=format&fit=crop&w=1200&q=80",
  services:
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1400&q=80",
  cta: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=80",
  contact:
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80",
} as const;
