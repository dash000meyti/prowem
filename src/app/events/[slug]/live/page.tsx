import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { MatchCard } from "@/components/match/MatchCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  getEventBySlug,
  getLiveMatchesList,
  getTeamById,
} from "@/data";
import { matchHref } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EventLivePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const live = getLiveMatchesList(event.id);
  const featured = live[0];
  const others = live.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="On air"
        title="Live matches"
        description="Fixtures currently in play."
        action={
          featured ? (
            <Button href={matchHref(featured, event.slug)} size="sm">
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
            href={matchHref(featured, event.slug)}
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
              href={matchHref(match, event.slug)}
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
