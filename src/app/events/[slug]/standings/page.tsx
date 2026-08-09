import { StandingsTable } from "@/components/event/StandingsTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getStandingsForEvent } from "@/data";
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow={event.shortName}
        title="Standings"
        description="Full festival table — points, goals, and the climb toward knockout nights."
      />
      <StandingsTable rows={rows} />
    </div>
  );
}
