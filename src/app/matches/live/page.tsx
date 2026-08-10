import { LiveMatchCard } from "@/components/match/LiveMatchCard";
import { MatchCard } from "@/components/match/MatchCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import {
  getEventById,
  getLiveMatchesList,
  getTeamById,
  matchThumbForSport,
} from "@/data";
import { matchHref, sportLabel } from "@/lib/utils";
import type { Match, Sport } from "@/types";

const SPORT_ORDER: Sport[] = ["football", "socca", "dota2"];

function groupBySport(matches: Match[]) {
  const groups: { sport: Sport; matches: Match[] }[] = [];
  for (const sport of SPORT_ORDER) {
    const list = matches.filter((m) => m.sport === sport);
    if (list.length) groups.push({ sport, matches: list });
  }
  const other = matches.filter((m) => !SPORT_ORDER.includes(m.sport as Sport));
  if (other.length) {
    groups.push({ sport: other[0].sport, matches: other });
  }
  return groups;
}

export default function MatchdayPage() {
  const live = getLiveMatchesList();
  const groups = groupBySport(live);
  const heroSport = live[0]?.sport ?? "football";
  const featured =
    live.find((m) => m.id === "match-bayern-dortmund") ?? live[0];

  return (
    <div>
      <PhotoBackground
        src={matchThumbForSport(heroSport, "live-hero")}
        alt="Live matches across sports"
        priority
        scrim="heavy"
        className="border-b border-border"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <GlassPanel variant="subtle" className="max-w-2xl p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-orange">
              Live now
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
              LIVE ACROSS SPORTS
            </h1>
            <p className="mt-4 max-w-xl text-sm text-muted md:text-base">
              Football, socca and Dota 2 fixtures from one match data layer —
              open a stage to see sport-specific lineups and boards.
            </p>
          </GlassPanel>
        </div>
      </PhotoBackground>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-14 md:px-6">
        {featured ? (
          <section>
            <SectionHeader
              eyebrow={sportLabel(featured.sport)}
              title="Featured live"
              description={`${getTeamById(featured.homeTeamId)?.name ?? "Home"} vs ${getTeamById(featured.awayTeamId)?.name ?? "Away"} — open Match Center.`}
            />
            <LiveMatchCard
              match={featured}
              home={getTeamById(featured.homeTeamId)!}
              away={getTeamById(featured.awayTeamId)!}
              href={matchHref(
                featured,
                getEventById(featured.eventId)?.slug,
              )}
            />
          </section>
        ) : null}

        {groups.map(({ sport, matches }) => {
          const list = matches.filter((m) => m.id !== featured?.id);
          if (!list.length) return null;

          return (
            <section key={sport}>
              <SectionHeader
                eyebrow="Also live"
                title={sportLabel(sport)}
                description={
                  sport === "dota2"
                    ? "Stage boards with Pos 1–5 drafts."
                    : sport === "socca"
                      ? "Cage lineups on the Vienna arena floor."
                      : "Pitch lineups and Match Center automation."
                }
              />
              <div className="grid gap-4 lg:grid-cols-2">
                {list.map((match) => {
                  const home = getTeamById(match.homeTeamId);
                  const away = getTeamById(match.awayTeamId);
                  if (!home || !away) return null;
                  const event = getEventById(match.eventId);
                  return (
                    <MatchCard
                      key={match.id}
                      match={match}
                      home={home}
                      away={away}
                      href={matchHref(match, event?.slug)}
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
