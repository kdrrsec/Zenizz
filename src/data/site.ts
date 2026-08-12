import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "ZENIZZ",
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
    { day: "monday", hours: "10:00–22:00" },
    { day: "tuesday", hours: "10:00–22:00" },
    { day: "wednesday", hours: "10:00–22:00" },
    { day: "thursday", hours: "10:00–22:00" },
    { day: "friday", hours: "10:00–22:00" },
    { day: "saturday", hours: "10:00–22:00" },
    { day: "sunday", hours: null },
  ],
};

export const navigation = [
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "team", href: "/team" },
  { key: "gallery", href: "/gallery" },
  { key: "contact", href: "/contact" },
] as const;

export const images = {
  hero: "/Zenizz.png",
  about: "/gallery-yusuf-working.jpg",
  aboutSecondary: "/gallery-yusuf-client.jpg",
  services: "/gallery-window-cut.jpg",
  cta: "/gallery-mirrors-fade.jpg",
} as const;
