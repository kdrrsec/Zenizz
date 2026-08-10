export type ReviewEntry = {
  id: string;
  name: string;
  rating: number;
};

// Echte, publieke Google-reviews van Zenizz barber (5,0 sterren, 147 reviews).
// Bron: https://www.google.com/maps?cid=7479869037686330595
export const reviews: ReviewEntry[] = [
  { id: "r1", name: "Anadolu Cag Evi", rating: 5 },
  { id: "r2", name: "Cebrail Mankoc", rating: 5 },
  { id: "r3", name: "Yusuf Aydin", rating: 5 },
  { id: "r4", name: "Kaan Güleryüz", rating: 5 },
  { id: "r5", name: "Koray Özkan", rating: 5 },
  { id: "r6", name: "hayati bilici", rating: 5 },
];
