import Image from "next/image";
import Link from "next/link";
import { AudioPlayer } from "@/components/audio-player";
import { BrandTitle } from "@/components/brand-title";
import { MiwonTitle } from "@/components/miwon-title";
import { ALBUM, TRACKS, waveformFor } from "@/data/album";
import { BIOS, SITE } from "@/data/site";
import { QUOTES } from "@/data/press";
import { SHOWS } from "@/data/shows";
import { alternates, getDictionary, isLocale, t, type Locale } from "@/lib/i18n";
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
  return {
    title: { absolute: dict.meta.homeTitle },
    description: dict.meta.description,
    alternates: alternates(locale),
  };
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MusicGroup",
        name: "김동산과 블루이웃",
        alternateName: "Kim Dongsan & Blueeewoot",
        url: SITE.url,
        genre: ["Folk", "Blues"],
        member: [
          { "@type": "Person", name: "김동산" },
          { "@type": "Person", name: "류준철" },
          { "@type": "Person", name: "이인우" },
          { "@type": "Person", name: "김예준" },
        ],
      },
      {
        "@type": "MusicAlbum",
        name: ALBUM.title,
        byArtist: { "@type": "MusicGroup", name: "김동산과 블루이웃" },
        datePublished: ALBUM.releaseDate,
        numTracks: ALBUM.trackCount,
        url: ALBUM.melon,
      },
      {
        "@type": "MusicEvent",
        name: "김동산과 블루이웃 정규 1집 발매 쇼케이스",
        startDate: "2026-12-04T20:00:00+09:00",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "청년문화공간 ju",
          address: "서울특별시 마포구 월드컵북로2길 49",
        },
        performer: { "@type": "MusicGroup", name: "김동산과 블루이웃" },
        offers: {
          "@type": "Offer",
          price: "30000",
          priceCurrency: "KRW",
          url: SITE.showUrl,
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16 md:px-8 md:pb-24 md:pt-20">
        <div>
          <p className="eyebrow">{dict.home.eyebrow}</p>
          <h1 className="mt-5">
            <BrandTitle
              slug="brand-hero"
              locale={locale}
              alt={locale === "ko" ? "김동산과 블루이웃" : "Kim Dongsan & Blueeewoot"}
              priority
              className="h-auto w-full max-w-[420px]"
            />
          </h1>
          {locale === "ko" && (
            <p className="latin mt-5 text-[clamp(1rem,2vw,1.35rem)] font-light tracking-[0.18em] text-muted">
              Kim Dongsan &amp; Blueeewoot
            </p>
          )}
          <p className="mt-8 max-w-xl whitespace-pre-line text-[clamp(1.05rem,2.2vw,1.35rem)] font-medium leading-[1.55]">
            {dict.home.lead}
          </p>
          <p className="longform mt-5 max-w-xl text-muted">
            {dict.home.body}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/${locale}/album`} className="btn btn-solid">
              {dict.home.ctaAlbum}
            </Link>
            <a
              href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ticket"
            >
              {dict.home.ctaShow}
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -left-3 -top-3 hidden h-full w-full border border-line md:block" />
          <div className="relative border border-ink/15 bg-paper-deep">
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
              className="h-auto w-full"
            />
            <div className="flex items-center justify-between border-t border-ink/15 px-4 py-3">
              <span className="mono">1ST ALBUM · 2026</span>
              <span className="mono">{ALBUM.runtime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="overflow-hidden border-y border-ink bg-yellow py-3">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {dict.home.ticker.map((item, i) => (
                <span
                  key={`${copy}-${i}`}
                  className="mono flex items-center whitespace-nowrap px-5 text-ink"
                >
                  {item}
                  <span className="ml-5 inline-block h-1 w-1 rounded-full bg-ink" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Facts */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">{dict.home.factsEyebrow}</p>
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-line pt-8 md:grid-cols-4">
          {dict.home.facts.map((fact) => (
            <div key={fact.label}>
              <p className="display text-[clamp(2.4rem,5vw,3.8rem)]">
                {fact.value}
              </p>
              <p className="mt-2 text-[13px] text-muted">{fact.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured tracks */}
      <section className="border-t border-line bg-paper-deep">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
            <div>
              <p className="eyebrow">{dict.home.featuredEyebrow}</p>
              <h2 className="mt-4">
                <MiwonTitle
                  slug="featured"
                  locale={locale}
                  alt={dict.home.featuredTitle}
                />
              </h2>
            </div>
            <div>
              <p className="longform max-w-xl text-muted">
                {dict.home.featuredBody}
              </p>
              <div className="mt-8 divide-y divide-line border-y border-line">
                {featured.map((track) => (
                  <div key={track.no} className="py-5">
                    <div className="mb-3 flex items-baseline gap-4">
                      <span className="mono text-muted">
                        {String(track.no).padStart(2, "0")}
                      </span>
                      <span className="text-lg font-semibold tracking-[-0.02em]">
                        {t(locale, { ko: track.title, en: track.titleEn })}
                      </span>
                      <span className="mono ml-auto text-muted">
                        {track.duration}
                      </span>
                    </div>
                    <AudioPlayer
                      src={track.audio}
                      title={t(locale, {
                        ko: track.title,
                        en: track.titleEn,
                      })}
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
                className="link-underline mono mt-7 inline-block"
              >
                {dict.home.listenAlbum} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="border-y border-line">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 md:py-24">
          <p className="eyebrow">{dict.home.quoteEyebrow}</p>
          <blockquote className="serif mt-7 text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.55] tracking-[-0.02em]">
            “{t(locale, { ko: quote.text, en: quote.textEn })}”
          </blockquote>
          <p className="mono mt-6 text-muted">
            {t(locale, { ko: quote.source, en: quote.sourceEn })} · {quote.date}
          </p>
        </div>
      </section>

      {/* Method */}
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-8 md:py-24">
        <div>
          <p className="eyebrow">{dict.home.aboutEyebrow}</p>
          <h2 className="mt-4">
            <MiwonTitle
              slug="method"
              locale={locale}
              alt={dict.home.aboutTitle}
            />
          </h2>
        </div>
        <div>
          <p className="longform text-muted">{dict.home.aboutBody}</p>
          <p className="longform mt-4 text-muted">
            {t(locale, { ko: BIOS.ko.short, en: BIOS.en.short })}
          </p>
          <Link
            href={`/${locale}/about`}
            className="btn btn-ghost mt-8"
          >
            {dict.home.aboutCta}
          </Link>
        </div>
      </section>

      {/* Show */}
      <section className="bg-ink text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_0.9fr] md:items-end md:px-8 md:py-24">
          <div>
            <p className="mono text-paper/60">{dict.home.showEyebrow}</p>
            <div className="mt-5">
              <MiwonTitle slug="date" locale={locale} alt="12.04" />
            </div>
            <p className="mt-4 text-xl font-semibold tracking-[-0.02em]">
              {t(locale, { ko: show.title, en: show.titleEn })}
            </p>
            <p className="mt-2 text-[15px] text-paper/70">
              {t(locale, { ko: show.dateLabel, en: show.dateLabel })} ·{" "}
              {t(locale, { ko: show.venue, en: show.venueEn })} ·{" "}
              {t(locale, { ko: show.time!, en: show.timeEn! })}
            </p>
          </div>
          <div className="md:pb-2">
            <div className="border border-paper/25 bg-paper p-6 text-ink">
              <div className="flex items-center justify-between">
                <span className="mono">{dict.live.prices}</span>
                <span className="mono bg-yellow px-2 py-1">
                  {t(locale, {
                    ko: show.statusLabel!,
                    en: show.statusLabelEn!,
                  })}
                </span>
              </div>
              <div className="mt-5 space-y-2 border-t border-line pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">
                    {t(locale, { ko: "얼리버드", en: "Early bird" })}
                  </span>
                  <span className="text-muted line-through">
                    {locale === "ko" ? "20,000원" : "₩20,000"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    {t(locale, { ko: "사전예매", en: "Advance" })}
                  </span>
                  <span className="font-semibold">
                    {locale === "ko" ? "30,000원" : "₩30,000"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">
                    {t(locale, { ko: "현장", en: "At the door" })}
                  </span>
                  <span>{locale === "ko" ? "40,000원" : "₩40,000"}</span>
                </div>
              </div>
              <a
                href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ticket mt-6 w-full"
              >
                {dict.live.book}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="flex items-end justify-between">
          <p className="eyebrow">{dict.home.pressEyebrow}</p>
          <Link
            href={`/${locale}/press`}
            className="mono link-underline text-muted"
          >
            {dict.common.more} →
          </Link>
        </div>
        <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {QUOTES.slice(1, 4).map((q) => (
            <figure key={q.text}>
              <blockquote className="serif text-[19px] leading-[1.7]">
                “{t(locale, { ko: q.text, en: q.textEn })}”
              </blockquote>
              <figcaption className="mono mt-4 text-muted">
                {t(locale, { ko: q.source, en: q.sourceEn })} · {q.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
