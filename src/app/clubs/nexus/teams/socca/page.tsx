import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { PlayerCard } from "@/components/club/PlayerCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPlayersByTeamId, getTeamById, news, videos } from "@/data";
import { sportLabel } from "@/lib/utils";
import { notFound } from "next/navigation";

const TEAM_ID = "team-nexus-socca";

export default function NexusSoccaPage() {
  const team = getTeamById(TEAM_ID);
  if (!team) notFound();

  const roster = getPlayersByTeamId(TEAM_ID);
  const teamNews = news.filter((n) => n.teamId === TEAM_ID);
  const teamVideos = videos.filter((v) => v.teamId === TEAM_ID);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_10%,rgba(232,255,106,0.12),transparent_35%),radial-gradient(circle_at_15%_40%,rgba(0,194,168,0.18),transparent_40%),linear-gradient(180deg,#0a1214_0%,#08090b_100%)]" />
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
            eyebrow="Cage"
            title="Current roster"
            description="Compact pitch specialists under the NEXUS banner."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roster.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Season"
            title="Cage numbers"
            description="Goals, assists and tournament volume from the active roster."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {roster.map((player) => (
              <div key={player.id} className="border border-border bg-bg-1 p-5">
                <p className="text-lg font-semibold">{player.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
                  {player.role}
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  {Object.entries(player.stats).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between border-t border-border pt-2"
                    >
                      <dt className="capitalize text-muted">{key}</dt>
                      <dd className="font-semibold tabular-nums">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-border bg-bg-1 p-6 md:p-8">
          <SectionHeader
            eyebrow="Calendar"
            title="Competition window"
            description="Socca runs on club circuits outside the NOVA CUP football bracket."
            className="mb-0"
          />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            NEXUS Socca trains and competes on compact pitches across Berlin —
            the same club colours, a different tempo. Fixture drops and highlight
            packages land here when cages open.
          </p>
        </section>

        {teamNews.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Stories" title="News" />
            <div className="grid gap-4 md:grid-cols-2">
              {teamNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ) : null}

        {teamVideos.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Watch" title="Videos" />
            <div className="grid gap-4 md:grid-cols-2">
              {teamVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="flex flex-wrap gap-3">
          <Button href="/clubs/nexus">Back to club</Button>
          <Button href="/fans" variant="outline">
            Fan Community
          </Button>
        </section>
      </div>
    </div>
  );
}
