import type { Metadata } from "next";
import { SITE } from "@/data/site";
import { href, type Locale } from "@/lib/i18n";

export type SocialImage = {
  url: string;
  width: number;
  height: number;
  alt?: string;
};

export const DEFAULT_IMAGE: SocialImage = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "김동산과 블루이웃 — 정규 1집 《김동산과 블루이웃》",
};

/**
 * One place for the metadata every route needs. Building the OpenGraph and
 * Twitter blocks by hand per page is how the child routes ended up inheriting
 * the home page's title on social cards, so they all go through here.
 *
 * `path` is locale-less ("/album"); `href()` adds the locale prefix.
 */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
}: {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: SocialImage;
  type?: "website" | "article" | "profile";
}): Metadata {
  const canonical = href(locale, path);
  const ko = href("ko", path);
  const en = href("en", path);

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: { ko, en, "x-default": ko },
    },
    openGraph: {
      type,
      url: `${SITE.url}${canonical}`,
      siteName: SITE.name,
      locale: locale === "ko" ? "ko_KR" : "en_US",
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
