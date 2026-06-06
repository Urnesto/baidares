import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { LangToggle } from "./LangToggle";
import { MobileNav } from "./MobileNav";

interface NavProps {
  overlay?: boolean;
  active?: "home" | "routes" | "fleet" | "route";
}

export function Nav({ overlay, active }: NavProps) {
  const links = [
    { label: "Pradžia", href: "/",       key: "home" },
    { label: "Routes",  href: "/routes", key: "routes" },
    { label: "Fleet",   href: "/fleet",  key: "fleet" },
  ];

  return (
    <nav className={cn("relative z-40", overlay && "absolute top-0 left-0 right-0")}>
      <div className="max-w-content mx-auto px-6 md:px-8 flex items-center justify-between h-[4.625rem] gap-6">
        <a href="/" className="shrink-0">
          <img
            src="/images/logo.webp"
            alt="Asvėjos baidarių centras"
            className={cn("h-9 md:h-10 w-auto object-contain", overlay && "brightness-0 invert")}
          />
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-[1.875rem] list-none m-0 p-0">
          {links.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                className={cn(
                  "text-[0.781rem] tracking-[0.12em] uppercase font-semibold relative py-1 transition-colors duration-200",
                  overlay
                    ? active === link.key
                      ? "text-white after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[0.125rem] after:bg-sage-300 after:rounded-sm"
                      : "text-cream/80 hover:text-white"
                    : active === link.key
                      ? "text-accent after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-[0.125rem] after:bg-accent after:rounded-sm"
                      : "text-ink-soft hover:text-ink"
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-[0.875rem]">
          <LangToggle overlay={overlay} className="hidden md:flex" />
          <Button variant="light" size="sm" as="a" href="/#reserve">Book now</Button>
        </div>

        {/* Mobile hamburger */}
        <MobileNav overlay={overlay} active={active} links={links} />
      </div>
    </nav>
  );
}
