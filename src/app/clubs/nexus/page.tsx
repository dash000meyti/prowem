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
  matches,
  resolveMedia,
} from "@/data";
import { notFound } from "next/navigation";

const teamHrefs: Record<string, string> = {
  "team-nexus-fc": "/clubs/nexus/teams/football",
  "team-nexus-socca": "/clubs/nexus/teams/socca",
  "team-nexus-dota2": "/clubs/nexus/teams/dota2",
};

export default function NexusClubPage() {
  const club = getClubBySlug("nexus");
  if (!club) notFound();

  const clubTeams = getTeamsByClubId(club.id);
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
  const highlightPlayers = getPlayersByTeamId("team-nexus-fc")
    .filter((p) => (p.rating ?? 0) >= 84)
    .slice(0, 4);

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
              <p
                className="text-xs font-semibold uppercase tracking-[0.32em]"
                style={{ color: "#00C2A8" }}
              >
                Multi-sport club
              </p>
            </div>
            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              {club.name}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{club.tagline}</p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {club.description}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted">
              Founded {club.founded} · {club.city}, {club.country}
            </p>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <SectionShell atmosphere="tint" innerClassName="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeader
            eyebrow="Identity"
            title="About NEXUS"
            description="One organisation spanning pitch, cage and stage — shared brand, distinct arenas."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                label: "Football",
                body: "Knockout theatre under the NEXUS press.",
              },
              {
                label: "Socca",
                body: "Cage intensity with street-smart finishing.",
              },
              {
                label: "Dota 2",
                body: "Disciplined drafts and late-game execution.",
              },
            ].map((item) => (
              <GlassPanel key={item.label} className="p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-brand">
                  {item.label}
                </p>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
              </GlassPanel>
            ))}
          </div>
      </SectionShell>

      <SectionShell atmosphere="contrast" innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-16 md:px-6">
        <div>
          <SectionHeader
            eyebrow="Departments"
            title="Our teams"
            description="Three squads. One club identity."
            action={
              <Button href="/clubs/nexus/teams" variant="outline" size="sm">
                All teams
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {clubTeams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                href={teamHrefs[team.id]}
              />
            ))}
          </div>
        </div>

        <section className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeader
              eyebrow="Fixtures"
              title="Upcoming & live"
              description="Matches involving NEXUS teams."
            />
            <div className="space-y-3">
              {liveOrUpcoming.map((match) => {
                const home = getTeamById(match.homeTeamId)!;
                const away = getTeamById(match.awayTeamId)!;
                const href =
                  match.id === "match-nexus-berlin"
                    ? "/matches/nova-cup/nexus-vs-berlin-united"
                    : undefined;
                return (
                  <MatchCard
                    key={match.id}
                    match={match}
                    home={home}
                    away={away}
                    href={href}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <SectionHeader
              eyebrow="Form"
              title="Latest results"
              description="Recent finishes for NEXUS FC."
            />
            <div className="space-y-3">
              {results.map((match) => {
                const home = getTeamById(match.homeTeamId)!;
                const away = getTeamById(match.awayTeamId)!;
                return (
                  <MatchCard
                    key={match.id}
                    match={match}
                    home={home}
                    away={away}
                    compact
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Stories" title="Club news" />
          <div className="grid gap-4 md:grid-cols-3">
            {clubNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Watch" title="Videos" />
          <div className="grid gap-4 md:grid-cols-3">
            {clubVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Honours"
            title="Achievements"
            description="Club milestones across arenas."
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {achievements.map((ach) => (
              <div key={ach.id} className="border border-border bg-bg-1 p-5">
                <p
                  className="text-[10px] uppercase tracking-[0.16em]"
                  style={{ color: "#00C2A8" }}
                >
                  Achievement
                </p>
                <h3 className="mt-2 text-lg font-semibold">{ach.name}</h3>
                <p className="mt-2 text-sm text-muted">{ach.description}</p>
              </div>
            ))}
            {awards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Legacy"
            title="History"
            description="From regional nights to multi-arena presence."
          />
          <div className="grid gap-6 border border-border bg-bg-1 p-6 md:grid-cols-3 md:p-8">
            {[
              {
                year: "2014",
                title: "Founded",
                body: "NEXUS launches in Berlin with a football-first academy vision.",
              },
              {
                year: "2018",
                title: "Cage opens",
                body: "Socca joins the club — compact pitches, relentless tempo.",
              },
              {
                year: "2019",
                title: "Stage era",
                body: "Dota 2 department founded — same colours on the big stage.",
              },
            ].map((item) => (
              <div key={item.year}>
                <p
                  className="text-xs uppercase tracking-[0.18em]"
                  style={{ color: "#00C2A8" }}
                >
                  {item.year}
                </p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Hall of fame" title="Legends" />
          <div className="grid gap-4 md:grid-cols-3">
            {clubLegends.map((legend) => (
              <LegendCard key={legend.id} legend={legend} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Spotlight"
            title="Players to watch"
            description="High-rated names from the football flagship."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {highlightPlayers.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Partners" title="Sponsors" />
          <SponsorGrid sponsors={sponsors} />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="border border-border bg-gradient-to-br from-[#0a1c1a] via-bg-1 to-bg-0 p-8">
            <p
              className="text-xs uppercase tracking-[0.2em]"
              style={{ color: "#00C2A8" }}
            >
              Community
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Fan Community</h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              Follow NEXUS across football, socca and Dota 2 — missions, XP and
              matchday moments in one fan layer.
            </p>
            <div className="mt-6">
              <Button href="/fans">Enter Fan Hub</Button>
            </div>
          </div>
          <div className="border border-border bg-bg-1 p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-brand">
              Merch
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Club Shop</h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              Jerseys, scarves and limited stage kits — powered by the same club
              catalogue.
            </p>
            <div className="mt-6">
              <Button href="/fans/shop" variant="outline">
                Browse Shop
              </Button>
            </div>
          </div>
        </section>
      </SectionShell>
    </div>
  );
}
