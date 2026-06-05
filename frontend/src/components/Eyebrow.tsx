import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  center?: boolean;
  className?: string;
}

export function Eyebrow({ children, center, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-[0.719rem] tracking-[0.22em] uppercase text-muted m-0 mb-4 flex items-center gap-[0.625rem]",
        "before:content-[''] before:w-[1.625rem] before:h-px before:bg-sage-400",
        center && "justify-center",
        className
      )}
    >
      {children}
    </p>
  );
}
