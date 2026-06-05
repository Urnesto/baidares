import React from "react";
import { cn } from "@/lib/utils";

type TagVariant = "default" | "easy" | "moderate" | "hard" | "solid" | "sage";

interface TagProps {
  variant?: TagVariant;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<TagVariant, string> = {
  default:  "bg-white/85 text-forest-800",
  easy:     "bg-[#dceacc] text-[#2f6b2f]",
  moderate: "bg-[#f4e6c2] text-[#8a6a1e]",
  hard:     "bg-[#f1d6c7] text-[#9a4a2a]",
  solid:    "bg-forest-800 text-sage-200",
  sage:     "bg-sage-200 text-forest-700",
};

export function Tag({ variant = "default", className, children }: TagProps) {
  return (
    <span className={cn(
      "inline-flex items-center gap-[0.375rem] whitespace-nowrap font-mono text-[0.656rem] tracking-[0.1em] uppercase px-[0.5625rem] py-[0.3125rem] rounded-[0.4375rem] font-medium",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
