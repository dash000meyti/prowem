"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getTeamById } from "@/data";
import type { StandingRow } from "@/types";
import { cn } from "@/lib/utils";
import { Crest } from "@/components/media/Crest";

type Phase = "idle" | "lift" | "swap" | "settle";

const LIFT_MS = 800;
const SWAP_MS = 2300;
const SETTLE_MS = 800;
const TOTAL_MS = LIFT_MS + SWAP_MS + SETTLE_MS;

const easeCinema = [0.22, 1, 0.36, 1] as const;
/** Slow ease-in-out for the glide swap — soft start and soft landing */
const easeSwap = [0.2, 0, 0.2, 1] as const;

function rowsSignature(rows: StandingRow[]) {
  return rows.map((r) => `${r.teamId}:${r.position}:${r.goalsFor}`).join("|");
}

function orderIds(rows: StandingRow[]) {
  return rows.map((r) => r.teamId).join(",");
}

function StatCell({
  label,
  value,
  emphasize,
}: {
  label: string;
  value: number;
  emphasize?: boolean;
}) {
  return (
    <div className="min-w-[2.25rem] text-center sm:min-w-[2.75rem]">
      <p className="text-[8px] uppercase tracking-[0.14em] text-white/45 sm:hidden">
        {label}
      </p>
      <p
        className={cn(
          "text-sm tabular-nums",
          emphasize ? "font-semibold text-brand" : "font-medium text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function LiveStandingsTable({
  rows,
  highlightTeamId = "team-bayern-fc",
  className,
  onAnimatingChange,
}: {
  rows: StandingRow[];
  highlightTeamId?: string;
  className?: string;
  onAnimatingChange?: (animating: boolean) => void;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [displayRows, setDisplayRows] = useState<StandingRow[]>(rows);
  const [climberId, setClimberId] = useState<string | null>(null);
  const [dropperId, setDropperId] = useState<string | null>(null);
  /** Pixel deltas applied during swap while DOM order stays old */
  const [swapDelta, setSwapDelta] = useState({ climb: 0, drop: 0 });

  const listRef = useRef<HTMLDivElement>(null);
  const prevRowsRef = useRef<StandingRow[]>(rows);
  const pendingRowsRef = useRef<StandingRow[]>(rows);
  const timersRef = useRef<number[]>([]);
  const climbRef = useRef<string | null>(null);
  const dropRef = useRef<string | null>(null);

  const clearTimers = () => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  };

  const animating = phase !== "idle";

  useEffect(() => {
    onAnimatingChange?.(animating);
  }, [animating, onAnimatingChange]);

  useEffect(() => {
    const prev = prevRowsRef.current;
    const prevOrder = orderIds(prev);
    const nextOrder = orderIds(rows);

    if (prevOrder === nextOrder) {
      prevRowsRef.current = rows;
      setDisplayRows(rows);
      return;
    }

    const prevPos = Object.fromEntries(prev.map((r) => [r.teamId, r.position]));
    let climb: string | null = null;
    let drop: string | null = null;
    for (const row of rows) {
      const before = prevPos[row.teamId];
      if (before == null || before === row.position) continue;
      if (row.position < before) climb = row.teamId;
      if (row.position > before) drop = row.teamId;
    }

    clearTimers();
    pendingRowsRef.current = rows;
    climbRef.current = climb;
    dropRef.current = drop;
    setClimberId(climb);
    setDropperId(drop);
    setSwapDelta({ climb: 0, drop: 0 });

    // Keep visual order; refresh stats (GF) from new data.
    setDisplayRows(
      prev.map((old) => {
        const newer = rows.find((r) => r.teamId === old.teamId);
        return newer ? { ...newer, position: old.position } : old;
      }),
    );
    setPhase("lift");

    const t1 = window.setTimeout(() => {
      const climb = climbRef.current;
      const drop = dropRef.current;
      const root = listRef.current;
      if (climb && drop && root) {
        const climbEl = root.querySelector<HTMLElement>(
          `[data-team-id="${climb}"]`,
        );
        const dropEl = root.querySelector<HTMLElement>(
          `[data-team-id="${drop}"]`,
        );
        if (climbEl && dropEl) {
          const climbTop = climbEl.offsetTop;
          const dropTop = dropEl.offsetTop;
          setSwapDelta({
            climb: dropTop - climbTop,
            drop: climbTop - dropTop,
          });
        }
      }
      setPhase("swap");
    }, LIFT_MS);

    const t2 = window.setTimeout(() => {
      // Commit real order with transforms already at destination → no jump.
      setDisplayRows(pendingRowsRef.current);
      setSwapDelta({ climb: 0, drop: 0 });
      setPhase("settle");
    }, LIFT_MS + SWAP_MS);

    const t3 = window.setTimeout(() => {
      setPhase("idle");
      setClimberId(null);
      setDropperId(null);
      climbRef.current = null;
      dropRef.current = null;
      prevRowsRef.current = pendingRowsRef.current;
    }, TOTAL_MS);

    timersRef.current = [t1, t2, t3];
    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsSignature(rows)]);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-2 hidden grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 px-3 text-[10px] uppercase tracking-[0.16em] text-muted sm:grid">
        <span>#</span>
        <span>Team</span>
        <div className="flex items-center gap-1 pr-1 sm:gap-3">
          <span className="min-w-[2.75rem] text-center">P</span>
          <span className="min-w-[2.75rem] text-center">GF</span>
          <span className="min-w-[2.75rem] text-center">GA</span>
          <span className="min-w-[2.75rem] text-center">Pts</span>
        </div>
      </div>

      <div ref={listRef} className="relative flex flex-col gap-2">
        {displayRows.map((row) => {
          const team = getTeamById(row.teamId);
          const highlighted = row.teamId === highlightTeamId;
          const isClimber = row.teamId === climberId;
          const isDropper = row.teamId === dropperId;
          const lifting = phase === "lift" && isClimber;
          const swapping = phase === "swap";
          const settling = phase === "settle";
          const elevated =
            (phase === "lift" || phase === "swap") && isClimber;

          let y = 0;
          if (lifting) y = -14;
          else if (swapping && isClimber) y = swapDelta.climb;
          else if (swapping && isDropper) y = swapDelta.drop;
          else y = 0;

          const scale =
            lifting || (swapping && isClimber)
              ? 1.08
              : settling && isClimber
                ? 1
                : 1;

          return (
            <motion.div
              key={row.teamId}
              data-team-id={row.teamId}
              initial={false}
              animate={{
                y,
                scale,
                opacity: swapping && isDropper ? 0.88 : 1,
                zIndex: elevated
                  ? 40
                  : swapping && isDropper
                    ? 6
                    : highlighted
                      ? 8
                      : 1,
              }}
              transition={{
                y: {
                  duration: lifting
                    ? LIFT_MS / 1000
                    : swapping
                      ? SWAP_MS / 1000
                      : settling
                        ? 0
                        : 0.3,
                  ease: swapping ? easeSwap : easeCinema,
                },
                scale: {
                  duration: lifting
                    ? LIFT_MS / 1000
                    : settling
                      ? SETTLE_MS / 1000
                      : swapping
                        ? 0.6
                        : 0.35,
                  ease: swapping ? easeSwap : easeCinema,
                },
                opacity: {
                  duration: swapping ? SWAP_MS / 1000 : 0.35,
                  ease: easeSwap,
                },
                zIndex: { duration: 0 },
              }}
              className={cn(
                "relative grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-3 py-2.5 backdrop-blur-md will-change-transform",
                highlighted
                  ? "border-brand/35 bg-[color-mix(in_srgb,var(--brand-primary)_16%,rgba(0,0,0,0.45))]"
                  : "border-white/10 bg-black/35",
                elevated && "standings-row-lift",
              )}
              style={{
                boxShadow: elevated
                  ? "0 22px 48px rgba(0,0,0,0.5), 0 0 36px color-mix(in srgb, var(--brand-primary) 40%, transparent)"
                  : highlighted
                    ? "0 8px 24px rgba(0,0,0,0.28)"
                    : "0 4px 14px rgba(0,0,0,0.18)",
              }}
            >
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold tabular-nums",
                  highlighted
                    ? "bg-brand text-bg-0 shadow-[0_0_18px_color-mix(in_srgb,var(--brand-primary)_45%,transparent)]"
                    : "bg-white/8 text-muted",
                )}
              >
                {/* Show destination rank once swap starts */}
                {swapping || settling || phase === "idle"
                  ? (pendingRowsRef.current.find((r) => r.teamId === row.teamId)
                      ?.position ?? row.position)
                  : row.position}
              </span>

              <div className="flex min-w-0 items-center gap-2.5">
                {team ? (
                  <Crest slug={team.slug} name={team.name} size={28} />
                ) : null}
                <div className="min-w-0">
                  <p
                    className={cn(
                      "truncate text-sm font-semibold tracking-wide",
                      highlighted && "text-foreground",
                    )}
                  >
                    {team?.shortName ?? team?.name ?? row.teamId}
                  </p>
                  <p className="truncate text-[10px] text-white/45">
                    {team?.name ?? row.teamId}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-3">
                <StatCell label="P" value={row.played} />
                <StatCell
                  label="GF"
                  value={row.goalsFor}
                  emphasize={highlighted}
                />
                <StatCell label="GA" value={row.goalsAgainst} />
                <StatCell label="Pts" value={row.points} emphasize />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
