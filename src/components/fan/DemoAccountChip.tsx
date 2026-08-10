"use client";

import Link from "next/link";
import { useDemo } from "@/context/DemoProvider";

/** Compact account chip for club/event/match chrome — jumps into the fan property. */
export function DemoAccountChip({ className }: { className?: string }) {
  const { fanName, fanLevel, fanXp, fanStatus } = useDemo();
  const initials = fanName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link
      href="/fans"
      className={
        className ??
        "inline-flex shrink-0 items-center gap-2 rounded-sm border border-border bg-bg-1/80 px-2 py-1.5 transition hover:border-brand/50 hover:text-brand"
      }
      aria-label={`${fanName} fan account`}
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-tint text-[10px] font-semibold tracking-wide text-brand">
        {initials}
      </span>
      <span className="hidden min-w-0 text-left md:block">
        <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-foreground">
          {fanName.split(" ")[0]}
        </span>
        <span className="block text-[9px] uppercase tracking-[0.14em] text-muted">
          L{fanLevel} · {fanStatus}
        </span>
      </span>
      <span className="text-[10px] tabular-nums text-brand md:hidden">
        {fanXp.toLocaleString()}
      </span>
    </Link>
  );
}
