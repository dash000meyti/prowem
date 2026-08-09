import Link from "next/link";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { heroMedia } from "@/data/media";
import type { Match, Team } from "@/types";

export function LiveMatchCard({
  match,
  home,
  away,
  href = "/matches/bundesliga/bayern-vs-dortmund",
}: {
  match: Match;
  home: Team;
  away: Team;
  href?: string;
}) {
  return (
    <Link href={href} className="block">
      <GlassPanel className="relative overflow-hidden">
        <div className="absolute inset-0">
          <MediaImage src={heroMedia.matchCenter} alt="" />
          <div className="absolute inset-0 photo-scrim-heavy" />
        </div>
        <div className="relative z-10 p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-orange">
                {match.round}
              </p>
              <p className="mt-1 text-sm text-muted">{match.venue}</p>
            </div>
            <LiveIndicator />
          </div>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="flex items-center gap-3">
              <Crest slug={home.slug} name={home.name} size={44} />
              <p className="text-xl font-semibold md:text-3xl">{home.name}</p>
            </div>
            <div className="px-2 text-center">
              <p className="text-4xl font-semibold tabular-nums text-orange md:text-6xl">
                {match.homeScore}
                <span className="mx-2 text-muted">—</span>
                {match.awayScore}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.18em] text-orange">
                {match.minute}&apos;
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <p className="text-right text-xl font-semibold md:text-3xl">
                {away.name}
              </p>
              <Crest slug={away.slug} name={away.name} size={44} />
            </div>
          </div>
        </div>
      </GlassPanel>
    </Link>
  );
}
