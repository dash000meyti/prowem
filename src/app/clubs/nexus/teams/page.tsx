import { TeamCard } from "@/components/club/TeamCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getClubBySlug, getTeamsByClubId } from "@/data";
import { notFound } from "next/navigation";

const teamHrefs: Record<string, string> = {
  "team-nexus-fc": "/clubs/nexus/teams/football",
  "team-nexus-socca": "/clubs/nexus/teams/socca",
  "team-nexus-dota2": "/clubs/nexus/teams/dota2",
};

export default function NexusTeamsPage() {
  const club = getClubBySlug("nexus");
  if (!club) notFound();
  const teams = getTeamsByClubId(club.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeader
        eyebrow="NEXUS"
        title="Select a team"
        description="Football, socca and Dota 2 — three digital homes under one club."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} href={teamHrefs[team.id]} />
        ))}
      </div>
    </div>
  );
}
