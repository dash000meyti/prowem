"use client";

import { RewardCard } from "@/components/fan/RewardCard";
import { XPProgress } from "@/components/fan/XPProgress";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PhotoBackground } from "@/components/media/PhotoBackground";
import { SectionShell } from "@/components/layout/SectionShell";
import { rewards, resolveMedia } from "@/data";
import { useDemo } from "@/context/DemoProvider";

export function FanRewardsClient() {
  const { fanXp } = useDemo();

  return (
    <div>
      <PhotoBackground
        src={resolveMedia("trophyCup", "celebration")}
        alt="Rewards"
        scrim="heavy"
        className="min-h-[42vh] border-b border-border"
      >
        <div className="mx-auto flex min-h-[42vh] max-w-7xl flex-col justify-end px-4 pb-12 pt-20 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand">
            Redeem
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
            Rewards
          </h1>
          <p className="mt-4 max-w-xl text-base text-foreground/85">
            Spend XP on digital badges, merch credit and matchday experiences. You
            have {fanXp.toLocaleString()} XP available.
          </p>
        </div>
      </PhotoBackground>

      <SectionShell
        atmosphere="contrast"
        innerClassName="mx-auto max-w-7xl space-y-10 px-4 py-14 md:px-6"
      >
        <XPProgress />
        <SectionHeader
          eyebrow="Catalog"
          title="Spend your XP"
          description="Simulated redeem — no payment, instant demo feedback."
        />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </SectionShell>
    </div>
  );
}
