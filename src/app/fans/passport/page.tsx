import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { AchievementBadge } from "@/components/fan/AchievementBadge";
import {
  getAchievementById,
  getEventById,
  getPrimaryFan,
  heroMedia,
} from "@/data";

export default function FanPassportPage() {
  const fan = getPrimaryFan();
  const achievements = fan.achievementIds
    .map((id) => getAchievementById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));
  const attended = fan.attendedEventIds
    .map((id) => getEventById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));

  return (
    <div>
      <PhotoBackground
        src={heroMedia.fan}
        alt="Fan atmosphere"
        scrim="heavy"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs uppercase tracking-[0.28em] text-orange">
            Identity
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            PROWEM FAN PASSPORT
          </h1>
          <p className="mt-3 max-w-xl text-sm text-muted">
            Your cross-event fan identity — level, status and achievements travel
            with you.
          </p>

          <GlassPanel className="mt-10 p-6 md:p-10">
            <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                  Passport holder
                </p>
                <h2 className="mt-3 text-3xl font-semibold md:text-4xl">
                  {fan.name}
                </h2>
                <p className="mt-2 text-sm text-orange">{fan.status}</p>
                <p className="mt-6 text-sm text-muted">
                  Level {fan.level} · {fan.xp.toLocaleString()} XP · {fan.city}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Watched", value: fan.matchesWatched },
                  { label: "Predictions", value: fan.predictionsCorrect },
                  { label: "Missions", value: fan.completedMissionIds.length },
                  { label: "Badges", value: fan.achievementIds.length },
                ].map((stat) => (
                  <GlassPanel key={stat.label} variant="subtle" className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tabular-nums">
                      {stat.value}
                    </p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 md:px-6">
        <section>
          <SectionHeader
            eyebrow="Stamps"
            title="Achievements"
            description="Unlocked across Bundesliga and Bayern multi-arena following."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((ach) => (
              <AchievementBadge key={ach.id} achievement={ach} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Travel" title="Events attended" />
          <div className="grid gap-3">
            {attended.map((event) => (
              <GlassPanel
                key={event.id}
                className="flex flex-wrap items-center justify-between gap-3 p-5"
              >
                <div>
                  <p className="text-lg font-semibold">{event.name}</p>
                  <p className="mt-1 text-sm text-muted">
                    {event.city} · {event.startDate.slice(0, 10)} –{" "}
                    {event.endDate.slice(0, 10)}
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.16em] text-orange">
                  Checked in
                </p>
              </GlassPanel>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
