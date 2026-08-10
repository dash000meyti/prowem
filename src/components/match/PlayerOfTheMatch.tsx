"use client";

import { GlassPanel } from "@/components/media/GlassPanel";
import { MediaImage } from "@/components/media/MediaImage";
import { Crest } from "@/components/media/Crest";
import { useDemo } from "@/context/DemoProvider";
import {
  getPlayerById,
  getTeamById,
  playerPortraitFallback,
  playerPortraitPath,
} from "@/data";
import { cn } from "@/lib/utils";

function RatingRing({
  rating,
  max = 10,
  size = 132,
}: {
  rating: number;
  max?: number;
  size?: number;
}) {
  const stroke = size > 100 ? 6 : 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0, rating / max));
  const offset = circumference * (1 - progress);

  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="absolute inset-0 -rotate-90"
        aria-hidden
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(245,245,242,0.12)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--brand-primary)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="relative text-center">
        <p
          className={cn(
            "font-semibold tabular-nums leading-none",
            size > 100 ? "text-4xl" : "text-3xl",
          )}
        >
          {rating.toFixed(1)}
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-brand">
          Rating
        </p>
      </div>
    </div>
  );
}

type MotmStatKey =
  | "minutes"
  | "goals"
  | "keyPasses"
  | "tackles"
  | "duelsWon"
  | "passAccuracy";

const STAT_ROWS: Array<{
  key: MotmStatKey;
  label: string;
  format?: (v: number) => string;
}> = [
  { key: "minutes", label: "Minutes played", format: (v) => `${v}'` },
  { key: "goals", label: "Goals" },
  { key: "keyPasses", label: "Key passes" },
  { key: "tackles", label: "Tackles" },
  { key: "duelsWon", label: "Duels won" },
  {
    key: "passAccuracy",
    label: "Pass accuracy",
    format: (v) => `${v}%`,
  },
];

export function PlayerOfTheMatch() {
  const { playerOfTheMatch, goalTriggered } = useDemo();
  const player = getPlayerById(playerOfTheMatch.playerId);
  const team = player ? getTeamById(player.teamId) : undefined;

  if (!player) return null;

  const portrait =
    player.sport === "football"
      ? playerPortraitPath(player.slug)
      : playerPortraitFallback(player.sport);

  const stats = (
    <ul className="divide-y divide-white/10">
      {STAT_ROWS.map(({ key, label, format }) => (
        <li
          key={key}
          className="grid grid-cols-[minmax(3.5rem,auto)_1fr] items-baseline gap-4 py-2.5 first:pt-0 last:pb-0"
        >
          <span
            className={cn(
              "text-right text-base font-semibold tabular-nums",
              goalTriggered && key === "goals" && "score-flash rounded px-1",
            )}
          >
            {format
              ? format(playerOfTheMatch[key])
              : playerOfTheMatch[key]}
          </span>
          <span className="text-sm text-muted">{label}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <GlassPanel className="overflow-hidden p-0">
      <div className="border-b border-white/10 px-5 py-4 md:px-6">
        <p className="text-[10px] uppercase tracking-[0.22em] text-brand">
          Player of the match
        </p>
        <h3 className="mt-1 text-xl font-semibold uppercase tracking-wide md:text-2xl">
          {player.name}
        </h3>
      </div>

      <div className="hidden md:grid md:grid-cols-[minmax(200px,0.9fr)_auto_1.1fr] md:items-stretch">
        <div className="relative min-h-[280px] overflow-hidden">
          <MediaImage
            src={portrait}
            alt={player.name}
            sizes="360px"
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--glass-bg)] via-transparent to-transparent" />
        </div>
        <div className="flex items-center justify-center px-6 py-8">
          <RatingRing rating={playerOfTheMatch.rating} />
        </div>
        <div className="flex flex-col justify-center p-6 pr-8">{stats}</div>
      </div>

      <div className="md:hidden">
        <div className="relative aspect-[4/3] overflow-hidden">
          <MediaImage
            src={portrait}
            alt={player.name}
            sizes="100vw"
            className="object-cover object-top"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 right-4">
            <RatingRing rating={playerOfTheMatch.rating} size={108} />
          </div>
        </div>
        <div className="border-t border-white/10 bg-black/35 p-5 backdrop-blur-md">
          {stats}
        </div>
        {team ? (
          <div className="flex justify-center border-t border-white/10 py-4">
            <Crest slug={team.slug} name={team.name} size={36} />
          </div>
        ) : null}
      </div>
    </GlassPanel>
  );
}
