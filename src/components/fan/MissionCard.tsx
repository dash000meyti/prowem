"use client";

import { cn } from "@/lib/utils";
import type { Mission } from "@/types";
import { useDemo } from "@/context/DemoProvider";
import { Button } from "@/components/ui/Button";
import { Crest } from "@/components/media/Crest";
import { MediaImage } from "@/components/media/MediaImage";
import {
  getClubById,
  getEventById,
  getPlayerById,
  getTeamById,
  playerPortraitFallback,
  playerPortraitPath,
  resolveMedia,
} from "@/data";

const categoryMedia: Record<Mission["category"], string> = {
  watch: "nightMatch",
  predict: "footballAction",
  quiz: "locker",
  attend: "stadiumLights",
  sponsor: "jerseyDetail",
  social: "crowdOrange",
};

type MissionSubject =
  | { kind: "player"; name: string; src: string }
  | { kind: "club"; name: string; slug: string }
  | { kind: "team"; name: string; slug: string; sportLabel?: string }
  | { kind: "event"; name: string; slug: string; shortName: string }
  | null;

function resolveMissionSubject(mission: Mission): MissionSubject {
  if (mission.playerId) {
    const player = getPlayerById(mission.playerId);
    if (player) {
      return {
        kind: "player",
        name: player.name,
        src:
          player.sport === "football"
            ? playerPortraitPath(player.slug)
            : playerPortraitFallback(player.sport),
      };
    }
  }
  if (mission.teamId) {
    const team = getTeamById(mission.teamId);
    if (team) {
      return { kind: "team", name: team.name, slug: team.slug };
    }
  }
  if (mission.clubId) {
    const club = getClubById(mission.clubId);
    if (club) {
      return { kind: "club", name: club.name, slug: club.slug };
    }
  }
  if (mission.eventId) {
    const event = getEventById(mission.eventId);
    if (event) {
      return {
        kind: "event",
        name: event.name,
        slug: event.slug,
        shortName: event.shortName,
      };
    }
  }
  return null;
}

function MissionSubjectMark({ subject }: { subject: NonNullable<MissionSubject> }) {
  if (subject.kind === "player") {
    return (
      <div className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-bg-1 bg-bg-2 shadow-lg">
        <MediaImage
          src={subject.src}
          alt={subject.name}
          sizes="56px"
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-bg-1 bg-bg-1 shadow-lg">
      <Crest
        entity={subject.kind === "event" ? "event" : "club"}
        slug={subject.slug}
        name={subject.name}
        size={44}
      />
    </div>
  );
}

function subjectKindLabel(subject: NonNullable<MissionSubject>) {
  if (subject.kind === "player") return "Player";
  if (subject.kind === "club") return "Club";
  if (subject.kind === "team") return "Team";
  return "Event";
}

export function MissionCard({
  mission,
  locked = false,
}: {
  mission: Mission;
  /** Follow-scoped mission for an entity the fan does not track yet */
  locked?: boolean;
}) {
  const { completedMissionIds, completeMission } = useDemo();
  const done =
    completedMissionIds.includes(mission.id) || Boolean(mission.completed);
  const subject = resolveMissionSubject(mission);

  return (
    <article
      className={cn(
        "overflow-hidden border border-border bg-bg-1",
        done && "border-brand/40",
        locked && "opacity-80",
      )}
    >
      <div className="relative h-28 overflow-hidden">
        <MediaImage
          src={resolveMedia(categoryMedia[mission.category], "crowdOrange")}
          alt=""
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-1 via-bg-1/40 to-transparent" />
        <div className="absolute left-3 top-3">
          <span
            className={cn(
              "rounded-sm px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]",
              mission.scope === "global"
                ? "bg-bg-0/70 text-foreground"
                : "bg-brand/90 text-bg-0",
            )}
          >
            {mission.scope === "global" ? "Global" : "Following"}
          </span>
        </div>
        <div className="absolute bottom-3 right-4">
          <span className="text-sm font-semibold text-brand">+{mission.xp} XP</span>
        </div>
        {subject ? (
          <div className="absolute -bottom-7 left-4 z-10">
            <MissionSubjectMark subject={subject} />
          </div>
        ) : null}
      </div>
      <div className={cn("p-5", subject && "pt-9")}>
        {subject ? (
          <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted">
            {subjectKindLabel(subject)} ·{" "}
            <span className="text-brand">
              {subject.kind === "event" ? subject.shortName : subject.name}
            </span>
          </p>
        ) : (
          <p className="mb-2 text-[10px] uppercase tracking-[0.16em] text-muted">
            {mission.category} · Platform
          </p>
        )}
        <h3 className="text-lg font-semibold">{mission.title}</h3>
        <p className="mt-2 text-sm text-muted">{mission.description}</p>
        {mission.rewardLabel ? (
          <p className="mt-3 text-xs uppercase tracking-[0.14em] text-brand">
            Reward · {mission.rewardLabel}
          </p>
        ) : null}
        <div className="mt-5">
          {locked ? (
            <Button href="/fans" size="sm" variant="outline">
              Follow to unlock
            </Button>
          ) : (
            <Button
              size="sm"
              variant={done ? "secondary" : "brand"}
              disabled={done}
              onClick={() => completeMission(mission.id)}
            >
              {done ? "Completed" : "Complete Mission"}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
