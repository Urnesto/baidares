"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

interface LangToggleProps {
  overlay?: boolean;
  className?: string;
}

export function LangToggle({ overlay, className }: LangToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: "lt" | "en") {
    if (next === locale) return;
    // pathname includes the locale prefix e.g. "/lt/routes/slug" or "/routes/slug"
    // Strip leading locale segment and prepend new one
    const segments = pathname.split("/");
    if (segments[1] === "lt" || segments[1] === "en") {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    router.push(segments.join("/") || "/");
  }

  return (
    <div className={cn(
      "flex items-center gap-[0.125rem] rounded-[0.5rem] p-[0.1875rem]",
      overlay ? "border border-cream/20" : "border border-[var(--line)]",
      className
    )}>
      {(["lt", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={cn(
            "font-mono text-[0.625rem] tracking-[0.1em] uppercase px-[0.5rem] py-[0.25rem] rounded-[0.3125rem] transition-colors duration-150",
            locale === l
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
