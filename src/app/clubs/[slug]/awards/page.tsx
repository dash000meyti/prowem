import { AwardCard } from "@/components/event/AwardLegendCards";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAwardsByClubId,
  getClubBySlug,
  isFeaturedClub,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubAwardsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const awards = getAwardsByClubId(club.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeader
        eyebrow="Recognition"
        title="Awards"
        description={`Honours and club recognition for ${club.name}.`}
      />
      {awards.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">No awards listed yet.</p>
      )}
    </div>
  );
}
