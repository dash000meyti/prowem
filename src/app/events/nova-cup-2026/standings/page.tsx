import { StandingsTable } from "@/components/event/StandingsTable";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getStandingsForEvent } from "@/data";
import { notFound } from "next/navigation";

export default function EventStandingsPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const rows = getStandingsForEvent();

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
