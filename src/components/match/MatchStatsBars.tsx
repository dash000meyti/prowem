import type { FootballStats } from "@/types";

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
}: {
  stats: FootballStats;
  homeName: string;
  awayName: string;
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>{homeName}</span>
        <span>{awayName}</span>
      </div>
      {rows.map(({ key, label }) => {
        const [home, away] = stats[key];
        const total = home + away || 1;
        const homePct = Math.round((home / total) * 100);
        const suffix = key === "possession" || key === "passAccuracy" ? "%" : "";

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
                className="h-full bg-[#00C2A8] transition-all duration-500"
                style={{ width: `${homePct}%` }}
              />
              <div
                className="h-full bg-orange/80 transition-all duration-500"
                style={{ width: `${100 - homePct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
