export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  category: "cut" | "beard" | "ritual" | "combo";
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
};

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: "interior" | "cuts" | "details" | "atmosphere";
  span?: "tall" | "wide" | "normal";
  /** CSS object-position, for source photos where a plain center-crop cuts off the subject. */
  focus?: string;
};

export type Review = {
  id: string;
  name: string;
  text: string;
  rating: number;
  date: string;
};

export type OpeningHours = {
  day: string;
  hours: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  phoneHref: string;
  address: {
    street: string;
    city: string;
    postal: string;
    country: string;
  };
  social: {
    instagram: string;
    facebook: string;
  };
  openingHours: OpeningHours[];
};
