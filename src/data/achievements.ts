import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "ach-first-checkin",
    name: "First Check-In",
    description: "Confirmed attendance at a Bundesliga venue for the first time.",
    icon: "check-in",
  },
  {
    id: "ach-klassiker-night",
    name: "Klassiker Night",
    description: "Watched Der Klassiker live from kickoff deep into the second half.",
    icon: "derby",
  },
  {
    id: "ach-multi-arena",
    name: "Multi-Arena Fan",
    description: "Followed a club across football, socca and Dota 2 in one season.",
    icon: "layers",
  },
  {
    id: "ach-prediction-streak",
    name: "Prediction Streak",
    description: "Landed three correct match predictions in a row.",
    icon: "streak",
  },
  {
    id: "ach-bundesliga-title",
    name: "Title Chase",
    description: "Supported a club sitting top of the Bundesliga table.",
    icon: "trophy",
  },
  {
    id: "ach-yellow-wall",
    name: "Yellow Wall Voice",
    description: "Engaged with Dortmund content on a Matchday.",
    icon: "wall",
  },
  {
    id: "ach-green-white",
    name: "Grün-Weiß Heart",
    description: "Followed Werder Bremen through a home Matchday.",
    icon: "leaf",
  },
  {
    id: "ach-nordderby",
    name: "Northern Rival",
    description: "Completed a northern Germany rivalry mission.",
    icon: "anchor",
  },
  {
    id: "ach-merlus-cage",
    name: "Merlus in the Cage",
    description: "Followed FC Lorient Socca in Socca Austria Pro League.",
    icon: "fish",
  },
  {
    id: "ach-live-triple",
    name: "Triple Live",
    description: "Opened three concurrent live matches on Matchday.",
    icon: "live",
  },
  {
    id: "ach-sponsor-complete",
    name: "Partner Champion",
    description: "Finished a title or gold sponsor challenge during the event.",
    icon: "partner",
  },
  {
    id: "ach-shop-first",
    name: "First Kit",
    description: "Redeemed XP or purchased an official jersey from the shop.",
    icon: "shirt",
  },
  {
    id: "ach-super-fan",
    name: "Super Fan Status",
    description: "Reached SUPER FAN status at level 15 or higher.",
    icon: "crown",
  },
];

export function getAchievementById(id: string) {
  return achievements.find((a) => a.id === id);
}
