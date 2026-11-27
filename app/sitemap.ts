import type { MetadataRoute } from "next";
import { ALBUM } from "@/data/album";
import { ARCHIVE } from "@/data/archive";
import { SITE } from "@/data/site";

const base = SITE.url;

// Content dates beat build dates: search engines learn to ignore a lastmod that
// moves every deploy without the page changing.
const updated = (date: string) => new Date(`${date}T00:00:00+09:00`);

const PAGES = [
  { path: "", lastModified: updated("2026-11-27"), priority: 1 },
  { path: "/album", lastModified: updated("2026-11-27"), priority: 0.9 },
  { path: "/about", lastModified: updated("2026-11-27"), priority: 0.8 },
  { path: "/live", lastModified: updated("2026-11-27"), priority: 0.8 },
  { path: "/press", lastModified: updated("2026-11-27"), priority: 0.7 },
  { path: "/gallery", lastModified: updated("2026-11-26"), priority: 0.6 },
  { path: "/contact", lastModified: updated("2026-11-26"), priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, lastModified, priority }) => {
    const images =
      path === "/album"
        ? [`${base}${ALBUM.cover}`]
        : path === "/gallery"
          ? ARCHIVE.map((photo) => `${base}${photo.src}`)
          : path === "/live"
            ? [`${base}/images/live/poster-1800.jpg`]
            : undefined;

    // No <video:video> here: Naver's sitemap parser rejects the extension
    // ("형식이 올바르지 않습니다"). The four YouTube performances are declared
    // as VideoObject JSON-LD on /live instead, which Google reads anyway.
    return ["ko", "en"].map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      images,
      alternates: {
        languages: {
          ko: `${base}/ko${path}`,
          en: `${base}/en${path}`,
          "x-default": `${base}/ko${path}`,
        },
      },
    }));
  });
}
