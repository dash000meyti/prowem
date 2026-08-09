"use client";

import { Button } from "@/components/ui/Button";
import { useDemo } from "@/context/DemoProvider";

export function GoalAutomationPanel() {
  const { triggerGoal, goalTriggered, automationSteps, match, notifications } =
    useDemo();

  return (
    <section className="border border-orange/30 bg-gradient-to-br from-[#2a140e] via-bg-1 to-bg-0 p-6 md:p-8">
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
        <div className="border border-border bg-black/20 p-5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            Current state
          </p>
          <p className="mt-3 text-4xl font-semibold tabular-nums text-orange">
            {match.homeScore}–{match.awayScore}
          </p>
          <p className="mt-2 text-sm text-muted">{match.minute}&apos; · Semi Final</p>
          <div className="mt-5">
            <Button onClick={triggerGoal} disabled={goalTriggered}>
              {goalTriggered ? "Propagation Complete" : "Trigger Goal"}
            </Button>
          </div>
        </div>
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
              className={`border px-3 py-2 text-sm ${
                automationSteps.includes(step)
                  ? "border-orange/40 bg-orange-soft/30 text-foreground"
                  : "border-border text-muted"
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
    </section>
  );
}
