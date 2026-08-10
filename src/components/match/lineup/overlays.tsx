import type { LineupSlot } from "./slots";
import { LineupPlayerNode } from "./LineupPlayerNode";

export function SlotNodes({ slots }: { slots: LineupSlot[] }) {
  return (
    <>
      {slots.map((slot) => (
        <div
          key={slot.player.id}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
        >
          <LineupPlayerNode player={slot.player} label={slot.label} />
        </div>
      ))}
    </>
  );
}
