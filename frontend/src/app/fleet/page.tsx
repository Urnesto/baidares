import React from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

export const metadata = {
  title: "Fleet & pricing — Asvėjos baidarių centras",
};

// ─── Data ──────────────────────────────────────────────────────────────────

const waterCraft = [
  {
    id: "kayak",
    name: "Kayak",
    tagline: "Solo, tandem & triple",
    description:
      "High-performance sit-in kayaks in single, double and triple configurations. Nimble on flat lakes and comfortable over light current — the backbone of our fleet.",
    price: "€25",
    unit: "per vessel / day",
    badge: "Most popular",
    capacity: "",
    image: "url('images/baidares.jpg') center/cover no-repeat",
    features: ["Paddle & life vest included", "Beginner-friendly", "Available single / double / triple"],
    featured: true,
  },
  {
    id: "raft",
    name: "Raft",
    tagline: "Group adventure",
    description:
      "Stable six-person inflatable rafts — wide, forgiving, and sociable. Perfect for families, friend groups and corporate retreats.",
    price: "€100",
    unit: "per raft / day",
    badge: undefined,
    capacity: "Up to 6",
    image: "url('https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=900&q=75') center/cover no-repeat",
    features: ["Paddles & life vests included", "No experience needed", "Guide add-on available"],
    featured: false,
  },
  {
    id: "sup",
    name: "Paddleboard",
    tagline: "Stand-up · SUP",
    description:
      "Wide, stable SUP boards for a calm glide along the lake shoreline. Rented by the hour — ideal as a warm-up or a standalone session.",
    price: "€16",
    unit: "per board / hour",
    badge: undefined,
    capacity: "1 per board",
    image: "url('/images/suv.webp') center/cover no-repeat",
    features: ["Paddle & leash included", "Shoreline routes", "Yoga-SUP sessions on request"],
    featured: false,
  },
];

const shoreExperiences = [
  {
    id: "hot-tub",
    name: "Mobile hot tub",
    tagline: "Riverside relaxation",
    description:
      "A wood-fired cedar hot tub transported to your chosen riverside or lakeside location. Soak under open skies after a day on the water — a genuinely uncommon thing.",
    price: "€150",
    unit: "per day",
    capacity: "Up to 6 guests",
    image: "url('/images/kubilas.jpg') center 60%/cover no-repeat",
    overlay: "linear-gradient(to top, rgba(10,20,14,0.97) 0%, rgba(10,20,14,0.75) 45%, rgba(202,162,74,0.25) 100%)",
    features: ["Wood-fired · ready in ~90 min", "Wood included", "Delivery within 30 km"],
    tagVariant: "solid" as const,
  },
  {
    id: "sauna",
    name: "Mobile sauna",
    tagline: "Forest-heat · wild swim",
    description:
      "A fully portable barrel sauna set up by the water's edge. Heat up, then plunge straight into the lake. Birch whisks, eucalyptus oil and a roaring fire included.",
    price: "€120",
    unit: "per day",
    capacity: "Up to 8 guests",
    image: "url('/images/pirtis.jpg') center/cover no-repeat",
    overlay: "linear-gradient(to top, rgba(10,20,14,0.97) 0%, rgba(10,20,14,0.75) 45%, rgba(27,46,34,0.30) 100%)",
    features: [ "Wood included", "Delivery within 30 km"],
    tagVariant: "sage" as const,
  },
];

const included = [
  {
    icon: (
      <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
      </svg>
    ),
    title: "Safety gear",
    body: "Certified life vest and a dry bag for every paddler, included as standard.",
  },
  {
    icon: (
      <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 17l4-12 6 4 4-2-3 12" /><circle cx="6" cy="19" r="1.5" /><circle cx="18" cy="19" r="1.5" />
      </svg>
    ),
    title: "Transfers",
    body: "We shuttle you to the put-in and collect you at the take-out — no logistics to worry about.",
  },
  {
    icon: (
      <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M8 4v16M3 9h5" />
      </svg>
    ),
    title: "Waterproof map",
    body: "Laminated route map with landmarks, rest stops, and emergency exit points.",
  },
  {
    icon: (
      <svg width="1.25rem" height="1.25rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" /><path d="M8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" />
      </svg>
    ),
    title: "Friendly briefing",
    body: "A short onshore intro so first-timers feel fully confident before setting off.",
  },
];

const addons = [
  { name: "Certified guide", description: "A local naturalist leads your group for the full route.", price: "€60" },
  { name: "Riverside picnic", description: "Packed lunch of local produce, dropped at the halfway beach.", price: "€14 pp" },
  { name: "Camping kit", description: "Tent, sleeping mat and stove for multi-day expeditions.", price: "€30" },
  { name: "Photography session", description: "Drone and waterside photography — shareable edits same day.", price: "€90" },
];

// ─── Page ──────────────────────────────────────────────────────────────────

