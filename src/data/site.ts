import type { NavItem, SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "ZENIZZ",
  tagline: "We take this craft very seriously.",
  description:
    "ZENIZZ is a premium barbershop in Istanbul. Precision cuts, calm rituals, and a chair experience built around craft — not speed.",
  url: "https://zenizz.com",
  email: "hello@zenizz.com",
  phone: "+90 212 123 4567",
  phoneHref: "tel:+902121234567",
  address: {
    street: "Nisbetiye, Fecri Ebcioğlu Sk. No:11",
    city: "Beşiktaş/İstanbul",
    postal: "34353",
    country: "Türkiye",
  },
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
  },
  openingHours: [
    { day: "Monday", hours: "Closed" },
    { day: "Tuesday", hours: "10:00 – 19:00" },
    { day: "Wednesday", hours: "10:00 – 19:00" },
    { day: "Thursday", hours: "10:00 – 20:00" },
    { day: "Friday", hours: "10:00 – 20:00" },
    { day: "Saturday", hours: "09:00 – 17:00" },
    { day: "Sunday", hours: "Closed" },
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
  hero: "/Zenizz.png",
  about: "/gallery-yusuf-working.jpg",
  aboutSecondary: "/gallery-yusuf-client.jpg",
  services: "/gallery-window-cut.jpg",
  cta: "/gallery-mirrors-fade.jpg",
} as const;
