import Image from "next/image";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio-player";
import { JsonLd } from "@/components/json-ld";
import { Prompt, Win } from "@/components/win";
import { ALBUM, TRACKS, waveformFor } from "@/data/album";
import { BIOS, SITE } from "@/data/site";
import { QUOTES } from "@/data/press";
import { SHOWS } from "@/data/shows";
import { getDictionary, isLocale, t, type Locale } from "@/lib/i18n";
import { homeGraph } from "@/lib/schema";
import { OG_IMAGES, pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ko";
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    title: dict.meta.homeTitle,
    description: dict.meta.description,
    image: OG_IMAGES.home,
  });
}

const FEATURED = [4, 2, 7];

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const featured = FEATURED.map(
    (no) => TRACKS.find((track) => track.no === no)!,
  );
  const show = SHOWS.find((s) => s.featured)!;
  const quote = QUOTES[0];

  return (
    <>
      <JsonLd graph={homeGraph(locale)} />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-6 md:px-8 md:pb-14 md:pt-8">
        <Prompt path="HOME" label="dir /w" />

        <div className="mt-5 grid gap-8 md:grid-cols-[1.05fr_0.95fr] md:gap-10">
          <div>
            <p className="mono text-muted">{dict.home.eyebrow} · AFTERNOON</p>

            <h1 className="mt-4 text-head md:text-hero">
              {dict.home.title.split("\n").map((line, i, all) => (
                <span key={line} className="block">
                  {line}
                  {i === all.length - 1 && (
                    <span className="cursor ml-2" aria-hidden />
                  )}
                </span>
              ))}
            </h1>

            <p className="mono mt-3 text-kitsch">Kim Dongsan &amp; Blueeewoot</p>

            <p className="mt-6 whitespace-pre-line leading-[1.5] md:text-mid md:leading-[1.4]">
              {dict.home.lead}
            </p>
            <p className="longform mt-4 max-w-xl text-muted">
              {dict.home.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`/${locale}/album`} className="btn btn-solid">
                {dict.home.ctaAlbum}
              </Link>
              <a
                href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ticket"
              >
                {dict.home.ctaShow}{" "}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <Win
            label="COVER.JPG"
            right="1000×1000"
            className="self-start"
            bodyClassName="p-0"
          >
            <Image
              src={ALBUM.cover}
              alt={
                locale === "ko"
                  ? "정규 1집 《김동산과 블루이웃》 커버. 공원에서 하모니카와 기타를 연주하는 네 사람."
                  : "Cover of Kim Dongsan & Blueeewoot. Four men playing harmonica and guitar in a park."
              }
              width={1000}
              height={1000}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 46vw, 92vw"
              className="block h-auto w-full border-b border-line"
            />
            <div className="flex items-center justify-between px-4 py-2">
              <span className="mono text-muted">1ST ALBUM · 2026</span>
              <span className="mono text-muted">{ALBUM.runtime}</span>
            </div>
          </Win>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker overflow-hidden border-y border-ticket bg-ticket py-1 text-void">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {dict.home.ticker.map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="mono flex items-center whitespace-nowrap px-4"
                >
                  {item}
                  <span className="ml-4">▮</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Facts */}
      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <Prompt path="FACTS" label="type numbers.txt" />
        <dl className="mt-4 grid grid-cols-2 border-y border-line md:grid-cols-4">
          {dict.home.facts.map((fact, i) => (
            <div
              key={fact.label}
              className={`px-4 py-4 ${
                i % 2 === 1 ? "border-l border-line" : ""
              } ${i > 1 ? "border-t border-line md:border-t-0" : ""} ${
                i === 2 ? "md:border-l" : ""
              }`}
            >
              <dd className="text-mid leading-none text-signal md:text-head">
                {fact.value}
              </dd>
              <dt className="mono mt-2 text-muted">{fact.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Featured tracks */}
      <section className="mx-auto max-w-6xl px-5 pb-10 md:px-8 md:pb-14">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
          <div>
            <Prompt path="PICK" label="play 3 songs" />
            <h2 className="text-mid mt-4 md:text-head">
              {dict.home.featuredTitle}
            </h2>
          </div>
          <div>
            <p className="longform max-w-xl text-muted">
              {dict.home.featuredBody}
            </p>
            <div className="mt-6 border border-line">
              <div className="win-bar">
                <span className="mono text-signal">now_playing</span>
                <span className="mono text-muted">3 FILES</span>
              </div>
              {featured.map((track) => (
                <div
                  key={track.no}
                  className="border-b border-line px-4 py-3 last:border-b-0"
                >
                  <div className="mb-2 flex items-baseline gap-3">
                    <span className="mono text-signal">
                      {String(track.no).padStart(2, "0")}
                    </span>
                    <span className="text-mid leading-none">
                      {t(locale, { ko: track.title, en: track.titleEn })}
                    </span>
                    <span className="mono ml-auto text-muted">
                      {track.duration}
                    </span>
                  </div>
                  <AudioPlayer
                    src={track.audio}
                    title={t(locale, { ko: track.title, en: track.titleEn })}
                    peaks={waveformFor(track.no)}
                    playLabel={dict.common.play}
                    pauseLabel={dict.common.pause}
                    showTitle={false}
                  />
                </div>
              ))}
            </div>
            <Link
              href={`/${locale}/album`}
              className="link-underline mono mt-5 inline-block"
            >
              {dict.home.listenAlbum}{" "}<span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="mx-auto max-w-6xl px-5 pb-10 md:px-8 md:pb-14">
        <figure className="border border-line bg-panel px-5 py-6 md:px-10 md:py-8">
          <Prompt path="QUOTE" label={dict.home.quoteEyebrow} />
          <blockquote className="longform mt-4 text-mid leading-[1.5]">
            “{t(locale, { ko: quote.text, en: quote.textEn })}”
          </blockquote>
          <figcaption className="mono mt-4 text-muted">
            — {t(locale, { ko: quote.source, en: quote.sourceEn })} ·{" "}
            {quote.date}
          </figcaption>
        </figure>
      </section>

      {/* Method */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 pb-10 md:grid-cols-2 md:gap-10 md:px-8 md:pb-14">
        <div>
          <Prompt path="ABOUT" label="type bio.txt" />
          <h2 className="text-mid mt-4 md:text-head">{dict.home.aboutTitle}</h2>
        </div>
        <div>
          <p className="longform text-muted">{dict.home.aboutBody}</p>
          <p className="longform mt-3 text-muted">
            {t(locale, { ko: BIOS.ko.short, en: BIOS.en.short })}
          </p>
          <Link href={`/${locale}/about`} className="btn btn-ghost mt-6">
            {dict.home.aboutCta}{" "}<span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Show */}
      <section className="mx-auto max-w-6xl px-5 pb-12 md:px-8 md:pb-16">
        <div className="border border-line">
          <div className="win-bar bg-panel-deep">
            <span className="mono text-signal">SHOW.EXE</span>
            <span className="mono text-muted">2026.12.04</span>
          </div>
          <div className="grid gap-8 p-5 md:grid-cols-[1fr_0.9fr] md:items-center md:p-8">
            <div>
              <p className="mono text-muted">{dict.home.showEyebrow}</p>
              <p className="text-head mt-3 leading-none text-ticket md:text-hero">12.04</p>
              <p className="text-mid mt-3 leading-tight">
                {t(locale, { ko: show.title, en: show.titleEn })}
              </p>
              <p className="mono mt-2 text-muted">
                {t(locale, { ko: show.dateLabel, en: show.dateLabel })} ·{" "}
                {t(locale, { ko: show.venue, en: show.venueEn })} ·{" "}
                {t(locale, { ko: show.time!, en: show.timeEn! })}
              </p>
            </div>
            <div className="border border-line bg-panel-deep p-4">
              <div className="flex items-center justify-between">
                <span className="mono text-muted">{dict.live.prices}</span>
                <span className="mono bg-ticket px-1 text-void">
                  {t(locale, {
                    ko: show.statusLabel!,
                    en: show.statusLabelEn!,
                  })}
                </span>
              </div>
              <dl className="mono mt-3 space-y-1 border-t border-line pt-3">
                <div className="flex justify-between">
                  <dt className="text-muted">
                    {t(locale, { ko: "얼리버드", en: "Early bird" })}
                  </dt>
                  <dd className="text-muted line-through">
                    {locale === "ko" ? "20,000원" : "₩20,000"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">
                    {t(locale, { ko: "사전예매", en: "Advance" })}
                  </dt>
                  <dd className="text-signal">
                    {locale === "ko" ? "30,000원" : "₩30,000"}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">
                    {t(locale, { ko: "현장", en: "At the door" })}
                  </dt>
                  <dd>{locale === "ko" ? "40,000원" : "₩40,000"}</dd>
                </div>
              </dl>
              <a
                href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ticket mt-4 w-full"
              >
                {dict.live.book}{" "}<span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8 md:pb-24">
        <div className="flex items-end justify-between">
          <Prompt path="PRESS" label="dir *.txt" />
          <Link
            href={`/${locale}/press`}
            className="mono link-underline text-muted"
          >
            {dict.common.more}{" "}<span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="mt-4 grid border border-line md:grid-cols-3">
          {QUOTES.slice(1, 4).map((q) => (
            <figure
              key={q.text}
              className="border-b border-line p-4 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <blockquote className="longform">
                “{t(locale, { ko: q.text, en: q.textEn })}”
              </blockquote>
              <figcaption className="mono mt-3 text-muted">
                — {t(locale, { ko: q.source, en: q.sourceEn })} · {q.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
