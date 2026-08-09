"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getClubBySlug, getEventBySlug } from "@/data";

const links = [
  { href: "/events", label: "Events" },
  { href: "/clubs", label: "Clubs" },
  { href: "/fans", label: "Fans" },
  { href: "/matches/live", label: "Match" },
];

function propertyFromPath(pathname: string) {
  const eventMatch = pathname.match(/^\/events\/([^/]+)/);
  if (eventMatch && eventMatch[1]) {
    const event = getEventBySlug(eventMatch[1]);
    if (event) {
      return {
        label: event.shortName,
        href: `/events/${event.slug}`,
        primary: event.theme.primary,
      };
    }
  }
  const clubMatch = pathname.match(/^\/clubs\/([^/]+)/);
  if (clubMatch && clubMatch[1]) {
    const club = getClubBySlug(clubMatch[1]);
    if (club) {
      return {
        label: club.shortName,
        href: `/clubs/${club.slug}`,
        primary: club.theme.primary,
      };
    }
  }
  if (pathname.startsWith("/fans")) {
    return { label: "FAN", href: "/fans", primary: "#FF5A1F" };
  }
  if (pathname.startsWith("/matches")) {
    return {
      label: "MATCH",
      href: "/matches/live",
      primary: "#FF5A1F",
    };
  }
  return null;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const property = useMemo(() => propertyFromPath(pathname), [pathname]);
  const inProperty = Boolean(property);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-[rgba(8,9,11,0.55)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className={cn(
              "text-sm font-semibold tracking-[0.28em] transition",
              inProperty ? "text-muted hover:text-foreground" : "text-foreground",
            )}
          >
            PROWEM
          </Link>
          {property ? (
            <>
              <span className="text-muted/40" aria-hidden>
                /
              </span>
              <Link
                href={property.href}
                className="rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{
                  color: property.primary,
                  backgroundColor: `${property.primary}22`,
                }}
              >
                {property.label}
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
                pathname.startsWith(link.href) &&
                  (property ? "font-semibold" : "text-brand"),
              )}
              style={
                pathname.startsWith(link.href) && property
                  ? { color: property.primary }
                  : undefined
              }
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
