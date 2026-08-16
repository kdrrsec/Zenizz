export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: "interior" | "cuts" | "details" | "atmosphere";
};

export type OpeningHours = {
  day: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
  hours: string | null;
};

export type AddOnEntry = {
  id: string;
  price: string;
  durationMinutes: number;
};

export type SiteConfig = {
  name: string;
  url: string;
  email: string;
  phone: string;
  phoneHref: string;
  googleMapsCid: string;
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
