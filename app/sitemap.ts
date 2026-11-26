import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const paths = ["", "/album", "/about", "/live", "/press", "/gallery", "/contact"];
  const now = new Date("2026-11-25");

  return paths.flatMap((path) =>
    ["ko", "en"].map((locale) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: {
        languages: {
          ko: `${base}/ko${path}`,
          en: `${base}/en${path}`,
        },
      },
    })),
  );
}
