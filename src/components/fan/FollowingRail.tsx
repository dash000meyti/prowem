"use client";

import Link from "next/link";
import { Crest } from "@/components/media/Crest";
import { MediaImage } from "@/components/media/MediaImage";
import {
  getClubById,
  getEventById,
  getPlayerById,
  getTeamById,
  isFeaturedClub,
  matchThumbForSport,
  playerPortraitFallback,
  playerPortraitPath,
  resolveMedia,
} from "@/data";
import { useDemo } from "@/context/DemoProvider";
import { sportLabel, cn } from "@/lib/utils";

export function FollowingRail() {
  const { followedTeamIds, followedEventIds, favoritePlayerIds } = useDemo();

  const teams = followedTeamIds
    .map((id) => getTeamById(id))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const events = followedEventIds
    .map((id) => getEventById(id))
    .filter((e): e is NonNullable<typeof e> => Boolean(e));
  const players = favoritePlayerIds
    .map((id) => getPlayerById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="space-y-4">
      {/* Teams mosaic — photo-led, no separate clubs block */}
      {teams.length > 0 ? (
        <div>
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted">
            Teams you follow
          </p>
          <div className="grid auto-rows-[11rem] gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[13rem]">
            {teams.map((team, index) => {
              const club = getClubById(team.clubId);
              const href = club
                ? `/clubs/${club.slug}/teams/${team.sport}`
                : "/clubs";
              const cover =
                resolveMedia(
                  club?.theme.coverImage ?? club?.theme.heroImage,
                  "footballAction",
                ) || matchThumbForSport(team.sport, team.id);
              const featured = index === 0;

              return (
                <Link
                  key={team.id}
                  href={href}
                  className={cn(
                    "group relative overflow-hidden border border-border",
                    featured && "sm:col-span-2 sm:row-span-2",
                  )}
                >
                  <MediaImage
                    src={cover}
                    alt=""
                    sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "25vw"}
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/45 to-bg-0/10"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 opacity-40 mix-blend-multiply"
                    style={{ backgroundColor: team.color }}
                    aria-hidden
                  />
                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5">
                    <div className="flex items-start justify-between gap-2">
                      <Crest slug={team.slug} name={team.name} size={featured ? 52 : 36} />
                      <span className="rounded-sm bg-bg-0/55 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-foreground backdrop-blur-sm">
                        {sportLabel(team.sport)}
                      </span>
                    </div>
                    <div>
                      <p
                        className={cn(
                          "font-semibold tracking-tight text-foreground transition group-hover:text-brand",
                          featured ? "text-2xl md:text-3xl" : "text-base",
                        )}
                      >
                        {team.name}
                      </p>
                      {club ? (
                        <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-muted">
                          {club.shortName} · {club.city}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Events + Favorites side by side on large screens */}
      <div className="grid gap-4 lg:grid-cols-12">
        {events.length > 0 ? (
          <div className="lg:col-span-5">
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted">
              Events
            </p>
            <div className="flex flex-col gap-3">
              {events.map((event) => {
                const hero = resolveMedia(
                  event.theme.heroImage ?? event.theme.coverImage,
                  "stadiumLights",
                );
                return (
                  <Link
                    key={event.id}
                    href={`/events/${event.slug}`}
                    className="group relative min-h-[5.5rem] overflow-hidden border border-border"
                  >
                    <MediaImage
                      src={hero}
                      alt=""
                      sizes="40vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-bg-0 via-bg-0/70 to-bg-0/20"
                      aria-hidden
                    />
                    <div className="absolute inset-0 flex items-center gap-4 px-4">
                      <Crest
                        entity="event"
                        slug={event.slug}
                        name={event.name}
                        size={44}
                      />
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.16em] text-brand">
                          {event.shortName} · {event.city}
                        </p>
                        <p className="truncate text-lg font-semibold group-hover:text-brand">
                          {event.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}

        {players.length > 0 ? (
          <div className={events.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-muted">
              Favorite players
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {players.map((player) => {
                const team = getTeamById(player.teamId);
                const club = team ? getClubById(team.clubId) : undefined;
                const href =
                  club && isFeaturedClub(club.slug)
                    ? `/clubs/${club.slug}/players/${player.slug}`
                    : club
                      ? `/clubs/${club.slug}`
                      : "/fans/profile";
                const portrait =
                  player.sport === "football"
                    ? playerPortraitPath(player.slug)
                    : playerPortraitFallback(player.sport);

                return (
                  <Link
                    key={player.id}
                    href={href}
                    className="group relative aspect-[3/4] overflow-hidden border border-border"
                  >
                    <MediaImage
                      src={portrait}
                      alt={player.name}
                      sizes="200px"
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.05]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/25 to-transparent"
                      aria-hidden
                    />
                    <div className="absolute inset-x-0 bottom-0 p-3">
                      <p className="text-[9px] uppercase tracking-[0.14em] text-brand">
                        {player.role}
                      </p>
                      <p className="mt-0.5 truncate text-sm font-semibold group-hover:text-brand">
                        {player.shortName || player.name}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
