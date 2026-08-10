"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { ChevronDown, UserRound } from "lucide-react";
import { useDemo } from "@/context/DemoProvider";
import { cn } from "@/lib/utils";

const accountLinks = [
  { href: "/fans", label: "Dashboard" },
  { href: "/fans/profile", label: "Profile" },
  { href: "/fans/missions", label: "Missions" },
  { href: "/fans/passport", label: "Passport" },
  { href: "/fans/shop", label: "Shop" },
];

export function FanAccountMenu({ compact = false }: { compact?: boolean }) {
  const {
    fanName,
    fanLevel,
    fanXp,
    fanStatus,
    notifications,
  } = useDemo();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const initials = fanName
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const latest = notifications[0];

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointer(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-fan-account-menu]")) return;
      setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  return (
    <div className="relative shrink-0" data-fan-account-menu>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-sm border border-border bg-bg-1/80 px-2 py-1.5 transition hover:border-brand/50",
          compact && "px-1.5",
        )}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-tint text-[11px] font-semibold tracking-wide text-brand">
          {initials || <UserRound className="h-4 w-4" />}
        </span>
        {!compact ? (
          <span className="hidden min-w-0 text-left sm:block">
            <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground">
              {fanName.split(" ")[0]}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.14em] text-muted">
              L{fanLevel} · {fanXp.toLocaleString()} XP
            </span>
          </span>
        ) : null}
        <ChevronDown
          className={cn("h-3.5 w-3.5 text-muted transition", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-[120] mt-2 w-64 border border-border bg-bg-1 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
        >
          <div className="border-b border-border px-3 pb-3 pt-1">
            <p className="text-sm font-semibold text-foreground">{fanName}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-brand">
              {fanStatus} · Level {fanLevel}
            </p>
            <p className="mt-1 text-xs text-muted">
              {fanXp.toLocaleString()} XP in the bank
            </p>
            {latest ? (
              <p className="mt-2 line-clamp-2 text-[11px] text-muted">
                Latest · {latest.title}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col py-1">
            {accountLinks.map((link) => (
              <Link
                key={link.href}
                role="menuitem"
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-muted transition hover:bg-brand-tint hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
