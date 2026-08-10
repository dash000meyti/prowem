import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { Bracket } from "@/components/match/Bracket";
import { StandingsTable } from "@/components/event/StandingsTable";
import { TeamCard } from "@/components/club/TeamCard";
import { PlayerCard } from "@/components/club/PlayerCard";
import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { AwardCard, LegendCard } from "@/components/event/AwardLegendCards";
import { SponsorGrid } from "@/components/event/SponsorGrid";
import { FollowButton } from "@/components/fan/FollowButton";
import { Crest } from "@/components/media/Crest";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { GlassPanel } from "@/components/media/GlassPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  getAwardsByEventId,
  getBracketForEvent,
  getEventBySlug,
  getFeaturedMatch,
  getLiveMatchesList,
  getMatchesForEvent,
  getNewsByEventId,
  getPlayersByTeamId,
  getSponsorsByEventId,
  getStandingsForEvent,
  getTeamById,
  getTeamsForEvent,
  getVideosByEventId,
  heroMedia,
  legends,
  matchThumbForSport,
  resolveMedia,
} from "@/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { MediaKey } from "@/data/media";
import { matchHref } from "@/lib/utils";

function eventHeroFallback(sport: string): MediaKey {
  if (sport === "dota2") return "theInternationalHero";
  if (sport === "socca") return "soccaAustriaHero";
  return "bundesligaHero";
}

function videosDescription(sport: string) {
  if (sport === "dota2") return "Stage casts, draft boards and series highlights.";
  if (sport === "socca") return "Cage intensity, goals and arena atmosphere.";
  return "Highlights, tunnels and matchday atmosphere.";
}

function watchLiveHref(eventSlug: string, eventId: string) {
  if (eventId === "evt-bundesliga") {
    return "/matches/bundesliga/bayern-vs-dortmund";
  }
  return `/events/${eventSlug}/matches`;
}

