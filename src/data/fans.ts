import type { Fan } from "@/types";

export const fans: Fan[] = [
  {
    id: "fan-alex",
    slug: "alex-morgan",
    name: "Alex Morgan",
    level: 18,
    xp: 12840,
    xpToNext: 16000,
    status: "SUPER FAN",
    city: "Munich",
    followedClubIds: ["club-bayern", "club-dortmund"],
    followedTeamIds: [
      "team-bayern-fc",
      "team-bayern-socca",
      "team-bayern-dota2",
      "team-dortmund-fc",
    ],
    followedEventIds: [
      "evt-bundesliga",
      "evt-socca-austria-pro",
      "evt-the-international",
    ],
    favoritePlayerIds: [
      "player-kane",
      "player-musiala",
      "player-guirassy",
      "player-bayern-carry",
    ],
    completedMissionIds: [
      "mis-watch-opener",
      "mis-predict-md",
      "mis-quiz-bundesliga",
      "mis-check-in-arena",
    ],
    achievementIds: [
      "ach-first-checkin",
      "ach-klassiker-night",
      "ach-multi-arena",
      "ach-prediction-streak",
    ],
    attendedEventIds: ["evt-bundesliga"],
    matchesWatched: 14,
    predictionsCorrect: 9,
  },
];

export function getFanById(id: string) {
  return fans.find((f) => f.id === id);
}

export function getFanBySlug(slug: string) {
  return fans.find((f) => f.slug === slug);
}
