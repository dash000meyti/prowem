import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { MatchCard } from "@/components/match/MatchCard";
import {
  getClubBySlug,
  getPlayerBySlug,
  getTeamById,
  heroMedia,
  isFeaturedClub,
  matches,
} from "@/data";
import { sportLabel } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function ClubPlayerPage({
  params,
}: {
  params: Promise<{ slug: string; playerSlug: string }>;
}) {
  const { slug, playerSlug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const player = getPlayerBySlug(playerSlug);
  if (!player || !club.teamIds.includes(player.teamId)) notFound();

  const team = getTeamById(player.teamId)!;
  const playerMatches = matches
    .filter(
      (m) =>
        (m.homeTeamId === team.id || m.awayTeamId === team.id) &&
        (m.homeLineupIds.includes(player.id) ||
          m.awayLineupIds.includes(player.id) ||
          m.events.some((e) => e.playerId === player.id)),
    )
    .slice(0, 4);

  const hero =
    player.sport === "dota2" ? heroMedia.bayernDota : heroMedia.player;

  return (
    <div>
      <PhotoBackground
        src={hero}
        alt={player.name}
        scrim="heavy"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <GlassPanel className="max-w-3xl p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Crest slug={team.slug} name={team.name} size={40} />
              <p className="text-xs uppercase tracking-[0.28em] text-brand">
                {club.shortName} · {sportLabel(player.sport)}
              </p>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {player.name}
            </h1>
            <p className="mt-3 text-sm uppercase tracking-[0.16em] text-muted">
              {player.role}
              {player.number != null ? ` · #${player.number}` : ""} ·{" "}
              {player.nationality}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              {player.bio}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={`/clubs/${slug}/teams/${team.sport}`}>
                {team.name}
              </Button>
              <Button href={`/clubs/${slug}`} variant="outline">
                Club home
              </Button>
            </div>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 md:px-6">
        <section>
          <SectionHeader eyebrow="Form" title="Season numbers" />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {Object.entries(player.stats).map(([key, value]) => (
              <GlassPanel key={key} className="p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  {key}
                </p>
                <p className="mt-2 text-2xl font-semibold tabular-nums">
                  {value}
                </p>
              </GlassPanel>
            ))}
            {player.rating != null ? (
              <GlassPanel className="p-5">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                  Rating
                </p>
                <p className="mt-2 text-2xl font-semibold tabular-nums text-brand">
                  {player.rating.toFixed(1)}
                </p>
              </GlassPanel>
            ) : null}
          </div>
        </section>

        {playerMatches.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Matches" title="Recent involvement" />
            <div className="grid gap-4 md:grid-cols-2">
              {playerMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  home={getTeamById(match.homeTeamId)!}
                  away={getTeamById(match.awayTeamId)!}
                  href={
                    match.id === "match-bayern-dortmund"
                      ? "/matches/bundesliga/bayern-vs-dortmund"
                      : undefined
                  }
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
