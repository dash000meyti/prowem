import Image from "next/image";
import type { Player } from "@/types";
import {
  playerPortraitFallback,
  playerPortraitPath,
} from "@/data/media";
import { cn } from "@/lib/utils";

export function LineupPlayerNode({
  player,
  label,
  compact = false,
}: {
  player: Player;
  label?: string;
  compact?: boolean;
}) {
  const src =
    player.sport === "football"
      ? playerPortraitPath(player.slug)
      : playerPortraitFallback(player.sport);

  const meta =
    label ??
    (player.number != null
      ? String(player.number)
      : player.role.slice(0, 3).toUpperCase());

  return (
    <div className="flex w-[76px] flex-col items-center text-center md:w-[88px]">
      <div
        className={cn(
          "relative overflow-hidden rounded-full border-2 border-white/80 bg-bg-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)]",
          compact ? "size-12" : "size-14 md:size-16",
        )}
      >
        <Image
          src={src}
          alt={player.name}
          fill
          className="object-cover object-top"
          sizes="64px"
        />
      </div>
      <p className="mt-1.5 max-w-full truncate text-[11px] font-semibold leading-tight text-white drop-shadow md:text-xs">
        {player.shortName}
      </p>
      <p className="text-[10px] uppercase tracking-wide text-white/70">
        {player.role === "GK" || label?.startsWith("GK")
          ? `GK · ${player.number ?? meta}`
          : meta}
      </p>
    </div>
  );
}
