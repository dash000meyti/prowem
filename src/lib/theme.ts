import type { Club, EventEntity, ThemeTokens } from "@/types";
import type { CSSProperties } from "react";

export type BrandScope = "platform" | "event" | "club" | "fan" | "match";

export interface BrandTheme {
  scope: BrandScope;
  label: string;
  href?: string;
  primary: string;
  secondary: string;
  accent: string;
  tint: string;
  glow: string;
  surface: string;
}

const PLATFORM: BrandTheme = {
  scope: "platform",
  label: "PROWEM",
  href: "/",
  primary: "#FF5A1F",
  secondary: "#0D0F12",
  accent: "#F5F5F2",
  tint: "rgba(255, 90, 31, 0.12)",
  glow: "rgba(255, 90, 31, 0.28)",
  surface: "rgba(255, 90, 31, 0.06)",
};

function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = Number.parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function themeFromTokens(
  scope: BrandScope,
  tokens: ThemeTokens,
  label: string,
  href?: string,
): BrandTheme {
  return {
    scope,
    label,
    href,
    primary: tokens.primary,
    secondary: tokens.secondary,
    accent: tokens.accent,
    tint: hexToRgba(tokens.primary, 0.14),
    glow: hexToRgba(tokens.primary, 0.3),
    surface: hexToRgba(tokens.primary, 0.07),
  };
}

export function platformTheme(): BrandTheme {
  return PLATFORM;
}

export function eventTheme(event: EventEntity): BrandTheme {
  return themeFromTokens(
    "event",
    event.theme,
    event.shortName,
    `/events/${event.slug}`,
  );
}

export function clubTheme(club: Club): BrandTheme {
  return themeFromTokens("club", club.theme, club.shortName, `/clubs/${club.slug}`);
}

export function fanTheme(): BrandTheme {
  return {
    ...PLATFORM,
    scope: "fan",
    label: "FAN",
    href: "/fans",
    tint: "rgba(255, 90, 31, 0.1)",
    surface: "rgba(255, 90, 31, 0.05)",
  };
}

export function matchTheme(event: EventEntity): BrandTheme {
  return {
    ...eventTheme(event),
    scope: "match",
    label: event.shortName,
  };
}

export function brandStyleVars(theme: BrandTheme): CSSProperties {
  return {
    ["--brand-primary" as string]: theme.primary,
    ["--brand-secondary" as string]: theme.secondary,
    ["--brand-accent" as string]: theme.accent,
    ["--brand-tint" as string]: theme.tint,
    ["--brand-glow" as string]: theme.glow,
    ["--brand-surface" as string]: theme.surface,
  };
}
