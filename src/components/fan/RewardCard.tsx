"use client";

import type { Reward } from "@/types";
import { Button } from "@/components/ui/Button";
import { useDemo } from "@/context/DemoProvider";
import { cn } from "@/lib/utils";

export function RewardCard({ reward }: { reward: Reward }) {
  const { fanXp, redeemReward, redeemedRewardIds } = useDemo();
  const redeemed = redeemedRewardIds.includes(reward.id);
  const canAfford = fanXp >= reward.xpCost;

  return (
    <article
      className={cn(
        "flex flex-col border border-border bg-bg-1 p-5",
        redeemed && "border-brand/40 bg-brand-tint/30",
      )}
    >
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
        {reward.category}
      </p>
      <h3 className="mt-2 text-lg font-semibold">{reward.title}</h3>
      <p className="mt-2 flex-1 text-sm text-muted">{reward.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-brand">
          {reward.xpCost.toLocaleString()} XP
        </span>
        <span className="text-xs text-muted">{reward.stock} left</span>
      </div>
      <div className="mt-4">
        <Button
          size="sm"
          variant={redeemed ? "secondary" : canAfford ? "brand" : "outline"}
          disabled={redeemed || !canAfford}
          onClick={() => redeemReward(reward.id)}
        >
          {redeemed ? "Redeemed" : canAfford ? "Redeem" : "Need more XP"}
        </Button>
      </div>
    </article>
  );
}
