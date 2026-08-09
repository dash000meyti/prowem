import Link from "next/link";
import type { Player } from "@/types";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import {
  getClubForTeam,
  getTeamById,
  isFeaturedClub,
  playerPortraitFallback,
  playerPortraitPath,
} from "@/data";
import { Crest } from "@/components/media/Crest";

export function PlayerCard({
  player,
  href,
}: {
  player: Player;
  href?: string;
}) {
  const team = getTeamById(player.teamId);
  const club = team ? getClubForTeam(team.id) : undefined;
  const profileHref =
    href ??
    (club && isFeaturedClub(club.slug)
      ? `/clubs/${club.slug}/players/${player.slug}`
      : undefined);

  const portrait =
    player.sport === "football"
      ? playerPortraitPath(player.slug)
      : playerPortraitFallback(player.sport);

  const body = (
    <GlassPanel className="overflow-hidden transition hover:border-[var(--glass-border-strong)]">
      <div className="relative h-52 bg-bg-2">
        <MediaImage
          src={portrait}
          alt={player.name}
          sizes="320px"
          className="object-cover object-top"
        />
        {/* Light top wash only — name/meta sit below the photo */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent"
          aria-hidden
        />
        <div className="absolute left-3 top-3 z-10 rounded-sm bg-black/55 px-2 py-1 text-xs font-semibold text-orange backdrop-blur-[2px]">
          {player.number ?? player.shortName.slice(0, 2)}
        </div>
        {player.rating != null ? (
          <span className="absolute right-3 top-3 z-10 rounded-sm bg-black/55 px-2 py-1 text-sm font-semibold tabular-nums text-orange backdrop-blur-[2px]">
            {player.rating.toFixed(1)}
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center gap-2">
          {team ? <Crest slug={team.slug} name={team.name} size={20} /> : null}
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
            {player.role}
          </p>
        </div>
        <h3 className="text-base font-semibold">{player.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
          {player.nationality}
          {player.age ? ` · ${player.age}` : ""}
        </p>
      </div>
    </GlassPanel>
  );

  if (profileHref) {
    return <Link href={profileHref}>{body}</Link>;
  }
  return body;
}
