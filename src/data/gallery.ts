import type { GalleryItem } from "@/types";

// Echte foto's uit de Instagram-feed van Yusuf Zencirkiran (@yusuf_zencirkran).
// Volgorde is bewust gekozen: de eerste items vullen de bredere/kortere
// vakken in de homepage-preview, dus die krijgen foto's met wat meer
// omgeving/ruimte zodat een center-crop niet meteen gezichten wegsnijdt.
export const gallery: GalleryItem[] = [
  {
    id: "g1",
    src: "/gallery-yusuf-client.jpg",
    alt: "Yusuf met een tevreden klant in de zaak",
    category: "atmosphere",
    span: "tall",
    focus: "center 15%",
  },
  {
    id: "g2",
    src: "/gallery-yusuf-working.jpg",
    alt: "Yusuf aan het werk in de zaak, onder de kenmerkende hexagon-plafondverlichting",
    category: "interior",
    span: "wide",
    focus: "center 30%",
  },
  {
    id: "g3",
    src: "/gallery-buzz-fade.jpg",
    alt: "Strakke buzz fade in profiel",
    category: "cuts",
    span: "tall",
  },
  {
    id: "g4",
    src: "/gallery-comb-detail.jpg",
    alt: "Detail van het kammen tijdens het knippen",
    category: "details",
  },
  {
    id: "g5",
    src: "/gallery-slick-cut.jpg",
    alt: "Slick back knipbeurt in profiel",
    category: "cuts",
  },
  {
    id: "g6",
    src: "/gallery-barberpole-trim.jpg",
    alt: "Barberpaal en trimmer in actie",
    category: "atmosphere",
    focus: "center 35%",
  },
  {
    id: "g7",
    src: "/gallery-fade-detail.jpg",
    alt: "Close-up van een verse fade van achteren",
    category: "cuts",
    span: "tall",
  },
  {
    id: "g8",
    src: "/gallery-texture-cut.jpg",
    alt: "Textuurknipbeurt met natuurlijke beweging",
    category: "details",
  },
];
