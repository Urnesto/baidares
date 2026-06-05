"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";

export function ReservationCard() {
  const [submitted, setSubmitted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState<"email" | "phone" | "whatsapp">("email");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

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
          <h3 className="font-serif text-[1.625rem] m-0 font-normal leading-none whitespace-nowrap">Quick reservation</h3>
          <Tag variant="sage">Instant</Tag>
        </div>
        <form onSubmit={handleCheckAvailability}>
          <div className="grid grid-cols-2 gap-[0.625rem]">
            <div className="flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">Boat type</label>
              <select name="boat" className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink appearance-none w-full focus:outline-none focus:border-accent">
                <option>Kayak</option><option>Canoe</option><option>Raft</option><option>Paddleboard</option>
              </select>
            </div>
            <div className="flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">People</label>
              <input type="number" name="people" min={1} max={200} defaultValue={2} className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent" />
            </div>
            <div className="col-span-2 flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">Route</label>
              <select name="route" className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink appearance-none w-full focus:outline-none focus:border-accent">
                <option>The Whispering Pines · 14 km · Moderate</option>
                <option>The Morning Glass · 8 km · Easy</option>
                <option>The Rapid Descent · 11 km · Hard</option>
                <option>Golden Hour Glide · 6 km · Easy</option>
              </select>
            </div>
            <div className="col-span-2 flex flex-col gap-[0.3125rem]">
              <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">Date</label>
              <input type="date" name="date" defaultValue="2026-06-14" className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-[0.875rem] mt-[0.875rem] mb-[0.875rem] pt-[0.8125rem] border-t border-[var(--line)]">
            <div className="flex flex-col gap-[0.1875rem] min-w-0">
              <span className="text-[0.8125rem] text-ink whitespace-nowrap overflow-hidden text-ellipsis">Kayak · The Whispering Pines</span>
              <span className="font-mono text-[0.625rem] tracking-[0.09em] uppercase text-muted">Moderate</span>
            </div>
            <span className="font-mono text-[0.6875rem] tracking-[0.06em] uppercase text-muted whitespace-nowrap">
              from <span className="font-serif text-[1.1875rem] text-ink tracking-normal normal-case ml-1">€25</span>
            </span>
          </div>
          <Button variant="primary" block type="submit">
            {submitted ? "Order now →" : "Check availability"}
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
              aria-label="Close"
            >
              ✕
            </button>

            {done ? (
              <div className="text-center py-4">
                <div className="text-[2.5rem] mb-3">🛶</div>
                <h3 className="font-serif text-[1.5rem] font-normal m-0 mb-2">Request sent!</h3>
                <p className="text-[0.9375rem] text-ink-soft leading-[1.6] m-0">
                  We'll reach out via your preferred contact method within a few hours to confirm your booking.
                </p>
                <Button variant="primary" block className="mt-6" onClick={closeModal} type="button">
                  Close
                </Button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-[1.5rem] font-normal m-0 mb-1">Complete your order</h3>
                <p className="text-[0.875rem] text-ink-soft mb-5 m-0">We'll confirm availability and send details to your contact.</p>

                <form onSubmit={handleOrder} className="flex flex-col gap-[0.875rem]">
                  <div className="flex flex-col gap-[0.3125rem]">
                    <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">Email address</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-[0.3125rem]">
                    <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">Phone number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+370 600 00000"
                      className="font-sans text-[0.875rem] px-3 py-[0.6875rem] rounded-[0.6875rem] border border-[var(--line)] bg-[#fbfaf4] text-ink w-full focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-[0.5rem]">
                    <label className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted">Preferred contact</label>
                    <div className="grid grid-cols-3 gap-[0.5rem]">
                      {(["email", "phone", "whatsapp"] as const).map((method) => (
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
                            {method === "email" ? "✉️" : method === "phone" ? "📞" : "💬"}
                          </span>
                          {method === "whatsapp" ? "WhatsApp" : method.charAt(0).toUpperCase() + method.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button variant="primary" block type="submit" className="mt-1">
                    {sending ? "Sending…" : "Confirm order"}
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
