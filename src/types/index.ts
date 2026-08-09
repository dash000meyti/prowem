export type Sport =
  | "football"
  | "socca"
  | "basketball"
  | "volleyball"
  | "dota2"
  | "cs2"
  | "valorant";

export type MatchStatus = "scheduled" | "live" | "finished" | "postponed";

export interface ThemeTokens {
  primary: string;
  secondary: string;
  accent: string;
  logo?: string;
  heroImage?: string;
  coverImage?: string;
}

export interface Organizer {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  location: string;
}

export interface EventEntity {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  organizerId: string;
  sport: Sport;
  location: string;
  city: string;
  country: string;
  startDate: string;
  endDate: string;
  teamCount: number;
  description: string;
  tagline: string;
  theme: ThemeTokens;
  teamIds: string[];
  sponsorIds: string[];
}

export interface Club {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  founded: number;
  city: string;
  country: string;
  theme: ThemeTokens;
  teamIds: string[];
  sponsorIds: string[];
  achievementIds: string[];
  legendIds: string[];
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  clubId: string;
  sport: Sport;
  color: string;
  secondaryColor: string;
  city: string;
  description: string;
  playerIds: string[];
  eventIds: string[];
}

export interface Player {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  teamId: string;
  sport: Sport;
  role: string;
  number?: number;
  nationality: string;
  age: number;
  rating?: number;
  stats: Record<string, number | string>;
  bio: string;
}

export interface MatchEventItem {
  id: string;
  minute: number;
  type: string;
  teamId: string;
  playerId?: string;
  playerName?: string;
  detail?: string;
  period?: string;
}

export interface FootballStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  passAccuracy: [number, number];
}

export interface DotaStats {
  kills: [number, number];
  towers: [number, number];
  roshan: [number, number];
  gold: [number, number];
  duration: string;
}

export interface Match {
  id: string;
  slug: string;
  eventId: string;
  sport: Sport;
  round: string;
  status: MatchStatus;
  kickoff: string;
  minute?: number;
  period?: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number;
  awayScore: number;
  venue: string;
  events: MatchEventItem[];
  footballStats?: FootballStats;
  dotaStats?: DotaStats;
  homeLineupIds: string[];
  awayLineupIds: string[];
  highlightIds: string[];
  newsIds: string[];
  videoIds: string[];
}

export interface StandingRow {
  position: number;
  teamId: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface BracketMatch {
  id: string;
  round: "qf" | "sf" | "final";
  homeTeamId?: string;
  awayTeamId?: string;
  homeScore?: number;
  awayScore?: number;
  winnerId?: string;
  matchId?: string;
  label: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string;
  author: string;
  imageTone: string;
  eventId?: string;
  clubId?: string;
  teamId?: string;
  matchId?: string;
}

export interface VideoItem {
  id: string;
  slug: string;
  title: string;
  duration: string;
  views: string;
  publishedAt: string;
  category: string;
  imageTone: string;
  eventId?: string;
  clubId?: string;
  teamId?: string;
  matchId?: string;
}

export interface Award {
  id: string;
  name: string;
  season: string;
  description: string;
  winnerName: string;
  winnerType: "player" | "team" | "club";
  eventId?: string;
  clubId?: string;
}

export interface Legend {
  id: string;
  name: string;
  era: string;
  title: string;
  story: string;
  clubId?: string;
  eventId?: string;
  sport: Sport;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "title" | "gold" | "silver" | "partner";
  tagline: string;
  eventIds: string[];
  clubIds: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: "watch" | "predict" | "quiz" | "attend" | "sponsor" | "social";
  sponsorId?: string;
  rewardLabel?: string;
  completed?: boolean;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  xpCost: number;
  category: string;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  limited?: boolean;
  clubId?: string;
  description: string;
}

export interface Fan {
  id: string;
  slug: string;
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  status: string;
  city: string;
  followedClubIds: string[];
  followedTeamIds: string[];
  followedEventIds: string[];
  favoritePlayerIds: string[];
  completedMissionIds: string[];
  achievementIds: string[];
  attendedEventIds: string[];
  matchesWatched: number;
  predictionsCorrect: number;
}
