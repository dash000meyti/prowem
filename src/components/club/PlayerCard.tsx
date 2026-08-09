import type { Player } from "@/types";

export function PlayerCard({ player }: { player: Player }) {
  return (
    <article className="border border-border bg-bg-1 p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-sm bg-white/5 text-sm font-semibold text-orange"
        >
          {player.number ?? player.shortName.slice(0, 2)}
        </div>
        {player.rating != null ? (
          <span className="text-sm font-semibold tabular-nums text-orange">
            {player.rating.toFixed(1)}
          </span>
        ) : null}
      </div>
      <h3 className="text-base font-semibold">{player.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-muted">
        {player.role} · {player.nationality}
      </p>
    </article>
  );
}
