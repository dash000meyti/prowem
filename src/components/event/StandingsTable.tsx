import { getTeamById } from "@/data";
import type { StandingRow } from "@/types";

export function StandingsTable({ rows }: { rows: StandingRow[] }) {
  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-bg-2 text-[11px] uppercase tracking-[0.14em] text-muted">
          <tr>
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Team</th>
            <th className="px-4 py-3">P</th>
            <th className="px-4 py-3">W</th>
            <th className="px-4 py-3">D</th>
            <th className="px-4 py-3">L</th>
            <th className="px-4 py-3">GF</th>
            <th className="px-4 py-3">GA</th>
            <th className="px-4 py-3">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const team = getTeamById(row.teamId);
            return (
              <tr
                key={row.teamId}
                className="border-t border-border/80 odd:bg-bg-1/40"
              >
                <td className="px-4 py-3 tabular-nums text-muted">
                  {row.position}
                </td>
                <td className="px-4 py-3 font-medium">{team?.name ?? row.teamId}</td>
                <td className="px-4 py-3 tabular-nums">{row.played}</td>
                <td className="px-4 py-3 tabular-nums">{row.wins}</td>
                <td className="px-4 py-3 tabular-nums">{row.draws}</td>
                <td className="px-4 py-3 tabular-nums">{row.losses}</td>
                <td className="px-4 py-3 tabular-nums">{row.goalsFor}</td>
                <td className="px-4 py-3 tabular-nums">{row.goalsAgainst}</td>
                <td className="px-4 py-3 font-semibold tabular-nums text-orange">
                  {row.points}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
