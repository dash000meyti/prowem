import type { EventEntity } from "@/types";

export const events: EventEntity[] = [
  {
    id: "evt-nova-cup-2026",
    slug: "nova-cup-2026",
    name: "NOVA CUP 2026",
    shortName: "NOVA CUP",
    organizerId: "org-nova",
    sport: "football",
    location: "Olympiastadion District",
    city: "Berlin",
    country: "Germany",
    startDate: "2026-06-18",
    endDate: "2026-06-21",
    teamCount: 16,
    description:
      "A four-day knockout football festival uniting sixteen elite clubs under one electric identity.",
    tagline: "Sixteen teams. One city. Pure football theatre.",
    theme: {
      primary: "#FF5A1F",
      secondary: "#0A0B0D",
      accent: "#F5F5F2",
      logo: "NOVA",
      heroImage: "stadiumLights",
    },
    teamIds: [
      "team-nexus-fc",
      "team-berlin-united",
      "team-berlin-wolves",
      "team-hamburg-united",
      "team-munich-stars",
      "team-paris-elite",
      "team-milan-forge",
      "team-lisbon-tide",
      "team-vienna-pulse",
      "team-amsterdam-ridge",
      "team-prague-signal",
      "team-warsaw-north",
      "team-oslo-frost",
      "team-stockholm-iron",
      "team-copenhagen-harbor",
      "team-zurich-altitude",
    ],
    sponsorIds: [
      "spn-nova-energy",
      "spn-apex-bank",
      "spn-orbit-air",
      "spn-volt-wear",
      "spn-citygrid",
    ],
  },
];

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function getEventById(id: string) {
  return events.find((e) => e.id === id);
}
