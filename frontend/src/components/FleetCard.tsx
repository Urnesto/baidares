import React from "react";
import { Tag } from "./ui/Tag";
import { Button } from "./ui/Button";

const bgImages: Record<string, string> = {
  forest: "url('https://images.unsplash.com/photo-1476811030698-6611c7b9bf81?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(165deg,#33493a,#1d3325)",
  water:  "url('https://images.unsplash.com/photo-1476811030698-6611c7b9bf81?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(150deg,#4d756d,#274a44)",
  aerial: "url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(135deg,#3f5a36,#22473f)",
  pine:   "url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(180deg,#2f4634,#1c3324)",
  mist:   "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=70') center/cover no-repeat, linear-gradient(180deg,#5a6f63,#33493a)",
};

interface FleetCardProps {
  title: string;
  description: string;
  features: string[];
  image?: keyof typeof bgImages;
  badge?: string;
  ctaLabel?: string;
  href?: string;
}

export function FleetCard({ title, description, features, image = "forest", badge, href = "/services" }: FleetCardProps) {
  return (
    <div className="relative rounded-[1.125rem] overflow-hidden min-h-[22.5rem] flex flex-col justify-end text-cream flex-shrink-0 w-[18.125rem]" style={{ scrollSnapAlign: "start" }}>
      <div className="absolute inset-0" style={{ background: bgImages[image] }} />
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: "linear-gradient(180deg,rgba(16,29,21,0) 12%,rgba(16,29,21,.42) 42%,rgba(16,29,21,.86) 70%,rgba(16,29,21,.96) 100%)" }}
      />
      {badge && (
        <div className="absolute top-[1.125rem] left-[1.125rem] z-[3]">
          <Tag variant="solid">{badge}</Tag>
        </div>
      )}
      <div className="relative z-[3] p-6">
        <h3 className="font-serif text-[1.5rem] m-0 mb-2 text-cream">{title}</h3>
        <p className="text-[0.844rem] text-cream/90 m-0 mb-4 max-w-[30ch]">{description}</p>
        <div className="flex flex-wrap gap-[0.4375rem] mb-[1.125rem]">
          {features.map((f) => (
            <span key={f} className="font-mono text-[0.656rem] tracking-[0.07em] uppercase px-[0.625rem] py-[0.3125rem] border border-cream/35 rounded-full text-cream/95">
              {f}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}
