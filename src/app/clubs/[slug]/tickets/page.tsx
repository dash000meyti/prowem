import { ClubTicketsSection } from "@/components/club/ClubTicketsSection";
import {
  getClubBySlug,
  getTeamsByClubId,
  isFeaturedClub,
  matches,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubTicketsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const teamIds = new Set(getTeamsByClubId(club.id).map((t) => t.id));
  const upcoming = matches
    .filter(
      (m) =>
        m.status === "scheduled" &&
        (teamIds.has(m.homeTeamId) || teamIds.has(m.awayTeamId)),
    )
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-14">
      <ClubTicketsSection clubName={club.name} matches={upcoming} />
      {upcoming.length === 0 ? (
        <p className="text-sm text-muted">
          No upcoming ticketed fixtures at the moment.
        </p>
      ) : null}
    </div>
  );
}
