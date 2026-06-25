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

interface RoutesGridProps {
  routes: Route[];
}

function RouteCardItem({ r, tDiff, tRoutes }: { r: Route; tDiff: (k: string) => string; tRoutes: (k: string) => string }) {
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
      daysLabel={r.days === 1 ? tRoutes("oneDay") : tRoutes("twoDays")}
    />
  );
}

function SectionDivider({ title, count, routeWord }: { title: string; count: number; routeWord: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="font-serif text-[2rem] m-0 leading-none text-ink">{title}</h2>
      <div className="flex-1 h-px bg-[var(--line)]" />
      <span className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">
        {count} {routeWord}
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
  const t = useTranslations("routes");
  const tDiff = useTranslations("difficulty");
  const [viewMode, setViewMode] = useState<ViewMode>("all");
  const [diff, setDiff] = useState<DiffFilter>("all");
  const [len, setLen] = useState<LenFilter>("all");

  const diffChips: { label: string; value: DiffFilter }[] = [
    { label: t("filterAll"), value: "all" },
    { label: t("filterEasy"), value: "easy" },
    { label: t("filterModerate"), value: "moderate" },
    { label: t("filterHard"), value: "hard" },
  ];

  const lenChips: { label: string; value: LenFilter }[] = [
    { label: t("filterAny"), value: "all" },
    { label: t("filterShort"), value: "short" },
    { label: t("filterMid"), value: "mid" },
    { label: t("filterLong"), value: "long" },
  ];

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

  const visibleCount = viewMode === "all" ? filtered.length : targetRoutes.length;
  const routeWord = t("routeCount", { count: visibleCount }).replace(String(visibleCount), "").trim();

  return (
    <>
      {/* Toolbar */}
      <div className="top-0 z-30 bg-paper/95 backdrop-blur-sm border-b border-[var(--line)] py-3 md:py-[1.125rem]">
        <div className="max-w-content mx-auto px-4 sm:px-8 flex items-center gap-3 md:gap-5 flex-wrap">

          {/* View mode segmented control */}
          <div className="flex items-center gap-[0.25rem] bg-[#eeeee5] rounded-full p-[0.25rem] border border-[var(--line)]">
            <button onClick={() => setViewMode("all")} className={viewBtn(viewMode === "all")}>{t("viewAll")}</button>
            <button onClick={() => setViewMode("day")} className={viewBtn(viewMode === "day")}>{t("viewByDay")}</button>
            <button onClick={() => setViewMode("river")} className={viewBtn(viewMode === "river")}>{t("viewByRiver")}</button>
          </div>


          <span className="font-mono text-[0.75rem] text-muted ml-auto">
            <strong className="text-ink">{visibleCount}</strong> {routeWord}
          </span>
        </div>
      </div>

      {/* ── All Routes view ─────────────────────────────────────────── */}
      {viewMode === "all" && (
        <main className="max-w-content mx-auto px-8">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 pb-[5.25rem]">
              {filtered.map((r) => (
                <RouteCardItem key={r.slug} r={r} tDiff={tDiff} tRoutes={t} />
              ))}
            </div>
          ) : (
            <div className="py-[5rem] text-center">
              <p className="font-serif text-[1.5rem] text-ink mb-2">{t("noResults")}</p>
              <p className="text-muted text-[0.875rem]">{t("tryBroadening")}</p>
            </div>
          )}
        </main>
      )}

      {/* ── By Day view ─────────────────────────────────────────────── */}
      {viewMode === "day" && (
        <main className="max-w-content mx-auto px-8 py-10 pb-[5.25rem]">
          <div className="mb-14">
            <SectionDivider title={t("oneDay")} count={day1Routes.length} routeWord={routeWord} />
            {day1Routes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {day1Routes.map((r) => (
                  <RouteCardItem key={r.slug} r={r} tDiff={tDiff} tRoutes={t} />
                ))}
              </div>
            ) : (
              <p className="text-muted text-[0.875rem]">{t("noOneDayRoutes")}</p>
            )}
          </div>

          <div>
            <SectionDivider title={t("twoDays")} count={day2Routes.length} routeWord={routeWord} />
            {day2Routes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {day2Routes.map((r) => (
                  <RouteCardItem key={r.slug} r={r} tDiff={tDiff} tRoutes={t} />
                ))}
              </div>
            ) : (
              <p className="text-muted text-[0.875rem]">{t("noTwoDayRoutes")}</p>
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
                    {t("routeCount", { count: r1.length + r2.length })}
                  </span>
                </div>

                {r1.length > 0 && (
                  <div className="mb-8">
                    <SubDivider title={t("oneDay")} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {r1.map((r) => (
                        <RouteCardItem key={r.slug} r={r} tDiff={tDiff} tRoutes={t} />
                      ))}
                    </div>
                  </div>
                )}

                {r2.length > 0 && (
                  <div>
                    <SubDivider title={t("twoDays")} />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {r2.map((r) => (
                        <RouteCardItem key={r.slug} r={r} tDiff={tDiff} tRoutes={t} />
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
