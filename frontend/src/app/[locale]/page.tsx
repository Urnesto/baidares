import React from "react";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { RouteCard } from "@/components/RouteCard";
import { routes, rentalPrices } from "@/mocks";
import { FleetCard } from "@/components/FleetCard";
import { FleetSlider } from "@/components/FleetSlider";
import { ReservationCard } from "@/components/ReservationCard";

export default async function Home() {
  const t = await getTranslations("home");
  const tDiff = await getTranslations("difficulty");
  const tRoutes = await getTranslations("routes");
  const tFleet = await getTranslations("fleet");

  return (
    <>
      {/* ===== HERO ===== */}
      <header className="relative min-h-[47.5rem] text-[#f4f3ea] overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{ background: "url('/images/hero.webp') center/cover no-repeat, linear-gradient(180deg,#3a5246,#4a726b)" }}
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(180deg,rgba(16,29,21,.5) 0%,rgba(16,29,21,.18) 34%,rgba(16,29,21,.62) 100%), linear-gradient(90deg,rgba(16,29,21,.5) 0%,rgba(16,29,21,.05) 58%)" }}
        />

        <Nav overlay active="home" />

        <div className="relative z-[5] max-w-content mx-auto px-8 items-start grid grid-cols-1 lg:grid-cols-[1.25fr_0.9fr] gap-10 items-end pt-[10.625rem] pb-[4.375rem]">
          <div>
            <h1
              className="font-serif font-normal m-0 leading-[1.0] tracking-[-0.005em]"
              style={{ fontSize: "clamp(3rem, 6.4vw, 5.5rem)", textShadow: "0 2px 1.875rem rgba(0,0,0,.25)" }}
            >
              {t("heroTitle").split("\n").map((line, i) => (
                <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
              ))}
            </h1>
            <p className="text-[1.125rem] text-white max-w-[42ch] mt-[1.375rem] mb-[1.875rem] leading-[1.6]">
              {t("heroSubtitle")}
            </p>
            <div className="flex gap-[0.8125rem] flex-wrap">
              <Button variant="light" as="a" href="#reserve">{t("heroReserve")}</Button>
              <Button variant="ghost" as="a" href="/routes" className="!border-[rgba(244,243,234,0.4)] !text-[#f4f3ea]">
                {t("heroViewRoutes")}
              </Button>
            </div>
          </div>

          {/* Reservation card */}
          <ReservationCard />
        </div>
      </header>

      {/* ===== POPULAR ROUTES ===== */}
      <section className="py-24 max-w-content mx-auto px-8">
        <div className="flex items-center justify-between flex-wrap gap-6 mb-9">
          <div>
            <Eyebrow>{t("popularEyebrow")}</Eyebrow>
            <h2 className="font-serif font-normal m-0 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}>
              {t("popularTitle")}
            </h2>
          </div>
          <Button variant="ghost" size="sm" as="a" href="/routes">{t("popularSeeAll", { count: routes.length })}</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.slice(0, 3).map((r) => (
            <RouteCard
              key={r.slug}
              title={r.title}
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
          ))}
        </div>
      </section>

      {/* ===== FLEET ===== */}
      <section className="py-24" style={{ background: "#ece9dd" }}>
        <div className="max-w-content mx-auto px-8">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-[2.125rem]">
            <div>
              <Eyebrow>{t("fleetEyebrow")}</Eyebrow>
              <h2 className="font-serif font-normal m-0 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}>
                {t("fleetTitle")}
              </h2>
              <p className="text-[1.125rem] text-ink-soft mt-[0.875rem] max-w-[54ch] leading-[1.6] mb-0">
                {t("fleetDesc")}
              </p>
            </div>
            <div className="flex items-center gap-[0.875rem]">
              <FleetSlider />
            </div>
          </div>

          <div
            id="fleetSlider"
            className="grid gap-[1.125rem] overflow-x-auto pb-1"
            style={{ gridAutoFlow: "column", gridAutoColumns: "minmax(18.125rem, 1fr)", scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
          >
            <FleetCard title={tFleet("kayak.title")} description={tFleet("kayak.desc")} features={tFleet.raw("kayak.features") as string[]} image="forest" badge={tFleet("kayak.badge")} />
            <FleetCard title={tFleet("raft.title")} description={tFleet("raft.desc")} features={tFleet.raw("raft.features") as string[]} image="water" />
            <FleetCard title={tFleet("sup.title")} description={tFleet("sup.desc")} features={tFleet.raw("sup.features") as string[]} image="aerial" />
            <FleetCard title={tFleet("sauna.title")} description={tFleet("sauna.desc")} features={tFleet.raw("sauna.features") as string[]} image="pine" />
            <FleetCard title={tFleet("hotTub.title")} description={tFleet("hotTub.desc")} features={tFleet.raw("hotTub.features") as string[]} image="mist" />
          </div>
        </div>
      </section>

      {/* ===== KAINOS ===== */}
      <section id="kainos" className="py-24" style={{ background: "#ece9dd" }}>
        <div className="max-w-content mx-auto px-8">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-10">
            <div>
              <Eyebrow>{t("pricingEyebrow")}</Eyebrow>
              <h2 className="font-serif font-normal m-0 mt-3 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}>
                {t("pricingTitle")}
              </h2>
            </div>
            <Button variant="ghost" size="sm" as="a" href="#reserve">{t("heroReserve")}</Button>
          </div>

          {/* Included pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {(t.raw("pricingIncluded") as string[]).map((item: string) => (
              <span key={item} className="flex items-center gap-1.5 px-3.5 py-2 bg-surface border border-[var(--line-soft)] rounded-full text-[0.8125rem] text-ink">
                <svg className="text-accent flex-shrink-0" width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12l4 4L19 6" /></svg>
                {item}
              </span>
            ))}
          </div>

          {/* Pricing table */}
          <div className="rounded-[1rem] overflow-hidden border border-[var(--line)] bg-surface">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_6.5rem_10rem_6.5rem] border-b border-[var(--line)]">
              <div className="px-5 py-3.5">
                <span className="font-mono text-[0.5875rem] tracking-[0.12em] uppercase text-muted">{t("pricingBoat")}</span>
              </div>
              {[
                { label: "I–IV", sub: t("pricingSubWeekday"), accent: false },
                { label: "V–VI", sub: t("pricingSubWeekend"), accent: true  },
                { label: "VII",  sub: t("pricingSubSunday"),  accent: false },
              ].map((col) => (
                <div key={col.label} className={`px-5 py-3.5 text-center ${col.accent ? "bg-accent/5" : ""}`}>
                  <span className={`font-mono text-[0.5875rem] tracking-[0.12em] uppercase block mb-0.5 ${col.accent ? "text-accent" : "text-muted"}`}>{col.label}</span>
                  <span className="font-mono text-[0.47rem] tracking-[0.07em] uppercase text-muted/60 hidden sm:block">{col.sub}</span>
                </div>
              ))}
            </div>


            {rentalPrices.map((row) => (
              <div
                key={row.nameKey}
                className={`grid grid-cols-[1fr_6.5rem_10rem_6.5rem] border-b border-[var(--line)] last:border-b-0 ${row.dark ? "bg-forest-950" : ""}`}
              >
                <div className="px-5 py-4 flex items-center">
                  <span className={`font-serif text-[1.0625rem] leading-none ${row.dark ? "text-cream" : "text-ink"}`}>{t(row.nameKey as Parameters<typeof t>[0])}</span>
                </div>
                {[
                  { val: row.weekday, accent: false },
                  { val: row.weekend, accent: true },
                  { val: row.sunday,  accent: false },
                ].map((cell, ci) => (
                  <div key={ci} className={`px-5 py-4 flex items-center justify-center ${cell.accent && !row.dark ? "bg-accent/5" : ""}`}>
                    <span className={`font-serif text-[1.375rem] leading-none ${row.dark ? "text-cream" : cell.accent ? "text-accent" : "text-ink"}`}>€{cell.val}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="font-mono text-[0.5625rem] tracking-[0.08em] uppercase text-muted mt-3">
            {t("pricingNote")}
          </p>
        </div>
      </section>

            {/* ===== GALLERY ===== */}
      <section className="py-24 max-w-content mx-auto px-8">
        <div className="text-center max-w-[37.5rem] mx-auto mb-11">
          <Eyebrow center>{t("galleryEyebrow")}</Eyebrow>
          <h2 className="font-serif font-normal m-0 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}>
            {t("galleryTitle")}
          </h2>
          
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { bg: "url('https://images.unsplash.com/photo-1696469014188-e6d7ea983c56?auto=format&fit=crop&w=600&q=70') center/cover no-repeat, linear-gradient(180deg,#caa24a,#2f4631)", mt: "0" },
            { bg: "url('https://images.unsplash.com/photo-1586699253884-e199770f63b9?auto=format&fit=crop&w=600&q=70') center/cover no-repeat, linear-gradient(180deg,#3a5246,#4a726b)",  mt: "1.75rem" },
            { bg: "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=70') center/cover no-repeat, linear-gradient(180deg,#2f4634,#1c3324)", mt: "-0.625rem" },
            { bg: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=70') center/cover no-repeat, linear-gradient(180deg,#5a6f63,#33493a)",  mt: "1.125rem" },
          ].map((item, i) => (
            <div key={i} className="rounded-[0.75rem] overflow-hidden" style={{ aspectRatio: "3/4", background: item.bg, marginTop: item.mt }} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
