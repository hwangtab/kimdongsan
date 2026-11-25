import { ko, type Dictionary } from "@/messages/ko";
import { en } from "@/messages/en";

export const LOCALES = ["ko", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ko";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return locale === "en" ? en : ko;
}

export function t<T>(locale: Locale, value: { ko: T; en: T }): T {
  return value[locale];
}

export function href(locale: Locale, path = ""): string {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

export function otherLocale(locale: Locale): Locale {
  return locale === "ko" ? "en" : "ko";
}

export function alternates(locale: Locale, path = "") {
  return {
    canonical: href(locale, path),
    languages: {
      ko: href("ko", path),
      en: href("en", path),
    },
  };
}
