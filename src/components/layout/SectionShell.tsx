import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type Atmosphere = "plain" | "tint" | "contrast" | "mesh" | "band";

const atmospheres: Record<Atmosphere, string> = {
  plain: "",
  tint: "atmosphere-tint",
  contrast: "atmosphere-contrast",
  mesh: "atmosphere-mesh",
  band: "atmosphere-band",
};

export function SectionShell({
  children,
  atmosphere = "plain",
  className,
  innerClassName,
  id,
}: {
  children: ReactNode;
  atmosphere?: Atmosphere;
  className?: string;
  innerClassName?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden", atmospheres[atmosphere], className)}
    >
      <div className={cn("relative z-10", innerClassName)}>{children}</div>
    </section>
  );
}
