import { ClubPatronsSection } from "@/components/club/ClubPatronsSection";
import {
  getClubBySlug,
  getRecentClubShoppers,
  getTopClubPatrons,
  isFeaturedClub,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubSupportersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const topPatrons = getTopClubPatrons(club.id, 10);
  const recentShoppers = getRecentClubShoppers(club.id, 10);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <ClubPatronsSection
        clubName={club.name}
        topPatrons={topPatrons}
        recentShoppers={recentShoppers}
      />
    </div>
  );
}
