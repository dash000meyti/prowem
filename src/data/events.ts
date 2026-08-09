import type { EventEntity } from "@/types";

export const events: EventEntity[] = [
  {
    id: "evt-bundesliga",
    slug: "bundesliga",
    name: "Bundesliga",
    shortName: "BL",
    organizerId: "org-dfl",
    sport: "football",
    location: "Germany",
    city: "Nationwide",
    country: "Germany",
    startDate: "2025-08-22",
    endDate: "2026-05-16",
    teamCount: 11,
    description:
      "Germany's premier football competition — eighteen clubs, thirty-four matchdays, and the fiercest rivalries in European football, including Der Klassiker.",
    tagline: "The heart of German football.",
    theme: {
      primary: "#D2051E",
      secondary: "#0A0B0D",
      accent: "#FFFFFF",
      logo: "BL",
      heroImage: "bundesligaHero",
      coverImage: "stadiumLights",
    },
    teamIds: [
      "team-bayern-fc",
      "team-dortmund-fc",
      "team-werder-fc",
      "team-leverkusen-fc",
      "team-leipzig-fc",
      "team-frankfurt-fc",
      "team-stuttgart-fc",
      "team-freiburg-fc",
      "team-union-fc",
      "team-wolfsburg-fc",
      "team-gladbach-fc",
    ],
    sponsorIds: [
      "spn-bundesliga-partner",
      "spn-adidas",
      "spn-ea-sports",
      "spn-telekom",
      "spn-aws",
    ],
  },
  {
    id: "evt-socca-austria-pro",
    slug: "socca-austria-pro",
    name: "Socca Austria Pro League",
    shortName: "SAPL",
    organizerId: "org-socca-austria",
    sport: "socca",
    location: "Vienna",
    city: "Vienna",
    country: "Austria",
    startDate: "2024-09-01",
    endDate: "2025-06-30",
    teamCount: 7,
    description:
      "Austria's elite socca competition under Socca Austria — high-intensity five-a-side football with European club brands and Vienna's competitive core.",
    tagline: "Cage football. Pro intensity.",
    theme: {
      primary: "#C8102E",
      secondary: "#0B1020",
      accent: "#F5F5F2",
      logo: "SAPL",
      heroImage: "soccaAustriaHero",
      coverImage: "soccaCage",
    },
    teamIds: [
      "team-bayern-socca",
      "team-dortmund-socca",
      "team-werder-socca",
      "team-lorient-socca",
      "team-vienna-meridians-socca",
      "team-vienna-iron-socca",
      "team-vienna-pulse-socca",
    ],
    sponsorIds: ["spn-socca-isf", "spn-vienna-arena", "spn-volt-wear"],
  },
  {
    id: "evt-the-international",
    slug: "the-international",
    name: "The International",
    shortName: "TI",
    organizerId: "org-valve",
    sport: "dota2",
    location: "Copenhagen",
    city: "Copenhagen",
    country: "Denmark",
    startDate: "2024-09-04",
    endDate: "2024-09-15",
    teamCount: 6,
    description:
      "The International is Dota 2's world championship — the defining event of the competitive calendar, crowning the year's best teams on the grandest stage.",
    tagline: "The biggest stage in Dota.",
    theme: {
      primary: "#C23B2C",
      secondary: "#0A0A0C",
      accent: "#E8C47A",
      logo: "TI",
      heroImage: "theInternationalHero",
      coverImage: "esportsStage",
    },
    teamIds: [
      "team-bayern-dota2",
      "team-dortmund-dota2",
      "team-liquid-dota2",
      "team-spirit-dota2",
      "team-gaimin-dota2",
      "team-og-dota2",
    ],
    sponsorIds: ["spn-valve", "spn-intel", "spn-secretlab"],
  },
];

export function getEventById(id: string) {
  return events.find((e) => e.id === id);
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}
