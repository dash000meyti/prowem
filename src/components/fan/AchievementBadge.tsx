import type { Achievement } from "@/types";
import { AchievementIcon } from "@/components/fan/AchievementIcon";
import { GlassPanel } from "@/components/media/GlassPanel";

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <GlassPanel className="p-5">
      <div className="mb-3 flex h-10 w-10 items-center justify-center border border-border bg-bg-2 text-brand">
        <AchievementIcon name={achievement.icon} className="h-5 w-5" />
      </div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-brand">
        Achievement
      </p>
      <h3 className="mt-2 text-base font-semibold">{achievement.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {achievement.description}
      </p>
    </GlassPanel>
  );
}
