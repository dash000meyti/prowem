import type { MatchEventItem } from "@/types";
import { cn } from "@/lib/utils";

function EventIcon({ type }: { type: string }) {
  if (type === "goal") {
    return (
      <span
        className="grid h-7 w-7 place-items-center rounded-full border border-white/15 bg-white/5 text-sm"
        aria-hidden
      >
        ⚽
      </span>
    );
  }
  if (type === "yellow") {
    return (
      <span
        className="h-5 w-3.5 rounded-[2px] bg-[#F5C518] shadow-[0_0_12px_rgba(245,197,24,0.35)]"
        aria-hidden
      />
    );
  }
  if (type === "red") {
    return (
      <span className="h-5 w-3.5 rounded-[2px] bg-[#E11D48]" aria-hidden />
    );
  }
  if (type === "ht" || type === "ft") {
    return (
      <span
        className="grid h-7 w-7 place-items-center overflow-hidden rounded-full border border-white/20"
        aria-hidden
      >
        <span className="flex h-full w-full">
          <span className="w-1/2 bg-white/80" />
          <span className="w-1/2 bg-black/80" />
        </span>
      </span>
    );
  }
  return (
    <span
      className="h-2.5 w-2.5 rounded-full bg-muted"
      aria-hidden
    />
  );
}

function eventLabel(type: string) {
  if (type === "goal") return "Goal";
  if (type === "yellow") return "Yellow card";
  if (type === "red") return "Red card";
  if (type === "ht") return "HT";
  if (type === "ft") return "FT";
  if (type === "sub") return "Substitution";
  return type;
}

function eventAccent(type: string) {
  if (type === "goal") return "text-brand";
  if (type === "yellow") return "text-[#F5C518]";
  if (type === "red") return "text-[#E11D48]";
  return "text-muted";
}

export function Timeline({ events }: { events: MatchEventItem[] }) {
  return (
    <ol className="relative space-y-0 pl-1">
      <span
        className="absolute bottom-3 left-[18px] top-3 w-px bg-white/15"
        aria-hidden
      />
      {events.map((event, index) => {
        const isLatest =
          index === events.length - 1 && event.type === "goal";
        return (
          <li
            key={event.id}
            className={cn(
              "relative grid grid-cols-[3rem_2rem_1fr] items-start gap-3 py-3",
              isLatest && "rounded-lg bg-white/4 px-2 -mx-2",
            )}
          >
            <span className="pt-1 text-sm font-semibold tabular-nums text-foreground">
              {event.minute}&apos;
            </span>
            <span className="relative z-10 flex justify-center pt-0.5">
              <EventIcon type={event.type} />
            </span>
            <div>
              <p
                className={cn(
                  "text-xs font-semibold uppercase tracking-[0.14em]",
                  eventAccent(event.type),
                )}
              >
                {eventLabel(event.type)}
              </p>
              <p className="mt-1 text-sm font-medium">
                {event.playerName ?? event.detail ?? event.type}
              </p>
              {event.detail && event.playerName ? (
                <p className="mt-0.5 text-xs text-muted">{event.detail}</p>
              ) : null}
              {isLatest ? (
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-brand">
                  Latest event
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
