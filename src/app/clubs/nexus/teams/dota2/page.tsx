import { AwardCard } from "@/components/event/AwardLegendCards";
import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { PlayerCard } from "@/components/club/PlayerCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import {
  getAwardsByClubId,
  getPlayersByTeamId,
  getTeamById,
  heroMedia,
  matches,
  news,
  videos,
} from "@/data";
import { sportLabel } from "@/lib/utils";
import { notFound } from "next/navigation";

const TEAM_ID = "team-nexus-dota2";

export default function NexusDota2Page() {
  const team = getTeamById(TEAM_ID);
  if (!team) notFound();

  const roster = getPlayersByTeamId(TEAM_ID);
  const teamMatches = matches.filter(
    (m) => m.homeTeamId === TEAM_ID || m.awayTeamId === TEAM_ID,
  );
  const teamNews = news.filter((n) => n.teamId === TEAM_ID);
  const teamVideos = videos.filter((v) => v.teamId === TEAM_ID);
  const esportsAwards = getAwardsByClubId("club-nexus").filter(
    (a) => a.winnerName.includes("Dota") || a.id.includes("esports"),
  );

  return (
    <div>
      <PhotoBackground
        src={heroMedia.nexusDota}
        alt="Esports stage"
        priority
        scrim="heavy"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <GlassPanel variant="subtle" className="max-w-3xl p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Crest slug={team.slug} name={team.name} size={44} />
              <p
                className="text-xs uppercase tracking-[0.28em]"
                style={{ color: "#E8FF6A" }}
              >
                NEXUS · {sportLabel(team.sport)}
              </p>
            </div>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {team.name}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {team.description}
            </p>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        <section>
          <SectionHeader
            eyebrow="Stage"
            title="Current roster"
            description="Starting five plus ready substitutes — same player entities across the platform."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {roster.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Schedule"
            title={teamMatches.length ? "Results & upcoming" : "Competition pulse"}
            description={
              teamMatches.length
                ? "Fixtures linked to the NEXUS Dota 2 team entity."
                : "No live bracket matches in the current NOVA CUP football cycle — stage form lives in the roster and club story."
            }
          />
          {teamMatches.length === 0 ? (
            <div className="grid gap-4 border border-border bg-bg-1 p-6 md:grid-cols-3 md:p-8">
              <div>
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: "#E8FF6A" }}
                >
                  Draft
                </p>
                <p className="mt-2 text-sm text-muted">
                  Mid-lane aggression sets the tempo; offlane creates space for
                  the carry farm pattern.
                </p>
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: "#E8FF6A" }}
                >
                  Mid game
                </p>
                <p className="mt-2 text-sm text-muted">
                  Vision control and soft-support saves keep objectives on
                  schedule.
                </p>
              </div>
              <div>
                <p
                  className="text-xs uppercase tracking-[0.16em]"
                  style={{ color: "#E8FF6A" }}
                >
                  Late
                </p>
                <p className="mt-2 text-sm text-muted">
                  Execution under lights — the same club identity that runs
                  football knockout nights.
                </p>
              </div>
            </div>
          ) : null}
        </section>

        <section>
          <SectionHeader
            eyebrow="Archive"
            title="Tournament history"
            description="Milestones that shaped the NEXUS stage identity."
          />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                season: "2023",
                title: "Regional invitational final",
                body: "First deep run that put NEXUS Dota 2 on the Berlin stage map.",
              },
              {
                season: "2024",
                title: "Circuit win streak",
                body: "Six consecutive series wins built on disciplined drafts.",
              },
              {
                season: "2025",
                title: "Clutch Series Award",
                body: "Recognised for late-game series wins under pressure.",
              },
            ].map((item) => (
              <article
                key={item.season}
                className="border border-border bg-bg-1 p-5"
              >
                <p
                  className="text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: "#E8FF6A" }}
                >
                  {item.season}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Analytics"
            title="Player statistics"
            description="KDA, economy and vision from the active roster."
          />
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-bg-1 text-[11px] uppercase tracking-[0.14em] text-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Player</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">KDA</th>
                  <th className="px-4 py-3 font-medium">GPM / Wards</th>
                  <th className="px-4 py-3 font-medium">Tournaments</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((player) => (
                  <tr key={player.id} className="border-t border-border">
                    <td className="px-4 py-3 font-medium">{player.name}</td>
                    <td className="px-4 py-3 text-muted">{player.role}</td>
                    <td className="px-4 py-3 tabular-nums">
                      {String(player.stats.kda ?? "—")}
                    </td>
                    <td className="px-4 py-3 tabular-nums text-muted">
                      {player.stats.gpm != null
                        ? `${player.stats.gpm} GPM`
                        : player.stats.wards != null
                          ? `${player.stats.wards} wards`
                          : "—"}
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {String(player.stats.tournaments ?? "—")}
                    </td>
                    <td className="px-4 py-3 font-semibold tabular-nums text-orange">
                      {player.rating?.toFixed(1) ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

        {esportsAwards.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Honours" title="Achievements" />
            <div className="grid gap-4 md:grid-cols-2">
              {esportsAwards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="border border-border bg-gradient-to-br from-[#1a1c10] via-bg-1 to-bg-0 p-8">
          <p
            className="text-xs uppercase tracking-[0.2em]"
            style={{ color: "#E8FF6A" }}
          >
            Community
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Follow NEXUS on stage</h2>
          <p className="mt-3 max-w-lg text-sm text-muted">
            Missions, XP and shop drops for the same fan following football and
            socca under one club.
          </p>
          <div className="mt-6">
            <Button href="/fans">Enter Fan Hub</Button>
          </div>
        </section>
      </div>
    </div>
  );
}
