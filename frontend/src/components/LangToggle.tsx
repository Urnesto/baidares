"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface LangToggleProps {
  overlay?: boolean;
  className?: string;
}

export function LangToggle({ overlay, className }: LangToggleProps) {
  const [lang, setLang] = useState<"lt" | "en">("lt");

  return (
    <div className={cn(
      "flex items-center gap-[0.125rem] rounded-[0.5rem] p-[0.1875rem]",
      overlay ? "border border-cream/20" : "border border-[var(--line)]",
      className
    )}>
      {(["lt", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={cn(
            "font-mono text-[0.625rem] tracking-[0.1em] uppercase px-[0.5rem] py-[0.25rem] rounded-[0.3125rem] transition-colors duration-150",
            lang === l
              ? overlay ? "bg-cream/20 text-cream" : "bg-forest-900 text-cream"
              : overlay ? "text-cream/50 hover:text-cream/80" : "text-muted hover:text-ink"
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
