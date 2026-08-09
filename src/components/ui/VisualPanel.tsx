import { MediaImage } from "@/components/media/MediaImage";
import { resolveMedia } from "@/data/media";
import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  ember: "from-[#3a1a0f] via-[#1a0f0c] to-[#0d0f12]",
  steel: "from-[#1a2230] via-[#12161e] to-[#0d0f12]",
  forest: "from-[#0f2a22] via-[#0d1614] to-[#0d0f12]",
  violet: "from-[#221833] via-[#14101c] to-[#0d0f12]",
  gold: "from-[#2a2210] via-[#17140c] to-[#0d0f12]",
  ice: "from-[#14242e] via-[#10161c] to-[#0d0f12]",
  default: "from-[#1c1f26] via-[#121417] to-[#0d0f12]",
};

export function VisualPanel({
  tone = "default",
  className,
  children,
  label,
  src,
  alt = "",
}: {
  tone?: string;
  className?: string;
  children?: React.ReactNode;
  label?: string;
  src?: string;
  alt?: string;
}) {
  const imageSrc = src ?? resolveMedia(tone);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[18px] border border-border",
        !imageSrc && `bg-gradient-to-br ${tones[tone] ?? tones.default}`,
        className,
      )}
    >
      {imageSrc ? (
        <>
          <MediaImage src={imageSrc} alt={alt} className="absolute inset-0" />
          <div className="absolute inset-0 photo-scrim" aria-hidden />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute inset-0 editorial-grid opacity-40" />
          <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-orange/10 blur-3xl" />
        </>
      )}
      {label ? (
        <span className="absolute left-4 top-4 z-10 text-[10px] uppercase tracking-[0.2em] text-muted">
          {label}
        </span>
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
