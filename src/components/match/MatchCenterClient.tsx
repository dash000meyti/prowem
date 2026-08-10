"use client";

import { GoalAutomationPanel } from "@/components/match/GoalAutomationPanel";
import { MatchStatsBars } from "@/components/match/MatchStatsBars";
import { PlayerOfTheMatch } from "@/components/match/PlayerOfTheMatch";
import { Timeline } from "@/components/match/Timeline";
import { LineupBoard } from "@/components/match/lineup/LineupBoard";
import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { useDemo } from "@/context/DemoProvider";
import { getPlayerById, getTeamById, heroMedia } from "@/data";
import type { NewsArticle, VideoItem } from "@/types";
import { cn } from "@/lib/utils";

export function MatchCenterClient({
  relatedNews,
  relatedVideos,
}: {
  relatedNews: NewsArticle[];
  relatedVideos: VideoItem[];
}) {
  const { match, goalTriggered } = useDemo();
  const home = getTeamById(match.homeTeamId)!;
  const away = getTeamById(match.awayTeamId)!;
  const homeLineup = match.homeLineupIds
    .map((id) => getPlayerById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const awayLineup = match.awayLineupIds
    .map((id) => getPlayerById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div>
      <PhotoBackground
        src={heroMedia.matchCenter}
        alt="Match pitch"
        priority
        scrim="heavy"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <GlassPanel className="relative overflow-hidden p-5 md:p-8">
            <div className="pointer-events-none absolute -right-10 top-0 opacity-[0.08]">
              <Crest slug={home.slug} name={home.name} size={220} />
            </div>

            <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-muted md:text-xs">
                Bundesliga · {match.round}
              </p>
              <LiveIndicator />
            </div>

            <div className="relative text-center">
              <p className="text-[10px] uppercase tracking-[0.28em] text-muted">
                {match.status === "live"
                  ? `Live · ${match.minute}' · ${match.period}`
                  : match.status === "finished"
                    ? "Full-time"
                    : match.status}
              </p>

              <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-8">
                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-end md:gap-3">
                  <Crest
                    slug={home.slug}
                    name={home.name}
                    size={48}
                    className="md:order-2"
                  />
                  <p className="text-center text-xs font-semibold uppercase tracking-wide sm:text-sm md:text-right md:text-lg lg:text-2xl">
                    <span className="md:hidden">{home.shortName}</span>
                    <span className="hidden md:inline">{home.name}</span>
                  </p>
                </div>

                <p
                  className={cn(
                    "inline-block min-w-[5.5rem] rounded-xl px-2 text-5xl font-semibold tabular-nums md:min-w-[8rem] md:text-7xl",
                    goalTriggered && "score-flash",
                  )}
                >
                  {match.homeScore}
                  <span className="mx-1 text-muted md:mx-2">–</span>
                  {match.awayScore}
                </p>

                <div className="flex flex-col items-center gap-2 md:flex-row md:justify-start md:gap-3">
                  <Crest slug={away.slug} name={away.name} size={48} />
                  <p className="text-center text-xs font-semibold uppercase tracking-wide sm:text-sm md:text-left md:text-lg lg:text-2xl">
                    <span className="md:hidden">{away.shortName}</span>
                    <span className="hidden md:inline">{away.name}</span>
                  </p>
                </div>
              </div>

              <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-muted md:text-xs">
                {match.venue}
              </p>
            </div>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 md:space-y-16 md:px-6 md:py-16">
        <section className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          <GlassPanel className="h-full p-5 md:p-6">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand">
                Match numbers
              </p>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                Live stats
              </h2>
            </div>
            {match.footballStats ? (
              <MatchStatsBars
                stats={match.footballStats}
                homeName={home.shortName}
                awayName={away.shortName}
              />
            ) : null}
          </GlassPanel>

          <GlassPanel className="h-full p-5 atmosphere-tint !bg-[color-mix(in_srgb,var(--glass-bg)_88%,var(--brand-tint))] md:p-6">
            <div className="mb-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand">
                Timeline
              </p>
              <h2 className="mt-1 text-xl font-semibold md:text-2xl">
                Match feed
              </h2>
              <p className="mt-1 text-xs text-muted">
                Every key moment from the same live match data core.
              </p>
            </div>
            <Timeline events={match.events} />
          </GlassPanel>
        </section>

        <section>
          <PlayerOfTheMatch />
        </section>

        <section className="atmosphere-contrast -mx-4 px-4 py-10 md:-mx-6 md:rounded-[18px] md:px-6">
          <SectionHeader
            eyebrow="Squads"
            title="Starting XI"
            description="On-pitch positions — same player entities as club and event pages."
          />
          <div className="mt-2 w-full">
            <LineupBoard
              match={match}
              home={home}
              away={away}
              homeLineup={homeLineup}
              awayLineup={awayLineup}
            />
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Media"
            title="Highlights"
            description="Clips tagged to this fixture."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {relatedNews.length > 0 ? (
          <section>
            <SectionHeader
              eyebrow="Coverage"
              title="Related news"
              description="Articles linked to this match entity."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ) : null}

        <GoalAutomationPanel />
      </div>
    </div>
  );
}
