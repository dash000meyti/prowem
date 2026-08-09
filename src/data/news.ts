import type { NewsArticle } from "@/types";

export const news: NewsArticle[] = [
  {
    id: "news-klassiker-live",
    slug: "klassiker-live-bayern-dortmund",
    title: "Der Klassiker: Bayern lead Dortmund 2–1 at the Allianz",
    excerpt:
      "Kane and Musiala have Bayern ahead in a roaring Klassiker — Guirassy pulled one back before the break.",
    body: "Allianz Arena is bouncing as Der Klassiker hits the hour mark. Harry Kane opened early, Serhou Guirassy levelled before half-time, and Jamal Musiala restored Bayern's lead with a trademark cut-inside finish. Dortmund have introduced Beier as they chase an equaliser in front of a packed Munich night.",
    category: "Match Report",
    publishedAt: "2025-11-08T19:45:00+01:00",
    author: "PROWEM Editorial",
    imageTone: "stadium-night",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    teamId: "team-bayern-fc",
    matchId: "match-bayern-dortmund",
  },
  {
    id: "news-bayern-away",
    slug: "bayern-win-at-gladbach",
    title: "Bayern cruise past Gladbach with Kane, Olise and Sané",
    excerpt: "A professional 3–0 away win keeps Bayern clear at the top of the Bundesliga.",
    body: "Borussia-Park offered little resistance as Bayern Munich collected another three points on the road. Kane struck early, Olise added a second after the restart, and Sané sealed the night late on.",
    category: "Match Report",
    publishedAt: "2025-10-25T21:00:00+02:00",
    author: "Lena Hartmann",
    imageTone: "action-green",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    teamId: "team-bayern-fc",
    matchId: "match-gladbach-bayern",
  },
  {
    id: "news-werder-draw",
    slug: "werder-frankfurt-share-points",
    title: "Ducksch and Schmid on target as Werder share points with Frankfurt",
    excerpt: "A 2–2 thriller at the Weserstadion leaves both sides searching for consistency.",
    body: "Marvin Ducksch and Romano Schmid found the net for the Green-Whites, but late quality from Marmoush and Götze earned Eintracht a share of the spoils in Bremen.",
    category: "Match Report",
    publishedAt: "2025-11-01T17:40:00+01:00",
    author: "Jonas Weber",
    imageTone: "forest",
    eventId: "evt-bundesliga",
    clubId: "club-werder",
    teamId: "team-werder-fc",
    matchId: "match-werder-frankfurt",
  },
  {
    id: "news-lorient-cage",
    slug: "lorient-socca-fall-to-bayern",
    title: "Les Merlus fall 5–3 to Bayern Socca in Vienna",
    excerpt: "FC Lorient's socca side showed bite but Bayern's cage tempo proved decisive.",
    body: "In Round 8 of the Socca Austria Pro League, Bayern Socca edged Lorient Socca 5–3 at Vienna Arena Cage A. Yanis Merle replied for Les Merlus, but Felix Kranz set the tone early for the Bavarians.",
    category: "Socca",
    publishedAt: "2025-03-12T21:15:00+01:00",
    author: "Claire Merle",
    imageTone: "socca-heat",
    eventId: "evt-socca-austria-pro",
    clubId: "club-lorient",
    teamId: "team-lorient-socca",
    matchId: "match-bayern-lorient-socca",
  },
  {
    id: "news-ti-ub-semi",
    slug: "bayern-dota-edge-dortmund-at-ti",
    title: "Bayern Dota 2 edge Dortmund in TI upper-bracket semi",
    excerpt: "A 2–1 series sends Bayern into the Grand Final conversation at Royal Arena.",
    body: "Club rivalry spilled onto the TI stage as Bayern Dota 2 defeated Dortmund Dota 2 2–1 in the upper-bracket semi-final. Nova's carry tempo in game one set the tone for a hard-fought series in Copenhagen.",
    category: "Esports",
    publishedAt: "2024-09-12T22:30:00+02:00",
    author: "Mira Sol",
    imageTone: "esports-neon",
    eventId: "evt-the-international",
    clubId: "club-bayern",
    teamId: "team-bayern-dota2",
    matchId: "match-bayern-dortmund-dota",
  },
  {
    id: "news-dortmund-wall",
    slug: "yellow-wall-awaits-klassiker",
    title: "Dortmund travel to Munich for Der Klassiker",
    excerpt: "BVB look to silence the Allianz as Guirassy leads the line.",
    body: "Borussia Dortmund head south for Der Klassiker with confidence from recent home form. Guirassy leads the attack while Kobel will need another big night against Bayern's front three.",
    category: "Preview",
    publishedAt: "2025-11-07T12:00:00+01:00",
    author: "PROWEM Editorial",
    imageTone: "crowd-orange",
    eventId: "evt-bundesliga",
    clubId: "club-dortmund",
    teamId: "team-dortmund-fc",
    matchId: "match-bayern-dortmund",
  },
  {
    id: "news-bundesliga-md12",
    slug: "matchday-12-kickoff",
    title: "Bundesliga Matchday 12: Klassiker headlines the slate",
    excerpt: "Bayern vs Dortmund tops a round that also features Leverkusen against Leipzig.",
    body: "Matchday 12 brings Der Klassiker to the Allianz Arena while Bayer Leverkusen host RB Leipzig in a top-four clash at the BayArena.",
    category: "League",
    publishedAt: "2025-11-08T09:00:00+01:00",
    author: "DFL Desk",
    imageTone: "steel",
    eventId: "evt-bundesliga",
  },
  {
    id: "news-socca-round9",
    slug: "socca-round-9-preview",
    title: "Socca Austria Pro: Meridians host Bayern Socca",
    excerpt: "Vienna Meridians look to upset the league leaders in Round 9.",
    body: "After eight rounds, Bayern Socca sit top of the Socca Austria Pro League. Vienna Meridians host them next with home-cage advantage.",
    category: "Socca",
    publishedAt: "2025-03-18T10:00:00+01:00",
    author: "Socca Austria",
    imageTone: "socca-heat",
    eventId: "evt-socca-austria-pro",
  },
];

export function getNewsById(id: string) {
  return news.find((n) => n.id === id);
}

export function getNewsBySlug(slug: string) {
  return news.find((n) => n.slug === slug);
}

export function getNewsByEventId(eventId: string) {
  return news.filter((n) => n.eventId === eventId);
}

export function getNewsByClubId(clubId: string) {
  return news.filter((n) => n.clubId === clubId);
}
