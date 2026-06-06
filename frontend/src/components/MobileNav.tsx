"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LangToggle } from "./LangToggle";

interface MobileNavProps {
  overlay?: boolean;
  active?: string;
  links: { label: string; href: string; key: string }[];
}

export function MobileNav({ overlay, active, links }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => setMounted(true), 10);
    else setMounted(false);
  }, [open]);

  return (
    <div className="md:hidden flex items-center">
      {/* Trigger pill */}
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-200",
          open
            ? "bg-forest-900 border-forest-900 text-cream"
            : overlay
              ? "border-cream/30 text-cream hover:bg-cream/10"
              : "border-[var(--line)] text-ink hover:bg-ink/[0.04]"
        )}
      >
        <span className="relative w-4 h-3 flex-shrink-0 block">
          <span className={cn(
            "absolute left-0 right-0 h-px rounded-full transition-all duration-300 ease-brand",
            open ? "top-1/2 -translate-y-px rotate-45 bg-cream" : "top-0 bg-current"
          )} />
          <span className={cn(
            "absolute left-0 right-0 top-1/2 h-px -translate-y-px rounded-full transition-all duration-300 ease-brand",
            open ? "opacity-0 scale-x-0 bg-cream" : "opacity-100 bg-current"
          )} />
          <span className={cn(
            "absolute left-0 right-0 h-px rounded-full transition-all duration-300 ease-brand",
            open ? "bottom-1/2 translate-y-px -rotate-45 bg-cream" : "bottom-0 bg-current"
          )} />
        </span>
        <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase leading-none">
          {open ? "Close" : "Menu"}
        </span>
      </button>

      {/* Full-screen overlay */}
      {open && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex flex-col",
            "bg-gradient-to-br from-forest-900 via-forest-800 to-forest-700",
            "transition-opacity duration-500",
            mounted ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Decorative SVG — river curves (cream) + pine silhouette (sage-300) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
            viewBox="0 0 390 844"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <g className="text-cream" stroke="currentColor">
              <path d="M-40 200 C80 220 60 320 180 340 S360 360 420 420" strokeWidth="1.5" />
              <path d="M-40 260 C100 280 80 380 200 400 S380 420 440 480" strokeWidth="1" />
              <path d="M-40 320 C120 340 100 440 220 460 S400 480 460 540" strokeWidth="0.75" />
            </g>
            <g className="text-sage-300" stroke="currentColor">
              <line x1="320" y1="580" x2="320" y2="780" strokeWidth="1" />
              <path d="M290 680 L320 620 L350 680 Z" strokeWidth="1" fill="none" />
              <path d="M285 720 L320 645 L355 720 Z" strokeWidth="0.75" fill="none" />
              <path d="M278 760 L320 672 L362 760 Z" strokeWidth="0.6" fill="none" />
              <line x1="355" y1="620" x2="355" y2="780" strokeWidth="0.75" strokeOpacity="0.6" />
              <path d="M338 700 L355 660 L372 700 Z" strokeWidth="0.6" fill="none" strokeOpacity="0.6" />
              <path d="M334 730 L355 678 L376 730 Z" strokeWidth="0.5" fill="none" strokeOpacity="0.6" />
            </g>
          </svg>

          {/* Top bar — brand + close */}
          <div className="relative z-10 flex items-center justify-between px-6 h-[4.625rem] flex-shrink-0 border-b border-cream/10">
            <a href="/" onClick={() => setOpen(false)} className="flex flex-col leading-[1.05] gap-[0.125rem]">
              <span className="font-mono text-[0.781rem] tracking-[0.18em] uppercase font-medium text-cream whitespace-nowrap">
                Asvėjos baidarių centras
              </span>
              <span className="font-sans text-[0.625rem] tracking-[0.16em] uppercase text-cream/50">
                Žemaitijos regioninis parkas
              </span>
            </a>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-full border border-cream/30 text-cream hover:bg-cream/10 transition-colors duration-200"
            >
              <span className="relative w-4 h-3 flex-shrink-0 block">
                <span className="absolute left-0 right-0 top-1/2 -translate-y-px h-px bg-cream rounded-full rotate-45" />
                <span className="absolute left-0 right-0 top-1/2 -translate-y-px h-px bg-cream rounded-full -rotate-45" />
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.14em] uppercase leading-none">Close</span>
            </button>
          </div>

          {/* Links */}
          <nav className="relative z-10 flex flex-col justify-center flex-1 px-8 gap-1 overflow-hidden">
            {links.map((link, i) => (
              <a
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "group flex items-baseline gap-4 py-4 border-b border-cream/10 last:border-b-0",
                  "transition-all duration-500 ease-brand",
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: mounted ? `${80 + i * 70}ms` : "0ms" }}
              >
                <span className="font-mono text-[0.625rem] tracking-[0.1em] text-sage-400/60 w-5 flex-shrink-0">
                  0{i + 1}
                </span>
                <span className={cn(
                  "font-serif text-[2.5rem] leading-[1.05] transition-colors duration-200",
                  active === link.key ? "text-sage-200" : "text-cream/80 group-hover:text-cream"
                )}>
                  {link.label}
                </span>
                {active === link.key && (
                  <span className="ml-auto flex-shrink-0 w-1.5 h-1.5 rounded-full bg-accent self-end mb-2" />
                )}
              </a>
            ))}
          </nav>

          {/* Bottom bar */}
          <div
            className={cn(
              "relative z-10 flex items-center justify-between px-6 py-5 border-t border-cream/10",
              "transition-all duration-500 ease-brand",
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            )}
            style={{ transitionDelay: mounted ? `${80 + links.length * 70}ms` : "0ms" }}
          >
            <LangToggle overlay />
            <a
              href="/#reserve"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-2 font-semibold tracking-[0.01em] rounded-full bg-accent text-cream hover:bg-accent-hover transition-all duration-[250ms] py-[0.625rem] px-[1.25rem] text-[0.875rem]"
            >
              Book now
              <svg width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
