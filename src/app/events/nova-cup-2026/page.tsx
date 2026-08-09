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
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { GlassPanel } from "@/components/media/GlassPanel";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  bracket,
  getAwardsByEventId,
  getEventBySlug,
  getFeaturedMatch,
  getNewsByEventId,
  getPlayersByTeamId,
  getSponsorsByEventId,
  getStandingsForEvent,
  getTeamById,
  getTeamsForEvent,
  getVideosByEventId,
  heroMedia,
  legends,
  resolveMedia,
} from "@/data";
import { notFound } from "next/navigation";

export default function NovaCupHomePage() {
  const event = getEventBySlug("nova-cup-2026");
  if (!event) notFound();

  const featured = getFeaturedMatch();
  const home = getTeamById(featured.homeTeamId)!;
  const away = getTeamById(featured.awayTeamId)!;
  const standings = getStandingsForEvent().slice(0, 8);
  const teams = getTeamsForEvent(event.id);
  const news = getNewsByEventId(event.id).slice(0, 3);
  const videos = getVideosByEventId(event.id).slice(0, 3);
  const awards = getAwardsByEventId(event.id).slice(0, 4);
  const eventLegends = legends.filter((l) => l.eventId === event.id);
  const displayLegends = (eventLegends.length > 0 ? eventLegends : legends).slice(
    0,
    3,
  );
  const sponsors = getSponsorsByEventId(event.id);
  const heroSrc = resolveMedia(event.theme.heroImage, "stadiumLights");

  const watchlist = [
    ...getPlayersByTeamId("team-nexus-fc"),
    ...getPlayersByTeamId("team-berlin-united"),
  ]
    .filter((p) => p.rating != null)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 6);

  return (
    <div>
      <PhotoBackground
        src={heroSrc || heroMedia.novaCup}
        alt="NOVA CUP stadium"
        priority
        scrim="heavy"
        className="min-h-[70vh] border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <GlassPanel variant="subtle" className="max-w-3xl p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              June 18–21 · {event.city} · {event.teamCount} Teams
            </p>
            <h1 className="mt-5 text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
              {event.name}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {event.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/matches/nova-cup/nexus-vs-berlin-united" size="lg">
                Watch Live
              </Button>
              <Button
                href="/events/nova-cup-2026/matches"
                variant="outline"
                size="lg"
              >
                View Matches
              </Button>
            </div>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <SectionShell atmosphere="tint" innerClassName="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
        <SectionHeader
            eyebrow="Live now"
            title="Semi-final night is live"
            description="NEXUS FC host Berlin United with a place in the final on the line."
            action={
              <Button
                href="/matches/nova-cup/nexus-vs-berlin-united"
                variant="secondary"
                size="sm"
              >
                Match Center
              </Button>
            }
          />
          <LiveMatchCard match={featured} home={home} away={away} />
      </SectionShell>

      <SectionShell atmosphere="contrast" innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        <div>
          <SectionHeader
            eyebrow="Tournament"
            title="Bracket progress"
            description="From quarter-finals to the final — every knockout path still alive."
            action={
              <Button
                href="/events/nova-cup-2026/bracket"
                variant="ghost"
                size="sm"
              >
                Full bracket
              </Button>
            }
          />
          <GlassPanel className="p-4 md:p-6">
            <Bracket items={bracket} />
          </GlassPanel>
        </div>

        <div>
          <SectionHeader
            eyebrow="Table"
            title="Standings"
            description="Festival form across the knockout field."
            action={
              <Button
                href="/events/nova-cup-2026/standings"
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
      </SectionShell>

      <SectionShell atmosphere="mesh" innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        <div>
          <SectionHeader
            eyebrow="Clubs"
            title="Featured teams"
            description="Sixteen identities. One competition layer."
            action={
              <Button href="/events/nova-cup-2026/teams" variant="ghost" size="sm">
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
              <Button href="/events/nova-cup-2026/news" variant="ghost" size="sm">
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
            description="Highlights, tunnels and matchday atmosphere."
            action={
              <Button
                href="/events/nova-cup-2026/videos"
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
            description="The names shaping semi-final night."
            action={
              <Button
                href="/events/nova-cup-2026/players"
                variant="ghost"
                size="sm"
              >
                All players
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
              src={heroMedia.fan}
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
                  <Button href="/events/nova-cup-2026/fan-zone">
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
