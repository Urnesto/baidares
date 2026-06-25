import React from "react";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { rentalPrices } from "@/mocks";

function lowestPrice(...nameKeys: string[]): number {
  return Math.min(
    ...rentalPrices
      .filter((r) => nameKeys.includes(r.nameKey))
      .map((r) => r.weekday)
  );
}

export async function generateMetadata() {
  const t = await getTranslations("fleet");
  return { title: t("metaTitle") };
}

export default async function FleetPage() {
  const t = await getTranslations("fleet");

  const waterCraft = [
    {
      id: "kayak",
      name: t("kayak.title"),
      tagline: "Solo, tandem & triple",
      description: t("kayak.desc"),
      price: `€${lowestPrice("pricingBoatSingle", "pricingBoatDouble", "pricingBoatTriple")}`,
      unit: t("perDay"),
      badge: t("kayak.badge"),
      capacity: "",
      image: "url('/images/baidares.jpg') center/cover no-repeat",
      features: t.raw("kayak.features") as string[],
      featured: true,
    },
    {
      id: "raft",
      name: t("raft.title"),
      tagline: "Group adventure",
      description: t("raft.desc"),
      price: `€${lowestPrice("pricingBoatRaft")}`,
      unit: t("perDay"),
      badge: undefined,
      capacity: (t.raw("raft.features") as string[])[0],
      image: "url('https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=900&q=75') center/cover no-repeat",
      features: t.raw("raft.features") as string[],
      featured: false,
    },
    {
      id: "sup",
      name: t("sup.title"),
      tagline: "Stand-up · SUP",
      description: t("sup.desc"),
      price: "€16",
      unit: "/ day",
      badge: undefined,
      capacity: "1 per board",
      image: "url('/images/suv.webp') center/cover no-repeat",
      features: t.raw("sup.features") as string[],
      featured: false,
    },
  ];

  const shoreExperiences = [
    {
      id: "hot-tub",
      name: t("hotTub.title"),
      tagline: "Riverside relaxation",
      description: t("hotTub.desc"),
      price: "€150",
      unit: t("perDay"),
      capacity: (t.raw("hotTub.features") as string[])[0],
      image: "url('/images/kubilas.jpg') center 60%/cover no-repeat",
      overlay: "linear-gradient(to top, rgba(10,20,14,0.97) 0%, rgba(10,20,14,0.75) 45%, rgba(202,162,74,0.25) 100%)",
      features: ["Wood-fired · ready in ~90 min", "Wood included", "Delivery within 30 km"],
      tagVariant: "solid" as const,
    },
    {
      id: "sauna",
      name: t("sauna.title"),
      tagline: "Forest-heat · wild swim",
      description: t("sauna.desc"),
      price: "€120",
      unit: t("perDay"),
      capacity: (t.raw("sauna.features") as string[])[0],
      image: "url('/images/pirtis.jpg') center/cover no-repeat",
      overlay: "linear-gradient(to top, rgba(10,20,14,0.97) 0%, rgba(10,20,14,0.75) 45%, rgba(27,46,34,0.30) 100%)",
      features: ["Wood included", "Delivery within 30 km"],
      tagVariant: "sage" as const,
    },
  ];

  const addons = [
    { name: "Certified guide", description: "A local naturalist leads your group for the full route.", price: "€60" },
    { name: "Riverside picnic", description: "Packed lunch of local produce, dropped at the halfway beach.", price: "€14 pp" },
    { name: "Camping kit", description: "Tent, sleeping mat and stove for multi-day expeditions.", price: "€30" },
    { name: "Photography session", description: "Drone and waterside photography — shareable edits same day.", price: "€90" },
  ];

  return (
    <>
      <div className="bg-surface border-b border-[var(--line)]">
        <Nav active="services" />
      </div>

      {/* Page header */}
      <header className="max-w-content mx-auto px-8 pt-16 pb-4 text-center">
        <Eyebrow center>{t("eyebrow")}</Eyebrow>
        <h1 className="font-serif text-[clamp(2.75rem,5vw,4rem)] leading-[1.0] m-0 mt-4 mb-5">
          {t("title")}
        </h1>
        <p className="text-[1.0625rem] text-ink-soft mx-auto m-0 max-w-[52ch] leading-[1.65]">
          {t("desc")}
        </p>
      </header>

      {/* ── On the water ── */}
      <section className="max-w-content mx-auto px-8 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-muted">{t("onWaterTitle")}</span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Featured kayak card */}
        <div className="relative rounded-[1.125rem] overflow-hidden mb-6 group">
          <div className="absolute inset-0" style={{ background: waterCraft[0].image }} />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-900/70 to-transparent" />
          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-8 min-h-[22rem]">
            <div className="max-w-[38ch]">
              <div className="flex items-center gap-2 mb-4">
                <Tag variant="solid">{waterCraft[0].badge}</Tag>
              </div>
              <h2 className="font-serif text-[2.75rem] leading-[1.0] text-cream m-0 mb-3">{waterCraft[0].name}</h2>
              <p className="font-mono text-[0.6875rem] tracking-[0.1em] uppercase text-sage-300 mb-4">{waterCraft[0].tagline}</p>
              <p className="text-cream/75 text-[0.9375rem] leading-[1.65] m-0 mb-6">{waterCraft[0].description}</p>
              <div className="flex flex-wrap gap-2">
                {waterCraft[0].features.map((f) => (
                  <span key={f} className="font-mono text-[0.625rem] tracking-[0.07em] uppercase px-[0.625rem] py-[0.3125rem] border border-cream/25 rounded-full text-cream/80">
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-start md:items-end gap-4">
              <div>
                <p className="font-mono text-[0.5625rem] tracking-[0.1em] uppercase text-cream/40 mb-1 md:text-right">{waterCraft[0].unit}</p>
                <p className="font-serif text-[3rem] leading-none text-cream">{waterCraft[0].price}</p>
              </div>
             
            </div>
          </div>
        </div>

        {/* Raft + SUP side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {waterCraft.slice(1).map((craft) => (
            <div key={craft.id} className="bg-surface border border-[var(--line-soft)] rounded-[1.125rem] overflow-hidden hover:-translate-y-1 hover:border-[var(--line)] hover:shadow-sm transition-all duration-[350ms]">
              <div className="relative" style={{ aspectRatio: "16/9" }}>
                <div className="absolute inset-0" style={{ background: craft.image }} />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="font-mono text-[0.5625rem] tracking-[0.1em] uppercase text-cream/60">{craft.capacity}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-serif text-[1.875rem] m-0">{craft.name}</h3>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-[0.5rem] tracking-[0.08em] uppercase text-muted mb-0.5">{craft.unit}</p>
                    <p className="font-serif text-[1.625rem] leading-none text-ink">{craft.price}</p>
                  </div>
                </div>
                <p className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-muted mb-3">{craft.tagline}</p>
                <p className="text-[0.875rem] text-ink-soft leading-[1.6] m-0 mb-5">{craft.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {craft.features.map((f) => (
                    <span key={f} className="font-mono text-[0.5625rem] tracking-[0.07em] uppercase px-2.5 py-1 border border-[var(--line)] rounded-full text-muted">
                      {f}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Shore experiences ── */}
      <section className="max-w-content mx-auto px-8 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-muted">{t("shoreTitle")}</span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shoreExperiences.map((exp) => (
            <div key={exp.id} className="relative rounded-[1.125rem] overflow-hidden group">
              <div className="absolute inset-0" style={{ background: exp.image }} />
              <div className="absolute inset-0" style={{ background: exp.overlay }} />
              <div className="relative z-10 p-7 flex flex-col min-h-[26rem]">
                <div className="mb-auto">
                  <Tag variant={exp.tagVariant} className="mb-4">{exp.capacity}</Tag>
                </div>
                <div>
                  <p className="font-mono text-[0.5625rem] tracking-[0.16em] uppercase text-cream/50 mb-2">{exp.tagline}</p>
                  <h3 className="font-serif text-[2rem] leading-[1.05] text-cream m-0 mb-3">{exp.name}</h3>
                  <p className="text-[0.875rem] text-cream/75 leading-[1.65] m-0 mb-5">{exp.description}</p>
                  <div className="flex flex-col gap-2 mb-6">
                    {exp.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-[0.8125rem] text-cream/80">
                        <svg className="flex-shrink-0 text-sage-300" width="0.875rem" height="0.875rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12l4 4L19 6" />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-end justify-between gap-4 pt-5 border-t border-cream/15">
                    <div>
                      <p className="font-mono text-[0.5rem] tracking-[0.1em] uppercase text-cream/40 mb-1">{exp.unit}</p>
                      <p className="font-serif text-[2.25rem] leading-none text-cream">{exp.price}</p>
                    </div>
                    <Button variant="light" size="sm" as="a" href="/#reserve">{t("enquire")}</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
