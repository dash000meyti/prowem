import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { MatchCard } from "@/components/match/MatchCard";
import { MatchFilterList } from "@/components/match/MatchFilterList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  getEventBySlug,
  getLiveMatchesList,
  getMatchesByEventId,
  getTeamById,
} from "@/data";
import { matchHref } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function EventMatchesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const eventMatches = getMatchesByEventId(event.id);
  const live = getLiveMatchesList(event.id);
  const featured = live[0];
  const otherLive = live.slice(1);

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-10 md:px-6">
      {live.length > 0 ? (
        <section>
          <SectionHeader
            eyebrow="On air"
            title="Live now"
            description="Fixtures currently in play — jump straight into the Match Center."
            action={
              featured ? (
                <Button href={matchHref(featured, event.slug)} size="sm">
                  Open Match Center
                </Button>
              ) : null
            }
          />
          {featured ? (
            <div className="mb-4">
              <LiveMatchCard
                match={featured}
                home={getTeamById(featured.homeTeamId)!}
                away={getTeamById(featured.awayTeamId)!}
                href={matchHref(featured, event.slug)}
              />
            </div>
          ) : null}
          {otherLive.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {otherLive.map((match) => (
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
        </section>
      ) : null}

      <section>
        <SectionHeader
          eyebrow={event.shortName}
          title="Matches"
          description="Full schedule — from openers to the final path."
        />
        <MatchFilterList matches={eventMatches} />
      </section>
    </div>
  );
}
