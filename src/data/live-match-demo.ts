import type { PlayerOfTheMatchStats, StandingRow } from "@/types";

/**
 * Match Center live standings slice — Bayern starts 2nd so Register Goal
 * can animate a leap to 1st (same points, GD flip after the goal).
 */
export const LIVE_STANDINGS_BASE: StandingRow[] = [
  {
    position: 1,
    teamId: "team-leverkusen-fc",
    played: 11,
    wins: 9,
    draws: 1,
    losses: 1,
    goalsFor: 33,
    goalsAgainst: 12,
    points: 28,
  },
  {
    position: 2,
    teamId: "team-bayern-fc",
    played: 11,
    wins: 9,
    draws: 1,
    losses: 1,
    goalsFor: 31,
    goalsAgainst: 10,
    points: 28,
  },
  {
    position: 3,
    teamId: "team-dortmund-fc",
    played: 11,
    wins: 7,
    draws: 2,
    losses: 2,
    goalsFor: 26,
    goalsAgainst: 14,
    points: 23,
  },
  {
    position: 4,
    teamId: "team-leipzig-fc",
    played: 11,
    wins: 6,
    draws: 3,
    losses: 2,
    goalsFor: 22,
    goalsAgainst: 13,
    points: 21,
  },
  {
    position: 5,
    teamId: "team-stuttgart-fc",
    played: 11,
    wins: 6,
    draws: 2,
    losses: 3,
    goalsFor: 21,
    goalsAgainst: 15,
    points: 20,
  },
  {
    position: 6,
    teamId: "team-frankfurt-fc",
    played: 11,
    wins: 5,
    draws: 4,
    losses: 2,
    goalsFor: 20,
    goalsAgainst: 16,
    points: 19,
  },
];

export const MOTM_BASE: PlayerOfTheMatchStats = {
  playerId: "player-kane",
  rating: 8.4,
  minutes: 72,
  goals: 1,
  keyPasses: 2,
  tackles: 1,
  duelsWon: 4,
  passAccuracy: 84,
};

export const MOTM_AFTER_GOAL: PlayerOfTheMatchStats = {
  playerId: "player-kane",
  rating: 9.1,
  minutes: 72,
  goals: 2,
  keyPasses: 3,
  tackles: 1,
  duelsWon: 5,
  passAccuracy: 86,
};

export const LIVE_GOAL_EVENT_ID = "me-bd-goal-72-live";
export const LIVE_GOAL_XP = 150;

export function applyGoalToStandings(rows: StandingRow[]): StandingRow[] {
  const next = rows.map((row) => {
    if (row.teamId !== "team-bayern-fc") return { ...row };
    return { ...row, goalsFor: row.goalsFor + 1 };
  });
  return rankStandings(next);
}

export function rankStandings(rows: StandingRow[]): StandingRow[] {
  return [...rows]
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      const gdA = a.goalsFor - a.goalsAgainst;
      const gdB = b.goalsFor - b.goalsAgainst;
      if (gdB !== gdA) return gdB - gdA;
      return b.goalsFor - a.goalsFor;
    })
    .map((row, index) => ({ ...row, position: index + 1 }));
}
