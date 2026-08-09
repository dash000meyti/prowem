import Image from "next/image";
import { cn } from "@/lib/utils";
import { crestPath } from "@/data/media";

export function Crest({
  slug,
  name,
  size = 40,
  className,
  watermark = false,
}: {
  slug: string;
  name?: string;
  size?: number;
  className?: string;
  watermark?: boolean;
}) {
  return (
    <Image
      src={crestPath(slug)}
      alt={name ? `${name} crest` : "Team crest"}
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
