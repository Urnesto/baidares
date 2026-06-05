"use client";

import React, { useState } from "react";
import { RouteCard } from "./RouteCard";
import type { Route, RouteDifficulty } from "@/types";

type DiffFilter = "all" | RouteDifficulty;
type LenFilter = "all" | "short" | "mid" | "long";

function lengthBucket(km: number): "short" | "mid" | "long" {
  if (km < 8) return "short";
  if (km <= 14) return "mid";
  return "long";
}

const diffChips: { label: string; value: DiffFilter }[] = [
  { label: "All", value: "all" },
  { label: "Easy", value: "easy" },
  { label: "Moderate", value: "moderate" },
  { label: "Hard", value: "hard" },
];

const lenChips: { label: string; value: LenFilter }[] = [
  { label: "Any", value: "all" },
  { label: "< 8 km", value: "short" },
  { label: "8–14 km", value: "mid" },
  { label: "14 km +", value: "long" },
];

interface RoutesGridProps {
  routes: Route[];
}

export function RoutesGrid({ routes }: RoutesGridProps) {
  const [diff, setDiff] = useState<DiffFilter>("all");
  const [len, setLen] = useState<LenFilter>("all");

  const filtered = routes.filter((r) => {
    const diffOk = diff === "all" || r.difficulty === diff;
    const lenOk = len === "all" || lengthBucket(r.distanceKm) === len;
    return diffOk && lenOk;
  });

  return (
    <>
      {/* Sticky toolbar */}
      <div className="sticky top-0 z-30 bg-paper/95 backdrop-blur-sm border-b border-[var(--line)] py-[1.125rem]">
        <div className="max-w-content mx-auto px-8 flex items-center justify-between gap-5 flex-wrap">
          <div className="flex items-center gap-[0.625rem] flex-wrap">
            <span className="font-mono text-[0.656rem] tracking-[0.12em] uppercase text-muted">Difficulty</span>
            {diffChips.map((c) => (
              <button
                key={c.value}
                onClick={() => setDiff(c.value)}
                className={`font-mono text-[0.656rem] tracking-[0.08em] uppercase px-[0.875rem] py-[0.4375rem] rounded-full border transition-colors duration-150 ${
                  diff === c.value
                    ? "bg-forest-900 text-cream border-forest-900"
                    : "border-[var(--line)] text-ink-soft hover:border-ink hover:text-ink bg-transparent"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-[0.625rem] flex-wrap">
            <span className="font-mono text-[0.656rem] tracking-[0.12em] uppercase text-muted">Length</span>
            {lenChips.map((c) => (
              <button
                key={c.value}
                onClick={() => setLen(c.value)}
                className={`font-mono text-[0.656rem] tracking-[0.08em] uppercase px-[0.875rem] py-[0.4375rem] rounded-full border transition-colors duration-150 ${
                  len === c.value
                    ? "bg-forest-900 text-cream border-forest-900"
                    : "border-[var(--line)] text-ink-soft hover:border-ink hover:text-ink bg-transparent"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <span className="font-mono text-[0.75rem] text-muted ml-auto">
            <strong className="text-ink">{filtered.length}</strong> routes
          </span>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-content mx-auto px-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 pb-[5.25rem]">
            {filtered.map((r) => (
              <RouteCard
                key={r.slug}
                title={r.title}
                subtitle={r.subtitle}
                difficulty={r.difficulty}
                distance={`${r.distanceKm} km`}
                duration={r.duration}
                terrain={r.terrain}
                image={r.image}
                href={`/routes/${r.slug}`}
              />
            ))}
          </div>
        ) : (
          <div className="py-[5rem] text-center">
            <p className="font-serif text-[1.5rem] text-ink mb-2">No routes match those filters.</p>
            <p className="text-muted text-[0.875rem]">Try broadening your search.</p>
          </div>
        )}
      </main>
    </>
  );
}
