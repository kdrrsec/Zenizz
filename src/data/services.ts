export type ServiceEntry = {
  id: string;
  price: string;
};

export const services: ServiceEntry[] = [
  { id: "haircut", price: "€27.50" },
  { id: "beard", price: "€17.50" },
  { id: "cut-beard", price: "€42.50" },
  { id: "kids-cut", price: "€20.00" },
];
