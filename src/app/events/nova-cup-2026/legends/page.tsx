import { LegendCard } from "@/components/event/AwardLegendCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, legends } from "@/data";
import { notFound } from "next/navigation";

export default function EventLegendsPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const eventLegends = legends.filter((l) => l.eventId === event.id);
  const displayLegends = eventLegends.length > 0 ? eventLegends : legends;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Legacy"
        title="Legends"
        description={
          eventLegends.length > 0
            ? "Moments and figures etched into NOVA CUP lore."
            : "Icons and nights that still shape how this festival — and its clubs — are remembered."
        }
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayLegends.map((legend) => (
          <LegendCard key={legend.id} legend={legend} />
        ))}
      </div>
      {eventLegends.length > 0 && eventLegends.length < legends.length ? (
        <div className="mt-14">
          <SectionHeader
            eyebrow="Wider lore"
            title="Club legends in the field"
            description="Players and eras from clubs competing under the NOVA mark this week."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {legends
              .filter((l) => l.eventId !== event.id)
              .map((legend) => (
                <LegendCard key={legend.id} legend={legend} />
              ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
