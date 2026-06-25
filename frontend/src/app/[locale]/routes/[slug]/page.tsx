import React from "react";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { RouteCard } from "@/components/RouteCard";
import { getRouteBySlug, getRelatedRoutes, routes } from "@/mocks";
import { RouteMap } from "@/components/RouteMap";
import Link from "next/link";

const heroBgs: Record<string, string> = {
  river:  "url('https://images.unsplash.com/photo-1586699253884-e199770f63b9?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(180deg,#3a5246,#4a726b)",
  pine:   "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(180deg,#2f4634,#1c3324)",
  sunset: "url('https://images.unsplash.com/photo-1696469014188-e6d7ea983c56?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(180deg,#caa24a,#2f4631)",
  forest: "url('https://images.unsplash.com/photo-1476811030698-6611c7b9bf81?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(165deg,#33493a,#1d3325)",
  water:  "url('https://images.unsplash.com/photo-1476811030698-6611c7b9bf81?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(150deg,#4d756d,#274a44)",
  mist:   "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(180deg,#5a6f63,#33493a)",
  aerial: "url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(135deg,#3f5a36,#22473f)",
  canyon: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat, linear-gradient(180deg,#4a5c4e,#2c3e32)",
};

export async function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) return {};
  return { title: `${route.title} Asvėjos baidarių centras` };
}

