import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { PlayerCard } from "@/components/club/PlayerCard";
import { MatchCard } from "@/components/match/MatchCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getPlayersByTeamId,
  getTeamById,
  matches,
  news,
  videos,
} from "@/data";
import { sportLabel } from "@/lib/utils";
import { notFound } from "next/navigation";

const TEAM_ID = "team-nexus-fc";

export default function NexusFootballPage() {
  const team = getTeamById(TEAM_ID);
  if (!team) notFound();

  const roster = getPlayersByTeamId(TEAM_ID);
  const teamMatches = matches
    .filter((m) => m.homeTeamId === TEAM_ID || m.awayTeamId === TEAM_ID)
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff));
  const liveUpcoming = teamMatches.filter(
    (m) => m.status === "live" || m.status === "scheduled",
  );
  const recent = teamMatches.filter((m) => m.status === "finished").slice(0, 4);
  const teamNews = news.filter((n) => n.teamId === TEAM_ID).slice(0, 3);
  const teamVideos = videos.filter((v) => v.teamId === TEAM_ID).slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,168,0.2),transparent_40%),linear-gradient(180deg,#0a1214_0%,#08090b_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p
            className="text-xs uppercase tracking-[0.28em]"
            style={{ color: "#00C2A8" }}
          >
            NEXUS · {sportLabel(team.sport)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {team.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {team.description}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        <section>
          <SectionHeader
            eyebrow="Squad"
            title="Roster"
            description="The football flagship XI and depth chart."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {roster.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        <section className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader eyebrow="Fixtures" title="Upcoming & live" />
            <div className="space-y-3">
              {liveUpcoming.map((match) => {
                const home = getTeamById(match.homeTeamId)!;
                const away = getTeamById(match.awayTeamId)!;
                return (
                  <MatchCard
                    key={match.id}
                    match={match}
                    home={home}
                    away={away}
                    href={
                      match.id === "match-nexus-berlin"
                        ? "/matches/nova-cup/nexus-vs-berlin-united"
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
          <div>
            <SectionHeader eyebrow="Form" title="Recent results" />
            <div className="space-y-3">
              {recent.map((match) => {
                const home = getTeamById(match.homeTeamId)!;
                const away = getTeamById(match.awayTeamId)!;
                return (
                  <MatchCard
                    key={match.id}
                    match={match}
                    home={home}
                    away={away}
                    compact
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Season"
            title="Key stats"
            description="Leading performers from the current cycle."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roster
              .slice()
              .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
              .slice(0, 4)
              .map((player) => (
                <div
                  key={player.id}
                  className="border border-border bg-bg-1 p-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                    {player.role}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{player.name}</p>
                  <p className="mt-3 text-2xl font-semibold tabular-nums text-orange">
                    {player.rating?.toFixed(1)}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {String(player.stats.goals ?? 0)} goals ·{" "}
                    {String(player.stats.assists ?? 0)} assists
                  </p>
                </div>
              ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Stories" title="News" />
          <div className="grid gap-4 md:grid-cols-3">
            {teamNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Watch" title="Videos" />
          <div className="grid gap-4 md:grid-cols-3">
            {teamVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        <section className="border border-border bg-bg-1 p-8">
          <h2 className="text-2xl font-semibold">Follow the match</h2>
          <p className="mt-2 max-w-lg text-sm text-muted">
            Semi-final night is live — open Match Center for timeline, stats and
            the goal automation wow moment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/matches/nova-cup/nexus-vs-berlin-united">
              Match Center
            </Button>
            <Button href="/fans" variant="outline">
              Fan Hub
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
