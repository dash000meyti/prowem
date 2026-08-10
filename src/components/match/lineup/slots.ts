import type { Player, Sport } from "@/types";

export interface LineupSlot {
  player: Player;
  x: number;
  y: number;
  label?: string;
}

function parseFormation(formation?: string): number[] {
  if (!formation) return [4, 4, 2];
  const parts = formation.split("-").map((n) => Number(n));
  if (parts.some((n) => !Number.isFinite(n) || n < 1)) return [4, 4, 2];
  return parts;
}

function xsForCount(count: number): number[] {
  if (count <= 0) return [];
  if (count === 1) return [50];
  if (count === 2) return [35, 65];
  if (count === 3) return [22, 50, 78];
  if (count === 4) return [14, 38, 62, 86];
  if (count === 5) return [10, 30, 50, 70, 90];
  return Array.from({ length: count }, (_, i) =>
    Math.round(((i + 1) / (count + 1)) * 100),
  );
}

function isGk(role: string) {
  const r = role.toUpperCase();
  return r === "GK" || r === "KEEPER";
}

/** Football: GK + formation rows (back→front) = 11 when enough players */
function footballSlots(players: Player[], formation?: string): LineupSlot[] {
  const rows = parseFormation(formation);
  const neededOutfield = rows.reduce((a, b) => a + b, 0);
  const gk = players.find((p) => isGk(p.role));
  const outfield = players.filter((p) => !isGk(p.role));

  const placed = outfield.slice(0, neededOutfield);
  const pools: Player[][] = [];
  let cursor = 0;
  for (const count of rows) {
    pools.push(placed.slice(cursor, cursor + count));
    cursor += count;
  }

  if (pools[0]?.length) {
    pools[0] = [...pools[0]].sort((a, b) => {
      const rank = (role: string) => {
        const r = role.toUpperCase();
        if (r === "LB" || r === "LWB") return 0;
        if (r === "CB") return 1;
        if (r === "RB" || r === "RWB") return 3;
        return 2;
      };
      return rank(a.role) - rank(b.role);
    });
  }

  const slots: LineupSlot[] = [];
  if (gk) slots.push({ player: gk, x: 50, y: 88, label: "GK" });

  const rowCount = pools.length;
  pools.forEach((row, i) => {
    const y =
      rowCount <= 1
        ? 50
        : Math.round(70 - (i / Math.max(rowCount - 1, 1)) * 54);
    const xs = xsForCount(row.length);
    row.forEach((player, j) => {
      slots.push({
        player,
        x: xs[j] ?? 50,
        y,
        label: player.number != null ? String(player.number) : undefined,
      });
    });
  });

  return slots;
}

/** Socca: 6 on the cage */
function soccaSlots(players: Player[]): LineupSlot[] {
  const coords: Array<{ x: number; y: number; role?: string; label?: string }> =
    [
      { x: 50, y: 88, role: "Keeper", label: "GK" },
      { x: 28, y: 68, role: "Defender" },
      { x: 72, y: 68, role: "Defender" },
      { x: 22, y: 42, role: "Winger" },
      { x: 78, y: 42, role: "Winger" },
      { x: 50, y: 16, role: "Pivot" },
    ];

  const used = new Set<string>();
  const slots: LineupSlot[] = [];

  for (const pref of coords) {
    const byRole = players.find(
      (p) =>
        pref.role &&
        p.role.toLowerCase() === pref.role.toLowerCase() &&
        !used.has(p.id),
    );
    if (byRole) {
      used.add(byRole.id);
      slots.push({
        player: byRole,
        x: pref.x,
        y: pref.y,
        label: pref.label ?? (byRole.number != null ? String(byRole.number) : undefined),
      });
    }
  }

  players
    .filter((p) => !used.has(p.id))
    .forEach((p) => {
      if (slots.length >= 6) return;
      const c = coords[slots.length];
      slots.push({
        player: p,
        x: c.x,
        y: c.y,
        label: c.label ?? (p.number != null ? String(p.number) : undefined),
      });
      used.add(p.id);
    });

  return slots.slice(0, 6);
}

/** Dota: Pos1 bot-right, Pos2 mid, Pos3 top-left, Pos4 under Pos3, Pos5 left of Pos1 */
function dotaSlots(players: Player[]): LineupSlot[] {
  const order: Array<{ match: RegExp; x: number; y: number; label: string }> = [
    { match: /carry/i, x: 78, y: 78, label: "Pos 1" },
    { match: /mid/i, x: 50, y: 50, label: "Pos 2" },
    { match: /offlane/i, x: 22, y: 22, label: "Pos 3" },
    { match: /soft/i, x: 28, y: 40, label: "Pos 4" },
    { match: /hard/i, x: 62, y: 78, label: "Pos 5" },
  ];

  const used = new Set<string>();
  const slots: LineupSlot[] = [];

  for (const slot of order) {
    const player = players.find(
      (p) => slot.match.test(p.role) && !used.has(p.id),
    );
    if (player) {
      used.add(player.id);
      slots.push({
        player,
        x: slot.x,
        y: slot.y,
        label: slot.label,
      });
    }
  }

  const fallbacks = order.map(({ x, y, label }) => ({ x, y, label }));
  players
    .filter((p) => !used.has(p.id))
    .forEach((p) => {
      if (slots.length >= 5) return;
      const f = fallbacks[slots.length];
      slots.push({ player: p, x: f.x, y: f.y, label: f.label });
    });

  return slots.slice(0, 5);
}

export function slotsForLineup(
  sport: Sport | string,
  players: Player[],
  formation?: string,
  /** Away side: rotate board 180° so the team attacks the opposite end */
  mirrored = false,
): LineupSlot[] {
  const base =
    sport === "socca"
      ? soccaSlots(players)
      : sport === "dota2"
        ? dotaSlots(players)
        : footballSlots(players, formation);

  if (!mirrored) return base;
  return base.map((slot) => ({
    ...slot,
    x: 100 - slot.x,
    y: 100 - slot.y,
  }));
}
