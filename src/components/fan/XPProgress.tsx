"use client";

import { useDemo } from "@/context/DemoProvider";
import { GlassPanel } from "@/components/media/GlassPanel";

export function XPProgress() {
  const { fanXp, fanLevel, fanStatus, xpToNext, lastUnlockedAchievement } =
    useDemo();
  const progress = Math.min(100, Math.round((fanXp / xpToNext) * 100));

  return (
    <GlassPanel className="p-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand">
            {fanStatus}
          </p>
          <h2 className="mt-2 text-3xl font-semibold">Level {fanLevel}</h2>
          <p className="mt-1 text-sm text-muted">
            {fanXp.toLocaleString()} / {xpToNext.toLocaleString()} XP
          </p>
        </div>
        <p className="text-2xl font-semibold tabular-nums text-brand">
          {progress}%
        </p>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className="h-full rounded-full bg-brand transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {lastUnlockedAchievement ? (
        <p className="mt-4 text-xs uppercase tracking-[0.16em] text-brand">
          Unlocked · {lastUnlockedAchievement}
        </p>
      ) : null}
    </GlassPanel>
  );
}
