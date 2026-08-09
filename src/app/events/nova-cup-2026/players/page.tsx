import { PlayerCard } from "@/components/club/PlayerCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getEventBySlug,
  getPlayersByTeamId,
  getTeamsForEvent,
} from "@/data";
import { notFound } from "next/navigation";

export default function EventPlayersPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const teams = getTeamsForEvent(event.id);
  const players = teams
    .flatMap((team) => getPlayersByTeamId(team.id))
    .filter((p) => p.rating != null)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 24);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Squad depth"
        title="Players"
        description="A cross-section of the festival’s highest-rated talent across the sixteen teams."
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
