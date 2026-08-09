import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import {
  getEventBySlug,
  getFeaturedMatch,
  getLiveMatchesList,
  getMatchesByEventId,
  getTeamById,
} from "@/data";
import { notFound } from "next/navigation";

export default function EventStatsPage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const featured = getFeaturedMatch();
  const live = getLiveMatchesList(event.id);
  const allMatches = getMatchesByEventId(event.id);
  const home = getTeamById(featured.homeTeamId)!;
  const away = getTeamById(featured.awayTeamId)!;
  const stats = featured.footballStats!;

  const goalEvents = allMatches.flatMap((m) =>
    m.events
      .filter((e) => e.type === "goal" && e.playerName)
      .map((e) => ({
        playerName: e.playerName!,
        teamId: e.teamId,
        matchId: m.id,
      })),
  );

  const scorerMap = new Map<string, { name: string; goals: number; teamId: string }>();
  for (const g of goalEvents) {
    const prev = scorerMap.get(g.playerName);
    if (prev) {
      prev.goals += 1;
    } else {
      scorerMap.set(g.playerName, {
        name: g.playerName,
        goals: 1,
        teamId: g.teamId,
      });
    }
  }

  const topScorers = [...scorerMap.values()]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 8);

  const statRows: { label: string; home: number; away: number; suffix?: string }[] =
    [
      { label: "Possession", home: stats.possession[0], away: stats.possession[1], suffix: "%" },
      { label: "Shots", home: stats.shots[0], away: stats.shots[1] },
      { label: "On target", home: stats.shotsOnTarget[0], away: stats.shotsOnTarget[1] },
      { label: "Corners", home: stats.corners[0], away: stats.corners[1] },
      { label: "Fouls", home: stats.fouls[0], away: stats.fouls[1] },
      {
        label: "Pass accuracy",
        home: stats.passAccuracy[0],
        away: stats.passAccuracy[1],
        suffix: "%",
      },
    ];

  const liveGoals = live.reduce((sum, m) => sum + m.homeScore + m.awayScore, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Numbers"
        title="Festival stats"
        description="Live pulse from the semi-final headline, plus the scorers defining this cycle."
        action={
          <Button
            href="/matches/nova-cup/nexus-vs-berlin-united"
            variant="secondary"
            size="sm"
          >
            Match Center
          </Button>
        }
      />

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        <div className="border border-border bg-bg-1 p-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Live matches
          </p>
          <p className="mt-3 text-4xl font-semibold tabular-nums text-orange">
            {live.length}
          </p>
        </div>
        <div className="border border-border bg-bg-1 p-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Goals tonight
          </p>
          <p className="mt-3 text-4xl font-semibold tabular-nums text-orange">
            {liveGoals}
          </p>
        </div>
        <div className="border border-border bg-bg-1 p-6">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Headline score
          </p>
          <p className="mt-3 text-4xl font-semibold tabular-nums text-orange">
            {featured.homeScore}–{featured.awayScore}
          </p>
          <p className="mt-2 text-xs text-muted">
            {home.shortName} vs {away.shortName} · {featured.minute}&apos;
          </p>
        </div>
      </div>

      <section className="mb-16">
        <h3 className="mb-2 text-xl font-semibold tracking-tight">
          {home.name} vs {away.name}
        </h3>
        <p className="mb-6 text-sm text-muted">
          Aggregate match metrics at {featured.minute}&apos; — the numbers behind
          a semi-final still swinging.
        </p>
        <div className="space-y-4 border border-border bg-bg-1 p-6">
          {statRows.map((row) => {
            const total = row.home + row.away || 1;
            const homePct = (row.home / total) * 100;
            return (
              <div key={row.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="tabular-nums font-semibold">
                    {row.home}
                    {row.suffix ?? ""}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                    {row.label}
                  </span>
                  <span className="tabular-nums font-semibold">
                    {row.away}
                    {row.suffix ?? ""}
                  </span>
                </div>
                <div className="flex h-1.5 overflow-hidden bg-bg-2">
                  <div
                    className="h-full bg-orange"
                    style={{ width: `${homePct}%` }}
                  />
                  <div
                    className="h-full bg-white/20"
                    style={{ width: `${100 - homePct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-xl font-semibold tracking-tight">
          Top scorers
        </h3>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">
          Across the festival timeline, finishers have already written the
          narrative — from early knockout bursts to tonight&apos;s semi-final
          strikes. Kai Novak and Marco Vesa keep NEXUS in the conversation;
          Berlin&apos;s Luka Petrov answered when the district needed a reply.
        </p>
        <div className="overflow-x-auto border border-border">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead className="bg-bg-2 text-[11px] uppercase tracking-[0.14em] text-muted">
              <tr>
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">Player</th>
                <th className="px-4 py-3">Club</th>
                <th className="px-4 py-3">Goals</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((scorer, index) => {
                const team = getTeamById(scorer.teamId);
                return (
                  <tr
                    key={scorer.name}
                    className="border-t border-border/80 odd:bg-bg-1/40"
                  >
                    <td className="px-4 py-3 tabular-nums text-muted">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 font-medium">{scorer.name}</td>
                    <td className="px-4 py-3 text-muted">
                      {team?.shortName ?? "—"}
                    </td>
                    <td className="px-4 py-3 font-semibold tabular-nums text-orange">
                      {scorer.goals}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