export default async function RouteDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  const related = getRelatedRoutes(route);
  const t = await getTranslations("route");
  const tIncludes = await getTranslations("includes");
  const tDiff = await getTranslations("difficulty");

  // const terrainIsFlat = route.terrain.toLowerCase() === "flat";
  // const terrainDesc = terrainIsFlat
  //   ? t("flat")
  //   : t("currentTerrain", { terrain: route.terrain });

  return (
    <>
      {/* Hero */}
      <div className="relative min-h-[32.5rem] flex flex-col overflow-hidden text-cream">
        <div className="absolute inset-0" style={{ background: heroBgs[route.image] ?? heroBgs.forest }} />
        <div
          className="absolute inset-0 z-[2]"
          style={{ background: "linear-gradient(180deg,rgba(16,29,21,.18) 0%,rgba(16,29,21,.22) 40%,rgba(16,29,21,.82) 100%)" }}
        />
        <div className="relative z-10">
          <Nav overlay active="routes" />
        </div>
        <div className="relative z-[3] mt-auto max-w-content mx-auto px-8 pb-[3.5rem] pt-6 w-full">
          <nav className="flex gap-2 items-center font-mono text-[0.6875rem] tracking-[0.08em] text-cream/70 mb-3">
            <Link href="/routes" className="hover:text-cream transition-colors">{t("breadcrumbRoutes")}</Link>
            <span>/</span>
            <span className="text-cream/90">{route.title}</span>
          </nav>
          <Tag variant={route.difficulty} className="mb-3">
            {route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}
          </Tag>
          <h1 className="font-serif text-[clamp(2.5rem,5.4vw,4.25rem)] leading-[1.0] m-0 mt-[0.875rem] mb-4 text-cream max-w-[18ch]">
            {route.title}
          </h1>
          <p className="text-[1.0625rem] text-cream/85 m-0 max-w-[48ch] leading-[1.65]">{route.description}</p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="max-w-content mx-auto px-8 -mt-11 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 bg-surface rounded-[1.125rem] border border-[var(--line)] shadow-sm overflow-hidden">
          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3v18" />
                </svg>
              ),
              label: t("statDistance"),
              value: `${route.distanceKm} km`,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <path d="M3 19l6-9 4 6 3-4 5 7z" />
                </svg>
              ),
              label: t("statDifficulty"),
              value: route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1),
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                </svg>
              ),
              label: t("statDuration"),
              value: route.duration,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-5 h-5">
                  <path d="M4 8c3 0 3 2 6 2s3-2 6-2 3 2 4 2M4 14c3 0 3 2 6 2s3-2 6-2 3 2 4 2" />
                </svg>
              ),
              label: t("statWaterway"),
              value: route.river,
            },
          ].map((stat, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-[1.375rem] border-b md:border-b-0 border-r border-[var(--line)] last:border-r-0 odd:border-r even:md:border-r">
              <div className="text-accent flex-shrink-0">{stat.icon}</div>
              <div>
                <p className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted m-0 mb-[0.125rem]">{stat.label}</p>
                <p className="font-serif text-[1.125rem] text-ink m-0 leading-none">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <section className="max-w-content mx-auto px-8 py-14 grid grid-cols-1 lg:grid-cols-[1.6fr_0.9fr] gap-14 items-start">
        {/* Prose */}
        <div className="flex flex-col gap-10">
          <div>
            <h2 className="font-serif text-[1.75rem] m-0 mb-4">{t("sectionExperience")}</h2>
            <p className="text-ink-soft leading-[1.7] m-0 mb-[1.125rem]">{route.description}</p>
            {/* <p className="text-ink-soft leading-[1.7] m-0">
              {t("terrainDesc", { desc: terrainDesc })}
            </p> */}
          </div>

          <div>
            <h2 className="font-serif text-[1.75rem] m-0 mb-4">{t("sectionMap")}</h2>
            {route.map ? (
              <RouteMap title={route.title} mapData={route.map} />
            ) : (
              <div className="border border-[var(--line)] rounded-[1.125rem] overflow-hidden bg-surface-2 flex items-center justify-center py-10">
                <p className="font-mono text-[0.75rem] text-muted tracking-[0.08em]">{t("mapComingSoon")}</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="font-serif text-[1.75rem] m-0 mb-4">{t("sectionLandmarks")}</h2>
            <div className="flex flex-col gap-3.5">
              {route.landmarks.map((lm) => (
                <div key={lm.num} className="flex gap-3.5 p-[1.125rem] border border-[var(--line)] rounded-[0.75rem] bg-surface">
                  <div className="flex-shrink-0 w-[1.875rem] h-[1.875rem] rounded-full bg-forest-700 text-sage-200 grid place-items-center font-mono text-[0.75rem]">
                    {lm.num}
                  </div>
                  <div>
                    <h4 className="font-serif text-[1.125rem] m-0 mb-1">{lm.title}</h4>
                    <p className="text-[0.84375rem] text-muted m-0 leading-[1.5]">{lm.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <aside>
          <div className="sticky top-6 border border-[var(--line)] rounded-[1.125rem] bg-surface shadow-sm overflow-hidden">
            <div className="px-[1.375rem] pt-[1.375rem] pb-[1.125rem] border-b border-[var(--line)]">

              <div className="flex items-baseline gap-1.5">
               
              </div>
            </div>
            <div className="px-[1.375rem] py-5 flex flex-col gap-[0.8125rem]">
              {route.includes.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-[0.875rem] text-ink-soft">
                  <svg className="flex-shrink-0 text-accent" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                  {tIncludes(item as Parameters<typeof tIncludes>[0])}
                </div>
              ))}
              <div className="flex flex-col gap-2.5 mt-1.5">
                <Button variant="primary" size="sm" as="a" href="/#reserve" className="w-full justify-center">
                  {t("reserveBtn")}
                </Button>
                <Button variant="ghost" size="sm" as="a" href="/routes" className="w-full justify-center">
                  {t("backBtn")}
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Related routes */}
      {related.length > 0 && (
        <section className="max-w-content mx-auto px-8 pt-4 pb-[5.25rem]">
          <div className="flex items-center justify-between mb-7">
            <h2 className="font-serif text-[2rem] m-0">{t("moreOn")}</h2>
            <Link href="/routes" className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-ink-soft hover:text-ink transition-colors inline-flex items-center gap-1.5">
              {t("allRoutes")}
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <RouteCard
                key={r.slug}
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
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
