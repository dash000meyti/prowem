"use client";

import type { ReactNode } from "react";
import type { Team } from "@/types";
import { Crest } from "@/components/media/Crest";
import { cn } from "@/lib/utils";
import {
  DotaMapSvg,
  FootballPitchSvg,
  SoccaCageSvg,
} from "./FieldVectors";

export function LineupBoardShell({
  title,
  home,
  away,
  homeLabel,
  awayLabel,
  active,
  onChange,
  sport,
  fieldClassName,
  aside,
  children,
}: {
  title: string;
  home: Team;
  away: Team;
  homeLabel: string;
  awayLabel: string;
  active: "home" | "away";
  onChange: (side: "home" | "away") => void;
  sport: string;
  fieldClassName?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  const Field =
    sport === "dota2"
      ? DotaMapSvg
      : sport === "socca"
        ? SoccaCageSvg
        : FootballPitchSvg;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold md:text-lg">{title}</h3>
      </div>

      <div className="mt-4 flex w-full gap-2 border-b border-border pb-3">
        <button
          type="button"
          onClick={() => onChange("home")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition md:text-sm",
            active === "home"
              ? "border-b-2 border-brand text-foreground"
              : "border-b-2 border-transparent text-muted hover:text-foreground",
          )}
        >
          <Crest slug={home.slug} name={home.name} size={18} />
          <span className="truncate">{home.shortName}</span>
          <span className="tabular-nums text-muted">{homeLabel}</span>
        </button>
        <button
          type="button"
          onClick={() => onChange("away")}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition md:text-sm",
            active === "away"
              ? "border-b-2 border-brand text-foreground"
              : "border-b-2 border-transparent text-muted hover:text-foreground",
          )}
        >
          <Crest slug={away.slug} name={away.name} size={18} />
          <span className="truncate">{away.shortName}</span>
          <span className="tabular-nums text-muted">{awayLabel}</span>
        </button>
      </div>

      <div
        className={cn(
          "mt-5 flex flex-col gap-6",
          aside ? "lg:flex-row lg:items-start lg:gap-8" : undefined,
        )}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            fieldClassName ?? "aspect-[500/709.2] w-full max-w-3xl",
            aside ? "lg:mx-0 lg:max-w-2xl lg:flex-none" : undefined,
          )}
        >
          <Field className="pointer-events-none absolute inset-0 h-full w-full text-white/35" />
          {children}
        </div>
        {aside ? (
          <div className="w-full min-w-0 flex-1 lg:sticky lg:top-24">
            {aside}
          </div>
        ) : null}
      </div>
    </div>
  );
}
