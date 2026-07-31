import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "signature-cut",
    name: "Signature Cut",
    description:
      "Een op maat gemaakte knipbeurt met fade of schaarwerk, afgewerkt met hot towel en neck shave.",
    duration: "45 min",
    price: "€45",
    category: "cut",
  },
  {
    id: "precision-fade",
    name: "Precision Fade",
    description:
      "Strakke fades met aandacht voor textuur, vorm en balans — van skin fade tot soft taper.",
    duration: "50 min",
    price: "€48",
    category: "cut",
  },
  {
    id: "scissor-cut",
    name: "Scissor Cut",
    description:
      "Volledig schaarwerk voor medium lengtes. Soft layers, beweging en natuurlijke flow.",
    duration: "55 min",
    price: "€52",
    category: "cut",
  },
  {
    id: "beard-sculpt",
    name: "Beard Sculpt",
    description:
      "Baardvorming met trimmer en scheermes, inclusief hot towel en verzorgende aftercare.",
    duration: "30 min",
    price: "€28",
    category: "beard",
  },
  {
    id: "hot-towel-shave",
    name: "Hot Towel Shave",
    description:
      "Klassieke straight razor shave met warme handdoeken, rijke lather en cold towel finish.",
    duration: "35 min",
    price: "€38",
    category: "ritual",
  },
  {
    id: "cut-beard",
    name: "Cut & Beard",
    description:
      "Signature knipbeurt gecombineerd met baardsculptuur — de complete grooming ritual.",
    duration: "70 min",
    price: "€68",
    category: "combo",
  },
  {
    id: "zenizz-ritual",
    name: "ZENIZZ Ritual",
    description:
      "Ons signature traject: consult, cut, beard of shave, scalp massage en styling finish.",
    duration: "90 min",
    price: "€95",
    category: "ritual",
  },
  {
    id: "junior-cut",
    name: "Junior Cut",
    description:
      "Voor jongens tot 12 jaar. Geduldig, precies en in een rustig tempo.",
    duration: "30 min",
    price: "€28",
    category: "cut",
  },
];

export const serviceCategories = [
  { id: "cut", label: "Cuts" },
  { id: "beard", label: "Beard" },
  { id: "ritual", label: "Rituals" },
  { id: "combo", label: "Combinaties" },
] as const;
