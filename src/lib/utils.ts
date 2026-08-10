import type { Match } from "@/types";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function formatScore(home: number, away: number) {
  return `${home}–${away}`;
}

export function formatMatchMinute(minute?: number, status?: string) {
  if (status === "finished") return "FT";
  if (status === "scheduled") return "Upcoming";
  if (minute == null) return "—";
  return `${minute}'`;
}

export function sportLabel(sport: string) {
  const map: Record<string, string> = {
    football: "Football",
    socca: "Socca",
    dota2: "Dota 2",
    basketball: "Basketball",
    volleyball: "Volleyball",
    cs2: "Counter-Strike",
    valorant: "Valorant",
  };
  return map[sport] ?? sport;
}

/** Match Center / stage detail href for a fixture */
export function matchHref(
  match: Pick<Match, "id" | "slug" | "eventId">,
  eventSlug?: string,
): string {
  if (match.id === "match-bayern-dortmund") {
    return "/matches/bundesliga/bayern-vs-dortmund";
  }
  const slug =
    eventSlug ??
    (match.eventId === "evt-bundesliga"
      ? "bundesliga"
      : match.eventId === "evt-socca-austria-pro"
        ? "socca-austria-pro"
        : match.eventId === "evt-the-international"
          ? "the-international"
          : "match");
  return `/matches/${slug}/${match.slug}`;
}
