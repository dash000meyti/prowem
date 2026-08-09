import { getTeamById } from "@/data";
import type { BracketMatch } from "@/types";
import { cn } from "@/lib/utils";

function BracketSlot({ item }: { item: BracketMatch }) {
  const home = item.homeTeamId ? getTeamById(item.homeTeamId) : undefined;
  const away = item.awayTeamId ? getTeamById(item.awayTeamId) : undefined;

  return (
    <div className="border border-border bg-bg-1 p-3">
      <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted">
        {item.label}
      </p>
      <div className="space-y-2 text-sm">
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            item.winnerId === item.homeTeamId && "text-orange",
          )}
        >
          <span>{home?.shortName ?? "TBD"}</span>
          <span className="tabular-nums">{item.homeScore ?? "—"}</span>
        </div>
        <div
          className={cn(
            "flex items-center justify-between gap-3",
            item.winnerId === item.awayTeamId && "text-orange",
          )}
        >
          <span>{away?.shortName ?? "TBD"}</span>
          <span className="tabular-nums">{item.awayScore ?? "—"}</span>
        </div>
      </div>
    </div>
  );
}

export function Bracket({ items }: { items: BracketMatch[] }) {
  const qf = items.filter((i) => i.round === "qf");
  const sf = items.filter((i) => i.round === "sf");
  const final = items.filter((i) => i.round === "final");

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-orange">
          Quarter Finals
        </p>
        <div className="space-y-3">
          {qf.map((item) => (
            <BracketSlot key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-orange">
          Der Klassikers
        </p>
        <div className="space-y-3">
          {sf.map((item) => (
            <BracketSlot key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-orange">
          Final
        </p>
        <div className="space-y-3">
          {final.map((item) => (
            <BracketSlot key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
