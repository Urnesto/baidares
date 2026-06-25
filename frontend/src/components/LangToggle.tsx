"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const LOCALES = ["lt", "en", "pl"] as const;
type Locale = typeof LOCALES[number];

interface LangToggleProps {
  overlay?: boolean;
  className?: string;
}

export function LangToggle({ overlay, className }: LangToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: Locale) {
    if (next === locale) return;
    sessionStorage.setItem("locale", next);
    const segments = pathname.split("/");
    if (LOCALES.includes(segments[1] as Locale)) {
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
      {LOCALES.map((l) => (
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
