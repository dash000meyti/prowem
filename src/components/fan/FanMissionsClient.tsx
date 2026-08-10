"use client";

import { MissionCard } from "@/components/fan/MissionCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import { useDemo } from "@/context/DemoProvider";
import { heroMedia } from "@/data";

export function FanMissionsClient() {
  const { missionsGlobal, missionsForYou, missionsDiscover } = useDemo();

  const openGlobal = missionsGlobal.filter((m) => !m.completed).length;
  const openForYou = missionsForYou.filter((m) => !m.completed).length;

  return (
    <div>
      <PhotoBackground
        src={heroMedia.fan}
        alt="Missions atmosphere"
        scrim="heavy"
        className="min-h-[42vh] border-b border-border"
      >
        <div className="mx-auto flex min-h-[42vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-20 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Engage
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Missions
          </h1>
          <p className="mt-4 max-w-xl text-base text-foreground/85">
            Global challenges for every fan, plus missions unlocked by the clubs,
            teams and events you follow.
          </p>
          <p className="mt-3 text-sm text-muted">
            {openGlobal} global open · {openForYou} from your follows open
          </p>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6"
      >
        <section>
          <SectionHeader
            eyebrow="Everyone"
            title="Global missions"
            description="Available to every PROWEM fan — no follow required."
            action={
              <Button href="/fans/rewards" variant="ghost" size="sm">
                Rewards
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {missionsGlobal.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="From your follows"
            title="Personalised missions"
            description="Matched to clubs, teams and events you track."
            action={
              <Button href="/fans" variant="ghost" size="sm">
                Manage follows
              </Button>
            }
          />
          {missionsForYou.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {missionsForYou.map((mission) => (
                <MissionCard key={mission.id} mission={mission} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">
              Follow a club, team or event to unlock personalised missions here.
            </p>
          )}
        </section>

        {missionsDiscover.length > 0 ? (
          <section>
            <SectionHeader
              eyebrow="Discover"
              title="Follow to unlock"
              description="Missions waiting behind entities you have not followed yet."
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {missionsDiscover.map((mission) => (
                <MissionCard key={mission.id} mission={mission} locked />
              ))}
            </div>
          </section>
        ) : null}
      </SectionShell>
    </div>
  );
}
