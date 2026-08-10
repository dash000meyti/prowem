"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FollowButton } from "@/components/fan/FollowButton";
import { MissionCard } from "@/components/fan/MissionCard";
import { XPProgress } from "@/components/fan/XPProgress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { Crest } from "@/components/media/Crest";
import { SectionShell } from "@/components/layout/SectionShell";
import { useDemo } from "@/context/DemoProvider";
import { getMissionsByEventId, resolveMedia } from "@/data";
import type { EventEntity } from "@/types";

export function EventFanZoneClient({ event }: { event: EventEntity }) {
  const {
    fanName,
    fanLevel,
    fanStatus,
    fanXp,
    missions,
    isFollowingEvent,
  } = useDemo();

  const eventMissions = getMissionsByEventId(event.id).map((m) => {
    const live = missions.find((x) => x.id === m.id);
    return live ?? m;
  });
  const openCount = eventMissions.filter((m) => !m.completed).length;
  const following = isFollowingEvent(event.id);

  return (
    <div>
      <PhotoBackground
        src={resolveMedia(event.theme.coverImage ?? event.theme.heroImage, "crowdOrange")}
        alt={`${event.name} fan zone`}
        scrim="heavy"
        className="min-h-[48vh] border-b border-border"
      >
        <div className="mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end gap-6 px-4 pb-12 pt-20 md:px-6">
          <Crest
            entity="event"
            slug={event.slug}
            name={event.name}
            size={72}
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Fan Zone · {event.shortName}
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              {event.name}
            </h1>
            <p className="mt-4 max-w-xl text-base text-foreground/85">
              Watch, predict, check in — XP from this festival feeds the same fan
              passport across PROWEM.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <FollowButton kind="event" id={event.id} label={event.name} />
            <Button href="/fans/missions" variant="outline">
              All missions
            </Button>
          </div>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl space-y-14 px-4 py-14 md:px-6"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <GlassPanel className="p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.22em] text-brand">
              Your pulse
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-tight">
              {fanName}
            </h3>
            <p className="mt-2 text-sm text-muted">
              Level {fanLevel} · {fanStatus} · {fanXp.toLocaleString()} XP
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
              {following
                ? `You're following ${event.name}. Missions below are scoped to this event.`
                : `Follow ${event.name} to prioritise these missions in your For you rails.`}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/fans">Fan dashboard</Button>
              <Button href={`/events/${event.slug}`} variant="outline">
                Event home
              </Button>
            </div>
          </GlassPanel>

          <div className="grid gap-4">
            <GlassPanel className="p-6">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                Open missions here
              </p>
              <p className="mt-3 text-4xl font-semibold tabular-nums text-brand">
                {openCount}
              </p>
              <p className="mt-2 text-sm text-muted">
                Still available for {event.shortName}
              </p>
            </GlassPanel>
            <XPProgress />
          </div>
        </div>

        <section>
          <SectionHeader
            eyebrow="This event"
            title="Mission board"
            description={`Challenges tagged to ${event.name}.`}
            action={
              <Button href="/fans/missions" variant="ghost" size="sm">
                Full board
              </Button>
            }
          />
          {eventMissions.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {eventMissions.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              No event-tagged missions yet — explore the{" "}
              <Link href="/fans/missions" className="text-brand hover:underline">
                full mission board
              </Link>
              .
            </p>
          )}
        </section>
      </SectionShell>
    </div>
  );
}
