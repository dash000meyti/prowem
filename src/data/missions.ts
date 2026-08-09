import type { Mission } from "@/types";

export const missions: Mission[] = [
  {
    id: "mis-watch-opener",
    title: "Watch the opening night",
    description: "Tune into any Round of 16 fixture on day one of NOVA CUP 2026.",
    xp: 250,
    category: "watch",
    completed: true,
  },
  {
    id: "mis-predict-qf",
    title: "Predict a quarter-final",
    description: "Lock in a winner before kickoff on any QF matchday fixture.",
    xp: 400,
    category: "predict",
    completed: true,
  },
  {
    id: "mis-quiz-nova",
    title: "NOVA CUP knowledge quiz",
    description: "Score at least 4/5 on the festival history quiz.",
    xp: 300,
    category: "quiz",
    completed: true,
  },
  {
    id: "mis-check-in-arena",
    title: "Check in at the district",
    description: "Confirm attendance near Olympiastadion District during matchday.",
    xp: 500,
    category: "attend",
    completed: true,
  },
  {
    id: "mis-watch-semi-live",
    title: "Stay with the semi-final",
    description: "Watch at least 60 live minutes of NEXUS FC vs Berlin United.",
    xp: 600,
    category: "watch",
    rewardLabel: "Semi Final badge",
    completed: false,
  },
  {
    id: "mis-predict-finalist",
    title: "Call the finalists",
    description: "Predict both semi-final winners before the 80th minute.",
    xp: 750,
    category: "predict",
    completed: false,
  },
  {
    id: "mis-sponsor-nova-energy",
    title: "NOVA Energy live challenge",
    description:
      "Complete the title partner challenge: react to three live goal moments during semi-final night.",
    xp: 1000,
    category: "sponsor",
    sponsorId: "spn-nova-energy",
    rewardLabel: "Energy Boost XP ×1.2",
    completed: false,
  },
  {
    id: "mis-share-derby",
    title: "Share the capital derby",
    description: "Share a live moment from NEXUS vs Berlin United to your fan feed.",
    xp: 350,
    category: "social",
    completed: false,
  },
  {
    id: "mis-quiz-nexus",
    title: "Know your NEXUS",
    description: "Answer questions covering football, socca and Dota 2 under one club.",
    xp: 400,
    category: "quiz",
    completed: false,
  },
  {
    id: "mis-volt-wear-kit",
    title: "Volt Wear kit scan",
    description: "Scan a Volt Wear activation code at any NOVA CUP venue partner booth.",
    xp: 450,
    category: "sponsor",
    sponsorId: "spn-volt-wear",
    rewardLabel: "Kit discount token",
    completed: false,
  },
  {
    id: "mis-watch-multi-live",
    title: "Triple screen matchday",
    description: "Open three live matches on Matchday and stay connected for ten minutes.",
    xp: 550,
    category: "watch",
    completed: false,
  },
  {
    id: "mis-apex-predict",
    title: "Apex Bank precision pick",
    description: "Correctly predict the exact score of any live semi-final.",
    xp: 900,
    category: "sponsor",
    sponsorId: "spn-apex-bank",
    rewardLabel: "Gold Partner badge",
    completed: false,
  },
];

export function getMissionById(id: string) {
  return missions.find((m) => m.id === id);
}

export function getMissionsByCategory(category: Mission["category"]) {
  return missions.filter((m) => m.category === category);
}
