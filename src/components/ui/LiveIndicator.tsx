import { cn } from "@/lib/utils";

export function LiveIndicator({
  label = "LIVE",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm bg-orange-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-orange",
        className,
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="live-pulse absolute inline-flex h-full w-full rounded-full" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
      </span>
      {label}
    </span>
  );
}
