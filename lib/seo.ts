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
  url: "/images/og/home.jpg",
  width: 1200,
  height: 630,
  alt: "김동산과 블루이웃 — 정규 1집 《김동산과 블루이웃》",
};

/**
 * Route-specific cards built by `npm run assets:og`. They share one 1200×630
 * frame so a link preview always reads as the same site.
 */
export const OG_IMAGES: Record<
  "home" | "album" | "about" | "live" | "press" | "gallery" | "contact",
  SocialImage
> = {
  home: DEFAULT_IMAGE,
  album: {
    url: "/images/og/album.jpg",
    width: 1200,
    height: 630,
    alt: "정규 1집 《김동산과 블루이웃》 — 8트랙, 45:05",
  },
  about: {
    url: "/images/og/about.jpg",
    width: 1200,
    height: 630,
    alt: "출장작곡가 김동산 — 2010년부터 이어온 방식",
  },
  live: {
    url: "/images/og/live.jpg",
    width: 1200,
    height: 630,
    alt: "2026년 12월 4일 청년문화공간 ju 발매 쇼케이스",
  },
  press: {
    url: "/images/og/press.jpg",
    width: 1200,
    height: 630,
    alt: "김동산과 블루이웃 프레스킷 — 바이오·인용·보도",
  },
  gallery: {
    url: "/images/og/gallery.jpg",
    width: 1200,
    height: 630,
    alt: "2018년 사진 아카이브 — 롱플레이어와 수원 공연장",
  },
  contact: {
    url: "/images/og/contact.jpg",
    width: 1200,
    height: 630,
    alt: "김동산과 블루이웃 부킹·인터뷰 문의 — 스튜디오 놀",
  },
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
