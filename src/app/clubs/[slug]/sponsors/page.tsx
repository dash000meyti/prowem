import { SponsorGrid } from "@/components/event/SponsorGrid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getClubBySlug,
  getSponsorsByClubId,
  isFeaturedClub,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubSponsorsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const sponsors = getSponsorsByClubId(club.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <SectionHeader
        eyebrow="Partners"
        title="Sponsors"
        description={`Commercial partners of ${club.name} by support tier.`}
      />
      {sponsors.length > 0 ? (
        <SponsorGrid sponsors={sponsors} />
      ) : (
        <p className="text-sm text-muted">No sponsors listed yet.</p>
      )}
    </div>
  );
}
