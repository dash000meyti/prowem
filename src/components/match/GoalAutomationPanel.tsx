"use client";

import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { useDemo } from "@/context/DemoProvider";
import { heroMedia } from "@/data/media";

export function GoalAutomationPanel() {
  const { triggerGoal, goalTriggered, automationSteps, match, notifications } =
    useDemo();

  return (
    <GlassPanel className="relative overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage src={heroMedia.celebration} alt="" />
        <div className="absolute inset-0 photo-scrim-heavy" />
      </div>
      <div className="relative z-10 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-orange">
          Live data → content automation
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          {goalTriggered ? "Goal Detected" : "Simulate Match Event"}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          One match event fans out across score, standings, player stats, social,
          video and fan XP — from a single sports data core.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <GlassPanel variant="strong" className="p-5">
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              Current state
            </p>
            <p className="mt-3 text-4xl font-semibold tabular-nums text-orange">
              {match.homeScore}–{match.awayScore}
            </p>
            <p className="mt-2 text-sm text-muted">
              {match.minute}&apos; · Semi Final
            </p>
            <div className="mt-5">
              <Button onClick={triggerGoal} disabled={goalTriggered}>
                {goalTriggered ? "Propagation Complete" : "Trigger Goal"}
              </Button>
            </div>
          </GlassPanel>
          <div className="space-y-2">
            {(automationSteps.length
              ? automationSteps
              : [
                  "Update Score",
                  "Update Table",
                  "Update Player Stats",
                  "Create Social Post",
                  "Generate Graphic",
                  "Create Video Timestamp",
                  "Notify Fans",
                ]
            ).map((step) => (
              <div
                key={step}
                className={`rounded-xl border px-3 py-2 text-sm backdrop-blur-md ${
                  automationSteps.includes(step)
                    ? "border-orange/40 bg-orange-soft/40 text-foreground"
                    : "border-[var(--glass-border)] bg-black/30 text-muted"
                }`}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {notifications[0] ? (
          <p className="mt-5 text-sm text-orange">{notifications[0].body}</p>
        ) : null}
      </div>
    </GlassPanel>
  );
}
