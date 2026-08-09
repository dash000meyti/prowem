/** Curated Unsplash photography for PROWEM glass + photo UI */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const mediaCatalog = {
  stadiumNight: u("photo-1522778119026-d647f0596c20", 1920),
  stadiumLights: u("photo-1574629810360-7efbbe195018", 1920),
  footballAction: u("photo-1579952363873-27f3bade9f55", 1400),
  footballKick: u("photo-1431324155629-1a6deb1dec8d", 1400),
  crowdOrange: u("photo-1517466787929-bc90951d0974", 1400),
  training: u("photo-1551958219-acbc608c6377", 1400),
  pitchAerial: u("photo-1459865264687-595d652de67e", 1600),
  locker: u("photo-1489944440615-453fc2b6a9a9", 1200),
  celebration: u("photo-1508098682722-e99c43a406b2", 1400),
  esportsStage: u("photo-1542751371-adc38448a05e", 1600),
  esportsCrowd: u("photo-1511512578047-dfb367046420", 1400),
  soccaCage: u("photo-1560272564-c83b66b1ad12", 1400),
  athletePortrait: u("photo-1560272564-c83b66b1ad12", 900),
  playerClose: u("photo-1579952363873-27f3bade9f55", 900),
  jerseyDetail: u("photo-1517466787929-bc90951d0974", 800),
  nightMatch: u("photo-1522778119026-d647f0596c20", 1600),
  abstractDark: u("photo-1557683316-973673baf926", 1400),
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

export function crestPath(slug: string) {
  return `/crests/${slug}.svg`;
}

export const heroMedia = {
  home: mediaCatalog.stadiumNight,
  novaCup: mediaCatalog.stadiumLights,
  nexus: mediaCatalog.footballAction,
  nexusDota: mediaCatalog.esportsStage,
  nexusSocca: mediaCatalog.soccaCage,
  matchCenter: mediaCatalog.pitchAerial,
  matchday: mediaCatalog.nightMatch,
  fan: mediaCatalog.crowdOrange,
  player: mediaCatalog.athletePortrait,
  celebration: mediaCatalog.celebration,
  nightMatch: mediaCatalog.nightMatch,
} as const;
