import type { LucideIcon } from "lucide-react";
import {
  Anchor,
  CheckCircle2,
  Crown,
  Fish,
  Layers,
  Leaf,
  Megaphone,
  Radio,
  Shirt,
  Sparkles,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  "check-in": CheckCircle2,
  derby: Swords,
  layers: Layers,
  streak: Zap,
  trophy: Trophy,
  wall: Megaphone,
  leaf: Leaf,
  anchor: Anchor,
  fish: Fish,
  live: Radio,
  partner: Sparkles,
  shirt: Shirt,
  crown: Crown,
};

export function AchievementIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ACHIEVEMENT_ICONS[name] ?? Sparkles;
  return <Icon className={className} aria-hidden />;
}
