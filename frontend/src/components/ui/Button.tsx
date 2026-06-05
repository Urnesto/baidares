import React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost" | "light";
type Size = "default" | "sm";

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler;
}

const variants: Record<Variant, string> = {
  primary: "bg-accent text-cream border border-transparent hover:bg-accent-hover hover:-translate-y-px",
  dark:    "bg-forest-900 text-sage-200 border border-transparent hover:bg-forest-800 hover:-translate-y-px",
  ghost:   "bg-transparent border border-[var(--line)] text-ink hover:border-ink hover:bg-ink/[0.03]",
  light:   "bg-cream text-forest-900 border border-transparent hover:bg-white hover:-translate-y-px",
};

const sizes: Record<Size, string> = {
  default: "py-[0.8125rem] px-[1.375rem] text-[0.875rem]",
  sm:      "py-[0.5625rem] px-[1rem] text-[0.781rem]",
};

export function Button({
  variant = "primary",
  size = "default",
  block,
  className,
  children,
  as: Tag = "button",
  href,
  type,
  onClick,
}: ButtonProps) {
  const cls = cn(
    "inline-flex items-center gap-[0.5625rem] font-semibold tracking-[0.01em] rounded-full transition-all duration-[250ms] whitespace-nowrap",
    variants[variant],
    sizes[size],
    block && "w-full justify-center",
    className
  );

  if (Tag === "a") {
    return <a href={href} className={cls}>{children}</a>;
  }

  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
