import Link from "next/link";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import type { Match, Team } from "@/types";

export function LiveMatchCard({
  match,
  home,
  away,
  href = "/matches/nova-cup/nexus-vs-berlin-united",
}: {
  match: Match;
  home: Team;
  away: Team;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className="block overflow-hidden border border-orange/30 bg-gradient-to-br from-[#2a140e] via-bg-1 to-bg-0 p-6 transition hover:border-orange/60 md:p-8"
    >
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
        <div>
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
        <div className="text-right">
          <p className="text-xl font-semibold md:text-3xl">{away.name}</p>
        </div>
      </div>
    </Link>
  );
}
