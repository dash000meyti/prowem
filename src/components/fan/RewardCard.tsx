import type { Reward } from "@/types";

export function RewardCard({ reward }: { reward: Reward }) {
  return (
    <article className="border border-border bg-bg-1 p-5">
      <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
        {reward.category}
      </p>
      <h3 className="mt-2 text-lg font-semibold">{reward.title}</h3>
      <p className="mt-2 text-sm text-muted">{reward.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-semibold text-orange">
          {reward.xpCost.toLocaleString()} XP
        </span>
        <span className="text-xs text-muted">{reward.stock} left</span>
      </div>
    </article>
  );
}
