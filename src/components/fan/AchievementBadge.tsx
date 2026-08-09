import type { Achievement } from "@/types";
import { GlassPanel } from "@/components/media/GlassPanel";

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  return (
    <GlassPanel className="p-4">
      <p className="text-[10px] uppercase tracking-[0.16em] text-orange">
        Achievement
      </p>
      <h3 className="mt-2 text-base font-semibold">{achievement.name}</h3>
      <p className="mt-2 text-sm text-muted">{achievement.description}</p>
    </GlassPanel>
  );
}
