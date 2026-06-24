"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { RouteCard } from "./RouteCard";
import type { Route, RouteDifficulty } from "@/types";

type ViewMode = "all" | "day" | "river";
type DiffFilter = "all" | RouteDifficulty;
type LenFilter = "all" | "short" | "mid" | "long";

const TARGET_RIVERS = ["Žeimena", "Dubinga", "Mera", "Lakaja", "Asveja"] as const;

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

function RouteCardItem({ r, tDiff }: { r: Route; tDiff: (k: string) => string }) {
  return (
    <RouteCard
      title={r.title}
      river={r.river}
      subtitle={r.subtitle}
      difficulty={r.difficulty}
      difficultyLabel={tDiff(r.difficulty)}
      distance={`${r.distanceKm} km`}
      duration={r.duration}
      route={r.route}
      image={r.image}
      href={`/routes/${r.slug}`}
    />
  );
}

function SectionDivider({ title, count }: { title: string; count: number }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="font-serif text-[2rem] m-0 leading-none text-ink">{title}</h2>
      <div className="flex-1 h-px bg-[var(--line)]" />
      <span className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">
        {count} {count === 1 ? "route" : "routes"}
      </span>
    </div>
  );
}

function SubDivider({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="font-mono text-[0.6875rem] tracking-[0.14em] uppercase text-muted">{title}</span>
      <div className="flex-1 h-px bg-[var(--line-soft)]" />
    </div>
  );
}

export function RoutesGrid({ routes }: RoutesGridProps) {
  const tDiff = useTranslations("difficulty");
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [diff, setDiff] = useState<DiffFilter>("all");
  const [len, setLen] = useState<LenFilter>("all");

  const filtered = useMemo(
    () =>
      routes.filter((r) => {
        const diffOk = diff === "all" || r.difficulty === diff;
        const lenOk = len === "all" || lengthBucket(r.distanceKm) === len;
        return diffOk && lenOk;
      }),
    [routes, diff, len]
  );

  const targetRoutes = useMemo(
    () => routes.filter((r) => (TARGET_RIVERS as readonly string[]).includes(r.river)),
    [routes]
  );

  const day1Routes = useMemo(() => targetRoutes.filter((r) => r.days === 1), [targetRoutes]);
  const day2Routes = useMemo(() => targetRoutes.filter((r) => r.days === 2), [targetRoutes]);

  const chipBtn = (active: boolean) =>
    `font-mono text-[0.656rem] tracking-[0.08em] uppercase px-[0.875rem] py-[0.4375rem] rounded-full border transition-colors duration-150 ${
      active
        ? "bg-forest-900 text-cream border-forest-900"
        : "border-[var(--line)] text-ink-soft hover:border-ink hover:text-ink bg-transparent"
    }`;

  const viewBtn = (active: boolean) =>
    `font-mono text-[0.625rem] tracking-[0.1em] uppercase px-[0.875rem] py-[0.375rem] rounded-full transition-all duration-200 ${
      active ? "bg-forest-900 text-cream shadow-sm" : "text-ink-soft hover:text-ink"
    }`;

  const visibleCount =
    viewMode === "all" ? filtered.length : targetRoutes.length;

  return (
    <>
      {/* Toolbar */}
      <div className="top-0 z-30 bg-paper/95 backdrop-blur-sm border-b border-[var(--line)] py-[1.125rem]">
        <div className="max-w-content mx-auto px-8 flex items-center gap-5 flex-wrap">

          {/* View mode segmented control */}
          <div className="flex items-center gap-[0.25rem] bg-[#eeeee5] rounded-full p-[0.25rem] border border-[var(--line)]">
            <button onClick={() => setViewMode("all")} className={viewBtn(viewMode === "all")}>All Routes</button>
            <button onClick={() => setViewMode("day")} className={viewBtn(viewMode === "day")}>By Day</button>
            <button onClick={() => setViewMode("river")} className={viewBtn(viewMode === "river")}>By River</button>
          </div>

          {/* Chip filters — only in All mode */}
          {viewMode === "all" && (
            <>
              <div className="flex items-center gap-[0.625rem] flex-wrap">
                <span className="font-mono text-[0.656rem] tracking-[0.12em] uppercase text-muted">Difficulty</span>
                {diffChips.map((c) => (
                  <button key={c.value} onClick={() => setDiff(c.value)} className={chipBtn(diff === c.value)}>
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-[0.625rem] flex-wrap">
                <span className="font-mono text-[0.656rem] tracking-[0.12em] uppercase text-muted">Length</span>
                {lenChips.map((c) => (
                  <button key={c.value} onClick={() => setLen(c.value)} className={chipBtn(len === c.value)}>
                    {c.label}
                  </button>
                ))}
              </div>
            </>
          )}

          <span className="font-mono text-[0.75rem] text-muted ml-auto">
            <strong className="text-ink">{visibleCount}</strong> routes
          </span>
        </div>
      </div>

      {/* ── All Routes view ─────────────────────────────────────────── */}
      {viewMode === "all" && (
        <main className="max-w-content mx-auto px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 pb-[5.25rem]">
              {filtered.map((r) => (
                <RouteCardItem key={r.slug} r={r} tDiff={tDiff} />
              ))}
            </div>
          ) : (
            <div className="py-[5rem] text-center">
              <p className="font-serif text-[1.5rem] text-ink mb-2">No routes match those filters.</p>
              <p className="text-muted text-[0.875rem]">Try broadening your search.</p>
            </div>
          )}
        </main>
      )}

      {/* ── By Day view ─────────────────────────────────────────────── */}
      {viewMode === "day" && (
        <main className="max-w-content mx-auto px-8 py-10 pb-[5.25rem]">
          <div className="mb-14">
            <SectionDivider title="1 Day" count={day1Routes.length} />
            {day1Routes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {day1Routes.map((r) => (
                  <RouteCardItem key={r.slug} r={r} tDiff={tDiff} />
                ))}
              </div>
            ) : (
              <p className="text-muted text-[0.875rem]">No 1-day routes available.</p>
            )}
          </div>

          <div>
            <SectionDivider title="2 Days" count={day2Routes.length} />
            {day2Routes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {day2Routes.map((r) => (
                  <RouteCardItem key={r.slug} r={r} tDiff={tDiff} />
                ))}
              </div>
            ) : (
              <p className="text-muted text-[0.875rem]">No 2-day routes available.</p>
            )}
          </div>
        </main>
      )}

      {/* ── By River view ───────────────────────────────────────────── */}
      {viewMode === "river" && (
        <main className="max-w-content mx-auto px-8 py-10 pb-[5.25rem]">
          {TARGET_RIVERS.map((river) => {
            const r1 = routes.filter((r) => r.river === river && r.days === 1);
            const r2 = routes.filter((r) => r.river === river && r.days === 2);
            if (r1.length === 0 && r2.length === 0) return null;

            return (
              <div key={river} className="mb-16">
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="font-serif text-[2.5rem] m-0 leading-none">{river}</h2>
                  <span className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">
                    {r1.length + r2.length} routes
                  </span>
                </div>

                {r1.length > 0 && (
                  <div className="mb-8">
                    <SubDivider title="1 Day" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {r1.map((r) => (
                        <RouteCardItem key={r.slug} r={r} tDiff={tDiff} />
                      ))}
                    </div>
                  </div>
                )}

                {r2.length > 0 && (
                  <div>
                    <SubDivider title="2 Days" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {r2.map((r) => (
                        <RouteCardItem key={r.slug} r={r} tDiff={tDiff} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </main>
      )}
    </>
  );
}
