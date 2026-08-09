import type { Award, Legend } from "@/types";

export function AwardCard({ award }: { award: Award }) {
  return (
    <article className="border border-border bg-bg-1 p-5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-orange">
        {award.season}
      </p>
      <h3 className="mt-2 text-lg font-semibold">{award.name}</h3>
      <p className="mt-2 text-sm text-muted">{award.description}</p>
      <p className="mt-4 text-sm font-medium">{award.winnerName}</p>
    </article>
  );
}

export function LegendCard({ legend }: { legend: Legend }) {
  return (
    <article className="border border-border bg-gradient-to-br from-bg-2 to-bg-1 p-5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
        {legend.era}
      </p>
      <h3 className="mt-2 text-xl font-semibold">{legend.name}</h3>
      <p className="mt-1 text-sm text-orange">{legend.title}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{legend.story}</p>
    </article>
  );
}
