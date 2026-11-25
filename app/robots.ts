import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ko/press/one-sheet", "/en/press/one-sheet"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
