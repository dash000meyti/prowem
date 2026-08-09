"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/** Prefixes typed in front of the fixed anchor word */
const PREFIXES = [
  "Build",
  "Create",
  "Stage",
  "Power",
  "Own",
] as const;

/**
 * Types a rotating prefix in front of a fixed word, holds, deletes, advances.
 * e.g. "Build Communities." → "Create Communities." → …
 */
export function TypewriterRotate({
  prefixes = PREFIXES,
  anchor = "Communities.",
  className,
  typingMs = 58,
  deletingMs = 34,
  holdMs = 2400,
}: {
  prefixes?: readonly string[];
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
    const full = prefixes[index] ?? "";
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
      setIndex((i) => (i + 1) % prefixes.length);
      setPhase("typing");
    }

    return () => clearTimeout(timer);
  }, [text, phase, index, prefixes, typingMs, deletingMs, holdMs]);

  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-[0.28em]", className)}>
      <span className="inline-flex items-baseline text-orange">
        <span>{text}</span>
        <span
          className="ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-[0.06em] animate-pulse bg-orange"
          aria-hidden
        />
      </span>
      <span>{anchor}</span>
      <span className="sr-only">
        {prefixes.map((p) => `${p} ${anchor}`).join(" ")}
      </span>
    </span>
  );
}
