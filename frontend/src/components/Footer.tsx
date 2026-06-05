import React from "react";

export function Footer() {
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
              Adventure, tranquillity and profound stillness on the water of the Žemaitija regional park.
            </p>
            <div className="flex gap-[0.625rem] mt-[1.375rem]">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center text-sage-300 hover:bg-white/10 hover:text-white transition-colors">
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full border border-white/15 grid place-items-center text-sage-300 hover:bg-white/10 hover:text-white transition-colors">
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 9h3V6h-3a4 4 0 0 0-4 4v2H7v3h3v6h3v-6h3l1-3h-4v-2a1 1 0 0 1 1-1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-sage-400 mt-0 mb-4 font-medium">Connect with us</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-[0.6875rem]">
              <li><a href="tel:+37060000000" className="text-[0.875rem] text-sage-300 hover:text-white transition-colors">+370 600 00000</a></li>
              <li><a href="mailto:hello@baidares.lt" className="text-[0.875rem] text-sage-300 hover:text-white transition-colors">hello@baidares.lt</a></li>
              <li className="text-[0.875rem] text-sage-300">Asvejų reg. parkas,<br />Paliepukai, Vilniaus r.</li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-sage-400 mt-0 mb-4 font-medium">Explore</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-[0.6875rem]">
              {[["All routes", "/routes"], ["Fleet & pricing", "/fleet"], ["Reservations", "/#reserve"]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[0.875rem] text-sage-300 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-sage-400 mt-0 mb-4 font-medium">Find our base</h4>
            <div className="rounded-sm border border-white/10" style={{ aspectRatio: "16/10", background: "linear-gradient(150deg,#37503c 0%,#2c4632 60%,#243a2b 100%)" }} />
          </div>
        </div>

        <div className="border-t border-white/10 py-[1.375rem] flex justify-between items-center gap-4 flex-wrap">
          <p className="m-0 text-[0.75rem] text-sage-400 font-mono tracking-[0.04em]">
            © {new Date().getFullYear()} Asvėjos baidarių centras · All rights reserved
          </p>
          <nav className="flex gap-[1.375rem]">
            {["Privacy policy", "Terms of service", "Cookie policy"].map((label) => (
              <a key={label} href="#" className="text-[0.75rem] text-sage-400 hover:text-white transition-colors">{label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
