"use client";

import { Button } from "@/components/ui/Button";
import { useDemo } from "@/context/DemoProvider";
import { cn } from "@/lib/utils";

type FollowKind = "club" | "team" | "event" | "player";

export function FollowButton({
  kind,
  id,
  label,
  size = "md",
  className,
}: {
  kind: FollowKind;
  id: string;
  label: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const {
    isFollowingClub,
    isFollowingTeam,
    isFollowingEvent,
    isFavoritePlayer,
    toggleFollowClub,
    toggleFollowTeam,
    toggleFollowEvent,
    toggleFavoritePlayer,
  } = useDemo();

  const active =
    kind === "club"
      ? isFollowingClub(id)
      : kind === "team"
        ? isFollowingTeam(id)
        : kind === "event"
          ? isFollowingEvent(id)
          : isFavoritePlayer(id);

  function onToggle() {
    if (kind === "club") toggleFollowClub(id, label);
    else if (kind === "team") toggleFollowTeam(id, label);
    else if (kind === "event") toggleFollowEvent(id, label);
    else toggleFavoritePlayer(id, label);
  }

  const verb =
    kind === "player"
      ? active
        ? "Favorited"
        : "Favorite player"
      : active
        ? "Following"
        : `Follow ${kind}`;

  return (
    <Button
      type="button"
      size={size}
      variant={active ? "secondary" : "outline"}
      onClick={onToggle}
      className={cn(active && "border-brand/40 text-brand", className)}
      aria-pressed={active}
    >
      {verb}
    </Button>
  );
}
