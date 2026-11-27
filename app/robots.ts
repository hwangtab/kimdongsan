import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

/*
 * AI crawlers are allowed on purpose: this is a press kit, and being quoted by
 * answer engines is the point. Listing them explicitly means a future `*` rule
 * cannot silently lock them out.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Yeti",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/ko/press/one-sheet", "/en/press/one-sheet"],
      },
      {
        userAgent: AI_AGENTS,
        allow: "/",
        disallow: ["/ko/press/one-sheet", "/en/press/one-sheet"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
