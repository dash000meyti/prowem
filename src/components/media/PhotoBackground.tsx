import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PhotoBackground({
  src,
  alt = "",
  className,
  children,
  priority = false,
  scrim = "default",
}: {
  src: string;
  alt?: string;
  className?: string;
  children?: ReactNode;
  priority?: boolean;
  scrim?: "default" | "heavy" | "light" | "none";
}) {
  const scrimClass =
    scrim === "none"
      ? ""
      : scrim === "heavy"
        ? "photo-scrim-heavy"
        : scrim === "light"
          ? "photo-scrim-light"
          : "photo-scrim";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="object-cover"
      />
      {scrim !== "none" ? (
        <div className={cn("absolute inset-0", scrimClass)} aria-hidden />
      ) : null}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
