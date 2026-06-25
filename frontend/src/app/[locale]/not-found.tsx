import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { contact } from "@/mocks";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="h-screen w-screen bg-paper flex items-center justify-center overflow-hidden relative">

      {/* Water ripple rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        {[1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-water/20"
            style={{
              width: `${i * 14}rem`,
              height: `${i * 14}rem`,
              animation: `ripple ${1.8 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}
      </div>

      {/* Ghost 404 watermark */}
      <span
        className="absolute font-serif text-forest-900/[0.05] select-none pointer-events-none leading-none"
        style={{ fontSize: "clamp(10rem, 28vw, 18rem)" }}
        aria-hidden
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[34rem]">

        <div
          className="text-[5rem] leading-none mb-5 select-none"
          style={{ animation: "bob 3s ease-in-out infinite" }}
          aria-hidden
        >
          🛶
        </div>

        <span className="inline-flex items-center gap-2 font-mono text-[0.6875rem] tracking-[0.16em] uppercase text-water bg-water/10 px-[0.875rem] py-[0.4375rem] rounded-pill mb-4">
          ◐ {t("badge")}
        </span>

        <h1
          className="font-serif font-normal text-ink m-0 mb-4 leading-[1.05]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}
        >
          {t("title")}<br />
          <em>{t("titleEm")}</em>
        </h1>

        <p className="text-[1.0625rem] text-ink-soft leading-[1.65] mb-8 max-w-[30ch]">
          {t("body")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button variant="primary" as="a" href="/">{t("back")}</Button>
          <Button variant="ghost" as="a" href="/#reserve">{t("reserve")}</Button>
        </div>

        <p className="mt-7 text-[0.8125rem] text-muted font-mono tracking-[0.04em]">
          {t("help")}{" "}
          <a href={contact.emailHref} className="underline underline-offset-2 hover:text-water transition-colors">
            {t("contact")}
          </a>
        </p>
      </div>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%       { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes ripple {
          0%   { opacity: 0.7; transform: scale(0.88); }
          100% { opacity: 0;   transform: scale(1.12); }
        }
      `}</style>
    </main>
  );
}
