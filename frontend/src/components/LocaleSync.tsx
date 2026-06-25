"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const LOCALES = ["lt", "en", "pl"] as const;
type Locale = typeof LOCALES[number];

export function LocaleSync() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = sessionStorage.getItem("locale") as Locale | null;
    if (stored && LOCALES.includes(stored) && stored !== locale) {
      const segments = pathname.split("/");
      if (LOCALES.includes(segments[1] as Locale)) {
        segments[1] = stored;
      } else {
        segments.splice(1, 0, stored);
      }
      router.replace(segments.join("/") || "/");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
