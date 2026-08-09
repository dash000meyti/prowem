import { SponsorGrid } from "@/components/event/SponsorGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getSponsorsByEventId } from "@/data";
import { notFound } from "next/navigation";

export default async function EventSponsorsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const sponsors = getSponsorsByEventId(event.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Partners"
        title="Sponsors"
        description="The brands that fuel four days of football theatre — from title partner to city mobility."
      />

      <div className="mb-10 max-w-2xl space-y-4 text-sm leading-relaxed text-muted md:text-base">
        <p>
          Bundesliga partners sit inside the matchday, not outside it. Title
          energy on the live moments, kit that keeps pace with the press, and
          city networks that move fans from platform to pitch.
        </p>
        <p>
          Every activation still feeds the same story: sixteen teams, one
          festival identity, and a Berlin week built for presence.
        </p>
      </div>

      <SponsorGrid sponsors={sponsors} />

      <ul className="mt-12 grid gap-4 md:grid-cols-2">
        {sponsors.map((sponsor) => (
          <li
            key={sponsor.id}
            className="border border-border bg-bg-1 p-5"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-orange">
              {sponsor.tier}
            </p>
            <p className="mt-2 text-lg font-semibold">{sponsor.name}</p>
            <p className="mt-2 text-sm text-muted">{sponsor.tagline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
