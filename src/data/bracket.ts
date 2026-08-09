import type { BracketMatch } from "@/types";

/** The International knockout bracket (mock) */
export const bracket: BracketMatch[] = [
  {
    id: "brk-qf-1",
    round: "qf",
    homeTeamId: "team-bayern-dota2",
    awayTeamId: "team-og-dota2",
    homeScore: 2,
    awayScore: 0,
    winnerId: "team-bayern-dota2",
    matchId: undefined,
    label: "UB Quarter — Bayern vs OG",
  },
  {
    id: "brk-qf-2",
    round: "qf",
    homeTeamId: "team-dortmund-dota2",
    awayTeamId: "team-gaimin-dota2",
    homeScore: 2,
    awayScore: 1,
    winnerId: "team-dortmund-dota2",
    label: "UB Quarter — Dortmund vs GG",
  },
  {
    id: "brk-qf-3",
    round: "qf",
    homeTeamId: "team-liquid-dota2",
    awayTeamId: "team-spirit-dota2",
    homeScore: 1,
    awayScore: 2,
    winnerId: "team-spirit-dota2",
    matchId: "match-liquid-spirit",
    label: "UB Quarter — Liquid vs Spirit",
  },
  {
    id: "brk-sf-1",
    round: "sf",
    homeTeamId: "team-bayern-dota2",
    awayTeamId: "team-dortmund-dota2",
    homeScore: 2,
    awayScore: 1,
    winnerId: "team-bayern-dota2",
    matchId: "match-bayern-dortmund-dota",
    label: "UB Semi — Bayern vs Dortmund",
  },
  {
    id: "brk-sf-2",
    round: "sf",
    homeTeamId: "team-spirit-dota2",
    awayTeamId: "team-liquid-dota2",
    homeScore: 2,
    awayScore: 0,
    winnerId: "team-spirit-dota2",
    label: "UB Semi — Spirit advance",
  },
  {
    id: "brk-final",
    round: "final",
    homeTeamId: "team-spirit-dota2",
    awayTeamId: "team-bayern-dota2",
    matchId: "match-ti-final",
    label: "Grand Final — Spirit vs Bayern",
  },
];

export function getBracketByRound(round: BracketMatch["round"]) {
  return bracket.filter((b) => b.round === round);
}

export function getBracketMatchById(id: string) {
  return bracket.find((b) => b.id === id);
}
