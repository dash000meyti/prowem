import type { Legend } from "@/types";

export const legends: Legend[] = [
  {
    id: "leg-kira-sol",
    name: "Kira Sol",
    era: "2016–2022",
    title: "The First Captain",
    story:
      "Kira Sol wore the armband when NEXUS FC climbed from regional nights to European invitationals — still the club’s template for leadership under noise.",
    clubId: "club-nexus",
    sport: "football",
  },
  {
    id: "leg-dante-rove",
    name: "Dante Rove",
    era: "2018–2024",
    title: "Cage Architect",
    story:
      "Dante Rove turned NEXUS Socca into a destination — inventing combinations that still appear in every warm-up reel.",
    clubId: "club-nexus",
    sport: "socca",
  },
  {
    id: "leg-jonas-kraft",
    name: "Jonas Kraft",
    era: "2008–2017",
    title: "Capital Steel",
    story:
      "Jonas Kraft embodied Berlin United’s identity — duels won, standards kept, derbies remembered.",
    clubId: "club-berlin-united",
    sport: "football",
  },
  {
    id: "leg-mira-wolff",
    name: "Mira Wolff",
    era: "2011–2019",
    title: "Pack Leader",
    story:
      "Mira Wolff’s transitions defined Berlin Wolves — vertical, fearless, and always hunting in numbers.",
    clubId: "club-berlin-wolves",
    sport: "football",
  },
  {
    id: "leg-elena-brandt",
    name: "Elena Brandt",
    era: "2009–2018",
    title: "Light Operator",
    story:
      "Elena Brandt’s late composure under floodlights became Munich Stars folklore — calm when the stadium shook.",
    clubId: "club-munich-stars",
    sport: "football",
  },
  {
    id: "leg-nova-inaugural",
    name: "The Inaugural Night",
    era: "2022",
    title: "Festival Memory",
    story:
      "The first NOVA CUP final night in Berlin set the tone for every festival since — sixteen clubs, one city, theatre without apology.",
    eventId: "evt-nova-cup-2026",
    sport: "football",
  },
  {
    id: "leg-pixel-era",
    name: "Ara “Pixel” Nguyen",
    era: "2019–2023",
    title: "Stage Founder",
    story:
      "Ara Nguyen founded the NEXUS Dota 2 culture — drafts with patience, fights with conviction, and a stage presence the club still channels.",
    clubId: "club-nexus",
    sport: "dota2",
  },
];

export function getLegendById(id: string) {
  return legends.find((l) => l.id === id);
}

export function getLegendsByClubId(clubId: string) {
  return legends.filter((l) => l.clubId === clubId);
}
