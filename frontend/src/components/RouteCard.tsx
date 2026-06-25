import React from "react";
import { cn } from "@/lib/utils";
import { Tag } from "./ui/Tag";

type Difficulty = "easy" | "moderate" | "hard";

const bgImages: Record<string, string> = {
  river:  "url('https://images.unsplash.com/photo-1586699253884-e199770f63b9?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(180deg,#3a5246,#4a726b)",
  pine:   "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(180deg,#2f4634,#1c3324)",
  sunset: "url('https://images.unsplash.com/photo-1696469014188-e6d7ea983c56?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(180deg,#caa24a,#2f4631)",
  forest: "url('https://images.unsplash.com/photo-1476811030698-6611c7b9bf81?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(165deg,#33493a,#1d3325)",
  water:  "url('https://images.unsplash.com/photo-1476811030698-6611c7b9bf81?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(150deg,#4d756d,#274a44)",
  mist:   "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(180deg,#5a6f63,#33493a)",
  aerial: "url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(135deg,#3f5a36,#22473f)",
  canyon: "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(180deg,#4a5c4e,#2c3e32)",
};

interface RouteCardProps {
  title: string;
  river?: string;
  subtitle: string;
  difficulty: Difficulty;
  difficultyLabel?: string;
  distance: string;
  duration: string;
  route: string;
  image?: keyof typeof bgImages;
  href?: string;
  daysLabel?: string;
}

export function RouteCard({ title, river, subtitle, difficulty, difficultyLabel, distance, duration, route, image = "river", href = "/routes/1", daysLabel }: RouteCardProps) {
  const location = subtitle.split("·")[0].trim();

  return (
    <a
      href={href}
      className={cn(
        "flex flex-col bg-white rounded-[1.125rem] overflow-hidden border border-[var(--line-soft)]",
        "transition-all duration-[350ms] hover:-translate-y-1 hover:shadow-sm hover:border-[var(--line)] group"
      )}
    >
      {/* Image */}
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        <div className="absolute inset-0" style={{ background: bgImages[image] }} />
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          <Tag variant={difficulty}>{difficultyLabel ?? difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</Tag>
          <Tag>{distance}</Tag>
          {daysLabel && <Tag variant="sage">{daysLabel}</Tag>}
        </div>
        {/* Arrow */}
        <div className="absolute bottom-[-0.9375rem] right-[0.875rem] z-10 w-[2.125rem] h-[2.125rem] rounded-full bg-accent text-[#f4f3ea] grid place-items-center border-[3px] border-white transition-all duration-[250ms] group-hover:bg-accent-hover group-hover:-translate-y-0.5">
          <svg width="0.9375rem" height="0.9375rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="px-[1.125rem] pt-[1.125rem] pb-5">
        <h3 className="font-serif text-[1.5625rem] m-0 mb-1 leading-[1.05]">{river ?? title}</h3>
        <p className="text-[0.8125rem] text-muted m-0 mb-3">{location}</p>
        <div className="flex gap-[0.875rem] flex-wrap pt-3 border-t border-[var(--line-soft)]">
          <span className="font-mono text-[0.6875rem] tracking-[0.04em] text-muted inline-flex items-center gap-[0.375rem]">
            <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            {duration}
          </span>
          <span className="font-mono text-[0.6875rem] tracking-[0.04em] text-muted inline-flex items-center gap-[0.375rem]">
            <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8c3 0 3 2 6 2s3-2 6-2 3 2 4 2M4 14c3 0 3 2 6 2s3-2 6-2 3 2 4 2"/></svg>
            {route}
          </span>
          {/* <span className="font-mono text-[0.6875rem] tracking-[0.04em] text-muted inline-flex items-center gap-[0.375rem]">
            <svg width="0.75rem" height="0.75rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18"/></svg>
            {distance}
          </span> */}
        </div>
      </div>
    </a>
  );
}
