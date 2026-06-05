"use client";

import React from "react";
import { Button } from "./ui/Button";

export function FleetSlider() {
  const scroll = (amount: number) => {
    document.getElementById("fleetSlider")?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          aria-label="Previous"
          onClick={() => scroll(-330)}
          className="w-[2.625rem] h-[2.625rem] rounded-full border border-[var(--line)] bg-surface text-forest-900 text-[1.0625rem] flex items-center justify-center transition-colors hover:bg-forest-900 hover:text-cream hover:border-forest-900"
        >
          ‹
        </button>
        <button
          aria-label="Next"
          onClick={() => scroll(330)}
          className="w-[2.625rem] h-[2.625rem] rounded-full border border-[var(--line)] bg-surface text-forest-900 text-[1.0625rem] flex items-center justify-center transition-colors hover:bg-forest-900 hover:text-cream hover:border-forest-900"
        >
          ›
        </button>
      </div>
      <Button variant="dark" size="sm" as="a" href="/fleet">Fleet &amp; pricing →</Button>
    </>
  );
}
