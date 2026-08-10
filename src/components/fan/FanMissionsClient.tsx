"use client";

import { useMemo, useState } from "react";
import { MissionCard } from "@/components/fan/MissionCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import { useDemo } from "@/context/DemoProvider";
import { heroMedia } from "@/data";
import { cn } from "@/lib/utils";
import type { Mission } from "@/types";

type Filter = "forYou" | "all" | Mission["category"];

const categories: Mission["category"][] = [
  "watch",
  "predict",
  "quiz",
  "attend",
  "sponsor",
  "social",
];

export function FanMissionsClient() {
  const { missions, missionsForYou } = useDemo();
  const [filter, setFilter] = useState<Filter>("forYou");

  const list = useMemo(() => {
    if (filter === "forYou") return missionsForYou;
    if (filter === "all") return missions;
    return missions.filter((m) => m.category === filter);
  }, [filter, missions, missionsForYou]);

  const openCount = list.filter((m) => !m.completed).length;

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
            Watch, predict, quiz, attend and partner challenges — {openCount} open
            in this view.
          </p>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl space-y-10 px-4 py-14 md:px-6"
      >
        <div className="flex flex-wrap gap-2">
          {(
            [
              ["forYou", "For you"],
              ["all", "All"],
              ...categories.map((c) => [c, c] as const),
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-sm border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition",
                filter === key
                  ? "border-brand bg-brand text-bg-0"
                  : "border-border text-muted hover:border-brand/50 hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <SectionHeader
          eyebrow={filter === "forYou" ? "Personalized" : "Board"}
          title={filter === "forYou" ? "Matched to your follows" : "Mission board"}
          description="Complete missions to earn XP and unlock reward tiers."
          action={
            <Button href="/fans/rewards" variant="ghost" size="sm">
              Rewards
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {list.map((mission) => (
            <MissionCard key={mission.id} mission={mission} />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
