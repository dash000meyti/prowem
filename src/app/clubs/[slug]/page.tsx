import { AwardCard, LegendCard } from "@/components/event/AwardLegendCards";
import { SponsorGrid } from "@/components/event/SponsorGrid";
import { VideoCard } from "@/components/event/VideoCard";
import { ClubCommunityBand } from "@/components/club/ClubCommunityBand";
import { ClubFeaturedStories } from "@/components/club/ClubFeaturedStories";
import { ClubPatronsSection } from "@/components/club/ClubPatronsSection";
import { ClubRosterSection } from "@/components/club/ClubRosterSection";
import { ClubShopSection } from "@/components/club/ClubShopSection";
import { ClubStoryHero } from "@/components/club/ClubStoryHero";
import { ClubTeamsShowcase } from "@/components/club/ClubTeamsShowcase";
import { ClubTicketsSection } from "@/components/club/ClubTicketsSection";
import { AchievementBadge } from "@/components/fan/AchievementBadge";
import { MatchCard } from "@/components/match/MatchCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  getAchievementById,
  getAwardsByClubId,
  getClubBySlug,
  getLegendsByClubId,
  getNewsByClubId,
  getPlayersByTeamId,
  getProductsByClubId,
  getRecentClubShoppers,
  getSponsorsByClubId,
  getTeamById,
  getTeamsByClubId,
  getTopClubPatrons,
  getVideosByClubId,
  isFeaturedClub,
  matches,
} from "@/data";
import { matchHref, sportLabel } from "@/lib/utils";
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
  const multiTeam = clubTeams.length > 1;
  const teamIds = new Set(club.teamIds);

  const clubMatches = matches
    .filter((m) => teamIds.has(m.homeTeamId) || teamIds.has(m.awayTeamId))
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff));
  const liveOrUpcoming = clubMatches.filter(
    (m) => m.status === "live" || m.status === "scheduled",
  );
  const upcomingTickets = clubMatches
    .filter((m) => m.status === "scheduled")
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff))
    .slice(0, 4);
  const results = clubMatches
    .filter((m) => m.status === "finished")
    .slice(0, 4);
  const clubNews = getNewsByClubId(club.id)
    .slice()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 3);
  const clubVideos = getVideosByClubId(club.id).slice(0, 3);
  const sponsors = getSponsorsByClubId(club.id);
  const clubLegends = getLegendsByClubId(club.id);
  const awards = getAwardsByClubId(club.id);
  const achievements = club.achievementIds
    .map((id) => getAchievementById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const roster = primaryTeam ? getPlayersByTeamId(primaryTeam.id) : [];
  const clubProducts = getProductsByClubId(club.id);
  const topPatrons = getTopClubPatrons(club.id, 10);
  const recentShoppers = getRecentClubShoppers(club.id, 5);

  const teamsHref = `/clubs/${slug}/teams`;
  const teamHref = primaryTeam
    ? `/clubs/${slug}/teams/${primaryTeam.sport}`
    : undefined;

  return (
    <div>
      <ClubStoryHero
        club={club}
        eyebrow={multiTeam ? "Multi-sport club" : "Club"}
        primaryCta={
          multiTeam
            ? { href: teamsHref, label: "Explore teams" }
            : {
                href: teamHref ?? "/fans",
                label: primaryTeam
                  ? `Open ${sportLabel(primaryTeam.sport)} team`
                  : "Join the community",
              }
        }
      />

      {multiTeam ? (
        <SectionShell
          atmosphere="contrast"
          innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20"
        >
          <ClubTeamsShowcase
            teams={clubTeams}
            clubSlug={slug}
            allTeamsHref={teamsHref}
          />
        </SectionShell>
      ) : null}

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20"
      >
        <ClubFeaturedStories articles={clubNews} />

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
                  href={matchHref(match)}
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
                <MatchCard
                  key={match.id}
                  match={match}
                  home={getTeamById(match.homeTeamId)!}
                  away={getTeamById(match.awayTeamId)!}
                />
              ))}
            </div>
          </section>
        ) : null}
      </SectionShell>

      <SectionShell
        atmosphere="mesh"
        innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20"
      >
        <ClubShopSection clubName={club.name} products={clubProducts} />
        <ClubTicketsSection clubName={club.name} matches={upcomingTickets} />
      </SectionShell>

      {!multiTeam ? (
        <SectionShell
          atmosphere="contrast"
          innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20"
        >
          <ClubRosterSection
            players={roster}
            clubSlug={slug}
            sportLabel={
              primaryTeam ? sportLabel(primaryTeam.sport) : "Team"
            }
            teamHref={teamHref}
          />
        </SectionShell>
      ) : null}

      <ClubCommunityBand clubName={club.name} />

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20"
      >
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
                <AchievementBadge key={a.id} achievement={a} />
              ))}
            </div>
          </section>
        ) : null}

        {sponsors.length > 0 ? (
          <section>
            <SectionHeader
              eyebrow="Partners"
              title="Club sponsors"
              description="Commercial partners by support tier — title, gold and official."
            />
            <SponsorGrid sponsors={sponsors} />
          </section>
        ) : null}

        <ClubPatronsSection
          clubName={club.name}
          topPatrons={topPatrons}
          recentShoppers={recentShoppers}
        />
      </SectionShell>
    </div>
  );
}
