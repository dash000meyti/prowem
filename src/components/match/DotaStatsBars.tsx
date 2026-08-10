import type { DotaStats } from "@/types";

const rows: Array<{ key: keyof Omit<DotaStats, "duration">; label: string }> = [
  { key: "kills", label: "Kills" },
  { key: "towers", label: "Towers" },
  { key: "roshan", label: "Roshan" },
  { key: "gold", label: "Net worth" },
];

export function DotaStatsBars({
  stats,
  homeName,
  awayName,
}: {
  stats: DotaStats;
  homeName: string;
  awayName: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>{homeName}</span>
        <span className="text-foreground/80">{stats.duration}</span>
        <span>{awayName}</span>
      </div>
      {rows.map(({ key, label }) => {
        const [home, away] = stats[key];
        const total = home + away || 1;
        const homePct = Math.round((home / total) * 100);
        const format = (n: number) =>
          key === "gold" ? `${Math.round(n / 1000)}k` : String(n);

        return (
          <div key={key}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold tabular-nums">{format(home)}</span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {label}
              </span>
              <span className="font-semibold tabular-nums">{format(away)}</span>
            </div>
            <div className="flex h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full bg-brand transition-all duration-500"
                style={{ width: `${homePct}%` }}
              />
              <div
                className="h-full bg-white/25 transition-all duration-500"
                style={{ width: `${100 - homePct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
