"use client";

import { useRef, useState, type ReactNode } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/media/GlassPanel";
import { Crest } from "@/components/media/Crest";
import { MediaImage } from "@/components/media/MediaImage";
import { downloadElementPng } from "@/components/match/PanelDownloadButton";
import { useDemo } from "@/context/DemoProvider";
import {
  getEventById,
  getPlayerById,
  getTeamById,
  heroMedia,
  playerCutoutPath,
  playerPortraitFallback,
} from "@/data";
import { cn } from "@/lib/utils";

const GRAPHICS = [
  {
    id: "match-report",
    title: "Match report",
    filename: "bayern-dortmund-match-report",
  },
  {
    id: "table-update",
    title: "Table update",
    filename: "bayern-dortmund-table-update",
  },
  {
    id: "motm",
    title: "Player of the match",
    filename: "bayern-dortmund-motm",
  },
] as const;

type GraphicId = (typeof GRAPHICS)[number]["id"];

function RatingRing({
  rating,
  max = 10,
  size = 118,
}: {
  rating: number;
  max?: number;
  size?: number;
}) {
  const stroke = 5;
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
          fill="rgba(8,9,11,0.55)"
          stroke="rgba(245,245,242,0.14)"
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
        />
      </svg>
      <div className="relative text-center">
        <p className="text-[1.85rem] font-semibold tabular-nums leading-none">
          {rating.toFixed(1)}
        </p>
        <p className="mt-1 text-[8px] uppercase tracking-[0.22em] text-white/85">
          Rating
        </p>
      </div>
    </div>
  );
}

