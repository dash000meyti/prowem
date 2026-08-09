import { AwardCard, LegendCard } from "@/components/event/AwardLegendCards";
import { NewsCard } from "@/components/event/NewsCard";
import { SponsorGrid } from "@/components/event/SponsorGrid";
import { VideoCard } from "@/components/event/VideoCard";
import { PlayerCard } from "@/components/club/PlayerCard";
import { TeamCard } from "@/components/club/TeamCard";
import { MatchCard } from "@/components/match/MatchCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  getAchievementById,
  getAwardsByClubId,
  getClubBySlug,
  getLegendsByClubId,
  getNewsByClubId,
  getPlayersByTeamId,
  getSponsorsByClubId,
  getTeamById,
  getTeamsByClubId,
  getVideosByClubId,
  isFeaturedClub,
  matches,
  resolveMedia,
} from "@/data";
import { notFound } from "next/navigation";

export default async function ClubHomePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isFeaturedClub(slug)) notFound();
  const club = getClubBySlug(slug);
  if (!club) notFound();

  const clubTeams = getTeamsByClubId(club.id);
  const primaryTeam = clubTeams[0];
  const teamIds = new Set(club.teamIds);
  const clubMatches = matches
    .filter((m) => teamIds.has(m.homeTeamId) || teamIds.has(m.awayTeamId))
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff));
  const liveOrUpcoming = clubMatches.filter(
    (m) => m.status === "live" || m.status === "scheduled",
  );
  const results = clubMatches
    .filter((m) => m.status === "finished")
    .slice(0, 4);
  const clubNews = getNewsByClubId(club.id).slice(0, 3);
  const clubVideos = getVideosByClubId(club.id).slice(0, 3);
  const sponsors = getSponsorsByClubId(club.id);
  const clubLegends = getLegendsByClubId(club.id);
  const awards = getAwardsByClubId(club.id);
  const achievements = club.achievementIds
    .map((id) => getAchievementById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const highlightPlayers = primaryTeam
    ? getPlayersByTeamId(primaryTeam.id)
        .filter((p) => (p.rating ?? 0) >= 80)
        .slice(0, 4)
    : [];

  const multiTeam = clubTeams.length > 1;

  return (
    <div>
      <PhotoBackground
        src={resolveMedia(
          club.theme.coverImage ?? club.theme.heroImage,
          "footballAction",
        )}
        alt={`${club.name} cover`}
        priority
        scrim="heavy"
        className="min-h-[68vh] border-b border-border"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-28">
          <div className="pointer-events-none absolute right-4 top-10 opacity-[0.12] md:right-10">
            <Crest slug={club.slug} name={club.name} size={220} />
          </div>
          <GlassPanel variant="subtle" className="relative max-w-3xl p-6 md:p-8">
            <div className="mb-4 flex items-center gap-3">
              <Crest slug={club.slug} name={club.name} size={48} />
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
                {multiTeam ? "Multi-sport club" : "Club"}
              </p>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              {club.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{club.tagline}</p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {club.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {multiTeam ? (
                <Button href={`/clubs/${slug}/teams`}>Explore teams</Button>
              ) : primaryTeam ? (
                <Button href={`/clubs/${slug}/teams/${primaryTeam.sport}`}>
                  Open team
                </Button>
              ) : null}
              <Button href="/fans" variant="outline">
                Fan experience
              </Button>
            </div>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <SectionShell atmosphere="tint" innerClassName="mx-auto max-w-7xl space-y-14 px-4 py-14 md:px-6">
        {multiTeam ? (
          <section>
            <SectionHeader
              eyebrow="Teams"
              title="One club. Multiple arenas."
              action={
                <Button href={`/clubs/${slug}/teams`} variant="outline" size="sm">
                  All teams
                </Button>
              }
            />
            <div className="grid gap-4 md:grid-cols-3">
              {clubTeams.map((team) => (
                <TeamCard
                  key={team.id}
                  team={team}
                  href={`/clubs/${slug}/teams/${team.sport}`}
                />
              ))}
            </div>
          </section>
        ) : null}

        {highlightPlayers.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Players" title="Standouts" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {highlightPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  href={`/clubs/${slug}/players/${player.slug}`}
                />
              ))}
            </div>
          </section>
        ) : null}

        {liveOrUpcoming.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Fixtures" title="Live & upcoming" />
            <div className="grid gap-4 md:grid-cols-2">
              {liveOrUpcoming.map((match) => (
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

        {results.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Results" title="Recent finishes" />
            <div className="grid gap-4 md:grid-cols-2">
              {results.map((match) => (
                <MatchCard key={match.id} match={match} home={getTeamById(match.homeTeamId)!} away={getTeamById(match.awayTeamId)!} />
              ))}
            </div>
          </section>
        ) : null}

        {clubNews.length > 0 ? (
          <section>
            <SectionHeader eyebrow="News" title="Club stories" />
            <div className="grid gap-4 md:grid-cols-3">
              {clubNews.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ) : null}

        {clubVideos.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Video" title="Watch" />
            <div className="grid gap-4 md:grid-cols-3">
              {clubVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </section>
        ) : null}

        {clubLegends.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Legends" title="Club heritage" />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {clubLegends.map((legend) => (
                <LegendCard key={legend.id} legend={legend} />
              ))}
            </div>
          </section>
        ) : null}

        {awards.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Awards" title="Recognition" />
            <div className="grid gap-4 md:grid-cols-3">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </section>
        ) : null}

        {achievements.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Achievements" title="Fan milestones" />
            <div className="grid gap-3 md:grid-cols-3">
              {achievements.map((a) => (
                <GlassPanel key={a.id} className="p-5">
                  <p className="text-sm font-semibold">{a.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {a.description}
                  </p>
                </GlassPanel>
              ))}
            </div>
          </section>
        ) : null}

        {sponsors.length > 0 ? (
          <section>
            <SectionHeader eyebrow="Partners" title="Club sponsors" />
            <SponsorGrid sponsors={sponsors} />
          </section>
        ) : null}
      </SectionShell>
    </div>
  );
}
