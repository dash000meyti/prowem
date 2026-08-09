import type { Organizer } from "@/types";

export const organizers: Organizer[] = [
  {
    id: "org-nova",
    slug: "nova-sports",
    name: "NOVA Sports",
    shortName: "NOVA",
    description:
      "European sports infrastructure partner delivering premium competitions, club platforms and live digital experiences.",
    location: "Berlin, Germany",
  },
];

export function getOrganizerById(id: string) {
  return organizers.find((o) => o.id === id);
}

export function getOrganizerBySlug(slug: string) {
  return organizers.find((o) => o.slug === slug);
}
