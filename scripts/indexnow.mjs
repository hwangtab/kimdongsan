#!/usr/bin/env node
/**
 * Ping IndexNow with every URL in the sitemap.
 *
 *   npm run seo:indexnow            # submit all URLs
 *   npm run seo:indexnow -- /ko/album /ko/live
 *
 * IndexNow is a single POST that tells Bing, Yandex and Seznam (and Naver
 * indirectly, via Bing) that these URLs changed. Bing usually picks them up in
 * minutes rather than waiting for the next crawl.
 *
 * The key file lives in public/<key>.txt and must stay reachable: the search
 * engines fetch it to prove ownership of the host.
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const ORIGIN = "https://kimdongsan.vercel.app";

async function findKey() {
  const files = await readdir("public");
  const keyFile = files.find((name) => /^[0-9a-f]{32}\.txt$/.test(name));
  if (!keyFile) throw new Error("public/<key>.txt 를 찾지 못했습니다.");
  return keyFile.replace(/\.txt$/, "");
}

async function sitemapUrls() {
  const xml = await readFile("public/sitemap.xml", "utf8").catch(async () => {
    const res = await fetch(`${ORIGIN}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
    return res.text();
  });
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const key = await findKey();
const args = process.argv.slice(2);
const urls = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${ORIGIN}${p}`))
  : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(ORIGIN).host,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList: urls,
  }),
});

console.log(`IndexNow ${res.status} ${res.statusText} — ${urls.length} URLs`);
if (!res.ok) {
  console.error(await res.text());
  process.exit(1);
}
