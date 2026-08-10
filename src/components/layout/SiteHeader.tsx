"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/events", label: "Events" },
  { href: "/clubs", label: "Clubs" },
  { href: "/fans", label: "Fans" },
  { href: "/matches/live", label: "Match" },
];

/** Platform chrome only on home + entity directories + matchday hub — not inside event/club/fan properties. */
export function showPlatformHeader(pathname: string) {
  if (pathname === "/") return true;
  if (pathname === "/events" || pathname === "/clubs") return true;
  if (pathname.startsWith("/matches")) return true;
  return false;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!showPlatformHeader(pathname)) return null;

  const onMatch = pathname.startsWith("/matches");

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-[rgba(8,9,11,0.55)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.28em] text-foreground transition hover:text-brand"
          >
            PROWEM
          </Link>
          {onMatch ? (
            <>
              <span className="text-muted/40" aria-hidden>
                /
              </span>
              <Link
                href="/matches/live"
                className="rounded-sm bg-orange/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange"
              >
                MATCH
              </Link>
            </>
          ) : null}
        </div>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-xs uppercase tracking-[0.18em] text-muted transition hover:text-foreground",
                pathname.startsWith(link.href) && "text-brand",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm uppercase tracking-[0.16em] text-muted"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
