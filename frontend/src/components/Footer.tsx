"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { contact } from "@/mocks";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-900 text-sage-200 mt-0">
      <div className="max-w-content mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 py-16 pb-12">
          {/* Brand */}
          <div>
            <span className="font-mono text-[0.8125rem] tracking-[0.16em] uppercase text-cream">
              Asvėjos baidarių centras
            </span>
            <p className="text-sage-400 text-[0.875rem] max-w-[30ch] mt-4 mb-0">
              {t("tagline")}
            </p>
            <div className="flex gap-[0.625rem] mt-[1.375rem]">
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center text-sage-300 hover:bg-white/10 hover:text-white transition-colors">
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-sage-400 mt-0 mb-4 font-medium">{t("connectTitle")}</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-[0.6875rem]">
              <li><a href={contact.phoneHref} className="text-[0.875rem] text-sage-300 hover:text-white transition-colors">{contact.phone}</a></li>
              <li><a href={contact.emailHref} className="text-[0.875rem] text-sage-300 hover:text-white transition-colors">{contact.email}</a></li>
              <li className="text-[0.875rem] text-sage-300">Asvejų reg. parkas,<br />Paliepukai, Vilniaus r.</li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-sage-400 mt-0 mb-4 font-medium">{t("exploreTitle")}</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-[0.6875rem]">
              {([
                [t("allRoutes"), "/routes"],
                [t("fleetPricing"), "/services"],
                [t("reservations"), "/#reserve"],
              ] as [string, string][]).map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[0.875rem] text-sage-300 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-sage-400 mt-0 mb-4 font-medium">{t("mapTitle")}</h4>
            <div className="rounded-sm border border-white/10" style={{ aspectRatio: "16/10", background: "linear-gradient(150deg,#37503c 0%,#2c4632 60%,#243a2b 100%)" }} />
          </div>
        </div>

        <div className="border-t border-white/10 py-[1.375rem] flex justify-between items-center gap-4 flex-wrap">
          <p className="m-0 text-[0.75rem] text-sage-400 font-mono tracking-[0.04em]">
            {t("rights", { year })}
          </p>
          <nav className="flex gap-[1.375rem]">
            {([t("privacy"), t("terms"), t("cookies")] as string[]).map((label) => (
              <a key={label} href="#" className="text-[0.75rem] text-sage-400 hover:text-white transition-colors">{label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
