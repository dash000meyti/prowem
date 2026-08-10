import type { Match } from "@/types";
import { Button } from "@/components/ui/Button";
import { Crest } from "@/components/media/Crest";
import { MediaImage } from "@/components/media/MediaImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTeamById } from "@/data";
import { matchThumbForSport } from "@/data/media";
import { matchHref, sportLabel } from "@/lib/utils";

function ticketFromPrice(sport: Match["sport"]) {
  if (sport === "dota2") return 45;
  if (sport === "socca") return 18;
  return 55;
}

function formatKickoff(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function ClubTicketsSection({
  clubName,
  matches,
}: {
  clubName: string;
  matches: Match[];
}) {
  if (matches.length === 0) return null;

  return (
    <section>
      <SectionHeader
        eyebrow="Tickets"
        title={`Tickets · ${clubName}`}
        description="Secure seats for upcoming fixtures across football, socca and the stage."
      />
      <div className="space-y-3">
        {matches.map((match) => {
          const home = getTeamById(match.homeTeamId);
          const away = getTeamById(match.awayTeamId);
          if (!home || !away) return null;
          const from = ticketFromPrice(match.sport);
          const href = matchHref(match);

          return (
            <article
              key={match.id}
              className="grid overflow-hidden border border-border bg-bg-1 md:grid-cols-[200px_1fr_auto]"
            >
              <div className="relative hidden min-h-[140px] md:block">
                <MediaImage
                  src={matchThumbForSport(match.sport, match.id)}
                  alt=""
                  sizes="200px"
                />
                <div className="absolute inset-0 photo-scrim-light" />
              </div>
              <div className="flex flex-col justify-center gap-3 p-5 md:px-6">
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span className="text-brand">{sportLabel(match.sport)}</span>
                  <span aria-hidden>·</span>
                  <span>{match.round}</span>
                  <span aria-hidden>·</span>
                  <span>{formatKickoff(match.kickoff)}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Crest slug={home.slug} name={home.name} size={36} />
                  <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                    {home.shortName} vs {away.shortName}
                  </h3>
                  <Crest slug={away.slug} name={away.name} size={36} />
                </div>
                <p className="text-sm text-muted">{match.venue}</p>
              </div>
              <div className="flex flex-col items-stretch justify-center gap-3 border-t border-border p-5 md:items-end md:border-l md:border-t-0 md:px-6">
                <p className="text-sm text-muted">
                  From{" "}
                  <span className="text-xl font-semibold tabular-nums text-brand">
                    €{from}
                  </span>
                </p>
                <Button href={href} size="sm">
                  Buy tickets
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
