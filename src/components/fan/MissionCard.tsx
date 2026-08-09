"use client";

import { Button } from "@/components/ui/Button";
import type { Mission } from "@/types";
import { useDemo } from "@/context/DemoProvider";
import { cn } from "@/lib/utils";

export function MissionCard({ mission }: { mission: Mission }) {
  const { completedMissionIds, completeMission } = useDemo();
  const done = completedMissionIds.includes(mission.id);

  return (
    <article
      className={cn(
        "border border-border bg-bg-1 p-5",
        done && "border-orange/40 bg-orange-soft/20",
      )}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
          {mission.category}
        </p>
        <span className="text-sm font-semibold text-orange">+{mission.xp} XP</span>
      </div>
      <h3 className="text-lg font-semibold">{mission.title}</h3>
      <p className="mt-2 text-sm text-muted">{mission.description}</p>
      {mission.rewardLabel ? (
        <p className="mt-3 text-xs uppercase tracking-[0.14em] text-orange">
          Reward · {mission.rewardLabel}
        </p>
      ) : null}
      <div className="mt-5">
        <Button
          size="sm"
          variant={done ? "secondary" : "primary"}
          disabled={done}
          onClick={() => completeMission(mission.id)}
        >
          {done ? "Completed" : "Complete Mission"}
        </Button>
      </div>
    </article>
  );
}
