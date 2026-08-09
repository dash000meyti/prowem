import type { Reward } from "@/types";

export const rewards: Reward[] = [
  {
    id: "rwd-digital-badge",
    title: "Klassiker Digital Badge",
    description: "Animated badge for your fan profile celebrating Der Klassiker night.",
    xpCost: 500,
    category: "Digital",
    stock: 5000,
  },
  {
    id: "rwd-wallpaper-pack",
    title: "Bayern Wallpaper Pack",
    description: "Four lock-screen designs across football, socca and Dota 2.",
    xpCost: 500,
    category: "Digital",
    stock: 10000,
  },
  {
    id: "rwd-scarf-voucher",
    title: "Scarf Shop Voucher",
    description: "€15 credit toward any Bundesliga or club scarf in the store.",
    xpCost: 1500,
    category: "Merch",
    stock: 800,
  },
  {
    id: "rwd-seat-upgrade",
    title: "Matchday Seat Upgrade",
    description: "One-time upgrade to a premium sightline for a remaining fixture.",
    xpCost: 3000,
    category: "Experience",
    stock: 120,
  },
  {
    id: "rwd-meet-greet",
    title: "Player Tunnel Access",
    description: "Pre-match tunnel walk and photo opportunity on Klassiker weekend.",
    xpCost: 5000,
    category: "Experience",
    stock: 40,
  },
  {
    id: "rwd-signed-ball",
    title: "Signed Match Ball",
    description: "Match ball signed by captains from Der Klassiker night.",
    xpCost: 5000,
    category: "Merch",
    stock: 25,
  },
  {
    id: "rwd-vip-klassiker",
    title: "Klassiker VIP Pass",
    description: "Hospitality access for a future Bayern vs Dortmund fixture.",
    xpCost: 10000,
    category: "Experience",
    stock: 15,
  },
  {
    id: "rwd-bayern-home-kit",
    title: "Bayern Home Jersey",
    description: "Official FC Bayern Munich home shirt — adidas partnership edition.",
    xpCost: 10000,
    category: "Merch",
    stock: 30,
  },
  {
    id: "rwd-training-day",
    title: "Open Training Invite",
    description: "Watch Bayern train and meet staff the morning after Matchday.",
    xpCost: 7500,
    category: "Experience",
    stock: 20,
  },
  {
    id: "rwd-dortmund-scarf",
    title: "Yellow Wall Scarf",
    description: "Official Borussia Dortmund scarf from the Signal Iduna collection.",
    xpCost: 2000,
    category: "Merch",
    stock: 200,
  },
  {
    id: "rwd-dota-jersey",
    title: "Bayern Dota 2 Stage Jersey",
    description: "Esports stage jersey worn in club colours — limited TI drop.",
    xpCost: 3000,
    category: "Merch",
    stock: 60,
  },
];

export function getRewardById(id: string) {
  return rewards.find((r) => r.id === id);
}

export function getRewardsByCategory(category: string) {
  return rewards.filter((r) => r.category === category);
}
