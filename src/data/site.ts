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
    instagram: "https://www.instagram.com/yusuf_zencirkran/",
    facebook: "https://www.facebook.com/yusuf.zencirkiran.77/",
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
  /** Hero triptych — color-matched editorial set from Yusuf’s public feed */
  hero: "/media/hero-left.jpg",
  heroLeft: "/media/hero-left.jpg",
  heroDetail: "/media/hero-detail.jpg",
  heroStory: "/media/hero-story.jpg",
  about: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1600&q=80",
  aboutSecondary:
    "https://images.unsplash.com/photo-1633681926022-84c1038a2c84?auto=format&fit=crop&w=1200&q=80",
  services:
    "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1400&q=80",
  cta: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=80",
  contact:
    "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=80",
} as const;
