import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  {
    id: "ach-first-checkin",
    name: "First Check-In",
    description: "Confirmed attendance at a NOVA CUP venue for the first time.",
    icon: "check-in",
  },
  {
    id: "ach-derby-night",
    name: "Derby Night",
    description: "Watched a Berlin derby fixture live from kickoff to the final whistle.",
    icon: "derby",
  },
  {
    id: "ach-multi-arena",
    name: "Multi-Arena Fan",
    description: "Followed NEXUS across football, socca and Dota 2 in one season.",
    icon: "layers",
  },
  {
    id: "ach-prediction-streak",
    name: "Prediction Streak",
    description: "Landed three correct match predictions in a row.",
    icon: "streak",
  },
  {
    id: "ach-cup-finalist",
    name: "Final Bound",
    description: "Supported a club that reached a NOVA CUP final.",
    icon: "trophy",
  },
  {
    id: "ach-capital-derby",
    name: "Capital Voice",
    description: "Engaged with both Berlin clubs during the same matchday.",
    icon: "city",
  },
  {
    id: "ach-pack-mentality",
    name: "Pack Mentality",
    description: "Completed a Wolves-themed social mission during the festival.",
    icon: "wolf",
  },
  {
    id: "ach-stars-run",
    name: "Stars Run",
    description: "Followed Munich Stars through a knockout winning streak.",
    icon: "star",
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
