import type { Reward } from "@/types";

export const rewards: Reward[] = [
  {
    id: "rwd-digital-badge",
    title: "Semi Final Digital Badge",
    description: "Animated badge for your fan profile celebrating knockout night.",
    xpCost: 500,
    category: "Digital",
    stock: 5000,
  },
  {
    id: "rwd-wallpaper-pack",
    title: "NEXUS Wallpaper Pack",
    description: "Four lock-screen designs across football, socca and Dota 2.",
    xpCost: 500,
    category: "Digital",
    stock: 10000,
  },
  {
    id: "rwd-scarf-voucher",
    title: "Scarf Shop Voucher",
    description: "€15 credit toward any NOVA CUP or club scarf in the store.",
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
    description: "Pre-match tunnel walk and photo opportunity on final day.",
    xpCost: 5000,
    category: "Experience",
    stock: 40,
  },
  {
    id: "rwd-signed-ball",
    title: "Signed Festival Ball",
    description: "Match ball signed by captains from the semi-final night.",
    xpCost: 5000,
    category: "Merch",
    stock: 25,
  },
  {
    id: "rwd-vip-final",
    title: "Final Night VIP Pass",
    description: "Hospitality access for the NOVA CUP 2026 final at Olympiastadion.",
    xpCost: 10000,
    category: "Experience",
    stock: 15,
  },
  {
    id: "rwd-nexus-home-kit",
    title: "NEXUS Home Jersey",
    description: "Official NEXUS FC home shirt — Volt Wear partnership edition.",
    xpCost: 10000,
    category: "Merch",
    stock: 30,
  },
  {
    id: "rwd-training-day",
    title: "Open Training Invite",
    description: "Watch NEXUS FC train and meet staff the morning after the final.",
    xpCost: 7500,
    category: "Experience",
    stock: 20,
  },
  {
    id: "rwd-energy-crate",
    title: "NOVA Energy Fan Crate",
    description: "Limited partner crate with drink, scarf tag and XP booster.",
    xpCost: 1500,
    category: "Partner",
    stock: 400,
  },
  {
    id: "rwd-dota-jersey",
    title: "NEXUS Dota 2 Stage Jersey",
    description: "Esports stage jersey worn in club colours — limited drop.",
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
