"use client";

import { useMemo, useState } from "react";
import { MatchCard } from "@/components/match/MatchCard";
import { getTeamById } from "@/data";
import type { Match } from "@/types";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All" },
  { id: "live", label: "Live" },
  { id: "scheduled", label: "Upcoming" },
  { id: "finished", label: "Finished" },
] as const;

export function MatchFilterList({ matches }: { matches: Match[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return matches;
    return matches.filter((m) => m.status === filter);
  }, [filter, matches]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] transition",
              filter === item.id
                ? "bg-orange-soft text-orange"
                : "bg-bg-1 text-muted hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((match) => {
          const home = getTeamById(match.homeTeamId);
          const away = getTeamById(match.awayTeamId);
          if (!home || !away) return null;
          return (
            <MatchCard
              key={match.id}
              match={match}
              home={home}
              away={away}
              href={
                match.id === "match-nexus-berlin"
                  ? "/matches/nova-cup/nexus-vs-berlin-united"
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}
