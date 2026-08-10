import type { Sponsor } from "@/types";
import { cn } from "@/lib/utils";

const TIER_ORDER: Record<Sponsor["tier"], number> = {
  title: 0,
  gold: 1,
  silver: 2,
  partner: 3,
};

const TIER_UI: Record<
  Sponsor["tier"],
  { label: string; card: string; badge: string; name: string }
> = {
  title: {
    label: "Title partner",
    card: "border-brand/50 bg-brand/10 sm:col-span-2 lg:col-span-2 min-h-32",
    badge: "text-brand",
    name: "text-xl md:text-2xl",
  },
  gold: {
    label: "Gold partner",
    card: "border-[#C9A227]/45 bg-[#C9A227]/10 min-h-28",
    badge: "text-[#E8C547]",
    name: "text-lg",
  },
  silver: {
    label: "Silver partner",
    card: "border-white/30 bg-white/[0.06] min-h-24",
    badge: "text-foreground/80",
    name: "text-base",
  },
  partner: {
    label: "Official partner",
    card: "border-border bg-bg-1 min-h-24",
    badge: "text-muted",
    name: "text-base",
  },
};

export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  const sorted = [...sponsors].sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
  );

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {sorted.map((sponsor) => {
        const ui = TIER_UI[sponsor.tier];
        return (
          <div
            key={sponsor.id}
            className={cn(
              "flex flex-col justify-between p-4 transition",
              ui.card,
            )}
          >
            <p
              className={cn(
                "text-[10px] font-semibold uppercase tracking-[0.16em]",
                ui.badge,
              )}
            >
              {ui.label}
            </p>
            <div className="mt-4">
              <p className={cn("font-semibold tracking-tight", ui.name)}>
                {sponsor.name}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {sponsor.tagline}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
