"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { routes } from "@/mocks";

const TARGET_RIVERS = ["Žeimena", "Dubinga", "Mera", "Lakaja", "Asveja"];

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function ReservationCard() {
  const t = useTranslations("reservation");
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone">("email");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const day1Routes = useMemo(
    () => routes.filter((r) => TARGET_RIVERS.includes(r.river) && r.days === 1),
    []
  );
  const day2Routes = useMemo(
    () => routes.filter((r) => TARGET_RIVERS.includes(r.river) && r.days === 2),
    []
  );

  const [selectedSlug, setSelectedSlug] = useState(day1Routes[0]?.slug ?? "");

  const selectedRoute = useMemo(
    () => routes.find((r) => r.slug === selectedSlug),
    [selectedSlug]
  );

  function handleCheckAvailability(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setModalOpen(true);
  }

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setDone(true);
  }

  function closeModal() {
    setModalOpen(false);
    if (done) {
      setDone(false);
      setSubmitted(false);
    }
  }

  return (
    <>
      <div id="reserve" className="bg-white text-ink rounded-[1.625rem] p-[1.375rem] shadow-lg border border-white/60">
        <div className="flex items-center justify-between mb-4 gap-3">
          <h3 className="font-serif text-[1.625rem] m-0 font-normal leading-none whitespace-nowrap">{t("cardTitle")}</h3>
          <Tag variant="sage">{t("instantTag")}</Tag>
        </div>
        <form onSubmit={handleCheckAvailability}>
          <div className="grid grid-cols-2 gap-[0.625rem]">
            <div className="flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">{t("boatTypeLabel")}</label>
              <select name="boat" className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink appearance-none w-full focus:outline-none focus:border-accent">
                <option>Kayak</option><option>Canoe</option><option>Raft</option><option>Paddleboard</option>
              </select>
            </div>
            <div className="flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">{t("peopleLabel")}</label>
              <input type="number" name="people" min={1} max={200} defaultValue={2} className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent" />
            </div>
            <div className="col-span-2 flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">{t("routeLabel")}</label>
              <select
                name="route"
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink appearance-none w-full focus:outline-none focus:border-accent"
              >
                <optgroup label="— 1 Day —">
                  {day1Routes.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.river} · {capitalize(r.difficulty)} · {r.distanceKm} km
                    </option>
                  ))}
                </optgroup>
                <optgroup label="— 2 Days —">
                  {day2Routes.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.river} · {capitalize(r.difficulty)} · {r.distanceKm} km
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <div className="col-span-2 flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">{t("dateLabel")}</label>
              <input type="date" name="date" defaultValue="2026-06-14" className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-[0.875rem] mt-[0.875rem] mb-[0.875rem] pt-[0.8125rem] border-t border-[var(--line)]">
            <div className="flex flex-col gap-[0.1875rem] min-w-0">
              <span className="text-[0.8125rem] text-ink whitespace-nowrap overflow-hidden text-ellipsis">
                {selectedRoute ? `${selectedRoute.river} · ${selectedRoute.title}` : "Select a route"}
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.09em] uppercase text-muted">
                {selectedRoute ? `${capitalize(selectedRoute.difficulty)} · ${selectedRoute.days === 2 ? "2 days" : "1 day"}` : ""}
              </span>
            </div>
            <span className="font-mono text-[0.6875rem] tracking-[0.06em] uppercase text-muted whitespace-nowrap">
              {t("fromPrice")} <span className="font-serif text-[1.1875rem] text-ink tracking-normal normal-case ml-1">€{selectedRoute?.price ?? "—"}</span>
            </span>
          </div>
          <Button variant="primary" block type="submit">
            {submitted ? t("orderNow") : t("checkAvailability")}
          </Button>
        </form>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(16,29,21,0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-[1.625rem] shadow-2xl w-full max-w-[26rem] p-7 relative">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-muted hover:text-ink transition-colors text-[1.25rem] leading-none"
              aria-label={t("close")}
            >
              ✕
            </button>

            {done ? (
              <div className="text-center py-4">
                <div className="text-[2.5rem] mb-3">🛶</div>
                <h3 className="font-serif text-[1.5rem] font-normal m-0 mb-2">{t("successTitle")}</h3>
                <p className="text-[0.9375rem] text-ink-soft leading-[1.6] m-0">
                  {t("successBody")}
                </p>
                <Button variant="primary" block className="mt-6" onClick={closeModal} type="button">
                  {t("close")}
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-[1.5rem] text-ink-soft font-normal m-0 mb-1">{t("modalTitle")}</h3>
                <p className="text-[0.875rem] text-ink-soft mb-5 m-0">{t("modalSubtitle")}</p>

                <form onSubmit={handleOrder} className="flex flex-col gap-[0.875rem]">
                  <div className="flex flex-col gap-[0.3125rem]">
                    <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">{t("emailLabel")}</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-[0.3125rem]">
                    <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">{t("phoneLabel")}</label>
                    <input
                      type="tel"
                      required
                      placeholder="+370 600 00000"
                      className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-[0.5rem]">
                    <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">{t("contactLabel")}</label>
                    <div className="grid grid-cols-3 gap-[0.5rem]">
                      {(["email", "phone"] as const).map((method) => (
                        <label
                          key={method}
                          className={`flex flex-col items-center gap-1 py-[0.6875rem] rounded-[0.6875rem] border cursor-pointer transition-all text-[0.8125rem] font-medium capitalize select-none ${
                            contactMethod === method
                              ? "border-accent bg-accent/5 text-accent"
                              : "border-[var(--line)] bg-[#fbfaf4] text-ink hover:border-ink/30"
                          }`}
                        >
                          <input
                            type="radio"
                            name="contact"
                            value={method}
                            className="sr-only"
                            checked={contactMethod === method}
                            onChange={() => setContactMethod(method)}
                          />
                          <span className="text-[1.125rem]">
                            {method === "email" ? "✉️" : "📞"}
                          </span>
                          {method === "email" ? t("emailOption") : t("phoneOption")}
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button variant="primary" block type="submit" className="mt-1">
                    {sending ? t("sending") : t("confirmOrder")}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
