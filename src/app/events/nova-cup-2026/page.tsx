import Link from "next/link";
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
  legends,
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

  const watchlist = [
    ...getPlayersByTeamId("team-nexus-fc"),
    ...getPlayersByTeamId("team-berlin-united"),
  ]
    .filter((p) => p.rating != null)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 6);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_15%,rgba(255,90,31,0.22),transparent_40%),radial-gradient(circle_at_85%_10%,rgba(255,90,31,0.08),transparent_32%),linear-gradient(180deg,#0d0f12_0%,#08090b_100%)]" />
        <div className="absolute inset-0 editorial-grid opacity-25" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange">
            June 18–21 · {event.city} · {event.teamCount} Teams
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
            {event.name}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {event.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href="/matches/nova-cup/nexus-vs-berlin-united"
              size="lg"
            >
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
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 md:px-6 md:py-20">
        <section>
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
        </section>

        <section>
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
          <Bracket items={bracket} />
        </section>

        <section>
          <SectionHeader
            eyebrow="Table"
            title="Standings"
            description="Top of the festival table after group and knockout play."
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
          <StandingsTable rows={standings} />
        </section>

        <section>
          <SectionHeader
            eyebrow="Clubs"
            title="Featured teams"
            description="Sixteen sides. One city. Start with the clubs defining this festival."
            action={
              <Button
                href="/events/nova-cup-2026/teams"
                variant="ghost"
                size="sm"
              >
                All teams
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teams.slice(0, 8).map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                href={
                  team.clubId === "club-nexus" ? "/clubs/nexus" : undefined
                }
              />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Editorial"
            title="Latest news"
            description="Stories from the district, dressing rooms, and knockout nights."
            action={
              <Button
                href="/events/nova-cup-2026/news"
                variant="ghost"
                size="sm"
              >
                All news
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Watch"
            title="Videos"
            description="Goals, atmospheres, and the moments that travel beyond the stand."
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
        </section>

        <section>
          <SectionHeader
            eyebrow="Spotlight"
            title="Players to watch"
            description="Highest-rated names from NEXUS FC and Berlin United on semi-final night."
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
        </section>

        <section>
          <SectionHeader
            eyebrow="Honours"
            title="Awards"
            description="The trophies and titles that frame NOVA CUP history."
            action={
              <Button
                href="/events/nova-cup-2026/awards"
                variant="ghost"
                size="sm"
              >
                All awards
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {awards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Legacy"
            title="Legends"
            description="Names and nights that still shape how this festival feels."
            action={
              <Button
                href="/events/nova-cup-2026/legends"
                variant="ghost"
                size="sm"
              >
                All legends
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {displayLegends.map((legend) => (
              <LegendCard key={legend.id} legend={legend} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Partners"
            title="Sponsors"
            description="The brands powering four days of football theatre in Berlin."
            action={
              <Button
                href="/events/nova-cup-2026/sponsors"
                variant="ghost"
                size="sm"
              >
                Partner world
              </Button>
            }
          />
          <SponsorGrid sponsors={sponsors} />
        </section>

        <section className="border border-border bg-bg-1 p-8 md:p-10">
          <SectionHeader
            className="mb-6 md:mb-6"
            eyebrow="Community"
            title="Fan Zone"
            description="Missions, XP, and live challenges that turn watching into belonging."
          />
          <p className="max-w-2xl text-sm leading-relaxed text-muted">
            Earn XP as Alex Morgan through live watch missions, predictions, and
            partner challenges — then spend it on rewards that travel with you
            across the festival.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/events/nova-cup-2026/fan-zone">Enter Fan Zone</Button>
            <Button href="/fans" variant="outline">
              Fan experience
            </Button>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">
            Or jump straight to{" "}
            <Link
              href="/fans/missions"
              className="text-orange underline-offset-4 hover:underline"
            >
              active missions
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
