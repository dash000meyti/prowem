import { RewardCard } from "@/components/fan/RewardCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { rewards } from "@/data";

export default function FanRewardsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <SectionHeader
        eyebrow="Redeem"
        title="Rewards"
        description="Spend XP on digital badges, merch credit and matchday experiences."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
}
