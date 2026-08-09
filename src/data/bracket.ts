import type { BracketMatch } from "@/types";

export const bracket: BracketMatch[] = [
  // ——— Quarter Finals ———
  {
    id: "brk-qf-1",
    round: "qf",
    homeTeamId: "team-nexus-fc",
    awayTeamId: "team-lisbon-tide",
    homeScore: 3,
    awayScore: 1,
    winnerId: "team-nexus-fc",
    matchId: "match-qf1-nexus-lisbon",
    label: "QF 1",
  },
  {
    id: "brk-qf-2",
    round: "qf",
    homeTeamId: "team-berlin-united",
    awayTeamId: "team-vienna-pulse",
    homeScore: 2,
    awayScore: 0,
    winnerId: "team-berlin-united",
    matchId: "match-qf2-berlin-vienna",
    label: "QF 2",
  },
  {
    id: "brk-qf-3",
    round: "qf",
    homeTeamId: "team-berlin-wolves",
    awayTeamId: "team-amsterdam-ridge",
    homeScore: 2,
    awayScore: 1,
    winnerId: "team-berlin-wolves",
    matchId: "match-qf3-wolves-amsterdam",
    label: "QF 3",
  },
  {
    id: "brk-qf-4",
    round: "qf",
    homeTeamId: "team-hamburg-united",
    awayTeamId: "team-prague-signal",
    homeScore: 1,
    awayScore: 0,
    winnerId: "team-hamburg-united",
    matchId: "match-qf4-hamburg-prague",
    label: "QF 4",
  },
  {
    id: "brk-qf-5",
    round: "qf",
    homeTeamId: "team-munich-stars",
    awayTeamId: "team-warsaw-north",
    homeScore: 3,
    awayScore: 2,
    winnerId: "team-munich-stars",
    matchId: "match-qf5-munich-warsaw",
    label: "QF 5",
  },
  {
    id: "brk-qf-6",
    round: "qf",
    homeTeamId: "team-paris-elite",
    awayTeamId: "team-oslo-frost",
    homeScore: 2,
    awayScore: 1,
    winnerId: "team-paris-elite",
    matchId: "match-qf6-paris-oslo",
    label: "QF 6",
  },
  {
    id: "brk-qf-7",
    round: "qf",
    homeTeamId: "team-milan-forge",
    awayTeamId: "team-stockholm-iron",
    homeScore: 2,
    awayScore: 0,
    winnerId: "team-milan-forge",
    matchId: "match-qf7-milan-stockholm",
    label: "QF 7",
  },
  {
    id: "brk-qf-8",
    round: "qf",
    homeTeamId: "team-copenhagen-harbor",
    awayTeamId: "team-zurich-altitude",
    homeScore: 1,
    awayScore: 1,
    winnerId: "team-copenhagen-harbor",
    matchId: "match-qf8-copenhagen-zurich",
    label: "QF 8 · Pens",
  },

  // ——— Semi Finals (live) ———
  {
    id: "brk-sf-1",
    round: "sf",
    homeTeamId: "team-nexus-fc",
    awayTeamId: "team-berlin-united",
    homeScore: 2,
    awayScore: 1,
    matchId: "match-nexus-berlin",
    label: "SF 1 · LIVE",
  },
  {
    id: "brk-sf-2",
    round: "sf",
    homeTeamId: "team-munich-stars",
    awayTeamId: "team-paris-elite",
    homeScore: 2,
    awayScore: 2,
    matchId: "match-munich-paris",
    label: "SF 2 · LIVE",
  },

  // ——— Final (awaiting SF winners) ———
  {
    id: "brk-final",
    round: "final",
    matchId: "match-final-nova",
    label: "Final · 21 Jun",
  },
];

export function getBracketByRound(round: BracketMatch["round"]) {
  return bracket.filter((b) => b.round === round);
}

export function getBracketMatchById(id: string) {
  return bracket.find((b) => b.id === id);
}
