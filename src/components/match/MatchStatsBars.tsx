import type { FootballStats } from "@/types";
import { cn } from "@/lib/utils";

const rows: Array<{ key: keyof FootballStats; label: string }> = [
  { key: "possession", label: "Possession" },
  { key: "shots", label: "Shots" },
  { key: "shotsOnTarget", label: "On target" },
  { key: "corners", label: "Corners" },
  { key: "fouls", label: "Fouls" },
  { key: "passAccuracy", label: "Pass accuracy" },
];

export function MatchStatsBars({
  stats,
  homeName,
  awayName,
  className,
}: {
  stats: FootballStats;
  homeName: string;
  awayName: string;
  className?: string;
}) {
  return (
    <div className={cn("space-y-0", className)}>
      <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted">
        <span>{homeName}</span>
        <span>{awayName}</span>
      </div>
      {rows.map(({ key, label }, index) => {
        const [home, away] = stats[key];
        const suffix = key === "possession" || key === "passAccuracy" ? "%" : "";

        return (
          <div
            key={key}
            className={cn(
              "grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-3",
              index < rows.length - 1 && "border-b border-white/10",
            )}
          >
            <span className="text-left text-base font-semibold tabular-nums transition-all duration-500">
              {home}
              {suffix}
            </span>
            <span className="text-center text-[11px] uppercase tracking-[0.14em] text-muted">
              {label}
            </span>
            <span className="text-right text-base font-semibold tabular-nums transition-all duration-500">
              {away}
              {suffix}
            </span>
          </div>
        );
      })}
    </div>
  );
}
