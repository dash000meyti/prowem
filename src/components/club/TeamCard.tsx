import Link from "next/link";
import type { Team } from "@/types";
import { sportLabel } from "@/lib/utils";
import { getClubForTeam, isFeaturedClub } from "@/data";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { resolveMedia } from "@/data/media";

export function TeamCard({
  team,
  href,
}: {
  team: Team;
  href?: string;
}) {
  const club = getClubForTeam(team.id);
  const to =
    href ??
    (club && isFeaturedClub(club.slug)
      ? `/clubs/${club.slug}/teams/${team.sport}`
      : club
        ? `/events/bundesliga/teams`
        : "#");

  const thumb =
    team.sport === "dota2"
      ? resolveMedia("esportsStage")
      : team.sport === "socca"
        ? resolveMedia("soccaCage")
        : resolveMedia("footballAction");

  return (
    <Link href={to} className="group block">
      <GlassPanel className="overflow-hidden transition">
        <div className="relative h-28">
          <MediaImage src={thumb} alt={team.name} sizes="320px" />
          <div className="absolute inset-0 photo-scrim-light" />
          <div className="absolute bottom-3 left-3 z-10">
            <Crest slug={team.slug} name={team.name} size={48} />
          </div>
        </div>
        <div className="p-5">
          <p className="text-lg font-semibold tracking-tight group-hover:text-orange">
            {team.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
            {sportLabel(team.sport)} · {team.city}
          </p>
        </div>
      </GlassPanel>
    </Link>
  );
}
