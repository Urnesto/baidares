"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { routes } from "@/mocks";

const TARGET_RIVERS = ["Žeimena", "Dubinga", "Mera", "Lakaja", "Asveja"];
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const inputCls = "font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent";
const labelCls = "font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted";

export function ReservationCard() {
  const t = useTranslations("reservation");

  const [submitted, setSubmitted]         = useState(false);
  const [modalOpen, setModalOpen]         = useState(false);
  const [termsOpen, setTermsOpen]         = useState(false);
  const [sending, setSending]             = useState(false);
  const [done, setDone]                   = useState(false);
  const [agreed, setAgreed]               = useState(false);
  const [formData, setFormData]           = useState({ boat: "", people: "2", date: "2026-06-14" });

  const day1Routes = useMemo(() => routes.filter((r) => TARGET_RIVERS.includes(r.river) && r.days === 1), []);
  const day2Routes = useMemo(() => routes.filter((r) => TARGET_RIVERS.includes(r.river) && r.days === 2), []);
  const [selectedSlug, setSelectedSlug]   = useState(day1Routes[0]?.slug ?? "");
  const selectedRoute = useMemo(() => routes.find((r) => r.slug === selectedSlug), [selectedSlug]);

  function handleCheckAvailability(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setFormData({
      boat:   fd.get("boat") as string,
      people: fd.get("people") as string,
      date:   fd.get("date") as string,
    });
    setSubmitted(true);
    setModalOpen(true);
  }

  async function handleOrder(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const fd = new FormData(e.currentTarget);
    await fetch("/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone:  fd.get("phone"),
        email:  fd.get("email"),
        route:  selectedRoute
          ? `${selectedRoute.river} · ${selectedRoute.title} · ${selectedRoute.distanceKm} km · ${selectedRoute.days === 1 ? "1 diena" : "2 dienos"}`
          : selectedSlug,
        boat:   formData.boat,
        people: formData.people,
        date:   formData.date,
      }),
    });
    setSending(false);
    setDone(true);
  }

  function closeModal() {
    setModalOpen(false);
    if (done) { setDone(false); setSubmitted(false); setAgreed(false); }
  }

  return (
    <>
      {/* ── Reservation card ── */}
      <div id="reserve" className="bg-white text-ink rounded-[1.625rem] p-[1.375rem] shadow-lg border border-white/60">
        <div className="flex items-center justify-between mb-4 gap-3">
          <h3 className="font-serif text-[1.625rem] m-0 font-normal leading-none whitespace-nowrap">{t("cardTitle")}</h3>
          <Tag variant="sage">{t("instantTag")}</Tag>
        </div>

        <form onSubmit={handleCheckAvailability}>
          <div className="grid grid-cols-2 gap-[0.625rem]">
            {/* Boat type */}
            <div className="flex flex-col gap-[0.3125rem]">
              <label className={labelCls}>{t("boatTypeLabel")}</label>
              <select name="boat" className={inputCls} style={{ appearance: "none" }}>
                <option value="kayak">{t("boatKayak")}</option>
                <option value="canoe">{t("boatCanoe")}</option>
                <option value="raft">{t("boatRaft")}</option>
                <option value="paddleboard">{t("boatPaddleboard")}</option>
              </select>
            </div>

            {/* People */}
            <div className="flex flex-col gap-[0.3125rem]">
              <label className={labelCls}>{t("peopleLabel")}</label>
              <input type="number" name="people" min={1} max={200} required defaultValue={2} className={inputCls} />
            </div>

            {/* Route */}
            <div className="col-span-2 flex flex-col gap-[0.3125rem]">
              <label className={labelCls}>{t("routeLabel")}</label>
              <select
                name="route"
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className={inputCls}
                style={{ appearance: "none" }}
              >
                <optgroup label={t("groupOneDay")}>
                  {day1Routes.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.river} · {capitalize(r.difficulty)} · {r.distanceKm} km
                    </option>
                  ))}
                </optgroup>
                <optgroup label={t("groupTwoDays")}>
                  {day2Routes.map((r) => (
                    <option key={r.slug} value={r.slug}>
                      {r.river} · {capitalize(r.difficulty)} · {r.distanceKm} km
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Date */}
            <div className="col-span-2 flex flex-col gap-[0.3125rem]">
              <label className={labelCls}>{t("dateLabel")}</label>
              <input type="date" name="date" required defaultValue="2026-06-14" className={inputCls} />
            </div>

         
          </div>

          {/* Summary row */}
          <div className="flex items-center justify-between gap-[0.875rem] mt-[0.875rem] mb-[0.875rem] pt-[0.8125rem] border-t border-[var(--line)]">
            <div className="flex flex-col gap-[0.1875rem] min-w-0">
              <span className="text-[0.8125rem] text-ink whitespace-nowrap overflow-hidden text-ellipsis">
                {selectedRoute ? `${selectedRoute.river} · ${selectedRoute.title}` : t("selectRoute")}
              </span>
              <span className="font-mono text-[0.625rem] tracking-[0.09em] uppercase text-muted">
                {selectedRoute ? `${capitalize(selectedRoute.difficulty)} · ${selectedRoute.days === 2 ? t("durationTwoDays") : t("durationOneDay")}` : ""}
              </span>
            </div>
          </div>

          <Button variant="primary" block type="submit">
            {submitted ? t("orderNow") : t("checkAvailability")}
          </Button>
        </form>
      </div>

      {/* ── Order modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: "rgba(16,29,21,0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-[1.625rem] shadow-2xl w-full max-w-[26rem] p-7 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 text-muted hover:text-ink transition-colors text-[1.25rem] leading-none"
              aria-label={t("close")}
            >✕</button>

            {done ? (
              <div className="text-center py-4">
                <div className="text-[2.5rem] mb-3">🛶</div>
                <h3 className="font-serif text-[1.5rem] text-accent font-normal m-0 mb-2">{t("successTitle")}</h3>
                <p className="text-[0.9375rem] text-ink-soft leading-[1.6] m-0">{t("successBody")}</p>
                <Button variant="primary" block className="mt-6" onClick={closeModal} type="button">
                  {t("close")}
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-[1.5rem] text-ink-soft font-normal m-0 mb-3">{t("modalTitle")}</h3>

                {/* Info notice */}
                <div className="mb-5 p-3.5 bg-sage-50 border border-sage-200 rounded-[0.75rem]">
                  <p className="text-[0.8125rem] text-ink leading-[1.55] m-0">{t("modalSubtitle")}</p>
                </div>

                <form onSubmit={handleOrder} className="flex flex-col gap-[0.875rem]">
                  <div className="flex flex-col gap-[0.3125rem]">
                    <label className={labelCls}>
                      {t("phoneLabel")}<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <input type="tel" name="phone" required placeholder="+370 600 00000" className={inputCls} />
                  </div>

                  <div className="flex flex-col gap-[0.3125rem]">
                    <label className={labelCls}>{t("emailLabel")}</label>
                    <input type="email" name="email" placeholder="you@example.com" className={inputCls} />
                  </div>

                 
                  {/* Agreement */}
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      required
                      checked={agreed}
                      onChange={() => setAgreed((v) => !v)}
                      className="mt-0.5 w-4 h-4 accent-[var(--accent)] flex-shrink-0"
                    />
                    <span className="text-[0.8125rem] text-ink-soft leading-[1.5]">
                      {t("agreePrefix")}{" "}
                      <button
                        type="button"
                        onClick={() => setTermsOpen(true)}
                        className="text-accent underline underline-offset-2 hover:text-accent-hover transition-colors"
                      >
                        {t("agreeTermsLink")}
                      </button>
                    </span>
                  </label>

                  <Button variant="primary" block type="submit" className="mt-1">
                    {sending ? t("sending") : t("confirmOrder")}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Terms modal ── */}
      {termsOpen && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4"
          style={{ background: "rgba(16,29,21,0.65)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setTermsOpen(false); }}
        >
          <div className="bg-white rounded-[1.625rem] shadow-2xl w-full max-w-[26rem] p-7 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setTermsOpen(false)}
              className="absolute top-5 right-5 text-muted hover:text-ink transition-colors text-[1.25rem] leading-none"
              aria-label={t("close")}
            >✕</button>

            <h3 className="font-serif text-[1.5rem] font-normal m-0 mb-5">{t("termsTitle")}</h3>
            <div className="flex flex-col gap-3">
              {t("termsBody").split("\n").map((line, i) => (
                <p key={i} className="text-[0.875rem] text-ink-soft leading-[1.6] m-0">{line}</p>
              ))}
            </div>
            <Button variant="primary" block className="mt-7" onClick={() => { setAgreed(true); setTermsOpen(false); }} type="button">
              {t("agreePrefix")} {t("agreeTermsLink")}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
