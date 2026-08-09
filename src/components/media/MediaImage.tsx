import Image from "next/image";
import { cn } from "@/lib/utils";

export function MediaImage({
  src,
  alt,
  className,
  fill = true,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  rounded = false,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
}) {
  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", rounded && "rounded-[inherit]", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      sizes={sizes}
      priority={priority}
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}
