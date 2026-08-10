import type { Sponsor } from "@/types";

export const sponsors: Sponsor[] = [
  {
    id: "spn-bundesliga-partner",
    name: "Bundesliga Official",
    tier: "title",
    tagline: "Official league partnership across Matchday.",
    eventIds: ["evt-bundesliga"],
    clubIds: [],
  },
  {
    id: "spn-adidas",
    name: "adidas",
    tier: "gold",
    tagline: "Kit and performance partner.",
    eventIds: ["evt-bundesliga"],
    clubIds: ["club-bayern"],
  },
  {
    id: "spn-ea-sports",
    name: "EA SPORTS",
    tier: "gold",
    tagline: "Official interactive entertainment partner.",
    eventIds: ["evt-bundesliga"],
    clubIds: [],
  },
  {
    id: "spn-telekom",
    name: "Deutsche Telekom",
    tier: "gold",
    tagline: "Connectivity and club partnership.",
    eventIds: ["evt-bundesliga"],
    clubIds: ["club-bayern"],
  },
  {
    id: "spn-aws",
    name: "AWS",
    tier: "partner",
    tagline: "Cloud and data platform partner.",
    eventIds: ["evt-bundesliga"],
    clubIds: [],
  },
  {
    id: "spn-audi",
    name: "Audi",
    tier: "partner",
    tagline: "Mobility partner of FC Bayern Munich.",
    eventIds: [],
    clubIds: ["club-bayern"],
  },
  {
    id: "spn-puma",
    name: "PUMA",
    tier: "gold",
    tagline: "Official kit partner of Borussia Dortmund.",
    eventIds: [],
    clubIds: ["club-dortmund"],
  },
  {
    id: "spn-evonik",
    name: "Evonik",
    tier: "gold",
    tagline: "Long-term BVB partner.",
    eventIds: [],
    clubIds: ["club-dortmund"],
  },
  {
    id: "spn-1und1",
    name: "1&1",
    tier: "partner",
    tagline: "Communications partner.",
    eventIds: [],
    clubIds: ["club-dortmund"],
  },
  {
    id: "spn-bvb-signal",
    name: "Signal Iduna",
    tier: "title",
    tagline: "Stadium naming and title partnership.",
    eventIds: [],
    clubIds: ["club-dortmund"],
  },
  {
    id: "spn-bvb-brinkhoffs",
    name: "Brinkhoff's",
    tier: "silver",
    tagline: "Matchday hospitality partner.",
    eventIds: [],
    clubIds: ["club-dortmund"],
  },
  {
    id: "spn-weser",
    name: "Weser Partner",
    tier: "gold",
    tagline: "Regional partner of Werder Bremen.",
    eventIds: [],
    clubIds: ["club-werder"],
  },
  {
    id: "spn-umlaut",
    name: "umlaut",
    tier: "partner",
    tagline: "Innovation partner.",
    eventIds: [],
    clubIds: ["club-werder"],
  },
  {
    id: "spn-bretagne",
    name: "Bretagne Région",
    tier: "gold",
    tagline: "Regional identity partner of FC Lorient.",
    eventIds: [],
    clubIds: ["club-lorient"],
  },
  {
    id: "spn-merlus",
    name: "Merlus Collective",
    tier: "partner",
    tagline: "Supporter commerce partner.",
    eventIds: [],
    clubIds: ["club-lorient"],
  },
  {
    id: "spn-socca-isf",
    name: "International Socca Federation",
    tier: "title",
    tagline: "Governing partner of Socca Austria.",
    eventIds: ["evt-socca-austria-pro"],
    clubIds: [],
  },
  {
    id: "spn-vienna-arena",
    name: "Vienna Arena",
    tier: "gold",
    tagline: "Home cage of the Pro League.",
    eventIds: ["evt-socca-austria-pro"],
    clubIds: [],
  },
  {
    id: "spn-volt-wear",
    name: "Volt Wear",
    tier: "partner",
    tagline: "Performance apparel across socca nights.",
    eventIds: ["evt-socca-austria-pro"],
    clubIds: [],
  },
  {
    id: "spn-valve",
    name: "Valve",
    tier: "title",
    tagline: "Publisher and organiser of The International.",
    eventIds: ["evt-the-international"],
    clubIds: [],
  },
  {
    id: "spn-intel",
    name: "Intel",
    tier: "gold",
    tagline: "Technology partner of TI.",
    eventIds: ["evt-the-international"],
    clubIds: [],
  },
  {
    id: "spn-secretlab",
    name: "Secretlab",
    tier: "partner",
    tagline: "Official seating partner.",
    eventIds: ["evt-the-international"],
    clubIds: [],
  },
];

export function getSponsorById(id: string) {
  return sponsors.find((s) => s.id === id);
}

export function getSponsorsByEventId(eventId: string) {
  return sponsors.filter((s) => s.eventIds.includes(eventId));
}

export function getSponsorsByClubId(clubId: string) {
  return sponsors.filter((s) => s.clubIds.includes(clubId));
}
