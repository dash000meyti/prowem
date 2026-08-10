import Image from "next/image";
import { cn } from "@/lib/utils";
import { crestPath, eventLogoPath } from "@/data/media";

export function Crest({
  slug,
  name,
  size = 40,
  className,
  watermark = false,
  entity = "club",
}: {
  slug: string;
  name?: string;
  size?: number;
  className?: string;
  watermark?: boolean;
  entity?: "club" | "event";
}) {
  const src = entity === "event" ? eventLogoPath(slug) : crestPath(slug);
  const alt =
    entity === "event"
      ? name
        ? `${name} logo`
        : "Event logo"
      : name
        ? `${name} crest`
        : "Team crest";

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn(
        "object-contain",
        watermark && "opacity-[0.12] pointer-events-none select-none",
        className,
      )}
    />
  );
}
