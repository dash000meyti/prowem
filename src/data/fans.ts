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
    city: "Berlin",
    followedClubIds: ["club-nexus", "club-berlin-united"],
    followedTeamIds: [
      "team-nexus-fc",
      "team-nexus-dota2",
      "team-nexus-socca",
      "team-berlin-united",
    ],
    followedEventIds: ["evt-nova-cup-2026"],
    favoritePlayerIds: [
      "player-samuel-oke",
      "player-marco-vesa",
      "player-lena-voss",
      "player-luka-petrov",
    ],
    completedMissionIds: [
      "mis-watch-opener",
      "mis-predict-qf",
      "mis-quiz-nova",
      "mis-check-in-arena",
    ],
    achievementIds: [
      "ach-first-checkin",
      "ach-derby-night",
      "ach-multi-arena",
      "ach-prediction-streak",
    ],
    attendedEventIds: ["evt-nova-cup-2026"],
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
