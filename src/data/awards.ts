import type { Award } from "@/types";

export const awards: Award[] = [
  {
    id: "awd-golden-boot-2025",
    name: "NOVA Golden Boot",
    season: "2025",
    description: "Top scorer across the previous NOVA CUP cycle.",
    winnerName: "Marco Vesa",
    winnerType: "player",
    eventId: "evt-nova-cup-2026",
    clubId: "club-nexus",
  },
  {
    id: "awd-player-tournament-2025",
    name: "Player of the Tournament",
    season: "2025",
    description: "Most influential performer judged by panel and fan vote.",
    winnerName: "Leon Hartmann",
    winnerType: "player",
    eventId: "evt-nova-cup-2026",
    clubId: "club-munich-stars",
  },
  {
    id: "awd-club-community-2025",
    name: "Community Club Award",
    season: "2025",
    description: "Recognised for fan engagement, academy access and city programmes.",
    winnerName: "NEXUS",
    winnerType: "club",
    clubId: "club-nexus",
  },
  {
    id: "awd-best-goal-2025",
    name: "Goal of the Festival",
    season: "2025",
    description: "The strike that defined last year’s knockout nights.",
    winnerName: "Adrien Morel",
    winnerType: "player",
    eventId: "evt-nova-cup-2026",
    clubId: "club-paris-elite",
  },
  {
    id: "awd-defensive-unit-2025",
    name: "Iron Wall",
    season: "2025",
    description: "Best defensive unit by clean sheets and expected goals against.",
    winnerName: "Stockholm Iron",
    winnerType: "team",
    eventId: "evt-nova-cup-2026",
    clubId: "club-stockholm-iron",
  },
  {
    id: "awd-rising-star-2025",
    name: "Rising Star",
    season: "2025",
    description: "Breakout talent under 23 across the competition.",
    winnerName: "Felix Brandt",
    winnerType: "player",
    eventId: "evt-nova-cup-2026",
    clubId: "club-nexus",
  },
  {
    id: "awd-esports-clutch-2025",
    name: "Clutch Series Award",
    season: "2025",
    description: "Awarded to the NEXUS Dota 2 core for late-game series wins.",
    winnerName: "NEXUS Dota 2",
    winnerType: "team",
    clubId: "club-nexus",
  },
];

export function getAwardById(id: string) {
  return awards.find((a) => a.id === id);
}

export function getAwardsByClubId(clubId: string) {
  return awards.filter((a) => a.clubId === clubId);
}

export function getAwardsByEventId(eventId: string) {
  return awards.filter((a) => a.eventId === eventId);
}
