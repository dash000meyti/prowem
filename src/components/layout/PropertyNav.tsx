"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type PropertyNavItem = {
  href: string;
  label: string;
  exact?: boolean;
  children?: { href: string; label: string; exact?: boolean }[];
};

function isActive(pathname: string, href: string, exact?: boolean) {
  if (exact) return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "shrink-0 rounded-sm px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted transition hover:text-foreground",
        active && "bg-brand-tint text-brand",
      )}
    >
      {label}
    </Link>
  );
}

function DesktopDropdown({
  label,
  items,
  active,
}: {
  label: string;
  items: { href: string; label: string; exact?: boolean }[];
  active: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 rounded-sm px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-muted transition hover:text-foreground",
          active && "bg-brand-tint text-brand",
        )}
      >
        {label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition", open && "rotate-180")}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute left-0 top-full z-[100] min-w-[12rem] border border-border bg-bg-1 py-1 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              role="menuitem"
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block px-3 py-2 text-[11px] uppercase tracking-[0.14em] text-muted transition hover:bg-brand-tint hover:text-brand",
                isActive(pathname, item.href, item.exact) &&
                  "bg-brand-tint text-brand",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/**
 * Property-level section nav.
 * Mobile / tablet: hamburger (same pattern as SiteHeader).
 * Desktop (lg+): compact text links / Teams dropdown.
 */
export function PropertyNav({
  brand,
  items,
}: {
  brand: string;
  items: PropertyNavItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav
      aria-label={`${brand} sections`}
      className="sticky top-0 z-50 w-full max-w-full border-b border-border bg-bg-1/95 backdrop-blur-xl"
    >
      {/* Mobile / tablet — hamburger */}
      <div className="lg:hidden">
        <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
          <p className="truncate text-sm font-semibold tracking-[0.22em] text-brand">
            {brand}
          </p>
          <button
            type="button"
            className="shrink-0 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open ? (
          <div
            id={panelId}
            className="max-h-[min(70vh,28rem)] overflow-y-auto border-t border-border px-4 py-4 md:px-6"
          >
            <div className="flex flex-col gap-1">
              {items.map((item) => {
                if (item.children?.length) {
                  const parentActive =
                    isActive(pathname, item.href, item.exact) ||
                    item.children.some((c) =>
                      isActive(pathname, c.href, c.exact),
                    );
                  return (
                    <div key={item.href} className="flex flex-col gap-1 pb-2">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "rounded-sm px-2 py-2.5 text-sm uppercase tracking-[0.16em] text-muted transition hover:text-foreground",
                          parentActive && "text-brand",
                        )}
                      >
                        {item.label}
                      </Link>
                      <div className="ml-3 flex flex-col border-l border-border pl-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "rounded-sm px-2 py-2 text-xs uppercase tracking-[0.14em] text-muted transition hover:text-foreground",
                              isActive(pathname, child.href, child.exact) &&
                                "text-brand",
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-sm px-2 py-2.5 text-sm uppercase tracking-[0.16em] text-muted transition hover:text-foreground",
                      isActive(pathname, item.href, item.exact) && "text-brand",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {/* Desktop — no overflow clip so dropdowns sit above page media */}
      <div className="relative z-[60] mx-auto hidden h-14 max-w-7xl items-center px-4 md:px-6 lg:flex">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="mr-3 shrink-0 text-sm font-semibold tracking-[0.22em] text-brand">
            {brand}
          </span>
          {items.map((item) => {
            if (item.children?.length) {
              const active =
                isActive(pathname, item.href, item.exact) ||
                item.children.some((c) =>
                  isActive(pathname, c.href, c.exact),
                );
              return (
                <DesktopDropdown
                  key={item.href}
                  label={item.label}
                  active={active}
                  items={[
                    {
                      href: item.href,
                      label: `All ${item.label.toLowerCase()}`,
                      exact: item.exact,
                    },
                    ...item.children,
                  ]}
                />
              );
            }
            return (
              <DesktopLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={isActive(pathname, item.href, item.exact)}
              />
            );
          })}
        </div>
      </div>
    </nav>
  );
}
