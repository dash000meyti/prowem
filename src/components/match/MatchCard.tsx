import Link from "next/link";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { formatMatchMinute, formatScore } from "@/lib/utils";
import type { Match, Team } from "@/types";
import { cn } from "@/lib/utils";

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
  const content = (
    <article
      className={cn(
        "group border border-border bg-bg-1/80 p-4 transition hover:border-border-strong hover:bg-bg-2",
        compact ? "p-3" : "p-5",
      )}
    >
      <div className="mb-3 flex items-center justify-between gap-3 text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>{match.round}</span>
        {match.status === "live" ? (
          <LiveIndicator />
        ) : (
          <span>{formatMatchMinute(match.minute, match.status)}</span>
        )}
      </div>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold md:text-base">{home.name}</p>
          <p className="text-[11px] uppercase tracking-wider text-muted">
            {home.shortName}
          </p>
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
        <div className="min-w-0 text-right">
          <p className="truncate text-sm font-semibold md:text-base">{away.name}</p>
          <p className="text-[11px] uppercase tracking-wider text-muted">
            {away.shortName}
          </p>
        </div>
      </div>
      {!compact ? (
        <p className="mt-4 text-xs text-muted">{match.venue}</p>
      ) : null}
    </article>
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
