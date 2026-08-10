import { Bracket } from "@/components/match/Bracket";
import { StandingsTable } from "@/components/event/StandingsTable";
import { EventStatsPanel } from "@/components/event/EventStatsPanel";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getBracketForEvent,
  getEventBySlug,
  getStandingsForEvent,
} from "@/data";
import { notFound } from "next/navigation";

export default async function EventStandingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const rows = getStandingsForEvent(event.id);
  const bracketItems = getBracketForEvent(event.id);
  const showBracket = bracketItems.length > 0;

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-10 md:px-6">
      {showBracket ? (
        <section>
          <SectionHeader
            eyebrow="Knockout"
            title={`${event.shortName} bracket`}
            description="The stage path is live — crests, scores and feed-forward still drawn on the board."
          />
          <Bracket items={bracketItems} />
        </section>
      ) : null}

      <section>
        <SectionHeader
          eyebrow={event.shortName}
          title="Standings"
          description="League table — points, goals, and the climb toward knockout nights."
        />
        <StandingsTable rows={rows} />
      </section>

      <EventStatsPanel eventId={event.id} eventSlug={event.slug} />
    </div>
  );
}
