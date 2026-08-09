import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { MatchCard } from "@/components/match/MatchCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  getEventBySlug,
  getLiveMatchesList,
  getTeamById,
} from "@/data";
import { notFound } from "next/navigation";

function matchHref(matchId: string) {
  return matchId === "match-nexus-berlin"
    ? "/matches/nova-cup/nexus-vs-berlin-united"
    : undefined;
}

export default function EventLivePage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const live = getLiveMatchesList(event.id);
  const featured = live.find((m) => m.id === "match-nexus-berlin");
  const others = live.filter((m) => m.id !== "match-nexus-berlin");

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="On air"
        title="Live matches"
        description="Fixtures currently in play across the NOVA CUP district."
        action={
          featured ? (
            <Button
              href="/matches/nova-cup/nexus-vs-berlin-united"
              size="sm"
            >
              Open Match Center
            </Button>
          ) : null
        }
      />

      {featured ? (
        <div className="mb-8">
          <LiveMatchCard
            match={featured}
            home={getTeamById(featured.homeTeamId)!}
            away={getTeamById(featured.awayTeamId)!}
          />
        </div>
      ) : null}

      {others.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {others.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              home={getTeamById(match.homeTeamId)!}
              away={getTeamById(match.awayTeamId)!}
              href={matchHref(match.id)}
            />
          ))}
        </div>
      ) : null}

      {live.length === 0 ? (
        <p className="border border-border bg-bg-1 p-8 text-sm text-muted">
          No matches are live right now. Check the full schedule for upcoming
          kickoffs.
        </p>
      ) : null}
    </div>
  );
}
