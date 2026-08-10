"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { LiveStandingsTable } from "@/components/match/LiveStandingsTable";
import { MatchGraphicsPreview } from "@/components/match/MatchGraphicsPreview";
import { useDemo } from "@/context/DemoProvider";
import { heroMedia } from "@/data/media";
import { cn } from "@/lib/utils";

export function GoalAutomationPanel() {
  const { toggleGoal, goalTriggered, match, notifications, liveStandings } =
    useDemo();
  const [previewPulse, setPreviewPulse] = useState(false);
  const [tableAnimating, setTableAnimating] = useState(false);

  return (
    <GlassPanel className="relative overflow-hidden">
      <div className="absolute inset-0">
        <MediaImage src={heroMedia.celebration} alt="" />
        <div className="absolute inset-0 photo-scrim-heavy" />
      </div>
      <div className="relative z-10 p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-brand">
          Live data → content automation
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">
          {goalTriggered ? "Goal Detected" : "Simulate Match Event"}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          One match event fans out across score, standings, player stats, social,
          video and fan XP — from a single sports data core. Toggle again to roll
          everything back.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(220px,0.72fr)_1.28fr] lg:items-stretch">
          <GlassPanel
            variant="strong"
            className="flex flex-col justify-center p-5 md:p-6"
          >
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              Current state
            </p>
            <p
              className={cn(
                "mt-4 inline-block rounded-lg px-1 text-5xl font-semibold tabular-nums text-brand md:text-6xl",
                goalTriggered && "score-flash",
              )}
            >
              {match.homeScore}–{match.awayScore}
            </p>
            <p className="mt-3 text-sm text-muted">
              {match.minute}&apos; · Der Klassiker
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button onClick={toggleGoal} disabled={tableAnimating}>
                {goalTriggered ? "Undo Goal" : "Register Goal"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setPreviewPulse(true);
                  document
                    .getElementById("match-graphics-preview")
                    ?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                  window.setTimeout(() => setPreviewPulse(false), 1600);
                }}
              >
                Generate Graphic
              </Button>
            </div>
            {notifications[0] ? (
              <p className="mt-5 text-sm text-brand">{notifications[0].body}</p>
            ) : null}
          </GlassPanel>

          <GlassPanel variant="strong" className="overflow-visible p-5 md:p-6">
            <div className="mb-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-brand">
                Live table
              </p>
              <h3 className="mt-1 text-lg font-semibold">Bundesliga</h3>
              <p className="mt-1 text-xs text-muted">
                Register a goal to watch Bayern climb — undo to reverse.
              </p>
            </div>
            <div className="overflow-visible py-1">
              <LiveStandingsTable
                rows={liveStandings}
                onAnimatingChange={setTableAnimating}
              />
            </div>
          </GlassPanel>
        </div>

        <div id="match-graphics-preview">
          <MatchGraphicsPreview highlight={previewPulse} />
        </div>
      </div>
    </GlassPanel>
  );
}
