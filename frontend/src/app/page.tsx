import React from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { RouteCard } from "@/components/RouteCard";
import { FleetCard } from "@/components/FleetCard";
import { FleetSlider } from "@/components/FleetSlider";
import { ReservationCard } from "@/components/ReservationCard";

export default function Home() {
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
            {/* <div className="inline-flex items-center sm:hid  gap-2 font-mono text-[0.575rem] md:text-[0.6875rem] tracking-[0.16em] uppercase bg-[rgba(244,243,234,0.14)] backdrop-blur-md px-[0.875rem] py-[0.4375rem] rounded-full mb-[1.375rem] border border-[rgba(244,243,234,0.18)] max-w-full overflow-hidden">
              <span className="">Baicares · Pirtis · Kubilas · Sauna</span>
           
            </div> */}
            <h1
              className="font-serif font-normal m-0 leading-[1.0] tracking-[-0.005em]"
              style={{ fontSize: "clamp(3rem, 6.4vw, 5.5rem)", textShadow: "0 2px 1.875rem rgba(0,0,0,.25)" }}
            >
              Explore every<br />waterway
            </h1>
            <p className="text-[1.125rem] text-white max-w-[42ch] mt-[1.375rem] mb-[1.875rem] leading-[1.6]">
              Guided and self-paced kayak journeys through the lakes, rivers and ancient pine forests of the Žemaitija regional park.
            </p>
            <div className="flex gap-[0.8125rem] flex-wrap">
              <Button variant="light" as="a" href="#reserve">Reserve a kayak</Button>
              <Button variant="ghost" as="a" href="/routes" className="!border-[rgba(244,243,234,0.4)] !text-[#f4f3ea]">
                View all routes →
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
            <Eyebrow>Most popular</Eyebrow>
            <h2 className="font-serif font-normal m-0 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}>
              Hand-picked journeys
            </h2>
          </div>
          <Button variant="ghost" size="sm" as="a" href="/routes">See all 12 routes →</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouteCard title="The Morning Glass" subtitle="Lūšiai lake · still water" difficulty="easy" distance="8 km" duration="2–3 hrs" terrain="Flat water" image="sunset" href="/routes/the-morning-glass" />
          <RouteCard title="The Whispering Pines" subtitle="Žeimena river · forest run" difficulty="moderate" distance="14 km" duration="4–5 hrs" terrain="Light current" image="pine" href="/routes/the-whispering-pines" />
          <RouteCard title="The Rapid Descent" subtitle="Šventoji river · fast water" difficulty="hard" distance="11 km" duration="3–4 hrs" terrain="Rapids II" image="river" href="/routes/the-rapid-descent" />
        </div>
      </section>

      {/* ===== FLEET ===== */}
      <section className="py-24" style={{ background: "#ece9dd" }}>
        <div className="max-w-content mx-auto px-8">
          <div className="flex items-center justify-between flex-wrap gap-6 mb-[2.125rem]">
            <div>
              <Eyebrow>Our fleet</Eyebrow>
              <h2 className="font-serif font-normal m-0 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}>
                Boats for every crew
              </h2>
              <p className="text-[1.125rem] text-ink-soft mt-[0.875rem] max-w-[54ch] leading-[1.6] mb-0">
                With 200+ vessels we can put a whole company on the water at once.
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
            <FleetCard title="Kayak rent" description="High-performance kayaks for every crew, from solo paddlers to small groups." features={["One-person", "Two-person", "Three-person"]} image="forest" badge="Most popular" ctaLabel="Book now" />
            <FleetCard title="Raft rent" description="Roomy rafts for journeys and corporate retreats — paddles always included." features={["Up to 8 people", "Paddles included"]} image="water" ctaLabel="Select" />
            <FleetCard title="SUP rent" description="Stable stand-up paddleboards for a calm glide along the lake shoreline." features={["Paddles included", "Life vests included"]} image="aerial" ctaLabel="Select" />
            <FleetCard title="Mobile sauna" description="Portable wood-fired sauna delivered lakeside — warm up between paddles." features={["4–8 people", "Firewood included"]} image="pine" ctaLabel="Enquire" />
            <FleetCard title="Mobile hot tub" description="A heated hot tub by the water with soft LED lighting for evening soaks." features={["6–8 people", "LED lighting"]} image="mist" ctaLabel="Enquire" />
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="py-24 max-w-content mx-auto px-8">
        <div className="text-center max-w-[37.5rem] mx-auto mb-11">
          <Eyebrow center>Customer adventures</Eyebrow>
          <h2 className="font-serif font-normal m-0 leading-[1.0]" style={{ fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)" }}>
            Moments from the water
          </h2>
          <p className="text-[1.125rem] text-ink-soft mt-[0.875rem] max-w-[54ch] mx-auto leading-[1.6]">
            Shared by paddlers across the Žemaitija lakes and rivers.
          </p>
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
