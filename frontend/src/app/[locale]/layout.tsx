import React from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { LocaleSync } from "@/components/LocaleSync";

export const metadata: Metadata = {
  title: "Asvėjos baidarių centras",
  description: "Guided and self-paced kayak journeys through the regional park lakes and rivers.",
  icons: {
    icon: "/images/logo.webp",
    apple: "/images/logo.webp",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "lt" | "en" | "pl")) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LocaleSync />
      {children}
    </NextIntlClientProvider>
  );
}
