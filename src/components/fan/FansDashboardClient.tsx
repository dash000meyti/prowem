"use client";

import { MissionCard } from "@/components/fan/MissionCard";
import { XPProgress } from "@/components/fan/XPProgress";
import { FollowingRail } from "@/components/fan/FollowingRail";
import { MatchCard } from "@/components/match/MatchCard";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassPanel } from "@/components/media/GlassPanel";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import { MediaImage } from "@/components/media/MediaImage";
import {
  getClubById,
  getFeaturedMatch,
  getProductsForFan,
  getTeamById,
  heroMedia,
  resolveMedia,
} from "@/data";
import { useDemo } from "@/context/DemoProvider";
import Link from "next/link";
import { ProductTile } from "@/components/club/ProductTile";

const sectionLinks = [
  { href: "/fans/profile", label: "Profile", media: "athletePortrait" as const },
  { href: "/fans/missions", label: "Missions", media: "nightMatch" as const },
  { href: "/fans/rewards", label: "Rewards", media: "trophyCup" as const },
  { href: "/fans/passport", label: "Passport", media: "crowdOrange" as const },
  { href: "/fans/shop", label: "Shop", media: "shopJerseyRed" as const },
];

function productHref(clubId?: string) {
  if (!clubId) return "/fans/shop";
  const club = getClubById(clubId);
  return club ? `/clubs/${club.slug}/shop` : "/fans/shop";
}

export function FansDashboardClient() {
  const {
    fanName,
    fanLevel,
    fanStatus,
    fanCity,
    fanXp,
    missionsForYou,
    follows,
    notifications,
  } = useDemo();

  const featured = getFeaturedMatch();
  const home = getTeamById(featured.homeTeamId)!;
  const away = getTeamById(featured.awayTeamId)!;
  const previewMissions = missionsForYou
    .filter((m) => !m.completed)
    .slice(0, 3);
  const shopPreview = getProductsForFan(follows).forYou.slice(0, 4);
  const latest = notifications[0];

  return (
    <div>
      <PhotoBackground
        src={resolveMedia("fansCommunity", "crowdOrange") || heroMedia.fan}
        alt="Fan community"
        priority
        scrim="heavy"
        className="min-h-[42vh] border-b border-border"
      >
        <div className="mx-auto flex min-h-[42vh] max-w-7xl flex-col justify-end gap-8 px-4 pb-10 pt-16 md:flex-row md:items-end md:justify-between md:gap-12 md:px-6 md:pb-12 md:pt-20">
          <div className="min-w-0 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
              Fan dashboard
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">
              {fanName}
            </h1>
            <p className="mt-4 max-w-xl text-base text-foreground/85 md:text-lg">
              {fanStatus} · {fanCity} · Level {fanLevel} ·{" "}
              {fanXp.toLocaleString()} XP
            </p>
            {latest ? (
              <GlassPanel variant="subtle" className="mt-8 max-w-lg p-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-brand">
                  Latest pulse
                </p>
                <p className="mt-2 text-sm text-foreground">{latest.title}</p>
                <p className="mt-1 text-sm text-muted">{latest.body}</p>
              </GlassPanel>
            ) : null}
          </div>
          <div className="w-full shrink-0 md:max-w-md lg:max-w-lg">
            <XPProgress />
          </div>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="tint"
        innerClassName="mx-auto max-w-7xl space-y-16 px-4 py-14 md:px-6"
      >
        <section>
          <SectionHeader
            eyebrow="Following"
            title="Entities you track"
            description="Teams, events and players — powering For you rails."
            action={
              <Button href="/fans/profile" variant="ghost" size="sm">
                Manage
              </Button>
            }
          />
          <FollowingRail />
        </section>

        <section>
          <SectionHeader
            eyebrow="For you"
            title="Missions"
            description="Challenges matched to what you follow."
            action={
              <Button href="/fans/missions" variant="outline" size="sm">
                All missions
              </Button>
            }
          />
          <div className="grid gap-4 md:grid-cols-3">
            {previewMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </section>

        <section>
          <SectionHeader
            eyebrow="Matchday"
            title="Upcoming for you"
            description="Live Klassiker spotlight tied to your Bayern and Dortmund follows."
            action={
              <Button href="/matches/live" variant="outline" size="sm">
                Matchday
              </Button>
            }
          />
          <MatchCard
            match={featured}
            home={home}
            away={away}
            href="/matches/bundesliga/bayern-vs-dortmund"
          />
        </section>

        {shopPreview.length > 0 ? (
          <section>
            <SectionHeader
              eyebrow="For you"
              title="Shop picks"
              description="Merch from clubs and events in your follow graph."
              action={
                <Button href="/fans/shop" variant="outline" size="sm">
                  Fan shop
                </Button>
              }
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {shopPreview.map((product) => (
                <ProductTile
                  key={product.id}
                  product={product}
                  href={productHref(product.clubId)}
                />
              ))}
            </div>
          </section>
        ) : null}

        <div>
          <SectionHeader
            eyebrow="Navigate"
            title="Your fan world"
            description="Jump into profile, missions, rewards, passport and shop."
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {sectionLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative min-h-[140px] overflow-hidden border border-border"
              >
                <MediaImage
                  src={resolveMedia(link.media)}
                  alt=""
                  sizes="240px"
                  className="transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/40 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
                  {link.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </SectionShell>
    </div>
  );
}
