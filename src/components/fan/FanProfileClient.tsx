"use client";

import Link from "next/link";
import { PlayerCard } from "@/components/club/PlayerCard";
import { AchievementBadge } from "@/components/fan/AchievementBadge";
import { FollowingRail } from "@/components/fan/FollowingRail";
import { XPProgress } from "@/components/fan/XPProgress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import {
  getAchievementById,
  getClubById,
  getPlayerById,
  getPrimaryFan,
  getTeamById,
  heroMedia,
  isFeaturedClub,
} from "@/data";
import { useDemo } from "@/context/DemoProvider";

export function FanProfileClient() {
  const {
    fanName,
    fanStatus,
    fanCity,
    fanLevel,
    favoritePlayerIds,
  } = useDemo();
  const fan = getPrimaryFan();

  const favorites = favoritePlayerIds
    .map((id) => getPlayerById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const achievements = fan.achievementIds
    .map((id) => getAchievementById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div>
      <PhotoBackground
        src={heroMedia.fan}
        alt="Fan profile"
        scrim="heavy"
        className="min-h-[48vh] border-b border-border"
      >
        <div className="mx-auto flex min-h-[48vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-20 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Fan profile
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            {fanName}
          </h1>
          <p className="mt-4 text-base text-foreground/85">
            {fanStatus} · Based in {fanCity} · Level {fanLevel}
          </p>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6"
      >
        <XPProgress />

        <section className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Matches watched", value: fan.matchesWatched },
            { label: "Correct predictions", value: fan.predictionsCorrect },
            { label: "Events attended", value: fan.attendedEventIds.length },
          ].map((stat) => (
            <GlassPanel key={stat.label} className="p-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-semibold tabular-nums text-brand">
                {stat.value}
              </p>
            </GlassPanel>
          ))}
        </section>

        <section>
          <SectionHeader
            eyebrow="Graph"
            title="Following"
            description="Live follows from the demo session — toggle on club, team, event and player pages."
          />
          <FollowingRail />
        </section>

        <section>
          <SectionHeader eyebrow="Favourites" title="Players" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {favorites.map((player) => {
              const team = getTeamById(player.teamId);
              const club = team ? getClubById(team.clubId) : undefined;
              const href =
                club && isFeaturedClub(club.slug)
                  ? `/clubs/${club.slug}/players/${player.slug}`
                  : undefined;
              return (
                <PlayerCard key={player.id} player={player} href={href} />
              );
            })}
          </div>
        </section>

        <section>
          <SectionHeader eyebrow="Unlocked" title="Achievements" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((ach) => (
              <AchievementBadge key={ach.id} achievement={ach} />
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Need more XP?{" "}
            <Link href="/fans/missions" className="text-brand hover:underline">
              Clear open missions
            </Link>
            .
          </p>
        </section>
      </SectionShell>
    </div>
  );
}
