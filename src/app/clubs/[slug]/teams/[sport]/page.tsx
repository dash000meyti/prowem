import { NewsCard } from "@/components/event/NewsCard";
import { VideoCard } from "@/components/event/VideoCard";
import { PlayerCard } from "@/components/club/PlayerCard";
import { MatchCard } from "@/components/match/MatchCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { AwardCard } from "@/components/event/AwardLegendCards";
import { GlassPanel } from "@/components/media/GlassPanel";
import {
  getAwardsByClubId,
  getClubBySlug,
  getPlayersByTeamId,
  getTeamById,
  getTeamsByClubId,
  heroMedia,
  isFeaturedClub,
  matches,
  news,
  videos,
} from "@/data";
import { sportLabel } from "@/lib/utils";
import type { Sport } from "@/types";
import { notFound } from "next/navigation";

const VALID_SPORTS: Sport[] = ["football", "socca", "dota2"];

export default async function ClubSportTeamPage({
  params,
}: {
  params: Promise<{ slug: string; sport: string }>;
}) {
  const { slug, sport: sportParam } = await params;
  if (!isFeaturedClub(slug)) notFound();
  if (!VALID_SPORTS.includes(sportParam as Sport)) notFound();

  const club = getClubBySlug(slug);
  if (!club) notFound();

  const team = getTeamsByClubId(club.id).find((t) => t.sport === sportParam);
  if (!team) notFound();

  const TEAM_ID = team.id;
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
  const awards = getAwardsByClubId(club.id).slice(0, 3);

  const hero =
    team.sport === "dota2"
      ? heroMedia.bayernDota
      : team.sport === "socca"
        ? heroMedia.bayernSocca
        : resolveClubHero(club.theme.heroImage);

  const featuredHref =
    teamMatches.find((m) => m.id === "match-bayern-dortmund") != null
      ? "/matches/bundesliga/bayern-vs-dortmund"
      : liveUpcoming[0]
        ? `/matches/live`
        : `/clubs/${slug}`;

  return (
    <div>
      <PhotoBackground
        src={hero}
        alt={`${team.name} atmosphere`}
        scrim="heavy"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="text-xs uppercase tracking-[0.28em] text-brand">
            {club.shortName} · {sportLabel(team.sport)}
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {team.name}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {team.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={featuredHref}>Open Match Center</Button>
            <Button href={`/clubs/${slug}`} variant="outline">
              Back to club
            </Button>
          </div>
        </div>
      </PhotoBackground>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12 md:px-6">
        <section>
          <SectionHeader
            eyebrow="Roster"
            title="Squad"
            description={`Active ${sportLabel(team.sport).toLowerCase()} roster.`}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {roster.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                href={
                  player.teamId.startsWith("team-bayern") ||
                  player.teamId.startsWith("team-dortmund") ||
                  player.teamId.startsWith("team-werder") ||
                  player.teamId.startsWith("team-lorient")
                    ? `/clubs/${slug}/players/${player.slug}`
                    : undefined
                }
              />
            ))}
          </div>
        </section>

        {liveUpcoming.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Fixtures" title="Live & upcoming" />
            <div className="grid gap-4 md:grid-cols-2">
              {liveUpcoming.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  home={getTeamById(match.homeTeamId)!}
                  away={getTeamById(match.awayTeamId)!}
                  href={
                    match.id === "match-bayern-dortmund"
                      ? "/matches/bundesliga/bayern-vs-dortmund"
                      : undefined
                  }
                />
              ))}
            </div>
          </section>
        ) : null}

        {recent.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Results" title="Recent finishes" />
            <div className="grid gap-4 md:grid-cols-2">
              {recent.map((match) => (
                <MatchCard key={match.id} match={match} home={getTeamById(match.homeTeamId)!} away={getTeamById(match.awayTeamId)!} />
              ))}
            </div>
          </section>
        ) : (
          <GlassPanel className="p-6">
            <p className="text-sm text-muted">
              {team.sport === "football"
                ? "Results appear as Matchday fixtures complete."
                : team.sport === "socca"
                  ? "Socca fixtures run through the Socca Austria Pro League calendar."
                  : "Stage results live in The International bracket."}
            </p>
          </GlassPanel>
        )}

        {teamNews.length > 0 ? (
          <section>
            <SectionHeader eyebrow="News" title="Latest stories" />
            <div className="grid gap-4 md:grid-cols-3">
              {teamNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ) : null}

        {teamVideos.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Video" title="Highlights" />
            <div className="grid gap-4 md:grid-cols-3">
              {teamVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        ) : null}

        {awards.length > 0 && team.sport !== "football" ? (
          <section>
            <SectionHeader eyebrow="Recognition" title="Club awards" />
            <div className="grid gap-4 md:grid-cols-3">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

function resolveClubHero(key?: string) {
  if (key === "bayernHero") return heroMedia.bayern;
  if (key === "dortmundHero") return heroMedia.dortmund;
  if (key === "werderHero") return heroMedia.werder;
  if (key === "lorientHero") return heroMedia.lorient;
  return heroMedia.bayern;
}
