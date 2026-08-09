import type { Sponsor } from "@/types";

export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {sponsors.map((sponsor) => (
        <div
          key={sponsor.id}
          className="flex min-h-24 flex-col justify-between border border-border bg-bg-1 p-4"
        >
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
            {sponsor.tier}
          </p>
          <p className="text-base font-semibold">{sponsor.name}</p>
        </div>
      ))}
    </div>
  );
}
