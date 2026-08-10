import { Bracket } from "@/components/match/Bracket";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { getBracketForEvent, getEventBySlug } from "@/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function EventBracketPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const items = getBracketForEvent(event.id);
  const isKnockout = event.sport === "dota2" || items.length > 0;

  if (!isKnockout || items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <SectionHeader
          eyebrow="Knockout"
          title="No bracket for this event"
          description={`${event.name} runs as a league table — open standings for the current order.`}
        />
        <Button href={`/events/${slug}/standings`} variant="outline">
          View standings
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Knockout"
        title={`${event.shortName} bracket`}
        description="Upper and lower bracket paths from the opening matches to the Grand Final — crests, scores and every feed-forward still drawn on the stage."
      />
      <div className="mt-8 rounded-lg border border-border bg-bg-0/40 p-4 md:p-6">
        <Bracket items={items} />
      </div>
      <p className="mt-6 text-sm text-muted">
        Looking for series recaps?{" "}
        <Link
          href={`/events/${slug}/matches`}
          className="text-brand underline-offset-2 hover:underline"
        >
          Browse TI matches
        </Link>
        .
      </p>
    </div>
  );
}
