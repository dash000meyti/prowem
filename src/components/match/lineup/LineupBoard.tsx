"use client";

import { useMemo, useState } from "react";
import type { Match, Player, Team } from "@/types";
import { LineupBoardShell } from "./LineupBoardShell";
import { SlotNodes } from "./overlays";
import { slotsForLineup } from "./slots";

const FIELD_ASPECT: Record<string, string> = {
  football: "aspect-[500/709.2] w-full max-w-3xl",
  socca: "aspect-[500/709.2] w-full max-w-3xl",
  dota2: "aspect-square w-full max-w-[min(100%,720px)]",
};

function sideLabel(sport: string, formation?: string) {
  if (sport === "football") return formation ?? "4-4-2";
  if (sport === "dota2") return "5";
  if (sport === "socca") return "6";
  return formation ?? "—";
}

export function LineupBoard({
  match,
  home,
  away,
  homeLineup,
  awayLineup,
}: {
  match: Match;
  home: Team;
  away: Team;
  homeLineup: Player[];
  awayLineup: Player[];
}) {
  const [side, setSide] = useState<"home" | "away">("home");
  const players = side === "home" ? homeLineup : awayLineup;
  const formation =
    side === "home" ? match.homeFormation : match.awayFormation;
  const mirrored = side === "away";

  const slots = useMemo(
    () => slotsForLineup(match.sport, players, formation, mirrored),
    [match.sport, players, formation, mirrored],
  );

  return (
    <LineupBoardShell
      title="Starting lineup"
      home={home}
      away={away}
      homeLabel={sideLabel(match.sport, match.homeFormation)}
      awayLabel={sideLabel(match.sport, match.awayFormation)}
      active={side}
      onChange={setSide}
      sport={match.sport}
      fieldClassName={`mx-auto ${FIELD_ASPECT[match.sport] ?? FIELD_ASPECT.football}`}
    >
      <SlotNodes slots={slots} />
    </LineupBoardShell>
  );
}
