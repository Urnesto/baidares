import React from "react";
import { getTranslations } from "next-intl/server";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { RoutesGrid } from "@/components/RoutesGrid";
import { routes } from "@/mocks";

export async function generateMetadata() {
  const t = await getTranslations("routes");
  return { title: t("metaTitle") };
}

export default async function RoutesPage() {
  const t = await getTranslations("routes");

  return (
    <>
      <div className="bg-surface border-b border-[var(--line)]">
        <Nav active="routes" />
      </div>

      <header className="max-w-content mx-auto px-8 pt-16 pb-7">
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div>
            <Eyebrow>{t("eyebrow", { count: routes.length })}</Eyebrow>
            <h1 className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.0] m-0 mt-4 mb-5">
              {t("title").split("\n").map((line, i) => (
                <React.Fragment key={i}>{line}{i === 0 && <br />}</React.Fragment>
              ))}
            </h1>
            <p className="text-[1.0625rem] text-ink-soft m-0 max-w-[46ch] leading-[1.65]">
              {t("lede")}
            </p>
          </div>
          <div
            className="rounded-[1.125rem] overflow-hidden"
            style={{
              aspectRatio: "16/10",
              background: "url('https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=900&q=75') center/cover no-repeat, linear-gradient(135deg,#3f5a36,#22473f)",
            }}
          />
        </div>
      </header>

      <RoutesGrid routes={routes} />

      <Footer />
    </>
  );
}
