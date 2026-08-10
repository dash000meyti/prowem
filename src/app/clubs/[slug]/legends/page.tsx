import { LegendCard } from "@/components/event/AwardLegendCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getClubBySlug,
  getLegendsByClubId,
  isFeaturedClub,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubLegendsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const clubLegends = getLegendsByClubId(club.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeader
        eyebrow="Heritage"
        title="Legends"
        description={`Club icons who shaped ${club.name}.`}
      />
      {clubLegends.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clubLegends.map((legend) => (
            <LegendCard key={legend.id} legend={legend} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No legends listed yet.</p>
      )}
    </div>
  );
}
