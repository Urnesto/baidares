import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["lt", "en", "pl"],
  defaultLocale: "lt",
  localeDetection: false,
});
