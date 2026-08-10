import type { SoccaStats } from "@/types";

const rows: Array<{ key: keyof SoccaStats; label: string; suffix?: string }> = [
  { key: "possession", label: "Possession", suffix: "%" },
  { key: "shots", label: "Shots" },
  { key: "shotsOnTarget", label: "On target" },
  { key: "fouls", label: "Fouls" },
  { key: "tackles", label: "Tackles" },
  { key: "blocks", label: "Blocks" },
];

export function SoccaStatsBars({
  stats,
  homeName,
  awayName,
}: {
  stats: SoccaStats;
  homeName: string;
  awayName: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>{homeName}</span>
        <span>{awayName}</span>
      </div>
      {rows.map(({ key, label, suffix = "" }) => {
        const [home, away] = stats[key];
        const total = home + away || 1;
        const homePct = Math.round((home / total) * 100);

        return (
          <div key={key}>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-semibold tabular-nums">
                {home}
                {suffix}
              </span>
              <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
                {label}
              </span>
              <span className="font-semibold tabular-nums">
                {away}
                {suffix}
              </span>
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
