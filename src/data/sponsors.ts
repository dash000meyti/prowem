import type { Sponsor } from "@/types";

export const sponsors: Sponsor[] = [
  {
    id: "spn-nova-energy",
    name: "NOVA Energy",
    tier: "title",
    tagline: "Fuel the ninety.",
    eventIds: ["evt-nova-cup-2026"],
    clubIds: ["club-nexus", "club-munich-stars", "club-lisbon-tide", "club-oslo-frost"],
  },
  {
    id: "spn-apex-bank",
    name: "Apex Bank",
    tier: "gold",
    tagline: "Bank the big nights.",
    eventIds: ["evt-nova-cup-2026"],
    clubIds: [
      "club-berlin-united",
      "club-munich-stars",
      "club-milan-forge",
      "club-warsaw-north",
      "club-zurich-altitude",
    ],
  },
  {
    id: "spn-orbit-air",
    name: "Orbit Air",
    tier: "gold",
    tagline: "Fly with the fixtures.",
    eventIds: ["evt-nova-cup-2026"],
    clubIds: [
      "club-hamburg-united",
      "club-paris-elite",
      "club-prague-signal",
      "club-copenhagen-harbor",
    ],
  },
  {
    id: "spn-volt-wear",
    name: "Volt Wear",
    tier: "silver",
    tagline: "Kit that keeps pace.",
    eventIds: ["evt-nova-cup-2026"],
    clubIds: [
      "club-nexus",
      "club-berlin-wolves",
      "club-paris-elite",
      "club-amsterdam-ridge",
      "club-copenhagen-harbor",
    ],
  },
  {
    id: "spn-citygrid",
    name: "CityGrid",
    tier: "partner",
    tagline: "Move the city to the match.",
    eventIds: ["evt-nova-cup-2026"],
    clubIds: [
      "club-nexus",
      "club-berlin-united",
      "club-vienna-pulse",
      "club-stockholm-iron",
    ],
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
