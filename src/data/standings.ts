import type { StandingRow } from "@/types";

/** Bundesliga mock table — Matchday ~12 */
export const standings: StandingRow[] = [
  { position: 1, teamId: "team-bayern-fc", played: 11, wins: 9, draws: 1, losses: 1, goalsFor: 32, goalsAgainst: 10, points: 28 },
  { position: 2, teamId: "team-leverkusen-fc", played: 11, wins: 7, draws: 3, losses: 1, goalsFor: 24, goalsAgainst: 12, points: 24 },
  { position: 3, teamId: "team-dortmund-fc", played: 11, wins: 7, draws: 2, losses: 2, goalsFor: 26, goalsAgainst: 14, points: 23 },
  { position: 4, teamId: "team-leipzig-fc", played: 11, wins: 6, draws: 3, losses: 2, goalsFor: 22, goalsAgainst: 13, points: 21 },
  { position: 5, teamId: "team-stuttgart-fc", played: 11, wins: 6, draws: 2, losses: 3, goalsFor: 21, goalsAgainst: 15, points: 20 },
  { position: 6, teamId: "team-frankfurt-fc", played: 11, wins: 5, draws: 4, losses: 2, goalsFor: 20, goalsAgainst: 16, points: 19 },
  { position: 7, teamId: "team-freiburg-fc", played: 11, wins: 4, draws: 3, losses: 4, goalsFor: 15, goalsAgainst: 17, points: 15 },
  { position: 8, teamId: "team-werder-fc", played: 11, wins: 3, draws: 4, losses: 4, goalsFor: 16, goalsAgainst: 19, points: 13 },
  { position: 9, teamId: "team-union-fc", played: 11, wins: 3, draws: 3, losses: 5, goalsFor: 12, goalsAgainst: 18, points: 12 },
  { position: 10, teamId: "team-wolfsburg-fc", played: 11, wins: 2, draws: 4, losses: 5, goalsFor: 14, goalsAgainst: 20, points: 10 },
  { position: 11, teamId: "team-gladbach-fc", played: 11, wins: 2, draws: 2, losses: 7, goalsFor: 13, goalsAgainst: 24, points: 8 },
];

/** Socca Austria Pro League table */
export const soccaStandings: StandingRow[] = [
  { position: 1, teamId: "team-bayern-socca", played: 8, wins: 6, draws: 1, losses: 1, goalsFor: 38, goalsAgainst: 22, points: 19 },
  { position: 2, teamId: "team-dortmund-socca", played: 8, wins: 5, draws: 2, losses: 1, goalsFor: 36, goalsAgainst: 24, points: 17 },
  { position: 3, teamId: "team-lorient-socca", played: 8, wins: 4, draws: 1, losses: 3, goalsFor: 31, goalsAgainst: 28, points: 13 },
  { position: 4, teamId: "team-vienna-meridians-socca", played: 8, wins: 3, draws: 2, losses: 3, goalsFor: 27, goalsAgainst: 26, points: 11 },
  { position: 5, teamId: "team-werder-socca", played: 8, wins: 2, draws: 3, losses: 3, goalsFor: 25, goalsAgainst: 28, points: 9 },
  { position: 6, teamId: "team-vienna-pulse-socca", played: 8, wins: 2, draws: 1, losses: 5, goalsFor: 22, goalsAgainst: 33, points: 7 },
  { position: 7, teamId: "team-vienna-iron-socca", played: 8, wins: 1, draws: 0, losses: 7, goalsFor: 18, goalsAgainst: 36, points: 3 },
];

export function getStandingByTeamId(teamId: string) {
  return (
    standings.find((s) => s.teamId === teamId) ??
    soccaStandings.find((s) => s.teamId === teamId)
  );
}

export function getStandingsForEventId(eventId: string) {
  if (eventId === "evt-socca-austria-pro") {
    return [...soccaStandings].sort((a, b) => a.position - b.position);
  }
  return [...standings].sort((a, b) => a.position - b.position);
}