function PhoneMock({
  title,
  filename,
  header,
  children,
}: {
  title: string;
  filename: string;
  header?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const event = getEventById("evt-bundesliga");

  return (
    <div className="mx-auto w-full max-w-[280px] space-y-3 sm:max-w-[300px]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.16em] text-muted">
          {title}
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="gap-1.5"
          disabled={busy}
          onClick={async () => {
            if (!ref.current || busy) return;
            setBusy(true);
            try {
              await downloadElementPng(ref.current, filename);
            } finally {
              setBusy(false);
            }
          }}
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          {busy ? "Saving…" : "PNG"}
        </Button>
      </div>

      <div
        ref={ref}
        className="relative aspect-9/16 overflow-hidden rounded-[22px] glass-surface bg-[#08090B] shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      >
        <MediaImage
          src={heroMedia.nightMatch}
          alt=""
          sizes="320px"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/90" />

        <div className="absolute inset-x-0 top-0 z-20 flex justify-center pt-4">
          {header ??
            (event ? (
              <Crest
                slug={event.slug}
                name={event.name}
                size={42}
                entity="event"
              />
            ) : null)}
        </div>

        <div className="relative z-10 flex h-full flex-col px-4 pb-4 pt-16">
          {children}
        </div>
      </div>
    </div>
  );
}

function MatchReportMock() {
  const { match, goalTriggered } = useDemo();
  const home = getTeamById(match.homeTeamId)!;
  const away = getTeamById(match.awayTeamId)!;
  const stats = match.footballStats;

  const rows = stats
    ? [
        {
          label: "Possession",
          home: stats.possession[0],
          away: stats.possession[1],
          pct: true,
        },
        { label: "Shots", home: stats.shots[0], away: stats.shots[1] },
        {
          label: "On target",
          home: stats.shotsOnTarget[0],
          away: stats.shotsOnTarget[1],
        },
        { label: "Corners", home: stats.corners[0], away: stats.corners[1] },
        { label: "Fouls", home: stats.fouls[0], away: stats.fouls[1] },
        {
          label: "Pass accuracy",
          home: stats.passAccuracy[0],
          away: stats.passAccuracy[1],
          pct: true,
        },
      ]
    : [];

  return (
    <>
      <div className="flex-1" />
      <div className="space-y-3">
        <div className="rounded-2xl glass-surface bg-black/55 px-3 py-3 text-center backdrop-blur-md">
          <p className="text-[9px] uppercase tracking-[0.28em] text-white/70">
            Live · {match.minute}&apos;
          </p>
          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="flex flex-col items-center gap-1.5">
              <Crest slug={home.slug} name={home.name} size={40} />
              <p className="text-[10px] font-semibold uppercase tracking-wide">
                {home.shortName}
              </p>
            </div>
            <p
              className={cn(
                "text-4xl font-semibold tabular-nums",
                goalTriggered && "score-flash rounded px-1",
              )}
            >
              {match.homeScore}–{match.awayScore}
            </p>
            <div className="flex flex-col items-center gap-1.5">
              <Crest slug={away.slug} name={away.name} size={40} />
              <p className="text-[10px] font-semibold uppercase tracking-wide">
                {away.shortName}
              </p>
            </div>
          </div>
          <p className="mt-3 text-[9px] uppercase tracking-[0.16em] text-white/55">
            {match.venue}
          </p>
        </div>

        <div className="rounded-2xl glass-surface bg-black/55 px-3 py-2 backdrop-blur-md">
          <div className="mb-1 flex justify-between px-1 text-[8px] uppercase tracking-[0.16em] text-white/55">
            <span>{home.shortName}</span>
            <span>{away.shortName}</span>
          </div>
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 border-t border-white/10 py-1.5 text-[11px]"
            >
              <span className="font-semibold tabular-nums">
                {row.home}
                {row.pct ? "%" : ""}
              </span>
              <span className="text-[8px] uppercase tracking-[0.12em] text-white/55">
                {row.label}
              </span>
              <span className="text-right font-semibold tabular-nums">
                {row.away}
                {row.pct ? "%" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function TableUpdateMock() {
  const { match, goalTriggered, liveStandings, socialPosts } = useDemo();
  const home = getTeamById(match.homeTeamId)!;
  const away = getTeamById(match.awayTeamId)!;
  const post = socialPosts[0];

  return (
    <>
      <div className="flex-1" />
      <div className="space-y-3">
        <div className="rounded-2xl glass-surface bg-black/55 px-3 py-3 backdrop-blur-md">
          <p className="text-[9px] uppercase tracking-[0.2em] text-brand">
            {goalTriggered ? "Goal" : "Live"}
          </p>
          <p className="mt-2 text-sm font-semibold leading-snug">
            {post?.body ??
              `${home.shortName} lead ${away.shortName} in Der Klassiker.`}
          </p>
          <p
            className={cn(
              "mt-3 text-2xl font-semibold tabular-nums",
              goalTriggered && "score-flash rounded px-1",
            )}
          >
            {home.shortName} {match.homeScore}–{match.awayScore}{" "}
            {away.shortName}
          </p>
          <p className="mt-1 text-[10px] text-white/55">
            {match.minute}&apos; · {match.venue}
          </p>
        </div>

        <div className="rounded-2xl glass-surface bg-black/55 px-3 py-3 backdrop-blur-md">
          <p className="mb-2 text-[9px] uppercase tracking-[0.18em] text-brand">
            Live table
          </p>
          <table className="w-full text-left text-[10px]">
            <thead className="text-white/50">
              <tr>
                <th className="pb-1.5 pr-2 font-medium">#</th>
                <th className="pb-1.5 font-medium">Team</th>
                <th className="pb-1.5 text-right font-medium">GF</th>
                <th className="pb-1.5 text-right font-medium">Pts</th>
              </tr>
            </thead>
            <tbody>
              {liveStandings.slice(0, 5).map((row) => {
                const team = getTeamById(row.teamId);
                const highlight = row.teamId === "team-bayern-fc";
                return (
                  <tr
                    key={row.teamId}
                    className={cn(
                      "border-t border-white/10",
                      highlight &&
                        "bg-[color-mix(in_srgb,var(--brand-primary)_18%,transparent)]",
                    )}
                  >
                    <td className="py-1.5 pr-2 tabular-nums">{row.position}</td>
                    <td className="py-1.5">
                      <span className="flex items-center gap-1.5 font-medium">
                        {team ? (
                          <Crest
                            slug={team.slug}
                            name={team.name}
                            size={14}
                          />
                        ) : null}
                        {team?.shortName ?? row.teamId}
                      </span>
                    </td>
                    <td
                      className={cn(
                        "py-1.5 text-right tabular-nums",
                        highlight && "font-semibold text-brand",
                      )}
                    >
                      {row.goalsFor}
                    </td>
                    <td className="py-1.5 text-right font-semibold tabular-nums">
                      {row.points}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function MotmMock() {
  const { playerOfTheMatch, goalTriggered } = useDemo();
  const player = getPlayerById(playerOfTheMatch.playerId);
  if (!player) return null;

  const portrait =
    player.sport === "football"
      ? playerCutoutPath(player.slug)
      : playerPortraitFallback(player.sport);

  const rows: Array<{ value: string; label: string; flash?: boolean }> = [
    { value: `${playerOfTheMatch.minutes}'`, label: "Minutes played" },
    {
      value: String(playerOfTheMatch.goals),
      label: "Goals",
      flash: goalTriggered,
    },
    { value: String(playerOfTheMatch.keyPasses), label: "Key passes" },
    { value: String(playerOfTheMatch.tackles), label: "Tackles" },
    { value: String(playerOfTheMatch.duelsWon), label: "Duels won" },
    {
      value: `${playerOfTheMatch.passAccuracy}%`,
      label: "Pass accuracy",
    },
  ];

  return (
    <div className="relative flex h-full flex-col overflow-visible">
      <div className="relative z-20 shrink-0 text-center">
        <p className="text-[10px] uppercase tracking-[0.28em] text-white">
          Player of the match
        </p>
        <h3 className="mt-2 text-[1.35rem] font-semibold uppercase tracking-wide leading-tight">
          {player.name}
        </h3>
      </div>

      <div className="relative mt-1 min-h-0 flex-1">
        {/* Player: top flush under name, left-bleed, through mid-stats, fade opacity at bottom */}
        <div className="pointer-events-none absolute bottom-[20%] left-[-1.15rem] top-0 z-[5] w-[calc(100%+1.15rem+0.35rem)] max-w-none">
          <div
            className="absolute inset-0 w-[82%]"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 0%, black 42%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, black 42%)",
            }}
          >
            <MediaImage
              src={portrait}
              alt={player.name}
              sizes="300px"
              className="object-contain object-left-top"
            />
          </div>
        </div>

        <div className="absolute right-0 top-[12%] z-20">
          <RatingRing rating={playerOfTheMatch.rating} />
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 rounded-2xl glass-surface bg-black/60 px-4 py-2 backdrop-blur-md">
          <ul>
            {rows.map((row) => (
              <li
                key={row.label}
                className="grid grid-cols-[3.25rem_1fr] items-baseline gap-3 border-b border-white/10 py-1.5 last:border-b-0"
              >
                <span
                  className={cn(
                    "text-right text-sm font-semibold tabular-nums",
                    row.flash && "text-brand",
                  )}
                >
                  {row.value}
                </span>
                <span className="text-[11px] text-white/65">{row.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MotmHeaderCrest() {
  const { playerOfTheMatch } = useDemo();
  const player = getPlayerById(playerOfTheMatch.playerId);
  const team = player ? getTeamById(player.teamId) : undefined;
  if (!team) return null;
  return <Crest slug={team.slug} name={team.name} size={42} />;
}

function GraphicBody({ id }: { id: GraphicId }) {
  if (id === "match-report") return <MatchReportMock />;
  if (id === "table-update") return <TableUpdateMock />;
  return <MotmMock />;
}

export function MatchGraphicsPreview({
  highlight,
}: {
  highlight?: boolean;
}) {
  return (
    <GlassPanel
      variant="strong"
      className={cn("mt-6 p-5 md:p-6", highlight && "ring-1 ring-brand/40")}
    >
      <div className="mb-6">
        <p className="text-[10px] uppercase tracking-[0.18em] text-brand">
          Generate graphic
        </p>
        <h3 className="mt-1 text-lg font-semibold">Mobile story previews</h3>
        <p className="mt-1 text-xs text-muted">
          Three 9:16 match graphics — pitch background, crest on top, live data
          at the bottom. Download any as PNG.
        </p>
      </div>
      <div className="grid justify-items-center gap-8 md:grid-cols-3 md:gap-5">
        {GRAPHICS.map((graphic) => (
          <PhoneMock
            key={graphic.id}
            title={graphic.title}
            filename={graphic.filename}
            header={
              graphic.id === "motm" ? <MotmHeaderCrest /> : undefined
            }
          >
            <GraphicBody id={graphic.id} />
          </PhoneMock>
        ))}
      </div>
    </GlassPanel>
  );
}
