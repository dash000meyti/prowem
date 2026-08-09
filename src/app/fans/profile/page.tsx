import { PlayerCard } from "@/components/club/PlayerCard";
import { XPProgress } from "@/components/fan/XPProgress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  getAchievementById,
  getClubById,
  getEventById,
  getPlayerById,
  getPrimaryFan,
  getTeamById,
} from "@/data";
import { sportLabel } from "@/lib/utils";

export default function FanProfilePage() {
  const fan = getPrimaryFan();
  const clubs = fan.followedClubIds
    .map((id) => getClubById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const teams = fan.followedTeamIds
    .map((id) => getTeamById(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const favorites = fan.favoritePlayerIds
    .map((id) => getPlayerById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const events = fan.followedEventIds
    .map((id) => getEventById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const achievements = fan.achievementIds
    .map((id) => getAchievementById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6 md:py-20">
      <section>
        <p className="text-xs uppercase tracking-[0.28em] text-orange">
          Fan profile
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          {fan.name}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {fan.status} · Based in {fan.city}
        </p>
      </section>

      <XPProgress />

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Matches watched", value: fan.matchesWatched },
          { label: "Correct predictions", value: fan.predictionsCorrect },
          { label: "Events attended", value: fan.attendedEventIds.length },
        ].map((stat) => (
          <div key={stat.label} className="border border-border bg-bg-1 p-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              {stat.label}
            </p>
            <p className="mt-3 text-3xl font-semibold tabular-nums text-orange">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section>
        <SectionHeader eyebrow="Clubs" title="Following" />
        <div className="grid gap-3 md:grid-cols-2">
          {clubs.map((club) => (
            <div key={club.id} className="border border-border bg-bg-1 p-5">
              <p
                className="text-xs uppercase tracking-[0.14em]"
                style={{ color: club.theme.primary }}
              >
                {club.city}
              </p>
              <p className="mt-2 text-xl font-semibold">{club.name}</p>
              <p className="mt-1 text-sm text-muted">{club.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Squads" title="Teams" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => (
            <div key={team.id} className="border border-border bg-bg-1 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {sportLabel(team.sport)}
              </p>
              <p className="mt-2 font-semibold">{team.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Events" title="Festivals" />
        <div className="grid gap-3">
          {events.map((event) => (
            <div key={event.id} className="border border-border bg-bg-1 p-5">
              <p className="text-xs uppercase tracking-[0.14em] text-orange">
                {event.city}
              </p>
              <p className="mt-2 text-xl font-semibold">{event.name}</p>
              <p className="mt-1 text-sm text-muted">{event.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Favourites" title="Players" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {favorites.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeader eyebrow="Unlocked" title="Achievements" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((ach) => (
            <div key={ach.id} className="border border-border bg-bg-1 p-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-orange">
                Badge
              </p>
              <h3 className="mt-2 text-lg font-semibold">{ach.name}</h3>
              <p className="mt-2 text-sm text-muted">{ach.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
