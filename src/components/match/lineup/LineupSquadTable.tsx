"use client";

import Image from "next/image";
import type { Player, Team } from "@/types";
import { Crest } from "@/components/media/Crest";
import { GlassPanel } from "@/components/media/GlassPanel";
import {
  playerPortraitFallback,
  playerPortraitPath,
} from "@/data/media";
import { cn } from "@/lib/utils";

function portraitSrc(player: Player) {
  return player.sport === "football"
    ? playerPortraitPath(player.slug)
    : playerPortraitFallback(player.sport);
}

export function LineupSquadTable({
  players,
  team,
  formation,
  className,
}: {
  players: Player[];
  team: Team;
  formation?: string;
  className?: string;
}) {
  return (
    <GlassPanel
      variant="subtle"
      className={cn("overflow-hidden", className)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border/70 px-4 py-3.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Crest slug={team.slug} name={team.name} size={22} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{team.shortName}</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
              Starting XI
            </p>
          </div>
        </div>
        {formation ? (
          <span className="shrink-0 rounded-sm bg-brand/15 px-2 py-1 text-xs font-semibold tabular-nums text-brand">
            {formation}
          </span>
        ) : null}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[10px] uppercase tracking-[0.16em] text-muted">
              <th className="px-3 py-2.5 font-medium">#</th>
              <th className="px-3 py-2.5 font-medium">Player</th>
              <th className="px-3 py-2.5 font-medium">Pos</th>
              <th className="hidden px-3 py-2.5 font-medium sm:table-cell">
                Nat
              </th>
              <th className="px-3 py-2.5 text-right font-medium">Rat</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr
                key={player.id}
                className="border-t border-border/60 transition-colors hover:bg-[color-mix(in_srgb,var(--brand-primary)_12%,transparent)]"
              >
                <td className="px-3 py-2.5">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-bg-2 text-xs font-semibold tabular-nums text-foreground ring-1 ring-border">
                    {player.number ?? "—"}
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span className="flex items-center gap-2.5">
                    <span className="relative size-8 shrink-0 overflow-hidden rounded-full bg-bg-2 ring-1 ring-white/15">
                      <Image
                        src={portraitSrc(player)}
                        alt={player.name}
                        fill
                        className="object-cover object-top"
                        sizes="32px"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-medium leading-tight">
                        {player.shortName}
                      </span>
                      <span className="block truncate text-[11px] text-muted">
                        {player.name}
                      </span>
                    </span>
                  </span>
                </td>
                <td className="px-3 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {player.role}
                  </span>
                </td>
                <td className="hidden px-3 py-2.5 text-xs text-muted sm:table-cell">
                  {player.nationality}
                </td>
                <td className="px-3 py-2.5 text-right">
                  {player.rating != null ? (
                    <span className="inline-flex min-w-8 justify-end font-semibold tabular-nums text-brand">
                      {player.rating}
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}
