/** Local photography and crest paths for PROWEM glass + photo UI */

export const mediaCatalog = {
  stadiumNight: "/images/shared/stadiumNight.jpg",
  stadiumLights: "/images/shared/stadiumLights.jpg",
  footballAction: "/images/shared/footballAction.jpg",
  footballKick: "/images/shared/footballKick.jpg",
  crowdOrange: "/images/shared/crowdOrange.jpg",
  training: "/images/shared/training.jpg",
  pitchAerial: "/images/shared/pitchAerial.jpg",
  locker: "/images/shared/locker.jpg",
  celebration: "/images/shared/celebration.jpg",
  esportsStage: "/images/shared/esportsStage.jpg",
  esportsCrowd: "/images/shared/esportsCrowd.jpg",
  soccaCage: "/images/shared/soccaCage.jpg",
  athletePortrait: "/images/shared/athletePortrait.jpg",
  playerClose: "/images/shared/playerClose.jpg",
  jerseyDetail: "/images/shared/jerseyDetail.jpg",
  nightMatch: "/images/shared/nightMatch.jpg",
  abstractDark: "/images/shared/abstractDark.jpg",
  bayernHero: "/images/clubs/bayern-munich/hero.jpg",
  bayernCover: "/images/clubs/bayern-munich/cover.jpg",
  dortmundHero: "/images/clubs/borussia-dortmund/hero.jpg",
  dortmundCover: "/images/clubs/borussia-dortmund/cover.jpg",
  werderHero: "/images/clubs/werder-bremen/hero.jpg",
  werderCover: "/images/clubs/werder-bremen/cover.jpg",
  lorientHero: "/images/clubs/fc-lorient/hero.jpg",
  lorientCover: "/images/clubs/fc-lorient/cover.jpg",
  bundesligaHero: "/images/events/bundesliga/hero.jpg",
  soccaAustriaHero: "/images/events/socca-austria-pro/hero.jpg",
  theInternationalHero: "/images/events/the-international/hero.jpg",
} as const;

export type MediaKey = keyof typeof mediaCatalog;

export const toneToMedia: Record<string, MediaKey> = {
  ember: "crowdOrange",
  steel: "stadiumLights",
  forest: "pitchAerial",
  violet: "esportsStage",
  gold: "celebration",
  ice: "training",
  default: "footballAction",
  "teal-dark": "pitchAerial",
  "crowd-orange": "crowdOrange",
  "stadium-night": "stadiumNight",
  "action-green": "footballKick",
  "esports-neon": "esportsStage",
  "training-mist": "training",
  "locker-room": "locker",
  "socca-heat": "soccaCage",
};

export function resolveMedia(
  keyOrTone?: string | null,
  fallback: MediaKey = "stadiumNight",
): string {
  if (!keyOrTone) return mediaCatalog[fallback];
  if (keyOrTone in mediaCatalog) {
    return mediaCatalog[keyOrTone as MediaKey];
  }
  const mapped = toneToMedia[keyOrTone];
  if (mapped) return mediaCatalog[mapped];
  return mediaCatalog[fallback];
}

/** Club/team crest — team slugs fall back to parent club crest when no dedicated file */
const TEAM_CREST_CLUB: Record<string, string> = {
  "bayern-fc": "bayern-munich",
  "bayern-socca": "bayern-munich",
  "bayern-dota2": "bayern-munich",
  "dortmund-fc": "borussia-dortmund",
  "dortmund-socca": "borussia-dortmund",
  "dortmund-dota2": "borussia-dortmund",
  "werder-fc": "werder-bremen",
  "werder-socca": "werder-bremen",
  "lorient-socca": "fc-lorient",
  "leverkusen-fc": "bayer-leverkusen",
  "leipzig-fc": "rb-leipzig",
  "frankfurt-fc": "eintracht-frankfurt",
  "stuttgart-fc": "vfb-stuttgart",
  "freiburg-fc": "sc-freiburg",
  "union-fc": "union-berlin",
  "wolfsburg-fc": "wolfsburg",
  "gladbach-fc": "monchengladbach",
  "vienna-meridians-socca": "vienna-meridians",
  "vienna-iron-socca": "vienna-iron",
  "vienna-pulse-socca": "vienna-pulse",
  "team-liquid-dota2": "team-liquid",
  "team-spirit-dota2": "team-spirit",
  "gaimin-gladiators-dota2": "gaimin-gladiators",
  "og-dota2": "og-esports",
};

export function crestPath(slug: string) {
  const clubSlug = TEAM_CREST_CLUB[slug] ?? slug;
  return `/images/clubs/${clubSlug}/crest.svg`;
}

export const heroMedia = {
  home: mediaCatalog.stadiumNight,
  bundesliga: mediaCatalog.bundesligaHero,
  soccaAustria: mediaCatalog.soccaAustriaHero,
  theInternational: mediaCatalog.theInternationalHero,
  bayern: mediaCatalog.bayernHero,
  dortmund: mediaCatalog.dortmundHero,
  werder: mediaCatalog.werderHero,
  lorient: mediaCatalog.lorientHero,
  bayernDota: mediaCatalog.esportsStage,
  bayernSocca: mediaCatalog.soccaCage,
  matchCenter: mediaCatalog.pitchAerial,
  matchday: mediaCatalog.nightMatch,
  fan: mediaCatalog.crowdOrange,
  player: mediaCatalog.athletePortrait,
  celebration: mediaCatalog.celebration,
  nightMatch: mediaCatalog.nightMatch,
} as const;
