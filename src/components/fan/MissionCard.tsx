"use client";

import { cn } from "@/lib/utils";
import type { Mission } from "@/types";
import { useDemo } from "@/context/DemoProvider";
import { Button } from "@/components/ui/Button";
import { resolveMedia } from "@/data/media";
import { MediaImage } from "@/components/media/MediaImage";

const categoryMedia: Record<Mission["category"], string> = {
  watch: "nightMatch",
  predict: "footballAction",
  quiz: "locker",
  attend: "stadiumLights",
  sponsor: "jerseyDetail",
  social: "crowdOrange",
};

export function MissionCard({ mission }: { mission: Mission }) {
  const { completedMissionIds, completeMission } = useDemo();
  const done =
    completedMissionIds.includes(mission.id) || Boolean(mission.completed);

  return (
    <article
      className={cn(
        "overflow-hidden border border-border bg-bg-1",
        done && "border-brand/40",
      )}
    >
      <div className="relative h-28 overflow-hidden">
        <MediaImage
          src={resolveMedia(categoryMedia[mission.category], "crowdOrange")}
          alt=""
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-1 via-bg-1/40 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            {mission.category}
          </p>
          <span className="text-sm font-semibold text-brand">+{mission.xp} XP</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold">{mission.title}</h3>
        <p className="mt-2 text-sm text-muted">{mission.description}</p>
        {mission.rewardLabel ? (
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-brand">
            Reward · {mission.rewardLabel}
          </p>
        ) : null}
        <div className="mt-5">
          <Button
            size="sm"
            variant={done ? "secondary" : "brand"}
            disabled={done}
            onClick={() => completeMission(mission.id)}
          >
            {done ? "Completed" : "Complete Mission"}
          </Button>
        </div>
      </div>
    </article>
  );
}