export default async function NovaCupHomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const eventMatches = getMatchesForEvent(event.id);
  const liveForEvent = getLiveMatchesList(event.id);
  const featured =
    event.id === "evt-bundesliga"
      ? getFeaturedMatch()
      : liveForEvent[0] ?? eventMatches[0];
  const home = featured ? getTeamById(featured.homeTeamId) : undefined;
  const away = featured ? getTeamById(featured.awayTeamId) : undefined;
  const standings = getStandingsForEvent(event.id).slice(0, 8);
  const teams = getTeamsForEvent(event.id);
  const eventBracket = getBracketForEvent(event.id);
  const news = getNewsByEventId(event.id).slice(0, 3);
  const videos = getVideosByEventId(event.id).slice(0, 3);
  const awards = getAwardsByEventId(event.id).slice(0, 4);
  const eventLegends = legends.filter((l) => l.eventId === event.id);
  const displayLegends = (eventLegends.length > 0 ? eventLegends : legends).slice(
    0,
    3,
  );
  const sponsors = getSponsorsByEventId(event.id);
  const heroFallback = eventHeroFallback(event.sport);
  const heroSrc =
    resolveMedia(event.theme.heroImage, heroFallback) ||
    resolveMedia(heroFallback);

  const watchlist = teams
    .flatMap((team) => getPlayersByTeamId(team.id))
    .filter((p) => p.rating != null)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 6);

  const fanBandSrc =
    event.sport === "dota2"
      ? matchThumbForSport("dota2", "fan-band")
      : event.sport === "socca"
        ? matchThumbForSport("socca")
        : heroMedia.fan;

  const sportEyebrow =
    event.sport === "dota2"
      ? "Esports championship"
      : event.sport === "socca"
        ? "Cage league"
        : "Matchday league";

  return (
    <div>
      <PhotoBackground
        src={heroSrc}
        alt={`${event.name} atmosphere`}
        priority
        scrim="heavy"
        className="min-h-[70vh] border-b border-border"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 py-20 md:flex-row md:items-end md:justify-between md:gap-12 md:px-6 md:py-28">
          <GlassPanel variant="subtle" className="w-full max-w-3xl p-6 md:p-8">
            <div className="mb-5 md:mb-6">
              <Crest
                entity="event"
                slug={event.slug}
                name={event.name}
                size={96}
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              {sportEyebrow} · {event.startDate.slice(0, 4)} · {event.city} ·{" "}
              {event.teamCount} Teams
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              {event.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {event.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={watchLiveHref(slug, event.id)} size="lg">
                Watch Live
              </Button>
              <FollowButton
                kind="event"
                id={event.id}
                label={event.name}
                size="lg"
              />
              <Button
                href={`/events/${slug}/matches`}
                variant="outline"
                size="lg"
              >
                View Matches
              </Button>
            </div>
          </GlassPanel>
          <div
            className="pointer-events-none relative w-full max-w-[220px] shrink-0 sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]"
            aria-hidden
          >
            <Image
              src={resolveMedia("trophyCupCutout")}
              alt=""
              width={680}
              height={1020}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_28px_60px_rgba(0,0,0,0.65)]"
            />
          </div>
        </div>
      </PhotoBackground>

      {featured && home && away ? (
      <SectionShell atmosphere="tint" innerClassName="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <SectionHeader
            eyebrow={featured.status === "live" ? "Live now" : "Spotlight"}
            title={
              event.id === "evt-bundesliga"
                ? "Der Klassiker is live"
                : `${home.shortName} vs ${away.shortName}`
            }
            description={`${home.name} vs ${away.name} · ${featured.venue}`}
            action={
              <Button
                href={matchHref(featured, slug)}
                variant="secondary"
                size="sm"
              >
                Match Center
              </Button>
            }
          />
          <LiveMatchCard
            match={featured}
            home={home}
            away={away}
            href={matchHref(featured, slug)}
          />
      </SectionShell>
      ) : null}

      <SectionShell atmosphere="contrast" innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        {event.sport === "dota2" && eventBracket.length > 0 ? (
        <div>
          <SectionHeader
            eyebrow="Tournament"
            title="Bracket progress"
            description="From quarter-finals to the Grand Final — every knockout path still alive."
            action={
              <Button
                href={`/events/${slug}/standings`}
                variant="ghost"
                size="sm"
              >
                Full bracket
              </Button>
            }
          />
          <GlassPanel className="p-4 md:p-6">
            <Bracket items={eventBracket} />
          </GlassPanel>
        </div>
        ) : null}

        {event.sport !== "dota2" ? (
        <div>
          <SectionHeader
            eyebrow="Table"
            title="Standings"
            description={
              event.sport === "socca"
                ? "Cage league form across the Vienna circuit."
                : "League form across the field."
            }
            action={
              <Button
                href={`/events/${slug}/standings`}
                variant="ghost"
                size="sm"
              >
                Full table
              </Button>
            }
          />
          <GlassPanel className="overflow-hidden p-1">
            <StandingsTable rows={standings} />
          </GlassPanel>
        </div>
        ) : null}
      </SectionShell>

      <SectionShell atmosphere="mesh" innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        <div>
          <SectionHeader
            eyebrow="Clubs"
            title="Featured teams"
            description={`${event.teamCount} identities. One competition layer.`}
            action={
              <Button href={`/events/${slug}/teams`} variant="ghost" size="sm">
                All teams
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teams.slice(0, 8).map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Editorial"
            title="Latest news"
            description="Stories from the festival floor."
            action={
              <Button href={`/events/${slug}/news`} variant="ghost" size="sm">
                All news
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Watch"
            title="Videos"
            description={videosDescription(event.sport)}
            action={
              <Button
                href={`/events/${slug}/videos`}
                variant="ghost"
                size="sm"
              >
                All videos
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell atmosphere="tint" innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        <div>
          <SectionHeader
            eyebrow="Form"
            title="Players to watch"
            description={
              event.sport === "dota2"
                ? "Carries and midlaners shaping the upper bracket."
                : event.sport === "socca"
                  ? "Cage finishers setting the pace in Vienna."
                  : "The names shaping matchday nights."
            }
            action={
              <Button href="/clubs" variant="ghost" size="sm">
                Clubs
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {watchlist.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Legacy"
            title="Awards & legends"
            description="Honour the festival — and the names that built it."
            action={
              <Button href={`/events/${slug}/history`} variant="ghost" size="sm">
                Full heritage
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-4 sm:grid-cols-2">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
            <div className="grid gap-4">
              {displayLegends.map((legend) => (
                <LegendCard key={legend.id} legend={legend} />
              ))}
            </div>
          </div>
        </div>

        <div>
          <SectionHeader
            eyebrow="Partners"
            title="Sponsors"
            description="Commercial energy woven into the fan layer."
          />
          <SponsorGrid sponsors={sponsors} />
        </div>
      </SectionShell>

      <SectionShell atmosphere="band" innerClassName="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <GlassPanel className="overflow-hidden p-0">
            <PhotoBackground
              src={fanBandSrc}
              alt="Fan zone"
              scrim="heavy"
              className="min-h-[280px] rounded-[18px]"
            >
              <div className="p-8 md:p-10">
                <p className="text-xs uppercase tracking-[0.22em] text-brand">
                  Fan zone
                </p>
                <h2 className="mt-3 text-3xl font-semibold">
                  Turn visitors into super fans
                </h2>
                <p className="mt-3 max-w-lg text-sm text-muted">
                  Missions, XP and rewards powered by the same match data layer.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href={`/events/${slug}/fan-zone`}>
                    Enter Fan Zone
                  </Button>
                  <Button href="/fans" variant="outline">
                    Fan dashboard
                  </Button>
                </div>
              </div>
            </PhotoBackground>
          </GlassPanel>
      </SectionShell>
    </div>
  );
}
