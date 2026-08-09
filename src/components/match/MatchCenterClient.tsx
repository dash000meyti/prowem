"use client";

import { GoalAutomationPanel } from "@/components/match/GoalAutomationPanel";
import { MatchStatsBars } from "@/components/match/MatchStatsBars";
import { SocialPostPreview } from "@/components/match/SocialPostPreview";
import { Timeline } from "@/components/match/Timeline";
import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { PlayerCard } from "@/components/club/PlayerCard";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VisualPanel } from "@/components/ui/VisualPanel";
import { useDemo } from "@/context/DemoProvider";
import { getPlayerById, getTeamById } from "@/data";
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
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,194,168,0.18),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,90,31,0.14),transparent_38%),linear-gradient(180deg,#0d0f12_0%,#08090b_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-orange">
                NOVA CUP · {match.round}
              </p>
              <p className="mt-2 text-sm text-muted">{match.venue}</p>
            </div>
            <LiveIndicator />
          </div>

          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">
            <div>
              <p
                className="text-2xl font-semibold md:text-4xl"
                style={{ color: home.color }}
              >
                {home.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                Home
              </p>
            </div>
            <div className="text-center">
              <p
                className={cn(
                  "inline-block rounded-sm px-3 text-5xl font-semibold tabular-nums text-orange md:text-7xl",
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
            <div className="text-right">
              <p
                className="text-2xl font-semibold md:text-4xl"
                style={{ color: away.color }}
              >
                {away.name}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">
                Away
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader
              eyebrow="Match feed"
              title="Timeline"
              description="Every key moment from the same live match data core."
            />
            <Timeline events={match.events} />
          </div>
          <div className="space-y-6">
            <VisualPanel tone="ember" className="aspect-video p-6 md:p-8">
              <div className="flex h-full flex-col justify-between">
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
            </VisualPanel>
            {match.footballStats ? (
              <div className="border border-border bg-bg-1 p-5 md:p-6">
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
              </div>
            ) : null}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Squads"
            title="Lineups"
            description="Same player entities as club and event pages."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-sm font-semibold" style={{ color: home.color }}>
                {home.name}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {homeLineup.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-4 text-sm font-semibold" style={{ color: away.color }}>
                {away.name}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {awayLineup.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </div>
            </div>
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
