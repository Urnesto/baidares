"use client";

import React, { useState } from "react";
import type { RouteMap as RouteMapData } from "@/types";

interface RouteMapProps {
  title: string;
  mapData: RouteMapData;
}

export function RouteMap({ title, mapData }: RouteMapProps) {
  const [loaded, setLoaded] = useState(false);

  const embedUrl =
    `https://www.google.com/maps/d/embed?mid=${mapData.embedId}` +
    `&ll=${mapData.lat},${mapData.lng}&z=${mapData.zoom}&ehbc=2E312F`;

  const viewerUrl =
    `https://www.google.com/maps/d/viewer?mid=${mapData.embedId}` +
    `&ll=${mapData.lat},${mapData.lng}&z=${mapData.zoom}`;

  return (
    <div className="border border-[var(--line)] rounded-[1.125rem] overflow-hidden bg-surface shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-[var(--line)] bg-surface-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <svg className="flex-shrink-0 text-accent" width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
          <span className="font-serif text-[1rem] text-ink truncate">{title}</span>
        </div>
        <a
          href={viewerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[0.625rem] tracking-[0.08em] uppercase text-muted hover:text-ink transition-colors border border-[var(--line)] rounded-full px-2.5 py-1.5 flex-shrink-0"
        >
          <svg width="0.625rem" height="0.625rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
          </svg>
          Open full map
        </a>
      </div>

      {/* Map iframe */}
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        {!loaded && (
          <div className="absolute inset-0 z-10 overflow-hidden">
            {/* Static map preview image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://staticmap.openstreetmap.de/staticmap.php?center=${mapData.lat},${mapData.lng}&zoom=${mapData.zoom}&size=800x450`}
              alt=""
              className="w-full h-full object-cover"
            />
            {/* Overlay with spinner */}
            <div className="absolute inset-0 bg-forest-900/50 flex items-center justify-center backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-cream/20 border-t-cream/80 animate-spin" />
                <span className="font-mono text-[0.625rem] tracking-[0.1em] uppercase text-cream/60">Loading map…</span>
              </div>
            </div>
          </div>
        )}
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Route map — ${title}`}
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Coordinates footer */}
      <div className="px-4 py-2.5 bg-surface-2 border-t border-[var(--line)]">
        <span className="font-mono text-[0.5625rem] tracking-[0.06em] text-muted">
          {mapData.lat.toFixed(4)}°N · {mapData.lng.toFixed(4)}°E · z{mapData.zoom}
        </span>
      </div>
    </div>
  );
}
