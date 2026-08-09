import type { Team } from "@/types";

const NOVA = "evt-nova-cup-2026";

export const teams: Team[] = [
  {
    id: "team-nexus-fc",
    slug: "nexus-fc",
    name: "NEXUS FC",
    shortName: "NEX",
    clubId: "club-nexus",
    sport: "football",
    color: "#00C2A8",
    secondaryColor: "#0A1214",
    city: "Berlin",
    description:
      "The football flagship of NEXUS — high press, quick combinations, and a squad built for knockout theatre.",
    playerIds: [
      "player-erik-holm",
      "player-luis-navarro",
      "player-mateo-ricci",
      "player-jonas-berg",
      "player-amir-hassan",
      "player-theo-marc",
      "player-kai-novak",
      "player-samuel-oke",
      "player-yannick-durand",
      "player-felix-brandt",
      "player-marco-vesa",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-berlin-united",
    slug: "berlin-united",
    name: "Berlin United",
    shortName: "BER",
    clubId: "club-berlin-united",
    sport: "football",
    color: "#1B4DFF",
    secondaryColor: "#0B1020",
    city: "Berlin",
    description:
      "Capital rivals with steel in the midfield and a home crowd that turns every NOVA CUP night into a derby.",
    playerIds: [
      "player-niklas-auer",
      "player-owen-clarke",
      "player-piotr-lewand",
      "player-hugo-sander",
      "player-rafael-costa",
      "player-emil-vogel",
      "player-tarek-malik",
      "player-luka-petrov",
      "player-sean-murphy",
      "player-diego-alvarez",
      "player-ben-richter",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-berlin-wolves",
    slug: "berlin-wolves",
    name: "Berlin Wolves",
    shortName: "WLV",
    clubId: "club-berlin-wolves",
    sport: "football",
    color: "#8B7355",
    secondaryColor: "#14110E",
    city: "Berlin",
    description:
      "A pack that hunts in transitions — direct, physical, and dangerous on the counter.",
    playerIds: [
      "player-max-keller",
      "player-ivan-drago",
      "player-tom-weiss",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-hamburg-united",
    slug: "hamburg-united",
    name: "Hamburg United",
    shortName: "HAM",
    clubId: "club-hamburg-united",
    sport: "football",
    color: "#C8102E",
    secondaryColor: "#0F1418",
    city: "Hamburg",
    description:
      "Harbour-side organisation with set-piece specialists and patient build-up from the back.",
    playerIds: [
      "player-finn-bode",
      "player-joris-klein",
      "player-arne-hoff",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-munich-stars",
    slug: "munich-stars",
    name: "Munich Stars",
    shortName: "MUN",
    clubId: "club-munich-stars",
    sport: "football",
    color: "#D4A017",
    secondaryColor: "#12100A",
    city: "Munich",
    description:
      "Technical control and late composure — Munich Stars thrive under lights and pressure.",
    playerIds: [
      "player-leon-hartmann",
      "player-pascal-meier",
      "player-nico-stahl",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-paris-elite",
    slug: "paris-elite",
    name: "Paris Elite",
    shortName: "PAR",
    clubId: "club-paris-elite",
    sport: "football",
    color: "#1A1A2E",
    secondaryColor: "#C9A227",
    city: "Paris",
    description:
      "Flair with structure — wide creators and aggressive full-backs wearing Paris Elite colours.",
    playerIds: [
      "player-adrien-morel",
      "player-enzo-blanc",
      "player-karim-saidi",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-milan-forge",
    slug: "milan-forge",
    name: "Milan Forge",
    shortName: "MLN",
    clubId: "club-milan-forge",
    sport: "football",
    color: "#A50044",
    secondaryColor: "#0E0A0C",
    city: "Milan",
    description:
      "Compact blocks and creative midfielders forged for hostile European nights.",
    playerIds: [
      "player-luca-ferrari",
      "player-andrea-conti",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-lisbon-tide",
    slug: "lisbon-tide",
    name: "Lisbon Tide",
    shortName: "LIS",
    clubId: "club-lisbon-tide",
    sport: "football",
    color: "#007A53",
    secondaryColor: "#0A1512",
    city: "Lisbon",
    description:
      "Atlantic rhythm football — fluid rotations and fearless combinations from Lisbon Tide.",
    playerIds: [
      "player-joao-silva",
      "player-tiago-mendes",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-vienna-pulse",
    slug: "vienna-pulse",
    name: "Vienna Pulse",
    shortName: "VIE",
    clubId: "club-vienna-pulse",
    sport: "football",
    color: "#6B2D5C",
    secondaryColor: "#120A10",
    city: "Vienna",
    description:
      "Measured intensity — positional discipline with sudden vertical strikes.",
    playerIds: [
      "player-stefan-hofer",
      "player-david-lang",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-amsterdam-ridge",
    slug: "amsterdam-ridge",
    name: "Amsterdam Ridge",
    shortName: "AMS",
    clubId: "club-amsterdam-ridge",
    sport: "football",
    color: "#FF6B00",
    secondaryColor: "#14100C",
    city: "Amsterdam",
    description:
      "Total lanes — width, third-man runs, and attacking clarity from Amsterdam Ridge.",
    playerIds: [
      "player-daan-visser",
      "player-jesse-bouwman",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-prague-signal",
    slug: "prague-signal",
    name: "Prague Signal",
    shortName: "PRG",
    clubId: "club-prague-signal",
    sport: "football",
    color: "#2E5A88",
    secondaryColor: "#0C1218",
    city: "Prague",
    description:
      "Clear channel football — organised traps and clinical counters on the break.",
    playerIds: [
      "player-adam-novy",
      "player-martin-kral",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-warsaw-north",
    slug: "warsaw-north",
    name: "Warsaw North",
    shortName: "WAW",
    clubId: "club-warsaw-north",
    sport: "football",
    color: "#C41E3A",
    secondaryColor: "#140A0C",
    city: "Warsaw",
    description:
      "Northern edge — physical duels and late set pieces that never soften.",
    playerIds: [
      "player-kacper-nowak",
      "player-michal-baran",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-oslo-frost",
    slug: "oslo-frost",
    name: "Oslo Frost",
    shortName: "OSL",
    clubId: "club-oslo-frost",
    sport: "football",
    color: "#4A90A4",
    secondaryColor: "#0A1216",
    city: "Oslo",
    description:
      "Cold control — freeze the rhythm, then strike through disciplined mid-blocks.",
    playerIds: [
      "player-anders-lie",
      "player-erik-solberg",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-stockholm-iron",
    slug: "stockholm-iron",
    name: "Stockholm Iron",
    shortName: "STO",
    clubId: "club-stockholm-iron",
    sport: "football",
    color: "#2C3E50",
    secondaryColor: "#0B0E12",
    city: "Stockholm",
    description:
      "Hard lines — Scandinavian structure with finishing ruthlessness.",
    playerIds: [
      "player-viktor-lind",
      "player-oscar-bergstrom",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-copenhagen-harbor",
    slug: "copenhagen-harbor",
    name: "Copenhagen Harbor",
    shortName: "CPH",
    clubId: "club-copenhagen-harbor",
    sport: "football",
    color: "#E85D04",
    secondaryColor: "#140E0A",
    city: "Copenhagen",
    description:
      "Dockside drive — press from the whistle and ride the harbour roar.",
    playerIds: [
      "player-mikkel-rasmussen",
      "player-lars-jensen",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-zurich-altitude",
    slug: "zurich-altitude",
    name: "Zurich Altitude",
    shortName: "ZUR",
    clubId: "club-zurich-altitude",
    sport: "football",
    color: "#1F6F5B",
    secondaryColor: "#0A1210",
    city: "Zurich",
    description:
      "Play above the noise — Swiss organisation with alpine stamina.",
    playerIds: [
      "player-noah-keller",
      "player-simon-bauer",
    ],
    eventIds: [NOVA],
  },
  {
    id: "team-nexus-socca",
    slug: "nexus-socca",
    name: "NEXUS Socca",
    shortName: "NXS",
    clubId: "club-nexus",
    sport: "socca",
    color: "#00C2A8",
    secondaryColor: "#E8FF6A",
    city: "Berlin",
    description:
      "Cage intensity under the NEXUS banner — compact pitches, relentless tempo, and street-smart finishing.",
    playerIds: [
      "player-ricardo-vale",
      "player-deniz-kaya",
      "player-omar-benali",
    ],
    eventIds: [],
  },
  {
    id: "team-nexus-dota2",
    slug: "nexus-dota2",
    name: "NEXUS Dota 2",
    shortName: "NXD",
    clubId: "club-nexus",
    sport: "dota2",
    color: "#E8FF6A",
    secondaryColor: "#0A1214",
    city: "Berlin",
    description:
      "The esports arm of NEXUS — disciplined drafts, mid-lane aggression, and late-game execution on the big stage.",
    playerIds: [
      "player-lena-voss",
      "player-nikita-volkov",
      "player-omar-rashid",
      "player-sofia-lind",
      "player-erik-maan",
      "player-julia-park",
      "player-tomaz-kline",
    ],
    eventIds: [],
  },
];

export function getTeamById(id: string) {
  return teams.find((t) => t.id === id);
}

export function getTeamBySlug(slug: string) {
  return teams.find((t) => t.slug === slug);
}

export function getTeamsByClubId(clubId: string) {
  return teams.filter((t) => t.clubId === clubId);
}

export function getTeamsByEventId(eventId: string) {
  return teams.filter((t) => t.eventIds.includes(eventId));
}
