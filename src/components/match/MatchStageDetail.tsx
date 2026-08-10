import { MatchStatsBars } from "@/components/match/MatchStatsBars";
import { SoccaStatsBars } from "@/components/match/SoccaStatsBars";
import { DotaStatsBars } from "@/components/match/DotaStatsBars";
import { Timeline } from "@/components/match/Timeline";
import { LineupBoard } from "@/components/match/lineup/LineupBoard";
import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { LiveIndicator } from "@/components/ui/LiveIndicator";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import {
  getPlayerById,
  matchThumbForSport,
} from "@/data";
import type { Match, NewsArticle, Team, VideoItem } from "@/types";
import { cn, formatMatchMinute, sportLabel } from "@/lib/utils";

export function MatchStageDetail({
  match,
  home,
  away,
  relatedNews,
  relatedVideos,
}: {
  match: Match;
  home: Team;
  away: Team;
  relatedNews: NewsArticle[];
  relatedVideos: VideoItem[];
}) {
  const homeLineup = match.homeLineupIds
    .map((id) => getPlayerById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const awayLineup = match.awayLineupIds
    .map((id) => getPlayerById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const thumb = matchThumbForSport(match.sport, match.id);
  const isLive = match.status === "live";

  return (
    <div>
      <PhotoBackground
        src={thumb}
        alt={`${sportLabel(match.sport)} stage`}
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
                <p className="text-xs uppercase tracking-[0.28em] text-brand">
                  {sportLabel(match.sport)} · {match.round}
                </p>
                <p className="mt-2 text-sm text-muted">{match.venue}</p>
              </div>
              {isLive ? <LiveIndicator /> : null}
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
                    "inline-block rounded-xl px-3 text-5xl font-semibold tabular-nums md:text-7xl",
                    isLive ? "text-orange" : "text-foreground",
                  )}
                >
                  {match.homeScore}
                  <span className="mx-2 text-muted md:mx-3">—</span>
                  {match.awayScore}
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm uppercase tracking-[0.2em]",
                    isLive ? "text-orange" : "text-muted",
                  )}
                >
                  {isLive
                    ? `LIVE · ${match.minute ?? "—"}' · ${match.period ?? ""}`
                    : formatMatchMinute(match.minute, match.status)}
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
              description="Key moments from the shared match data core."
            />
            {match.events.length > 0 ? (
              <Timeline events={match.events} />
            ) : (
              <p className="text-sm text-muted">No timeline events yet.</p>
            )}
          </GlassPanel>
          <div className="space-y-6">
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
            {match.soccaStats ? (
              <GlassPanel className="p-5 md:p-6">
                <SectionHeader
                  eyebrow="Cage stats"
                  title="Match numbers"
                  className="mb-6"
                />
                <SoccaStatsBars
                  stats={match.soccaStats}
                  homeName={home.shortName}
                  awayName={away.shortName}
                />
              </GlassPanel>
            ) : null}
            {match.dotaStats ? (
              <GlassPanel className="p-5 md:p-6">
                <SectionHeader
                  eyebrow="Series stats"
                  title="Map numbers"
                  className="mb-6"
                />
                <DotaStatsBars
                  stats={match.dotaStats}
                  homeName={home.shortName}
                  awayName={away.shortName}
                />
              </GlassPanel>
            ) : null}
            {!match.footballStats && !match.soccaStats && !match.dotaStats ? (
              <GlassPanel className="p-5 md:p-6">
                <SectionHeader
                  eyebrow="Venue"
                  title={match.venue}
                  description={`${sportLabel(match.sport)} · ${match.round}`}
                />
              </GlassPanel>
            ) : null}
          </div>
        </section>

        <section className="atmosphere-contrast -mx-4 px-4 py-10 md:-mx-6 md:px-6 md:rounded-[18px]">
          <SectionHeader
            eyebrow="Squads"
            title="Lineups"
            description={
              match.sport === "dota2"
                ? "Roles on the map — same player entities as club and event pages."
                : match.sport === "socca"
                  ? "Cage positions — same player entities as club and event pages."
                  : "On-pitch positions — same player entities as club and event pages."
            }
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

        {relatedVideos.length > 0 ? (
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
        ) : null}

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
