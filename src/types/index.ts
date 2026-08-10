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

export interface SoccaStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  fouls: [number, number];
  tackles: [number, number];
  blocks: [number, number];
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
  soccaStats?: SoccaStats;
  dotaStats?: DotaStats;
  homeLineupIds: string[];
  awayLineupIds: string[];
  /** e.g. "4-4-2" — used by pitch lineup board */
  homeFormation?: string;
  awayFormation?: string;
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

/** Match-level player of the match card (demo / live graphic) */
export interface PlayerOfTheMatchStats {
  playerId: string;
  rating: number;
  minutes: number;
  goals: number;
  keyPasses: number;
  tackles: number;
  duelsWon: number;
  passAccuracy: number;
}

export interface BracketMatch {
  id: string;
  eventId: string;
  round: "qf" | "sf" | "final";
  bracketSide: "upper" | "lower";
  homeTeamId?: string;
  awayTeamId?: string;
  homeScore?: number;
  awayScore?: number;
  winnerId?: string;
  matchId?: string;
  label: string;
  /** Short header label e.g. "UB QUARTER" */
  roundLabel: string;
  scheduledAt: string;
  /** Next match this winner feeds into */
  feedsIntoId?: string;
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
  /** Local path or media catalog key for trophy art */
  image?: string;
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
  /** Media catalog key or local path under /images/legends/ */
  image?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  tier: "title" | "gold" | "silver" | "partner";
  tagline: string;
  eventIds: string[];
  clubIds: string[];
}

/** Fan who financially supports a club (membership / shop) */
export interface ClubPatron {
  id: string;
  name: string;
  city: string;
  clubId: string;
  /** Lifetime contribution in euros */
  totalContributed: number;
  /** ISO timestamp of most recent shop purchase, if any */
  lastPurchaseAt?: string;
  lastPurchaseLabel?: string;
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
  /** global = available to every fan; follow = unlocked/prioritised by follows */
  scope: "global" | "follow";
  sponsorId?: string;
  rewardLabel?: string;
  completed?: boolean;
  eventId?: string;
  clubId?: string;
  teamId?: string;
  playerId?: string;
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
  eventId?: string;
  description: string;
  /** Key into mediaCatalog */
  image: string;
}

export type FanFollowState = {
  followedClubIds: string[];
  followedTeamIds: string[];
  followedEventIds: string[];
  favoritePlayerIds: string[];
};

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
