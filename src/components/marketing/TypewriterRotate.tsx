"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Words typed after the fixed anchor */
const SUFFIXES = ["Live.", "Share.", "Own.", "Relive.", "Defend."] as const;

/**
 * Fixed word first, then a rotating typed suffix.
 * e.g. "Moments Live." → "Moments Share." → …
 */
export function TypewriterRotate({
  suffixes = SUFFIXES,
  anchor = "Moments",
  className,
  typingMs = 58,
  deletingMs = 34,
  holdMs = 2400,
}: {
  suffixes?: readonly string[];
  anchor?: string;
  className?: string;
  typingMs?: number;
  deletingMs?: number;
  holdMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">(
    "typing",
  );

  useEffect(() => {
    const full = suffixes[index] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < full.length) {
        timer = setTimeout(
          () => setText(full.slice(0, text.length + 1)),
          typingMs,
        );
      } else {
        timer = setTimeout(() => setPhase("holding"), holdMs);
      }
    } else if (phase === "holding") {
      timer = setTimeout(() => setPhase("deleting"), 40);
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(text.slice(0, -1)), deletingMs);
    } else {
      setIndex((i) => (i + 1) % suffixes.length);
      setPhase("typing");
    }

    return () => clearTimeout(timer);
  }, [text, phase, index, suffixes, typingMs, deletingMs, holdMs]);

  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-baseline gap-x-[0.28em]",
        className,
      )}
    >
      <span>{anchor}</span>
      <span className="inline-flex items-baseline text-orange">
        <span>{text}</span>
        <span
          className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.06em] animate-pulse bg-orange"
          aria-hidden
        />
      </span>
      <span className="sr-only">
        {suffixes.map((s) => `${anchor} ${s}`).join(" ")}
      </span>
    </span>
  );
}
