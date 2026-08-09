import { MatchFilterList } from "@/components/match/MatchFilterList";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getMatchesByEventId } from "@/data";
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow={event.shortName}
        title="Matches"
        description="Every fixture across the four-day festival — from openers to the final path."
      />
      <MatchFilterList matches={eventMatches} />
    </div>
  );
}
