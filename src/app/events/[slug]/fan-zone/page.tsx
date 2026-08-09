import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getEventBySlug, getPrimaryFan, missions } from "@/data";
import { notFound } from "next/navigation";

export default async function EventFanZonePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  const fan = getPrimaryFan();
  const teaserMissions = missions.slice(0, 4);
  const openCount = missions.filter((m) => !m.completed).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <SectionHeader
        eyebrow="Community"
        title="Fan Zone"
        description="Watch, predict, check in — and turn festival nights into XP that follows you across PROWEM."
      />

      <div className="mb-12 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="border border-border bg-gradient-to-br from-bg-2 to-bg-1 p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.22em] text-orange">
            Your pulse
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight">
            {fan.name}
          </h3>
          <p className="mt-2 text-sm text-muted">
            Level {fan.level} · {fan.status} · {fan.xp.toLocaleString()} XP
          </p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            Semi-final night is the richest XP window of the festival. Stay with
            the live stream, call the finalists, and clear partner challenges
            before the whistle — every action feeds the same fan passport.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/fans/missions">Open missions</Button>
            <Button href="/fans" variant="outline">
              Fan home
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div className="border border-border bg-bg-1 p-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              Open missions
            </p>
            <p className="mt-3 text-4xl font-semibold tabular-nums text-orange">
              {openCount}
            </p>
            <p className="mt-2 text-sm text-muted">Still available this week</p>
          </div>
          <div className="border border-border bg-bg-1 p-6">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              XP idea
            </p>
            <p className="mt-3 text-lg font-semibold leading-snug">
              Stack watch + predict on semi-final night for a double XP swing.
            </p>
          </div>
        </div>
      </div>

      <SectionHeader
        eyebrow="This week"
        title="Mission teaser"
        description="A sample of the challenges waiting in the full fan experience."
        action={
          <Button href="/fans/missions" variant="ghost" size="sm">
            See all
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {teaserMissions.map((mission) => (
          <article
            key={mission.id}
            className="border border-border bg-bg-1 p-5"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                {mission.category}
              </p>
              <span className="text-sm font-semibold text-orange">
                +{mission.xp} XP
              </span>
            </div>
            <h3 className="text-lg font-semibold">{mission.title}</h3>
            <p className="mt-2 text-sm text-muted">{mission.description}</p>
            {mission.rewardLabel ? (
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-orange">
                Reward · {mission.rewardLabel}
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted">
        Ready to complete them?{" "}
        <Link
          href="/fans/missions"
          className="text-orange underline-offset-4 hover:underline"
        >
          Jump to /fans/missions
        </Link>{" "}
        and keep climbing toward the next reward tier.
      </p>
    </div>
  );
}