export default function FleetPage() {
  return (
    <>
      <div className="bg-surface border-b border-[var(--line)]">
        <Nav active="fleet" />
      </div>

      {/* Page header */}
      <header className="max-w-content mx-auto px-8 pt-16 pb-4 text-center">
        <Eyebrow center>Our fleet · 5 experiences</Eyebrow>
        <h1 className="font-serif text-[clamp(2.75rem,5vw,4rem)] leading-[1.0] m-0 mt-4 mb-5">
          Boats for every crew
        </h1>
        <p className="text-[1.0625rem] text-ink-soft mx-auto m-0 max-w-[52ch] leading-[1.65]">
          From solo paddlers to a party of eight — pick your vessel, we handle the transfers, gear and put-in. Prices are per day unless noted.
        </p>
      </header>

      {/* ── On the water ── */}
      <section className="max-w-content mx-auto px-8 pt-12 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-muted">On the water</span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>

        {/* Featured kayak card — full width */}
        <div className="relative rounded-[1.125rem] overflow-hidden mb-6 group">
          <div className="absolute inset-0" style={{ background: waterCraft[0].image }} />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-900/70 to-transparent" />
          <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row md:items-end justify-between gap-8 min-h-[22rem]">
            <div className="max-w-[38ch]">
              <div className="flex items-center gap-2 mb-4">
                <Tag variant="solid">Most popular</Tag>
                <span className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-cream/50">{waterCraft[0].capacity}</span>
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
              <Button variant="light" as="a" href="/#reserve">Reserve a kayak</Button>
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
                <Button variant="ghost" size="sm" as="a" href="/#reserve">Select {craft.name.toLowerCase()}</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Shore experiences ── */}
      <section className="max-w-content mx-auto px-8 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-muted">Shore experiences</span>
          <div className="flex-1 h-px bg-[var(--line)]" />
        </div>
        <p className="text-[0.9375rem] text-ink-soft max-w-[52ch] mb-8 mt-0 leading-[1.65]">
          Unique add-on experiences delivered to any riverside or lakeside location within 30 km of our base.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {shoreExperiences.map((exp) => (
            <div key={exp.id} className="relative rounded-[1.125rem] overflow-hidden group">
              <div className="absolute inset-0" style={{ background: exp.image }} />
              <div className="absolute inset-0" style={{ background: exp.overlay }} />

              <div className="relative z-10 p-7 flex flex-col min-h-[26rem]">
                {/* Tag */}
                <div className="mb-auto">
                  <Tag variant={exp.tagVariant} className="mb-4">
                    {exp.capacity}
                  </Tag>
                </div>

                {/* Content */}
                <div>
                  <p className="font-mono text-[0.5625rem] tracking-[0.16em] uppercase text-cream/50 mb-2">{exp.tagline}</p>
                  <h3 className="font-serif text-[2rem] leading-[1.05] text-cream m-0 mb-3">{exp.name}</h3>
                  <p className="text-[0.875rem] text-cream/75 leading-[1.65] m-0 mb-5">{exp.description}</p>

                  {/* Features */}
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

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between gap-4 pt-5 border-t border-cream/15">
                    <div>
                      <p className="font-mono text-[0.5rem] tracking-[0.1em] uppercase text-cream/40 mb-1">{exp.unit}</p>
                      <p className="font-serif text-[2.25rem] leading-none text-cream">{exp.price}</p>
                    </div>
                    <Button variant="light" size="sm" as="a" href="/#reserve">Enquire now</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="bg-paper-2 mt-16 py-20">
        <div className="max-w-content mx-auto px-8">
          <div className="text-center max-w-[34rem] mx-auto mb-10">
            <Eyebrow center>Every rental includes</Eyebrow>
            <h2 className="font-serif text-[2.25rem] leading-[1.05] m-0 mt-4">No hidden extras</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {included.map((item) => (
              <div key={item.title} className="p-6 bg-surface border border-[var(--line-soft)] rounded-[0.75rem]">
                <div className="w-[2.375rem] h-[2.375rem] rounded-[0.6875rem] bg-sage-200 text-forest-700 grid place-items-center mb-4 flex-shrink-0">
                  {item.icon}
                </div>
                <h4 className="font-serif text-[1.1875rem] m-0 mb-2">{item.title}</h4>
                <p className="text-[0.84375rem] text-muted m-0 leading-[1.55]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Add-ons ── */}
      <section className="max-w-content mx-auto px-8 py-16">
        <div className="flex items-baseline gap-4 mb-7">
          <div>
            <Eyebrow>Optional</Eyebrow>
            <h2 className="font-serif text-[2.25rem] leading-[1.05] m-0 mt-2">Add-ons</h2>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {addons.map((addon) => (
            <div key={addon.name} className="flex items-center justify-between gap-5 px-6 py-5 bg-surface border border-[var(--line)] rounded-[0.75rem] hover:border-[var(--line)] hover:shadow-sm transition-all duration-200">
              <div>
                <h4 className="font-serif text-[1.1875rem] m-0 mb-[0.1875rem]">{addon.name}</h4>
                <p className="text-[0.84375rem] text-muted m-0">{addon.description}</p>
              </div>
              <span className="font-serif text-[1.375rem] text-ink flex-shrink-0">{addon.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Group CTA band ── */}
      <section className="max-w-content mx-auto px-8 pb-20">
        <div className="bg-forest-900 text-cream rounded-[1.625rem] p-10 md:p-14 grid grid-cols-1 md:grid-cols-[1.4fr_auto] gap-8 items-center">
          <div>
            <p className="font-mono text-[0.625rem] tracking-[0.16em] uppercase text-sage-400 mb-3">For companies & large groups</p>
            <h2 className="font-serif text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.05] m-0 mb-3">Planning for a group?</h2>
            <p className="text-sage-400 m-0 max-w-[46ch] leading-[1.65] text-[0.9375rem]">
              We put whole companies on the water — up to 200 paddlers at once, with transfers, catering and a dedicated coordinator. Tell us your dates.
            </p>
          </div>
          <div className="flex flex-col gap-3 flex-shrink-0">
            <Button variant="light" as="a" href="mailto:hello@baidares.lt">Request a group quote</Button>
            <Button variant="ghost" as="a" href="/#reserve" className="border-cream/25 text-cream hover:bg-cream/10 hover:border-cream/50">
              Book individually
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
