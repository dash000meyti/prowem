"use client";

import { LayoutGroup, motion } from "framer-motion";
import { getTeamById } from "@/data";
import type { StandingRow } from "@/types";
import { cn } from "@/lib/utils";
import { Crest } from "@/components/media/Crest";

export function LiveStandingsTable({
  rows,
  highlightTeamId = "team-bayern-fc",
  className,
}: {
  rows: StandingRow[];
  highlightTeamId?: string;
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <LayoutGroup>
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead className="text-[10px] uppercase tracking-[0.16em] text-muted">
            <tr>
              <th className="px-3 py-2.5 font-medium">#</th>
              <th className="px-3 py-2.5 font-medium">Team</th>
              <th className="px-3 py-2.5 font-medium">P</th>
              <th className="px-3 py-2.5 font-medium">GF</th>
              <th className="px-3 py-2.5 font-medium">GA</th>
              <th className="px-3 py-2.5 font-medium">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const team = getTeamById(row.teamId);
              const highlighted = row.teamId === highlightTeamId;
              return (
                <motion.tr
                  key={row.teamId}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 28,
                    mass: 0.85,
                  }}
                  className={cn(
                    "border-t border-white/10",
                    highlighted &&
                      "bg-[color-mix(in_srgb,var(--brand-primary)_18%,transparent)]",
                  )}
                >
                  <td className="px-3 py-3 tabular-nums text-muted">
                    <motion.span
                      key={row.position}
                      initial={{ opacity: 0.4, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-sm text-xs font-semibold",
                        highlighted && "bg-brand text-bg-0",
                      )}
                    >
                      {row.position}
                    </motion.span>
                  </td>
                  <td className="px-3 py-3">
                    <span className="flex items-center gap-2 font-medium">
                      {team ? (
                        <Crest slug={team.slug} name={team.name} size={22} />
                      ) : null}
                      <span className={highlighted ? "text-foreground" : ""}>
                        {team?.shortName ?? team?.name ?? row.teamId}
                      </span>
                    </span>
                  </td>
                  <td className="px-3 py-3 tabular-nums">{row.played}</td>
                  <td
                    className={cn(
                      "px-3 py-3 tabular-nums",
                      highlighted && "font-semibold text-brand",
                    )}
                  >
                    {row.goalsFor}
                  </td>
                  <td className="px-3 py-3 tabular-nums">{row.goalsAgainst}</td>
                  <td className="px-3 py-3 font-semibold tabular-nums">
                    {row.points}
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </LayoutGroup>
    </div>
  );
}
