import type { BracketMatch } from "@/types";

const TI_EVENT = "evt-the-international";

/**
 * The International knockout (mock double-elim).
 * Upper: 4 teams → UB Semi → Grand Final
 * Lower: Liquid/Spirit → LB Final (Dortmund drops from UB) → Grand Final
 */
export const bracket: BracketMatch[] = [
  {
    id: "brk-ub-qf-1",
    eventId: TI_EVENT,
    round: "qf",
    bracketSide: "upper",
    homeTeamId: "team-bayern-dota2",
    awayTeamId: "team-og-dota2",
    homeScore: 2,
    awayScore: 0,
    winnerId: "team-bayern-dota2",
    matchId: undefined,
    label: "UB Quarter — Bayern vs OG",
    roundLabel: "UB QUARTER",
    scheduledAt: "2024-09-08T14:00:00Z",
    feedsIntoId: "brk-ub-sf",
  },
  {
    id: "brk-ub-qf-2",
    eventId: TI_EVENT,
    round: "qf",
    bracketSide: "upper",
    homeTeamId: "team-dortmund-dota2",
    awayTeamId: "team-gaimin-dota2",
    homeScore: 2,
    awayScore: 1,
    winnerId: "team-dortmund-dota2",
    label: "UB Quarter — Dortmund vs GG",
    roundLabel: "UB QUARTER",
    scheduledAt: "2024-09-08T18:00:00Z",
    feedsIntoId: "brk-ub-sf",
  },
  {
    id: "brk-ub-sf",
    eventId: TI_EVENT,
    round: "sf",
    bracketSide: "upper",
    homeTeamId: "team-bayern-dota2",
    awayTeamId: "team-dortmund-dota2",
    homeScore: 2,
    awayScore: 1,
    winnerId: "team-bayern-dota2",
    matchId: "match-bayern-dortmund-dota",
    label: "UB Semi — Bayern vs Dortmund",
    roundLabel: "UB SEMI",
    scheduledAt: "2024-09-13T15:00:00Z",
    feedsIntoId: "brk-final",
  },
  {
    id: "brk-lb-qf",
    eventId: TI_EVENT,
    round: "qf",
    bracketSide: "lower",
    homeTeamId: "team-liquid-dota2",
    awayTeamId: "team-spirit-dota2",
    homeScore: 1,
    awayScore: 2,
    winnerId: "team-spirit-dota2",
    matchId: "match-liquid-spirit",
    label: "LB Quarter — Liquid vs Spirit",
    roundLabel: "LB QUARTER",
    scheduledAt: "2024-09-09T16:00:00Z",
    feedsIntoId: "brk-lb-final",
  },
  {
    id: "brk-lb-final",
    eventId: TI_EVENT,
    round: "sf",
    bracketSide: "lower",
    homeTeamId: "team-spirit-dota2",
    awayTeamId: "team-dortmund-dota2",
    homeScore: 2,
    awayScore: 0,
    winnerId: "team-spirit-dota2",
    label: "LB Final — Spirit vs Dortmund",
    roundLabel: "LB FINAL",
    scheduledAt: "2024-09-13T19:00:00Z",
    feedsIntoId: "brk-final",
  },
  {
    id: "brk-final",
    eventId: TI_EVENT,
    round: "final",
    bracketSide: "upper",
    homeTeamId: "team-spirit-dota2",
    awayTeamId: "team-bayern-dota2",
    matchId: "match-ti-final",
    label: "Grand Final — Spirit vs Bayern",
    roundLabel: "GRAND FINAL",
    scheduledAt: "2024-09-15T17:00:00Z",
  },
];

export function getBracketByRound(round: BracketMatch["round"]) {
  return bracket.filter((b) => b.round === round);
}

export function getBracketMatchById(id: string) {
  return bracket.find((b) => b.id === id);
}

export function getBracketForEvent(eventId: string): BracketMatch[] {
  return bracket.filter((b) => b.eventId === eventId);
}
