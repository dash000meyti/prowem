import Link from "next/link";
import { MissionCard } from "@/components/fan/MissionCard";
import { XPProgress } from "@/components/fan/XPProgress";
import { MatchCard } from "@/components/match/MatchCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getClubById,
  getFeaturedMatch,
  getPrimaryFan,
  getTeamById,
  missions,
} from "@/data";
import { sportLabel } from "@/lib/utils";

const sectionLinks = [
  { href: "/fans/profile", label: "Profile" },
  { href: "/fans/missions", label: "Missions" },
  { href: "/fans/rewards", label: "Rewards" },
  { href: "/fans/passport", label: "Passport" },
  { href: "/fans/shop", label: "Shop" },
];

export default function FansDashboardPage() {
  const fan = getPrimaryFan();
  const featured = getFeaturedMatch();
  const home = getTeamById(featured.homeTeamId)!;
  const away = getTeamById(featured.awayTeamId)!;
  const myTeams = fan.followedTeamIds
    .map((id) => getTeamById(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const previewMissions = missions.filter((m) => !m.completed).slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,90,31,0.16),transparent_40%),linear-gradient(180deg,#0d0f12_0%,#08090b_100%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs uppercase tracking-[0.28em] text-orange">
            Fan dashboard
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {fan.name}
          </h1>
          <p className="mt-3 text-sm text-muted">
            {fan.status} · {fan.city} · Level {fan.level}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6">
        <XPProgress />

        <section>
          <SectionHeader
            eyebrow="Navigate"
            title="Your fan world"
            description="Profile, missions, rewards, passport and shop — one fan layer."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-border bg-bg-1 px-4 py-5 text-sm font-semibold uppercase tracking-[0.14em] transition hover:border-orange/40 hover:text-orange"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Following"
            title="My teams"
            description="Clubs and squads you track across sports."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {myTeams.map((team) => {
              const club = getClubById(team.clubId);
              return (
                <div
                  key={team.id}
                  className="border border-border bg-bg-1 p-5"
                >
                  <p
                    className="text-xs uppercase tracking-[0.14em]"
                    style={{ color: team.color }}
                  >
                    {sportLabel(team.sport)}
                  </p>
                  <p className="mt-2 text-lg font-semibold">{team.name}</p>
                  <p className="mt-1 text-xs text-muted">{club?.name}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Matchday"
            title="Upcoming for you"
            description="Live and next fixtures tied to your follows."
            action={
              <Button href="/matches/live" variant="outline" size="sm">
                Matchday
              </Button>
            }
          />
          <MatchCard
            match={featured}
            home={home}
            away={away}
            href="/matches/nova-cup/nexus-vs-berlin-united"
          />
        </section>

        <section>
          <SectionHeader
            eyebrow="Engage"
            title="Missions preview"
            description="Complete missions to earn XP and unlock rewards."
            action={
              <Button href="/fans/missions" variant="outline" size="sm">
                All missions
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {previewMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
