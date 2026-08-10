import type { Legend } from "@/types";

export const legends: Legend[] = [
  {
    id: "leg-beckenbauer",
    name: "Franz Beckenbauer",
    era: "1964–1977",
    title: "Der Kaiser",
    story:
      "Franz Beckenbauer redefined the sweeper role and captained Bayern through their first European dynasty — still the club's north star for leadership.",
    clubId: "club-bayern",
    sport: "football",
    image: "/images/legends/beckenbauer.jpg",
  },
  {
    id: "leg-mueller",
    name: "Gerd Müller",
    era: "1964–1979",
    title: "Der Bomber",
    story:
      "Gerd Müller’s goalscoring record remains the standard for Bayern strikers — instinct in the box, ruthless efficiency.",
    clubId: "club-bayern",
    sport: "football",
    image: "/images/legends/mueller.jpg",
  },
  {
    id: "leg-lewandowski",
    name: "Robert Lewandowski",
    era: "2010–2014",
    title: "Yellow Wall Idol",
    story:
      "Before his Bayern years, Lewandowski lit up Signal Iduna Park — a BVB centre-forward who owned Der Klassiker nights.",
    clubId: "club-dortmund",
    sport: "football",
    image: "/images/legends/lewandowski.jpg",
  },
  {
    id: "leg-reif",
    name: "Roman Weidenfeller",
    era: "2002–2018",
    title: "Wall Guardian",
    story:
      "Weidenfeller’s longevity between the posts for Dortmund became synonymous with Champions League nights under the Yellow Wall.",
    clubId: "club-dortmund",
    sport: "football",
    image: "/images/legends/weidenfeller.jpg",
  },
  {
    id: "leg-klose",
    name: "Miroslav Klose",
    era: "2004–2007",
    title: "Green-White Finisher",
    story:
      "Miroslav Klose’s aerial menace at Werder Bremen helped define a golden era of attacking football on the Weser.",
    clubId: "club-werder",
    sport: "football",
    image: "/images/legends/klose.jpg",
  },
  {
    id: "leg-micoud",
    name: "Johan Micoud",
    era: "2002–2006",
    title: "Weser Magician",
    story:
      "Johan Micoud’s vision from midfield made Werder one of the most watchable sides in the Bundesliga.",
    clubId: "club-werder",
    sport: "football",
    image: "/images/legends/micoud.jpg",
  },
  {
    id: "leg-abidal",
    name: "Éric Abidal",
    era: "2000–2002",
    title: "Merlus Foundation",
    story:
      "Éric Abidal’s early years at FC Lorient remain part of the club’s Brittany identity — composure and steel at the back.",
    clubId: "club-lorient",
    sport: "football",
    image: "/images/legends/abidal.jpg",
  },
];

export function getLegendById(id: string) {
  return legends.find((l) => l.id === id);
}

export function getLegendsByClubId(clubId: string) {
  return legends.filter((l) => l.clubId === clubId);
}
