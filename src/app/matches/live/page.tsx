import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { MatchCard } from "@/components/match/MatchCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getLiveMatchesList, getTeamById } from "@/data";

export default function MatchdayPage() {
  const live = getLiveMatchesList();
  const featured = live.find((m) => m.id === "match-nexus-berlin");
  const others = live.filter((m) => m.id !== "match-nexus-berlin");

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,90,31,0.2),transparent_40%),linear-gradient(180deg,#0d0f12_0%,#08090b_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="text-xs uppercase tracking-[0.32em] text-orange">
            Live now
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
            MATCHDAY
          </h1>
          <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
            Multiple fixtures running from one match data layer — pick a live
            game and open Match Center.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-14 md:px-6">
        {featured ? (
          <section>
            <SectionHeader
              eyebrow="Semi final"
              title="Featured live"
              description="NEXUS FC vs Berlin United — open the full Match Center."
            />
            <LiveMatchCard
              match={featured}
              home={getTeamById(featured.homeTeamId)!}
              away={getTeamById(featured.awayTeamId)!}
              href="/matches/nova-cup/nexus-vs-berlin-united"
            />
          </section>
        ) : null}

        <section>
          <SectionHeader
            eyebrow="Also live"
            title="Other fixtures"
            description="Concurrent matches on the same matchday board."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {others.map((match) => {
              const home = getTeamById(match.homeTeamId)!;
              const away = getTeamById(match.awayTeamId)!;
              return (
                <MatchCard
                  key={match.id}
                  match={match}
                  home={home}
                  away={away}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
