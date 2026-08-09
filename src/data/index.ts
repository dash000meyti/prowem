export { organizers, getOrganizerById, getOrganizerBySlug } from "./organizers";
export { events, getEventById, getEventBySlug } from "./events";
export {
  clubs,
  getClubById,
  getClubBySlug,
  isFeaturedClub,
  getFeaturedClubs,
  FEATURED_CLUB_SLUGS,
} from "./clubs";
export { teams, getTeamById, getTeamBySlug, getTeamsByClubId } from "./teams";
export {
  players,
  getPlayerById,
  getPlayerBySlug,
  getPlayersByTeamId,
} from "./players";
export {
  matches,
  getMatchById,
  getMatchBySlug,
  getMatchesByEventId,
} from "./matches";
export {
  standings,
  soccaStandings,
  getStandingByTeamId,
  getStandingsForEventId,
} from "./standings";
export { bracket, getBracketByRound } from "./bracket";
export {
  news,
  getNewsById,
  getNewsBySlug,
  getNewsByEventId,
  getNewsByClubId,
} from "./news";
export {
  videos,
  getVideoById,
  getVideoBySlug,
  getVideosByEventId,
  getVideosByClubId,
} from "./videos";
export { awards, getAwardById, getAwardsByEventId, getAwardsByClubId } from "./awards";
export { legends, getLegendById, getLegendsByClubId } from "./legends";
export {
  sponsors,
  getSponsorById,
  getSponsorsByEventId,
  getSponsorsByClubId,
} from "./sponsors";
export { fans, getFanById, getFanBySlug } from "./fans";
export { missions, getMissionById } from "./missions";
export { rewards, getRewardById } from "./rewards";
export { products, getProductById, getProductsByClubId } from "./products";
export { achievements, getAchievementById } from "./achievements";
export {
  mediaCatalog,
  resolveMedia,
  crestPath,
  heroMedia,
  toneToMedia,
} from "./media";

import { clubs } from "./clubs";
import { events } from "./events";
import { fans } from "./fans";
import { matches } from "./matches";
import { news } from "./news";
import { players } from "./players";
import { getStandingsForEventId } from "./standings";
import { teams } from "./teams";
import { videos } from "./videos";

export function getTeamsForEvent(eventId: string) {
  const event = events.find((e) => e.id === eventId);
  if (!event) return [];
  return event.teamIds
    .map((id) => teams.find((t) => t.id === id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
}

export function getClubForTeam(teamId: string) {
  const team = teams.find((t) => t.id === teamId);
  if (!team) return undefined;
  return clubs.find((c) => c.id === team.clubId);
}

export function getPlayersForTeam(teamId: string) {
  return players.filter((p) => p.teamId === teamId);
}

export function getMatchesForEvent(eventId: string) {
  return matches.filter((m) => m.eventId === eventId);
}

export function getLiveMatchesList(eventId?: string) {
  return matches.filter(
    (m) => m.status === "live" && (!eventId || m.eventId === eventId),
  );
}

export function getNewsForEvent(eventId: string) {
  return news.filter((n) => n.eventId === eventId);
}

export function getVideosForEvent(eventId: string) {
  return videos.filter((v) => v.eventId === eventId);
}

export function getStandingsForEvent(eventId?: string) {
  return getStandingsForEventId(eventId ?? "evt-bundesliga");
}

export function getFeaturedMatch() {
  return matches.find((m) => m.id === "match-bayern-dortmund")!;
}

export function getPrimaryFan() {
  return fans.find((f) => f.id === "fan-alex")!;
}

export function getPrimaryEvent() {
  return events.find((e) => e.id === "evt-bundesliga")!;
}
