"use client";

import { useMemo, useState, type ReactNode } from "react";
import { getTeamById } from "@/data/teams";
import type { BracketMatch } from "@/types";
import { Crest } from "@/components/media/Crest";
import { cn } from "@/lib/utils";

/** Day-of-month → accent for TI-style "Show Days" headers */
const DAY_COLORS: Record<string, string> = {
  "2024-09-08": "#7B5CFF",
  "2024-09-09": "#E84A9A",
  "2024-09-10": "#2EC4B6",
  "2024-09-13": "#B87333",
  "2024-09-14": "#9AA0A6",
  "2024-09-15": "#3DDC84",
};

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function formatBracketWhen(iso: string) {
  const d = new Date(iso);
  return d
    .toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    })
    .toUpperCase();
}

function legendEntries(items: BracketMatch[]) {
  const seen = new Map<string, string>();
  for (const item of items) {
    const key = dayKey(item.scheduledAt);
    if (!seen.has(key) && DAY_COLORS[key]) {
      seen.set(key, DAY_COLORS[key]);
    }
  }
  return [...seen.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function BracketMatchCard({
  item,
  showDays,
}: {
  item: BracketMatch;
  showDays: boolean;
}) {
  const home = item.homeTeamId ? getTeamById(item.homeTeamId) : undefined;
  const away = item.awayTeamId ? getTeamById(item.awayTeamId) : undefined;
  const headerColor = showDays
    ? (DAY_COLORS[dayKey(item.scheduledAt)] ?? "var(--brand-primary)")
    : "var(--brand-primary)";

  const row = (
    team: ReturnType<typeof getTeamById> | undefined,
    teamId: string | undefined,
    score: number | undefined,
  ) => {
    const isWinner = Boolean(item.winnerId && teamId && item.winnerId === teamId);
    const isLoser = Boolean(item.winnerId && teamId && item.winnerId !== teamId);
    return (
      <div
        className={cn(
          "flex items-center gap-2.5 px-3 py-2.5",
          isLoser && "opacity-55",
        )}
      >
        {team ? (
          <Crest slug={team.slug} name={team.name} size={22} />
        ) : (
          <span className="size-[22px] shrink-0 rounded-sm bg-white/8" />
        )}
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-sm",
            isWinner ? "font-semibold text-foreground" : "text-muted",
          )}
        >
          {team?.name ?? "TBD"}
        </span>
        <span
          className={cn(
            "tabular-nums text-sm",
            isWinner ? "font-semibold text-foreground" : "text-muted",
          )}
        >
          {score ?? "—"}
        </span>
      </div>
    );
  };

  return (
    <article className="w-[240px] shrink-0 overflow-hidden rounded-md border border-border bg-bg-1 shadow-[0_8px_28px_rgba(0,0,0,0.35)]">
      <header
        className="flex items-baseline justify-between gap-2 px-3 py-2 text-bg-0"
        style={{ backgroundColor: headerColor }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
          {item.roundLabel}
        </span>
        <span className="text-[10px] uppercase tracking-wide opacity-90">
          {formatBracketWhen(item.scheduledAt)}
        </span>
      </header>
      <div className="divide-y divide-border">
        {row(home, item.homeTeamId, item.homeScore)}
        {row(away, item.awayTeamId, item.awayScore)}
      </div>
    </article>
  );
}

/**
 * Two left arms (at 25% / 75%) merge to one right exit (at 50%).
 * Must sit in a horizontal flex row that stretches to the pair height.
 */
function ForkConnector() {
  return (
    <div
      className="relative hidden w-10 shrink-0 self-stretch md:block"
      aria-hidden
    >
      <span className="absolute top-1/4 right-1/2 left-0 h-px bg-border-strong" />
      <span className="absolute top-3/4 right-1/2 left-0 h-px bg-border-strong" />
      <span className="absolute top-1/4 bottom-1/4 left-1/2 w-px -translate-x-1/2 bg-border-strong" />
      <span className="absolute top-1/2 right-0 left-1/2 h-px -translate-y-1/2 bg-border-strong" />
    </div>
  );
}

function StraightConnector() {
  return (
    <div
      className="relative hidden w-10 shrink-0 self-stretch md:block"
      aria-hidden
    >
      <span className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-border-strong" />
    </div>
  );
}

/** Full-height lane; use as a column stack of equal halves */
function Lane({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 shrink-0 flex-col self-stretch">{children}</div>;
}

function Half({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 flex-1 flex-col">{children}</div>;
}

/** Horizontal strip so connectors can self-stretch to half height */
function ConnectorHalf({ children }: { children: ReactNode }) {
  return <div className="flex min-h-0 flex-1 items-stretch">{children}</div>;
}

function Centered({ children }: { children: ReactNode }) {
  return <div className="flex flex-1 items-center">{children}</div>;
}

export function Bracket({ items }: { items: BracketMatch[] }) {
  const [showDays, setShowDays] = useState(true);

  const ubQf = items.filter((i) => i.bracketSide === "upper" && i.round === "qf");
  const ubSf = items.find((i) => i.bracketSide === "upper" && i.round === "sf");
  const lbQf = items.filter((i) => i.bracketSide === "lower" && i.round === "qf");
  const lbSf = items.find((i) => i.bracketSide === "lower" && i.round === "sf");
  const grandFinal = items.find((i) => i.round === "final");
  const legend = useMemo(() => legendEntries(items), [items]);

  if (items.length === 0) {
    return (
      <p className="text-sm text-muted">
        No knockout bracket for this event.
      </p>
    );
  }

  const ubTop = ubQf[0];
  const ubBottom = ubQf[1];
  const lbLead = lbQf[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.22em] text-brand">
          Bracket
        </p>
        <div className="flex items-center gap-2.5 text-xs uppercase tracking-[0.16em] text-muted">
          <span>Show days</span>
          <button
            type="button"
            role="switch"
            aria-checked={showDays}
            aria-label="Show match days"
            onClick={() => setShowDays((v) => !v)}
            className={cn(
              "relative h-6 w-11 rounded-full transition",
              showDays ? "bg-brand" : "bg-white/15",
            )}
          >
            <span
              className={cn(
                "absolute top-0.5 left-0.5 size-5 rounded-full bg-foreground transition",
                showDays && "translate-x-5",
              )}
            />
          </button>
          <span className="text-foreground">{showDays ? "On" : "Off"}</span>
        </div>
      </div>

      <div className="-mx-1 overflow-x-auto pb-2">
        {/*
          Column layout keeps every connector flush to its cards:
          labels | R1 matches | R1→R2 lines | R2 matches | R2→GF fork | GF
        */}
        <div className="flex min-h-[480px] min-w-[900px] items-stretch md:min-w-0">
          {/* Side labels */}
          <div className="mr-3 hidden w-12 shrink-0 flex-col self-stretch md:flex">
            <Centered>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Upper
              </span>
            </Centered>
            <Centered>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                Lower
              </span>
            </Centered>
          </div>

          {/* Round 1 — opening matches */}
          <Lane>
            <Half>
              <Centered>
                {ubTop ? (
                  <BracketMatchCard item={ubTop} showDays={showDays} />
                ) : null}
              </Centered>
              <Centered>
                {ubBottom ? (
                  <BracketMatchCard item={ubBottom} showDays={showDays} />
                ) : null}
              </Centered>
            </Half>
            <Half>
              <Centered>
                {lbLead ? (
                  <BracketMatchCard item={lbLead} showDays={showDays} />
                ) : null}
              </Centered>
            </Half>
          </Lane>

          {/* R1 → R2 connectors */}
          <Lane>
            <ConnectorHalf>
              {ubTop && ubBottom ? <ForkConnector /> : <StraightConnector />}
            </ConnectorHalf>
            <ConnectorHalf>
              <StraightConnector />
            </ConnectorHalf>
          </Lane>

          {/* Round 2 — UB semi + LB final */}
          <Lane>
            <Half>
              <Centered>
                {ubSf ? (
                  <BracketMatchCard item={ubSf} showDays={showDays} />
                ) : null}
              </Centered>
            </Half>
            <Half>
              <Centered>
                {lbSf ? (
                  <BracketMatchCard item={lbSf} showDays={showDays} />
                ) : null}
              </Centered>
            </Half>
          </Lane>

          {/* R2 → Grand Final */}
          <ForkConnector />

          {/* Grand Final */}
          <div className="flex shrink-0 items-center self-stretch">
            {grandFinal ? (
              <BracketMatchCard item={grandFinal} showDays={showDays} />
            ) : null}
          </div>
        </div>
      </div>

      {showDays && legend.length > 0 ? (
        <ul className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
          {legend.map(([date, color]) => {
            const label = new Date(`${date}T12:00:00Z`).toLocaleDateString(
              "en-US",
              { month: "long", day: "2-digit", timeZone: "UTC" },
            );
            return (
              <li
                key={date}
                className="flex items-center gap-2 text-xs text-muted"
              >
                <span
                  className="size-2.5 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                {label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
