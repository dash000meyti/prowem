import { TeamCard } from "@/components/club/TeamCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getTeamsForEvent } from "@/data";
import { notFound } from "next/navigation";

export default function EventTeamsPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const teams = getTeamsForEvent(event.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow={event.shortName}
        title="Teams"
        description={`${event.teamCount} clubs. One city. Explore every side in the 2026 field.`}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            href={team.clubId === "club-nexus" ? "/clubs/nexus" : undefined}
          />
        ))}
      </div>
    </div>
  );
}
