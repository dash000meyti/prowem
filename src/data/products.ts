import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prd-bayern-home-jersey",
    name: "Bayern Munich Home Jersey",
    price: 95,
    category: "Jerseys",
    clubId: "club-bayern",
    description: "Official red home shirt with Bavarian identity — adidas partnership.",
  },
  {
    id: "prd-bayern-away-jersey",
    name: "Bayern Munich Away Jersey",
    price: 95,
    category: "Jerseys",
    clubId: "club-bayern",
    description: "Away kit for European and Bundesliga nights on the road.",
  },
  {
    id: "prd-dortmund-home-jersey",
    name: "Borussia Dortmund Home Jersey",
    price: 90,
    category: "Jerseys",
    clubId: "club-dortmund",
    description: "Black and yellow home shirt — Yellow Wall edition.",
  },
  {
    id: "prd-werder-home-jersey",
    name: "Werder Bremen Home Jersey",
    price: 85,
    category: "Jerseys",
    clubId: "club-werder",
    description: "Grün-Weiß home shirt for Weserstadion Matchdays.",
  },
  {
    id: "prd-lorient-socca-kit",
    name: "Lorient Socca Cage Kit",
    price: 72,
    category: "Jerseys",
    clubId: "club-lorient",
    description: "Tangerine and black socca kit for Les Merlus in the Pro League.",
  },
  {
    id: "prd-bundesliga-scarf",
    name: "Bundesliga Matchday Scarf",
    price: 32,
    category: "Scarves",
    description: "Official league scarf for Matchday atmospheres.",
  },
  {
    id: "prd-bayern-scarf",
    name: "Bayern Dual-Arena Scarf",
    price: 34,
    category: "Scarves",
    clubId: "club-bayern",
    description: "Football on one face, Dota 2 mark on the reverse — one club, two arenas.",
  },
  {
    id: "prd-dortmund-scarf",
    name: "Yellow Wall Scarf",
    price: 34,
    category: "Scarves",
    clubId: "club-dortmund",
    description: "Woven black-yellow scarf for Signal Iduna Park nights.",
  },
  {
    id: "prd-bundesliga-cap",
    name: "Bundesliga Snapback",
    price: 28,
    category: "Caps",
    description: "Structured snapback with embroidered Bundesliga wordmark.",
  },
  {
    id: "prd-ti-hoodie",
    name: "The International Stage Hoodie",
    price: 78,
    category: "Apparel",
    limited: true,
    description: "Limited TI stage hoodie — Aegis-inspired detailing.",
  },
  {
    id: "prd-socca-ball",
    name: "Socca Austria Pro Ball",
    price: 42,
    category: "Equipment",
    description: "Official cage ball of the Socca Austria Pro League.",
  },
  {
    id: "prd-werder-scarf",
    name: "Lebenslang Grün-Weiß Scarf",
    price: 30,
    category: "Scarves",
    clubId: "club-werder",
    description: "Classic Werder Bremen supporter scarf.",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByClubId(clubId: string) {
  return products.filter((p) => p.clubId === clubId);
}
