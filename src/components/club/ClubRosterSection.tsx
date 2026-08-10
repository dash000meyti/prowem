import type { Player } from "@/types";
import { PlayerCard } from "@/components/club/PlayerCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ClubRosterSection({
  players,
  clubSlug,
  sportLabel,
  teamHref,
}: {
  players: Player[];
  clubSlug: string;
  sportLabel: string;
  teamHref?: string;
}) {
  if (players.length === 0) return null;

  return (
    <section>
      <SectionHeader
        eyebrow="Roster"
        title="Squad"
        description={`Active ${sportLabel.toLowerCase()} roster.`}
        action={
          teamHref ? (
            <Button href={teamHref} variant="outline" size="sm">
              Open team
            </Button>
          ) : null
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            href={`/clubs/${clubSlug}/players/${player.slug}`}
          />
        ))}
      </div>
    </section>
  );
}
