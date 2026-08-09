import type { MatchEventItem } from "@/types";
import { cn } from "@/lib/utils";

export function Timeline({ events }: { events: MatchEventItem[] }) {
  return (
    <ol className="space-y-0 border-l border-border pl-6">
      {events.map((event, index) => (
        <li key={event.id} className="relative pb-6 last:pb-0">
          <span
            className={cn(
              "absolute -left-[29px] top-1 h-3 w-3 rounded-full border-2 border-bg-0",
              event.type === "goal" ? "bg-orange" : "bg-muted",
            )}
          />
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-sm font-semibold tabular-nums text-orange">
              {event.minute}&apos;
            </span>
            <span className="text-xs uppercase tracking-[0.14em] text-muted">
              {event.type}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium">
            {event.playerName ?? event.detail ?? event.type}
          </p>
          {event.detail && event.playerName ? (
            <p className="mt-1 text-xs text-muted">{event.detail}</p>
          ) : null}
          {index === events.length - 1 && event.type === "goal" ? (
            <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-orange">
              Latest event
            </p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
