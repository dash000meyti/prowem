import { AwardCard } from "@/components/event/AwardLegendCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAwardsByEventId, getEventBySlug } from "@/data";
import { notFound } from "next/navigation";

export default function EventAwardsPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const awards = getAwardsByEventId(event.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Honours"
        title="Awards"
        description="The titles that frame last year’s cycle — and the names still worn into festival memory."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((award) => (
          <AwardCard key={award.id} award={award} />
        ))}
      </div>
    </div>
  );
}
