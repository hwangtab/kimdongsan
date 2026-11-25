import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackList } from "@/components/track-list";
import { BrandTitle } from "@/components/brand-title";
import {
  ALBUM,
  CREDITS,
  TRACKS,
  waveformFor,
} from "@/data/album";
import { alternates, getDictionary, isLocale, t, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ko";
  const dict = getDictionary(locale);
  return {
    title: { absolute: dict.meta.albumTitle },
    description: dict.album.lead,
    alternates: alternates(locale, "/album"),
    openGraph: {
      title: dict.meta.albumTitle,
      description: dict.album.lead,
      images: [{ url: ALBUM.cover, width: 2000, height: 2000 }],
    },
  };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const peaks = Object.fromEntries(
    TRACKS.map((track) => [String(track.no), waveformFor(track.no)]),
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
      <p className="eyebrow">{dict.album.eyebrow}</p>

      <div className="mt-8 grid gap-10 md:grid-cols-[0.92fr_1.08fr] md:gap-16">
        <div>
          <div className="relative border border-ink/15 bg-paper-deep">
            <Image
              src={ALBUM.cover}
              alt={
                locale === "ko"
                  ? "정규 1집 《김동산과 블루이웃》 커버"
                  : "Cover of Kim Dongsan & Blueeewoot"
              }
              width={1000}
              height={1000}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 44vw, 92vw"
              className="h-auto w-full"
            />
          </div>
          <p className="mono mt-3 text-muted">
            {t(locale, { ko: "커버 사진", en: "Cover photograph" })}
          </p>
        </div>

        <div className="flex flex-col justify-center">
          <h1>
            <BrandTitle
              slug="album-brand"
              locale={locale}
              alt={dict.album.title}
              priority
              className="h-auto w-full max-w-[520px]"
            />
          </h1>
          {locale === "ko" && (
            <p className="latin mt-3 text-lg font-light tracking-[0.16em] text-muted">
              Kim Dongsan &amp; Blueeewoot
            </p>
          )}
          <p className="longform mt-7 max-w-xl text-muted">{dict.album.lead}</p>

          <dl className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-line pt-7 text-sm">
            <div>
              <dt className="mono text-muted">{dict.common.released}</dt>
              <dd className="mt-1 font-medium">{ALBUM.releaseLabel}</dd>
            </div>
            <div>
              <dt className="mono text-muted">{dict.common.label}</dt>
              <dd className="mt-1 font-medium">
                {t(locale, { ko: ALBUM.label, en: ALBUM.labelEn })}
              </dd>
            </div>
            <div>
              <dt className="mono text-muted">{dict.common.genre}</dt>
              <dd className="mt-1 font-medium">
                {t(locale, { ko: ALBUM.genre, en: ALBUM.genreEn })}
              </dd>
            </div>
            <div>
              <dt className="mono text-muted">{dict.common.runtime}</dt>
              <dd className="mt-1 font-medium">{ALBUM.runtime}</dd>
            </div>
          </dl>

          <div className="mt-9 flex flex-wrap gap-2">
            {ALBUM.streaming.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="mono border border-line px-3 py-2 transition-colors hover:border-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16 md:mt-24">
        <div className="flex items-baseline justify-between">
          <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">
            {dict.album.tracklist}
          </h2>
          <span className="mono text-muted">
            {ALBUM.trackCount} · {ALBUM.runtime}
          </span>
        </div>
        <div className="mt-8">
          <TrackList
            tracks={TRACKS}
            locale={locale}
            peaks={peaks}
            labels={{
              titleTrack: dict.common.titleTrack,
              instrumental: dict.common.instrumental,
              lyrics: dict.common.lyrics,
              fullLyrics: dict.common.fullLyrics,
              hideLyrics: dict.common.hideLyrics,
              credits: dict.common.credits,
              play: dict.common.play,
              pause: dict.common.pause,
              trackCredits: dict.album.trackCredits,
            }}
          />
        </div>
        <p className="mono mt-4 text-muted">{dict.album.lyricsNote}</p>
      </section>

      <section className="mt-16 md:mt-24">
        <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">
          {dict.album.creditsTitle}
        </h2>
        <p className="longform mt-3 max-w-2xl text-[16px] text-muted">
          {dict.album.creditsNote}
        </p>
        <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
          {CREDITS.map((group) => (
            <div key={group.group}>
              <p className="mono mb-3 text-muted">{group.group}</p>
              <ul className="longform space-y-1.5 text-[15px] leading-[1.75]">
                {(locale === "ko" ? group.ko : group.en).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
