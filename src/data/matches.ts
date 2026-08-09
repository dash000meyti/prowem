import type { Match } from "@/types";

export const matches: Match[] = [
  {
    id: "match-bayern-dortmund",
    slug: "bayern-vs-dortmund",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 12",
    status: "live",
    kickoff: "2025-11-08T18:30:00+01:00",
    minute: 72,
    period: "2H",
    homeTeamId: "team-bayern-fc",
    awayTeamId: "team-dortmund-fc",
    homeScore: 2,
    awayScore: 1,
    venue: "Allianz Arena",
    events: [
      {
        id: "me-bd-1",
        minute: 12,
        type: "goal",
        teamId: "team-bayern-fc",
        playerId: "player-kane",
        playerName: "Harry Kane",
        detail: "Right-footed finish",
        period: "1H"
      },
      {
        id: "me-bd-2",
        minute: 28,
        type: "yellow",
        teamId: "team-dortmund-fc",
        playerId: "player-schlotterbeck",
        playerName: "Nico Schlotterbeck",
        period: "1H"
      },
      {
        id: "me-bd-3",
        minute: 41,
        type: "goal",
        teamId: "team-dortmund-fc",
        playerId: "player-guirassy",
        playerName: "Serhou Guirassy",
        detail: "Header from corner",
        period: "1H"
      },
      {
        id: "me-bd-4",
        minute: 45,
        type: "ht",
        teamId: "team-bayern-fc",
        detail: "Half-time",
        period: "HT"
      },
      {
        id: "me-bd-5",
        minute: 58,
        type: "goal",
        teamId: "team-bayern-fc",
        playerId: "player-musiala",
        playerName: "Jamal Musiala",
        detail: "Cut inside, curled finish",
        period: "2H"
      },
      {
        id: "me-bd-6",
        minute: 67,
        type: "sub",
        teamId: "team-dortmund-fc",
        playerName: "Beier on",
        detail: "Maximilian Beier replaces Adeyemi",
        period: "2H"
      }
    ],
    footballStats: {
      possession: [
        58,
        42
      ],
      shots: [
        14,
        9
      ],
      shotsOnTarget: [
        7,
        4
      ],
      corners: [
        6,
        3
      ],
      fouls: [
        8,
        11
      ],
      passAccuracy: [
        88,
        82
      ]
    },
    homeLineupIds: [
      "player-neuer",
      "player-davies",
      "player-kim",
      "player-upamecano",
      "player-kimmich",
      "player-goretzka",
      "player-musiala",
      "player-olise",
      "player-sane",
      "player-coman",
      "player-kane"
    ],
    awayLineupIds: [
      "player-kobel",
      "player-bensebaini",
      "player-schlotterbeck",
      "player-anton",
      "player-ryerson",
      "player-sabitzer",
      "player-gross",
      "player-brandt",
      "player-adeyemi",
      "player-beier",
      "player-guirassy"
    ],
    highlightIds: [
      "vid-klassiker-kane"
    ],
    newsIds: [
      "news-klassiker-live"
    ],
    videoIds: [
      "vid-klassiker-kane",
      "vid-musiala-goal"
    ]
  },
  {
    id: "match-leverkusen-leipzig",
    slug: "leverkusen-vs-leipzig",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 12",
    status: "live",
    kickoff: "2025-11-08T15:30:00+01:00",
    minute: 55,
    period: "2H",
    homeTeamId: "team-leverkusen-fc",
    awayTeamId: "team-leipzig-fc",
    homeScore: 1,
    awayScore: 1,
    venue: "BayArena",
    events: [
      {
        id: "me-ll-1",
        minute: 19,
        type: "goal",
        teamId: "team-leverkusen-fc",
        playerId: "player-wirtz",
        playerName: "Florian Wirtz",
        period: "1H"
      },
      {
        id: "me-ll-2",
        minute: 44,
        type: "goal",
        teamId: "team-leipzig-fc",
        playerId: "player-sesko",
        playerName: "Benjamin Šeško",
        period: "1H"
      }
    ],
    footballStats: {
      possession: [
        52,
        48
      ],
      shots: [
        10,
        8
      ],
      shotsOnTarget: [
        4,
        3
      ],
      corners: [
        4,
        5
      ],
      fouls: [
        9,
        8
      ],
      passAccuracy: [
        85,
        84
      ]
    },
    homeLineupIds: [
      "player-hradecky",
      "player-wirtz",
      "player-boniface"
    ],
    awayLineupIds: [
      "player-gulacsi",
      "player-olmo",
      "player-sesko"
    ],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-werder-frankfurt",
    slug: "werder-vs-frankfurt",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 11",
    status: "finished",
    kickoff: "2025-11-01T15:30:00+01:00",
    homeTeamId: "team-werder-fc",
    awayTeamId: "team-frankfurt-fc",
    homeScore: 2,
    awayScore: 2,
    venue: "Weserstadion",
    events: [
      {
        id: "me-wf-1",
        minute: 22,
        type: "goal",
        teamId: "team-werder-fc",
        playerId: "player-ducksch",
        playerName: "Marvin Ducksch",
        period: "1H"
      },
      {
        id: "me-wf-2",
        minute: 51,
        type: "goal",
        teamId: "team-frankfurt-fc",
        playerId: "player-marmoush",
        playerName: "Omar Marmoush",
        period: "2H"
      },
      {
        id: "me-wf-3",
        minute: 70,
        type: "goal",
        teamId: "team-werder-fc",
        playerId: "player-schmid",
        playerName: "Romano Schmid",
        period: "2H"
      },
      {
        id: "me-wf-4",
        minute: 88,
        type: "goal",
        teamId: "team-frankfurt-fc",
        playerId: "player-gotze",
        playerName: "Mario Götze",
        period: "2H"
      }
    ],
    footballStats: {
      possession: [
        46,
        54
      ],
      shots: [
        11,
        13
      ],
      shotsOnTarget: [
        5,
        6
      ],
      corners: [
        5,
        7
      ],
      fouls: [
        10,
        9
      ],
      passAccuracy: [
        81,
        86
      ]
    },
    homeLineupIds: [
      "player-zetterer",
      "player-stage",
      "player-ducksch",
      "player-weiser",
      "player-lynge",
      "player-pieper",
      "player-jung",
      "player-schmid"
    ],
    awayLineupIds: [
      "player-trapp",
      "player-marmoush",
      "player-gotze"
    ],
    highlightIds: [],
    newsIds: [
      "news-werder-draw"
    ],
    videoIds: []
  },
  {
    id: "match-stuttgart-freiburg",
    slug: "stuttgart-vs-freiburg",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 11",
    status: "finished",
    kickoff: "2025-11-01T18:30:00+01:00",
    homeTeamId: "team-stuttgart-fc",
    awayTeamId: "team-freiburg-fc",
    homeScore: 3,
    awayScore: 1,
    venue: "MHPArena",
    events: [
      {
        id: "me-sf-1",
        minute: 15,
        type: "goal",
        teamId: "team-stuttgart-fc",
        playerId: "player-undav",
        playerName: "Deniz Undav",
        period: "1H"
      },
      {
        id: "me-sf-2",
        minute: 33,
        type: "goal",
        teamId: "team-freiburg-fc",
        playerId: "player-grifo",
        playerName: "Vincenzo Grifo",
        period: "1H"
      },
      {
        id: "me-sf-3",
        minute: 61,
        type: "goal",
        teamId: "team-stuttgart-fc",
        playerId: "player-fuhrich",
        playerName: "Chris Führich",
        period: "2H"
      },
      {
        id: "me-sf-4",
        minute: 79,
        type: "goal",
        teamId: "team-stuttgart-fc",
        playerId: "player-undav",
        playerName: "Deniz Undav",
        period: "2H"
      }
    ],
    footballStats: {
      possession: [
        55,
        45
      ],
      shots: [
        16,
        8
      ],
      shotsOnTarget: [
        8,
        3
      ],
      corners: [
        7,
        3
      ],
      fouls: [
        8,
        12
      ],
      passAccuracy: [
        87,
        80
      ]
    },
    homeLineupIds: [
      "player-nubel",
      "player-undav",
      "player-fuhrich"
    ],
    awayLineupIds: [
      "player-atzenholt",
      "player-grifo",
      "player-hofer"
    ],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-union-wolfsburg",
    slug: "union-vs-wolfsburg",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 11",
    status: "finished",
    kickoff: "2025-11-02T15:30:00+01:00",
    homeTeamId: "team-union-fc",
    awayTeamId: "team-wolfsburg-fc",
    homeScore: 1,
    awayScore: 0,
    venue: "Alte Försterei",
    events: [
      {
        id: "me-uw-1",
        minute: 64,
        type: "goal",
        teamId: "team-union-fc",
        playerId: "player-behrens",
        playerName: "Kevin Behrens",
        period: "2H"
      }
    ],
    footballStats: {
      possession: [
        44,
        56
      ],
      shots: [
        9,
        12
      ],
      shotsOnTarget: [
        3,
        4
      ],
      corners: [
        4,
        6
      ],
      fouls: [
        14,
        10
      ],
      passAccuracy: [
        74,
        83
      ]
    },
    homeLineupIds: [
      "player-ronnow",
      "player-haberer",
      "player-behrens"
    ],
    awayLineupIds: [
      "player-grabara",
      "player-arnold",
      "player-winde"
    ],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-gladbach-bayern",
    slug: "gladbach-vs-bayern",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 10",
    status: "finished",
    kickoff: "2025-10-25T18:30:00+02:00",
    homeTeamId: "team-gladbach-fc",
    awayTeamId: "team-bayern-fc",
    homeScore: 0,
    awayScore: 3,
    venue: "Borussia-Park",
    events: [
      {
        id: "me-gb-1",
        minute: 18,
        type: "goal",
        teamId: "team-bayern-fc",
        playerId: "player-kane",
        playerName: "Harry Kane",
        period: "1H"
      },
      {
        id: "me-gb-2",
        minute: 47,
        type: "goal",
        teamId: "team-bayern-fc",
        playerId: "player-olise",
        playerName: "Michael Olise",
        period: "2H"
      },
      {
        id: "me-gb-3",
        minute: 81,
        type: "goal",
        teamId: "team-bayern-fc",
        playerId: "player-sane",
        playerName: "Leroy Sané",
        period: "2H"
      }
    ],
    footballStats: {
      possession: [
        38,
        62
      ],
      shots: [
        6,
        18
      ],
      shotsOnTarget: [
        1,
        9
      ],
      corners: [
        2,
        8
      ],
      fouls: [
        11,
        7
      ],
      passAccuracy: [
        78,
        91
      ]
    },
    homeLineupIds: [
      "player-olschowsky",
      "player-plea",
      "player-weigl"
    ],
    awayLineupIds: [
      "player-neuer",
      "player-davies",
      "player-kim",
      "player-upamecano",
      "player-kimmich",
      "player-goretzka",
      "player-musiala",
      "player-olise",
      "player-sane",
      "player-coman",
      "player-kane"
    ],
    highlightIds: [],
    newsIds: [
      "news-bayern-away"
    ],
    videoIds: []
  },
  {
    id: "match-dortmund-werder",
    slug: "dortmund-vs-werder",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 10",
    status: "finished",
    kickoff: "2025-10-25T15:30:00+02:00",
    homeTeamId: "team-dortmund-fc",
    awayTeamId: "team-werder-fc",
    homeScore: 2,
    awayScore: 0,
    venue: "Signal Iduna Park",
    events: [
      {
        id: "me-dw-1",
        minute: 34,
        type: "goal",
        teamId: "team-dortmund-fc",
        playerId: "player-guirassy",
        playerName: "Serhou Guirassy",
        period: "1H"
      },
      {
        id: "me-dw-2",
        minute: 72,
        type: "goal",
        teamId: "team-dortmund-fc",
        playerId: "player-brandt",
        playerName: "Julian Brandt",
        period: "2H"
      }
    ],
    footballStats: {
      possession: [
        61,
        39
      ],
      shots: [
        15,
        5
      ],
      shotsOnTarget: [
        7,
        1
      ],
      corners: [
        8,
        2
      ],
      fouls: [
        9,
        12
      ],
      passAccuracy: [
        86,
        79
      ]
    },
    homeLineupIds: [
      "player-kobel",
      "player-bensebaini",
      "player-schlotterbeck",
      "player-anton",
      "player-ryerson",
      "player-sabitzer",
      "player-gross",
      "player-brandt",
      "player-adeyemi",
      "player-beier",
      "player-guirassy"
    ],
    awayLineupIds: [
      "player-zetterer",
      "player-ducksch",
      "player-schmid"
    ],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-bayern-union",
    slug: "bayern-vs-union",
    eventId: "evt-bundesliga",
    sport: "football",
    round: "Matchday 13",
    status: "scheduled",
    kickoff: "2025-11-15T15:30:00+01:00",
    homeTeamId: "team-bayern-fc",
    awayTeamId: "team-union-fc",
    homeScore: 0,
    awayScore: 0,
    venue: "Allianz Arena",
    events: [],
    homeLineupIds: [],
    awayLineupIds: [],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-bayern-lorient-socca",
    slug: "bayern-socca-vs-lorient-socca",
    eventId: "evt-socca-austria-pro",
    sport: "socca",
    round: "Round 8",
    status: "finished",
    kickoff: "2025-03-12T19:00:00+01:00",
    homeTeamId: "team-bayern-socca",
    awayTeamId: "team-lorient-socca",
    homeScore: 5,
    awayScore: 3,
    venue: "Vienna Arena Cage A",
    events: [
      {
        id: "me-bls-1",
        minute: 4,
        type: "goal",
        teamId: "team-bayern-socca",
        playerId: "player-bayern-socca-1",
        playerName: "Felix Kranz"
      },
      {
        id: "me-bls-2",
        minute: 11,
        type: "goal",
        teamId: "team-lorient-socca",
        playerId: "player-lorient-socca-1",
        playerName: "Yanis Merle"
      }
    ],
    homeLineupIds: [
      "player-bayern-socca-1",
      "player-bayern-socca-2",
      "player-bayern-socca-3",
      "player-bayern-socca-4",
      "player-bayern-socca-5"
    ],
    awayLineupIds: [
      "player-lorient-socca-1",
      "player-lorient-socca-2",
      "player-lorient-socca-3",
      "player-lorient-socca-4",
      "player-lorient-socca-5"
    ],
    highlightIds: [],
    newsIds: [
      "news-lorient-cage"
    ],
    videoIds: []
  },
  {
    id: "match-dortmund-werder-socca",
    slug: "dortmund-socca-vs-werder-socca",
    eventId: "evt-socca-austria-pro",
    sport: "socca",
    round: "Round 8",
    status: "finished",
    kickoff: "2025-03-12T20:30:00+01:00",
    homeTeamId: "team-dortmund-socca",
    awayTeamId: "team-werder-socca",
    homeScore: 4,
    awayScore: 4,
    venue: "Vienna Arena Cage B",
    events: [],
    homeLineupIds: [
      "player-dortmund-socca-1",
      "player-dortmund-socca-2",
      "player-dortmund-socca-3"
    ],
    awayLineupIds: [
      "player-werder-socca-1",
      "player-werder-socca-2",
      "player-werder-socca-3"
    ],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-vienna-meridians-bayern-socca",
    slug: "vienna-meridians-vs-bayern-socca",
    eventId: "evt-socca-austria-pro",
    sport: "socca",
    round: "Round 9",
    status: "scheduled",
    kickoff: "2025-03-19T19:00:00+01:00",
    homeTeamId: "team-vienna-meridians-socca",
    awayTeamId: "team-bayern-socca",
    homeScore: 0,
    awayScore: 0,
    venue: "Vienna Arena Cage A",
    events: [],
    homeLineupIds: [],
    awayLineupIds: [],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-bayern-dortmund-dota",
    slug: "bayern-dota-vs-dortmund-dota",
    eventId: "evt-the-international",
    sport: "dota2",
    round: "Upper Bracket Semi",
    status: "finished",
    kickoff: "2024-09-12T18:00:00+02:00",
    homeTeamId: "team-bayern-dota2",
    awayTeamId: "team-dortmund-dota2",
    homeScore: 2,
    awayScore: 1,
    venue: "Royal Arena, Copenhagen",
    events: [
      {
        id: "me-bdd-1",
        minute: 0,
        type: "kill",
        teamId: "team-bayern-dota2",
        playerId: "player-bayern-carry",
        playerName: "Nova",
        detail: "Game 1 first blood"
      }
    ],
    dotaStats: {
      kills: [
        42,
        35
      ],
      towers: [
        9,
        6
      ],
      roshan: [
        2,
        1
      ],
      gold: [
        98000,
        91000
      ],
      duration: "48:12 avg"
    },
    homeLineupIds: [
      "player-bayern-carry",
      "player-bayern-mid",
      "player-bayern-offlane",
      "player-bayern-soft",
      "player-bayern-hard"
    ],
    awayLineupIds: [
      "player-dortmund-carry",
      "player-dortmund-mid",
      "player-dortmund-offlane",
      "player-dortmund-soft",
      "player-dortmund-hard"
    ],
    highlightIds: [
      "vid-ti-bayern-dortmund"
    ],
    newsIds: [
      "news-ti-ub-semi"
    ],
    videoIds: [
      "vid-ti-bayern-dortmund"
    ]
  },
  {
    id: "match-liquid-spirit",
    slug: "liquid-vs-spirit",
    eventId: "evt-the-international",
    sport: "dota2",
    round: "Upper Bracket Semi",
    status: "finished",
    kickoff: "2024-09-12T14:00:00+02:00",
    homeTeamId: "team-liquid-dota2",
    awayTeamId: "team-spirit-dota2",
    homeScore: 1,
    awayScore: 2,
    venue: "Royal Arena, Copenhagen",
    events: [],
    dotaStats: {
      kills: [
        38,
        44
      ],
      towers: [
        7,
        10
      ],
      roshan: [
        1,
        2
      ],
      gold: [
        94000,
        101000
      ],
      duration: "51:04 avg"
    },
    homeLineupIds: [
      "player-tl-1",
      "player-tl-2",
      "player-tl-3"
    ],
    awayLineupIds: [
      "player-ts-1",
      "player-ts-2",
      "player-ts-3"
    ],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  },
  {
    id: "match-ti-final",
    slug: "spirit-vs-bayern-dota",
    eventId: "evt-the-international",
    sport: "dota2",
    round: "Grand Final",
    status: "scheduled",
    kickoff: "2024-09-15T18:00:00+02:00",
    homeTeamId: "team-spirit-dota2",
    awayTeamId: "team-bayern-dota2",
    homeScore: 0,
    awayScore: 0,
    venue: "Royal Arena, Copenhagen",
    events: [],
    homeLineupIds: [],
    awayLineupIds: [],
    highlightIds: [],
    newsIds: [],
    videoIds: []
  }
];

export function getMatchById(id: string) {
  return matches.find((m) => m.id === id);
}

export function getMatchBySlug(slug: string) {
  return matches.find((m) => m.slug === slug);
}

export function getMatchesByEventId(eventId: string) {
  return matches.filter((m) => m.eventId === eventId);
}
