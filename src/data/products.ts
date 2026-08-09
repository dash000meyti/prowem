import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prd-nexus-home-jersey",
    name: "NEXUS FC Home Jersey 2026",
    price: 89,
    category: "Jerseys",
    clubId: "club-nexus",
    description:
      "Teal primary with lime accent trim — the football kit of NEXUS’ multi-sport identity.",
  },
  {
    id: "prd-nexus-away-jersey",
    name: "NEXUS FC Away Jersey 2026",
    price: 89,
    category: "Jerseys",
    clubId: "club-nexus",
    description: "Night secondary base with teal numbering for away knockout nights.",
  },
  {
    id: "prd-berlin-united-jersey",
    name: "Berlin United Home Jersey",
    price: 85,
    category: "Jerseys",
    clubId: "club-berlin-united",
    description: "Capital blue home shirt — derby ready for NOVA CUP nights.",
  },
  {
    id: "prd-nova-scarf",
    name: "NOVA CUP 2026 Festival Scarf",
    price: 32,
    category: "Scarves",
    description: "Orange and black woven scarf marking sixteen teams in one city.",
  },
  {
    id: "prd-nexus-scarf",
    name: "NEXUS Dual-Arena Scarf",
    price: 34,
    category: "Scarves",
    clubId: "club-nexus",
    description: "Football on one face, Dota 2 mark on the reverse — one club, two arenas.",
  },
  {
    id: "prd-nova-cap",
    name: "NOVA CUP Snapback",
    price: 28,
    category: "Caps",
    description: "Structured snapback with embroidered NOVA wordmark.",
  },
  {
    id: "prd-nexus-cap",
    name: "NEXUS Training Cap",
    price: 30,
    category: "Caps",
    clubId: "club-nexus",
    description: "Lightweight cap in club teal — built for warm-up to full-time.",
  },
  {
    id: "prd-vesa-limited",
    name: "Vesa 9 Limited Print Jersey",
    price: 120,
    category: "Jerseys",
    limited: true,
    clubId: "club-nexus",
    description:
      "Numbered run of Marco Vesa’s No.9 shirt — only 250 pieces for semi-final week.",
  },
  {
    id: "prd-dota-stage-jersey",
    name: "NEXUS Dota 2 Stage Jersey",
    price: 79,
    category: "Jerseys",
    limited: true,
    clubId: "club-nexus",
    description: "Lime-on-black esports jersey as worn on the NEXUS stage.",
  },
  {
    id: "prd-munich-scarf",
    name: "Munich Stars Gold Scarf",
    price: 30,
    category: "Scarves",
    clubId: "club-munich-stars",
    description: "Gold-trim scarf for Stars fans chasing another final night.",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByClubId(clubId: string) {
  return products.filter((p) => p.clubId === clubId);
}

export function getProductsByCategory(category: string) {
  return products.filter((p) => p.category === category);
}
