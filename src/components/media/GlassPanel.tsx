import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "default" | "strong" | "subtle";

const variants: Record<Variant, string> = {
  default: "glass-panel",
  strong: "glass-panel-strong",
  subtle: "glass-panel-subtle",
};

export function GlassPanel({
  children,
  className,
  variant = "default",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  as?: "div" | "article" | "section";
}) {
  return (
    <Tag className={cn(variants[variant], className)}>{children}</Tag>
  );
}
