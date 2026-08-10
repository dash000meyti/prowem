import Link from "next/link";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { matchThumbForSport } from "@/data/media";
import { formatMatchMinute, formatScore, cn } from "@/lib/utils";
import type { Match, Team } from "@/types";

export function MatchCard({
  match,
  home,
  away,
  href,
  compact = false,
}: {
  match: Match;
  home: Team;
  away: Team;
  href?: string;
  compact?: boolean;
}) {
  const thumb = matchThumbForSport(match.sport, match.id);
  const content = (
    <GlassPanel
      className={cn(
        "group overflow-hidden transition",
        compact ? "p-3" : "p-0",
      )}
    >
      {!compact ? (
        <div className="relative h-28 overflow-hidden">
          <MediaImage src={thumb} alt="" sizes="400px" />
          <div className="absolute inset-0 photo-scrim-light" />
          <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
            {match.status === "live" ? (
              <LiveIndicator />
            ) : (
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted">
                {formatMatchMinute(match.minute, match.status)}
              </span>
            )}
          </div>
        </div>
      ) : null}
      <div className={cn(compact ? "" : "p-5")}>
        <div className="mb-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-muted">
          <span>{match.round}</span>
          {compact ? (
            match.status === "live" ? (
              <LiveIndicator />
            ) : (
              <span>{formatMatchMinute(match.minute, match.status)}</span>
            )
          ) : (
            <span>{match.venue}</span>
          )}
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <Crest slug={home.slug} name={home.name} size={28} />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold md:text-base">
                {home.name}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-muted">
                {home.shortName}
              </p>
            </div>
          </div>
          <div className="text-center">
            <p
              className={cn(
                "font-semibold tabular-nums tracking-tight",
                compact ? "text-2xl" : "text-3xl",
                match.status === "live" && "text-orange",
              )}
            >
              {formatScore(match.homeScore, match.awayScore)}
            </p>
            {match.status === "live" ? (
              <p className="mt-1 text-xs text-orange">{match.minute}&apos;</p>
            ) : null}
          </div>
          <div className="flex min-w-0 items-center justify-end gap-2">
            <div className="min-w-0 text-right">
              <p className="truncate text-sm font-semibold md:text-base">
                {away.name}
              </p>
              <p className="text-[11px] uppercase tracking-wider text-muted">
                {away.shortName}
              </p>
            </div>
            <Crest slug={away.slug} name={away.name} size={28} />
          </div>
        </div>
      </div>
    </GlassPanel>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
