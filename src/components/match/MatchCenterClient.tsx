"use client";

import { GoalAutomationPanel } from "@/components/match/GoalAutomationPanel";
import { MatchStatsBars } from "@/components/match/MatchStatsBars";
import { SocialPostPreview } from "@/components/match/SocialPostPreview";
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
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <GlassPanel className="relative overflow-hidden p-6 md:p-10">
            <div className="pointer-events-none absolute -right-8 top-0 opacity-[0.1]">
              <Crest slug={home.slug} name={home.name} size={200} />
            </div>
            <div className="relative mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-orange">
                  {match.round}
                </p>
                <p className="mt-2 text-sm text-muted">{match.venue}</p>
              </div>
              <LiveIndicator />
            </div>

            <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
              <div className="flex items-center gap-3">
                <Crest slug={home.slug} name={home.name} size={52} />
                <div>
                  <p className="text-xl font-semibold md:text-4xl">{home.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                    Home
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p
                  className={cn(
                    "inline-block rounded-xl px-3 text-5xl font-semibold tabular-nums text-orange md:text-7xl",
                    goalTriggered && "score-flash",
                  )}
                >
                  {match.homeScore}
                  <span className="mx-2 text-muted md:mx-3">—</span>
                  {match.awayScore}
                </p>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-orange">
                  LIVE · {match.minute}&apos; · {match.period}
                </p>
              </div>
              <div className="flex items-center justify-end gap-3">
                <div className="text-right">
                  <p className="text-xl font-semibold md:text-4xl">{away.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                    Away
                  </p>
                </div>
                <Crest slug={away.slug} name={away.name} size={52} />
              </div>
            </div>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <GlassPanel className="p-6 atmosphere-tint !bg-[color-mix(in_srgb,var(--glass-bg)_88%,var(--brand-tint))]">
            <SectionHeader
              eyebrow="Match feed"
              title="Timeline"
              description="Every key moment from the same live match data core."
            />
            <Timeline events={match.events} />
          </GlassPanel>
          <div className="space-y-6">
            <GlassPanel className="overflow-hidden p-0">
              <PhotoBackground
                src={heroMedia.nightMatch}
                alt="Live stream"
                scrim="heavy"
                className="aspect-video"
              >
                <div className="flex h-full flex-col justify-between p-6 md:p-8">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                    Live stream placeholder
                  </p>
                  <div>
                    <p className="text-2xl font-semibold">
                      {home.shortName} {match.homeScore}–{match.awayScore}{" "}
                      {away.shortName}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      Broadcast feed · synced to match events
                    </p>
                  </div>
                </div>
              </PhotoBackground>
            </GlassPanel>
            {match.footballStats ? (
              <GlassPanel className="p-5 md:p-6">
                <SectionHeader
                  eyebrow="Live stats"
                  title="Match numbers"
                  className="mb-6"
                />
                <MatchStatsBars
                  stats={match.footballStats}
                  homeName={home.shortName}
                  awayName={away.shortName}
                />
              </GlassPanel>
            ) : null}
          </div>
        </section>

        <section className="atmosphere-contrast -mx-4 px-4 py-10 md:-mx-6 md:px-6 md:rounded-[18px]">
          <SectionHeader
            eyebrow="Squads"
            title="Lineups"
            description="On-pitch positions — same player entities as club and event pages."
          />
          <div className="mt-6 w-full">
            <LineupBoard
              match={match}
              home={home}
              away={away}
              homeLineup={homeLineup}
              awayLineup={awayLineup}
            />
          </div>
        </section>

        <GoalAutomationPanel />

        <section className="grid gap-8 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Automation"
              title="Social draft"
              description="Generated from the live goal event."
            />
            <SocialPostPreview />
          </div>
          <div>
            <SectionHeader
              eyebrow="Media"
              title="Highlights"
              description="Clips tagged to this fixture."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
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
      </div>
    </div>
  );
}
