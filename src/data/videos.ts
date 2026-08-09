import type { VideoItem } from "@/types";

export const videos: VideoItem[] = [
  {
    id: "vid-klassiker-kane",
    slug: "kane-opens-klassiker",
    title: "Kane opens the scoring in Der Klassiker",
    duration: "0:48",
    views: "1.2M",
    publishedAt: "2025-11-08T18:45:00+01:00",
    category: "Highlight",
    imageTone: "action-green",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    teamId: "team-bayern-fc",
    matchId: "match-bayern-dortmund",
  },
  {
    id: "vid-musiala-goal",
    slug: "musiala-restores-lead",
    title: "Musiala restores Bayern's lead",
    duration: "0:42",
    views: "890K",
    publishedAt: "2025-11-08T19:30:00+01:00",
    category: "Highlight",
    imageTone: "celebration",
    eventId: "evt-bundesliga",
    clubId: "club-bayern",
    teamId: "team-bayern-fc",
    matchId: "match-bayern-dortmund",
  },
  {
    id: "vid-guirassy-header",
    slug: "guirassy-klassiker-header",
    title: "Guirassy heads Dortmund level",
    duration: "0:36",
    views: "640K",
    publishedAt: "2025-11-08T19:10:00+01:00",
    category: "Highlight",
    imageTone: "crowd-orange",
    eventId: "evt-bundesliga",
    clubId: "club-dortmund",
    teamId: "team-dortmund-fc",
    matchId: "match-bayern-dortmund",
  },
  {
    id: "vid-ti-bayern-dortmund",
    slug: "ti-bayern-dortmund-series",
    title: "TI UB Semi: Bayern Dota 2 vs Dortmund — series recap",
    duration: "8:14",
    views: "420K",
    publishedAt: "2024-09-12T23:00:00+02:00",
    category: "Esports",
    imageTone: "esports-neon",
    eventId: "evt-the-international",
    clubId: "club-bayern",
    teamId: "team-bayern-dota2",
    matchId: "match-bayern-dortmund-dota",
  },
  {
    id: "vid-socca-lorient",
    slug: "lorient-socca-highlights",
    title: "Lorient Socca — Round 8 cage highlights",
    duration: "3:20",
    views: "48K",
    publishedAt: "2025-03-12T22:00:00+01:00",
    category: "Socca",
    imageTone: "socca-heat",
    eventId: "evt-socca-austria-pro",
    clubId: "club-lorient",
    teamId: "team-lorient-socca",
  },
  {
    id: "vid-weser-atmosphere",
    slug: "weserstadion-atmosphere",
    title: "Grün-Weiß night at the Weserstadion",
    duration: "2:05",
    views: "112K",
    publishedAt: "2025-11-01T20:00:00+01:00",
    category: "Club",
    imageTone: "forest",
    eventId: "evt-bundesliga",
    clubId: "club-werder",
  },
  {
    id: "vid-yellow-wall",
    slug: "yellow-wall-signal-iduna",
    title: "Inside the Yellow Wall",
    duration: "4:10",
    views: "980K",
    publishedAt: "2025-10-20T12:00:00+02:00",
    category: "Club",
    imageTone: "crowd-orange",
    clubId: "club-dortmund",
  },
  {
    id: "vid-allianz-tour",
    slug: "allianz-arena-tour",
    title: "Allianz Arena matchday tour",
    duration: "5:30",
    views: "760K",
    publishedAt: "2025-09-15T10:00:00+02:00",
    category: "Club",
    imageTone: "stadium-night",
    clubId: "club-bayern",
  },
];

export function getVideoById(id: string) {
  return videos.find((v) => v.id === id);
}

export function getVideoBySlug(slug: string) {
  return videos.find((v) => v.slug === slug);
}

export function getVideosByEventId(eventId: string) {
  return videos.filter((v) => v.eventId === eventId);
}

export function getVideosByClubId(clubId: string) {
  return videos.filter((v) => v.clubId === clubId);
}
