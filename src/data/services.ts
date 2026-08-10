export type ServiceEntry = {
  id: string;
  duration: string;
  price: string;
  category: "cut" | "beard" | "ritual" | "combo";
};

export const services: ServiceEntry[] = [
  { id: "signature-cut", duration: "45 min", price: "€45", category: "cut" },
  { id: "precision-fade", duration: "50 min", price: "€48", category: "cut" },
  { id: "scissor-cut", duration: "55 min", price: "€52", category: "cut" },
  { id: "beard-sculpt", duration: "30 min", price: "€28", category: "beard" },
  { id: "hot-towel-shave", duration: "35 min", price: "€38", category: "ritual" },
  { id: "cut-beard", duration: "70 min", price: "€68", category: "combo" },
  { id: "zenizz-ritual", duration: "90 min", price: "€95", category: "ritual" },
  { id: "junior-cut", duration: "30 min", price: "€28", category: "cut" },
];

export const serviceCategories = [
  { id: "cut" },
  { id: "beard" },
  { id: "ritual" },
  { id: "combo" },
] as const;
