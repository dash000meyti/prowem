import type { Award } from "@/types";

export const awards: Award[] = [
  {
    id: "awd-torjager",
    name: "Torjägerkanone",
    season: "2024/25",
    description: "Bundesliga top scorer award.",
    winnerName: "Harry Kane",
    winnerType: "player",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    image: "trophyCup",
  },
  {
    id: "awd-player-season",
    name: "Player of the Season",
    season: "2024/25",
    description: "Voted outstanding Bundesliga performer.",
    winnerName: "Florian Wirtz",
    winnerType: "player",
    eventId: "evt-bundesliga",
    clubId: "club-leverkusen",
    image: "trophyCup",
  },
  {
    id: "awd-socca-mvp",
    name: "Pro League MVP",
    season: "2024/25",
    description: "Most valuable player of Socca Austria Pro League.",
    winnerName: "Felix Kranz",
    winnerType: "player",
    eventId: "evt-socca-austria-pro",
    clubId: "club-bayern",
    image: "trophyCup",
  },
  {
    id: "awd-ti-aegis",
    name: "Aegis of Champions",
    season: "TI13",
    description: "The International championship trophy.",
    winnerName: "TBD — Grand Final",
    winnerType: "team",
    eventId: "evt-the-international",
    image: "trophyCup",
  },
  {
    id: "awd-klassiker-moment",
    name: "Klassiker Moment of the Year",
    season: "2025/26",
    description: "Fan-voted defining moment from Der Klassiker.",
    winnerName: "Jamal Musiala",
    winnerType: "player",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    image: "trophyCup",
  },
  {
    id: "awd-yellow-wall",
    name: "Atmosphere Award",
    season: "2024/25",
    description: "Recognising the loudest home support.",
    winnerName: "Borussia Dortmund",
    winnerType: "club",
    clubId: "club-dortmund",
    image: "trophyCup",
  },
];

export function getAwardById(id: string) {
  return awards.find((a) => a.id === id);
}

export function getAwardsByEventId(eventId: string) {
  return awards.filter((a) => a.eventId === eventId);
}

export function getAwardsByClubId(clubId: string) {
  return awards.filter((a) => a.clubId === clubId);
}
