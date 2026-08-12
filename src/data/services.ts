export type ServiceEntry = {
  id: string;
  price: string;
  durationMinutes: number;
};

export const services: ServiceEntry[] = [
  { id: "haircut", price: "€27.50", durationMinutes: 30 },
  { id: "beard", price: "€17.50", durationMinutes: 20 },
  { id: "cut-beard", price: "€42.50", durationMinutes: 45 },
  { id: "kids-cut", price: "€20.00", durationMinutes: 25 },
];
