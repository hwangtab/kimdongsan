import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackList } from "@/components/track-list";
import { Prompt, Win } from "@/components/win";
import { ALBUM, CREDITS, TRACKS, waveformFor } from "@/data/album";
import { getDictionary, isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

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
    path: "/album",
    title: dict.meta.albumTitle,
    description: dict.album.lead,
    image: {
      url: ALBUM.cover,
      width: 2000,
      height: 2000,
      alt:
        locale === "ko"
          ? "정규 1집 《김동산과 블루이웃》 커버"
          : "Cover of Kim Dongsan & Blueeewoot",
    },
  });
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
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
      <Prompt path="ALBUM" label="dir" />

      <h1 className="text-head mt-4 md:text-hero">
        {dict.nav.album}
        <span className="sr-only">
          {" — "}
          {locale === "ko"
            ? `정규 1집 《${ALBUM.title}》 수록곡·가사·크레딧`
            : `the debut album ${ALBUM.titleEn} — tracklist, lyrics and credits`}
        </span>
      </h1>
      <p className="mono mt-2 text-muted">
        {dict.album.eyebrow} · 1ST ALBUM · {ALBUM.releaseLabel}
      </p>

      <div className="mt-6 grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:gap-10">
        <div>
          <Win label="COVER.JPG" right="1000×1000" bodyClassName="p-0">
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
              className="block h-auto w-full"
            />
          </Win>
          <p className="mono mt-2 text-muted">
            {t(locale, { ko: "커버 사진", en: "Cover photograph" })}
          </p>
        </div>

        <div className="md:self-center">
          <p className="text-mid leading-tight">{ALBUM.title}</p>
          <p className="mono mt-1 text-kitsch">{ALBUM.titleEn}</p>
          <p className="longform mt-4 max-w-xl text-muted">{dict.album.lead}</p>

          <dl className="mono mt-6 grid grid-cols-[96px_1fr] gap-x-4 gap-y-1 border-t border-line pt-4">
            <dt className="text-muted">{dict.common.released}</dt>
            <dd>{ALBUM.releaseLabel}</dd>
            <dt className="text-muted">{dict.common.label}</dt>
            <dd>{t(locale, { ko: ALBUM.label, en: ALBUM.labelEn })}</dd>
            <dt className="text-muted">{dict.common.genre}</dt>
            <dd>{t(locale, { ko: ALBUM.genre, en: ALBUM.genreEn })}</dd>
            <dt className="text-muted">{dict.common.runtime}</dt>
            <dd>{ALBUM.runtime}</dd>
          </dl>

          <div className="mt-6 flex flex-wrap gap-2">
            {ALBUM.streaming.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                {link.label}{" "}<span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-10">
        <Prompt path="ALBUM" label={dict.album.menuPrompt} />
        <h2 className="sr-only">{dict.album.menuTitle}</h2>
        <div className="mt-4">
          <Win
            label={locale === "ko" ? "차림표.TXT" : "MENU.TXT"}
            right="SINCE 2010"
            bodyClassName="p-0"
          >
            <div className="hidden gap-4 border-b border-line px-4 py-2 md:grid md:grid-cols-[48px_1fr_1.1fr_1.2fr_72px]">
              <span className="mono text-muted">{dict.album.menuNo}</span>
              <span className="mono text-muted">{dict.album.menuDish}</span>
              <span className="mono text-muted">
                {dict.album.menuIngredients}
              </span>
              <span className="mono text-muted">{dict.album.menuMethod}</span>
              <span className="mono text-right text-muted">
                {dict.album.menuServes}
              </span>
            </div>
            {TRACKS.map((track) => (
              <div
                key={track.no}
                className="grid gap-1 border-b border-line px-4 py-3 last:border-b-0 md:grid-cols-[48px_1fr_1.1fr_1.2fr_72px] md:items-baseline md:gap-4"
              >
                <div className="flex items-baseline gap-3 md:contents">
                  <span className="mono text-signal">
                    {String(track.no).padStart(2, "0")}
                  </span>
                  <span className="leading-tight">
                    {t(locale, { ko: track.title, en: track.titleEn })}
                  </span>
                  <span className="mono ml-auto text-muted md:hidden">
                    {track.duration}
                  </span>
                </div>
                <span className="longform text-muted">
                  {t(locale, {
                    ko: track.ingredient,
                    en: track.ingredientEn,
                  })}
                </span>
                <span className="longform text-muted">
                  {t(locale, { ko: track.method, en: track.methodEn })}
                </span>
                <span className="mono hidden text-muted md:block md:text-right">
                  {track.duration}
                </span>
              </div>
            ))}
          </Win>
        </div>
      </section>

      <section className="mt-10">
        <Prompt path="ALBUM" label="type tracklist.txt" />
        <h2 className="sr-only">{dict.album.tracklist}</h2>
        <div className="mt-4">
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
              trackCredits: dict.common.credits,
            }}
          />
        </div>
      </section>

      <section className="mt-10">
        <Prompt path="ALBUM" label="type credits.txt" />
        <h2 className="sr-only">{dict.album.creditsTitle}</h2>
        <div className="mt-4 grid border-t border-line md:grid-cols-2">
          {CREDITS.map((group) => (
            <div
              key={group.group}
              className="border-b border-line px-4 py-4 md:odd:border-r"
            >
              <p className="mono text-signal">{group.group}</p>
              <ul className="longform mt-2 space-y-1 text-muted">
                {(locale === "ko" ? group.ko : group.en).map((credit) => (
                  <li key={credit}>{credit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
