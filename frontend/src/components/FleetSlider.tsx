"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

export function FleetSlider() {
  const t = useTranslations("fleet");
  const scroll = (amount: number) => {
    document.getElementById("fleetSlider")?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          aria-label={t("prevSlide")}
          onClick={() => scroll(-330)}
          className="w-[2.625rem] h-[2.625rem] rounded-full border border-[var(--line)] bg-surface text-forest-900 text-[1.0625rem] flex items-center justify-center transition-colors hover:bg-forest-900 hover:text-cream hover:border-forest-900"
        >
          ‹
        </button>
        <button
          aria-label={t("nextSlide")}
          onClick={() => scroll(330)}
          className="w-[2.625rem] h-[2.625rem] rounded-full border border-[var(--line)] bg-surface text-forest-900 text-[1.0625rem] flex items-center justify-center transition-colors hover:bg-forest-900 hover:text-cream hover:border-forest-900"
        >
          ›
        </button>
      </div>
      <Button variant="dark" size="sm" as="a" href="/services">{t("fleetPricingLink")}</Button>
    </>
  );
}
