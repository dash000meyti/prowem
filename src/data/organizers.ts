import type { Organizer } from "@/types";

export const organizers: Organizer[] = [
  {
    id: "org-dfl",
    slug: "dfl",
    name: "DFL Deutsche Fußball Liga",
    shortName: "DFL",
    description:
      "The Deutsche Fußball Liga organises Germany's professional football leagues, including the Bundesliga — the country's top-flight competition.",
    location: "Frankfurt, Germany",
  },
  {
    id: "org-socca-austria",
    slug: "socca-austria",
    name: "Socca Austria",
    shortName: "Socca AT",
    description:
      "Official member of the International Socca Federation, running national leagues including the Vienna Pro League.",
    location: "Brunn am Gebirge, Austria",
  },
  {
    id: "org-valve",
    slug: "valve",
    name: "Valve Corporation",
    shortName: "Valve",
    description:
      "Publisher of Dota 2 and organiser of The International — the premier annual championship of the Dota Pro Circuit.",
    location: "Bellevue, USA",
  },
];

export function getOrganizerById(id: string) {
  return organizers.find((o) => o.id === id);
}

export function getOrganizerBySlug(slug: string) {
  return organizers.find((o) => o.slug === slug);
}
