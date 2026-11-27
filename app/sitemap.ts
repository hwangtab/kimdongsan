import type { MetadataRoute } from "next";
import { ALBUM } from "@/data/album";
import { ARCHIVE } from "@/data/archive";
import { SITE } from "@/data/site";
import { VIDEOS } from "@/data/videos";

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

    const videos =
      path === "/live"
        ? VIDEOS.map((video) => ({
            title: video.title,
            thumbnail_loc: `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
            description: video.note,
            player_loc: `https://www.youtube-nocookie.com/embed/${video.id}`,
          }))
        : undefined;

    return ["ko", "en"].map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      images,
      videos,
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
