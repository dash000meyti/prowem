import { TeamCard } from "@/components/club/TeamCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getClubBySlug, getTeamsByClubId, isFeaturedClub } from "@/data";
import { notFound } from "next/navigation";

export default async function ClubTeamsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();
  const teams = getTeamsByClubId(club.id);
  if (teams.length <= 1) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeader
        eyebrow={club.shortName}
        title="Select a team"
        description={`${club.name} across ${teams.map((t) => t.sport).join(", ")} — one identity, multiple arenas.`}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            href={`/clubs/${slug}/teams/${team.sport}`}
          />
        ))}
      </div>
    </div>
  );
}
