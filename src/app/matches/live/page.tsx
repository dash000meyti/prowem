import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { MatchCard } from "@/components/match/MatchCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { getLiveMatchesList, getTeamById, heroMedia } from "@/data";

export default function MatchdayPage() {
  const live = getLiveMatchesList();
  const featured = live.find((m) => m.id === "match-nexus-berlin");
  const others = live.filter((m) => m.id !== "match-nexus-berlin");

  return (
    <div>
      <PhotoBackground
        src={heroMedia.matchday}
        alt="Matchday atmosphere"
        priority
        scrim="heavy"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <GlassPanel variant="subtle" className="max-w-2xl p-6 md:p-8">
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
          </GlassPanel>
        </div>
      </PhotoBackground>

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
            />
          </section>
        ) : null}

        <section>
          <SectionHeader
            eyebrow="Also live"
            title="Parallel matches"
            description="Follow the rest of the festival night."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {others.map((match) => {
              const home = getTeamById(match.homeTeamId);
              const away = getTeamById(match.awayTeamId);
              if (!home || !away) return null;
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
