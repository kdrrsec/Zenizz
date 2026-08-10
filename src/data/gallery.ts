import type { GalleryItem } from "@/types";

// Echte kapsel/knip-detailfoto's uit de Instagram-feed van Yusuf Zencirkiran.
// Bewust alleen haircut-close-ups hier — geen sfeer-/portretfoto's — en
// getoond zonder bijsnijden zodat elke foto volledig zichtbaar blijft.
export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "/gallery-buzz-fade.jpg",
    alt: "Strakke buzz fade in profiel",
    category: "cuts",
  },
  {
    id: "g2",
    src: "/gallery-fade-detail.jpg",
    alt: "Close-up van een verse fade van achteren",
    category: "cuts",
  },
  {
    id: "g3",
    src: "/gallery-mirrors-fade.jpg",
    alt: "Fade van achteren in de zaak",
    category: "cuts",
  },
  {
    id: "g4",
    src: "/gallery-slick-cut.jpg",
    alt: "Slick back knipbeurt in profiel",
    category: "cuts",
  },
  {
    id: "g5",
    src: "/gallery-texture-cut.jpg",
    alt: "Textuurknipbeurt met natuurlijke beweging",
    category: "details",
  },
  {
    id: "g6",
    src: "/gallery-comb-detail.jpg",
    alt: "Detail van het kammen tijdens het knippen",
    category: "details",
  },
];
