import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-bg-0 hover:brightness-110 shadow-[0_0_24px_rgba(255,90,31,0.25)]",
  secondary: "bg-white/8 text-foreground hover:bg-white/12",
  ghost: "bg-transparent text-foreground hover:bg-white/5",
  outline: "border border-border-strong bg-transparent hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-xs tracking-wide",
  md: "h-11 px-5 text-sm tracking-wide",
  lg: "h-12 px-7 text-base tracking-wide",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-sm font-medium uppercase transition duration-200 disabled:opacity-40",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
