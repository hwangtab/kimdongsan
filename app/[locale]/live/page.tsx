import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SHOWS, SHOW_DETAILS } from "@/data/shows";
import { SITE } from "@/data/site";
import { VIDEOS } from "@/data/videos";
import { VideoEmbed } from "@/components/video-embed";
import { JsonLd } from "@/components/json-ld";
import { Prompt, Win } from "@/components/win";
import { getDictionary, isLocale, t, type Locale } from "@/lib/i18n";
import { liveGraph } from "@/lib/schema";
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
    path: "/live",
    title: dict.meta.liveTitle,
    description: dict.live.title,
    image: {
      url: "/images/live/poster-1800.jpg",
      width: 1800,
      height: 2250,
      alt:
        locale === "ko"
          ? "김동산과 블루이웃 정규 1집 발매 쇼케이스 포스터"
          : "Kim Dongsan & Blueeewoot album release showcase poster",
    },
  });
}

export default async function LivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const featured = SHOWS.find((show) => show.featured)!;
  const past = SHOWS.filter((show) => !show.featured);
  const ticketUrl = locale === "ko" ? SITE.showUrl : SITE.showUrlEn;

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
      <JsonLd graph={liveGraph(locale)} />
      <Prompt path="LIVE" label="run show.exe" />

      <h1 className="text-head mt-4 md:text-hero">
        {dict.live.title}
        <span className="sr-only">{dict.live.h1Note}</span>
      </h1>
      <p className="mono mt-2 text-muted">
        {featured.dateLabel} · {t(locale, { ko: featured.venue, en: featured.venueEn })}
      </p>

      <section className="mt-6 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
        <Win label="POSTER.JPG" right="1800×2250" bodyClassName="p-0">
          <Image
            src="/images/live/poster-1800.jpg"
            alt={
              locale === "ko"
                ? "2026년 12월 4일 청년문화공간 ju에서 열리는 김동산과 블루이웃 정규 1집 발매 쇼케이스 포스터"
                : "Poster for Kim Dongsan & Blueeewoot's album release showcase at Youth Culture Space ju, December 4, 2026"
            }
            width={1800}
            height={2250}
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 42vw, 92vw"
            className="block h-auto w-full border-b border-line"
          />
          <p className="mono px-3 py-2 text-muted">{dict.live.poster}</p>
        </Win>

        <div>
          <div className="flex items-baseline justify-between">
            <p className="mono text-muted">{dict.live.upcoming}</p>
            <span className="mono bg-ticket px-1 text-void">
              {t(locale, {
                ko: featured.statusLabel!,
                en: featured.statusLabelEn!,
              })}
            </span>
          </div>

          <p className="text-head mt-4 leading-none text-ticket md:text-hero">12.04</p>
          <h2 className="text-mid mt-3 leading-tight">
            {t(locale, { ko: featured.title, en: featured.titleEn })}
          </h2>

          <dl className="mono mt-5 space-y-1 border-t border-line pt-4">
            <div className="grid grid-cols-[88px_1fr] gap-4">
              <dt className="text-muted">{dict.live.date}</dt>
              <dd>
                <time dateTime={featured.date}>{featured.dateLabel}</time>
              </dd>
            </div>
            <div className="grid grid-cols-[88px_1fr] gap-4">
              <dt className="text-muted">{dict.live.time}</dt>
              <dd>{t(locale, { ko: featured.time!, en: featured.timeEn! })}</dd>
            </div>
            <div className="grid grid-cols-[88px_1fr] gap-4">
              <dt className="text-muted">{dict.live.venue}</dt>
              <dd>
                {t(locale, { ko: featured.venue, en: featured.venueEn })}
                <span className="mt-1 block text-muted">
                  {dict.live.venueAddress}
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-5">
            <p className="mono text-muted">{dict.live.prices}</p>
            <div className="mt-2 border-t border-line">
              {SHOW_DETAILS.prices.map((price) => (
                <div
                  key={price.label}
                  className="flex items-baseline justify-between border-b border-line py-2"
                >
                  <span className="mono text-muted">
                    {t(locale, { ko: price.label, en: price.labelEn })}
                  </span>
                  <span className="flex items-baseline gap-4">
                    <span>
                      {t(locale, { ko: price.price, en: price.priceEn })}
                    </span>
                    <span className="mono w-20 text-right text-muted">
                      {t(locale, { ko: price.state, en: price.stateEn })}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <a
            href={ticketUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-ticket mt-5 w-full"
          >
            {dict.live.book}{" "}<span aria-hidden="true">↗</span>
          </a>
          <p className="mono mt-2 text-muted">{dict.live.onSaleNote}</p>
        </div>
      </section>

      <section className="mt-10 grid gap-8 md:grid-cols-2 md:gap-10">
        <div>
          <p className="mono text-signal">{dict.live.cast}</p>
          <ul className="longform mt-2 space-y-1 border-t border-line pt-3">
            {(locale === "ko" ? SHOW_DETAILS.castKo : SHOW_DETAILS.castEn).map(
              (line) => (
                <li key={line}>{line}</li>
              ),
            )}
          </ul>
        </div>
        <div>
          <p className="mono text-signal">{dict.live.notes}</p>
          <p className="longform mt-2 border-t border-line pt-3 text-muted">
            {t(locale, { ko: featured.note, en: featured.noteEn })}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <Prompt path="LIVE" label="type past.log" />
        <h2 className="text-mid mt-4 md:text-head">{dict.live.past}</h2>
        <div className="mt-5 border-t border-line">
          {past.map((show) => (
            <div
              key={show.id}
              className="grid gap-1 border-b border-line py-3 md:grid-cols-[140px_1fr_100px] md:items-baseline md:gap-8"
            >
              <time dateTime={show.date} className="mono text-signal">
                {show.dateLabel}
              </time>
              <div>
                <p>{t(locale, { ko: show.title, en: show.titleEn })}</p>
                <p className="mono mt-1 text-muted">
                  {t(locale, { ko: show.venue, en: show.venueEn })}
                </p>
              </div>
              <p className="mono text-muted md:text-right">
                {t(locale, { ko: show.city, en: show.cityEn })}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Prompt path="LIVE" label="dir videos\*" />
        <h2 className="text-mid mt-4 md:text-head">{dict.live.videosTitle}</h2>
        <div className="mt-5 grid gap-8 md:grid-cols-2">
          {VIDEOS.map((video) => (
            <div key={video.id}>
              <VideoEmbed
                id={video.id}
                title={t(locale, { ko: video.title, en: video.titleEn })}
                playLabel={dict.common.play}
                watchLabel={dict.live.watchOnYouTube}
              />
              <p className="mt-3">{t(locale, { ko: video.title, en: video.titleEn })}</p>
              <p className="mono mt-1 text-muted">
                {video.date ? `${video.date} · ` : ""}
                {t(locale, { ko: video.venue, en: video.venueEn })}
              </p>
              <p className="longform mt-2 text-muted">
                {t(locale, { ko: video.note, en: video.noteEn })}
              </p>
            </div>
          ))}
        </div>
        <p className="mono mt-5 text-muted">{dict.live.videosNote}</p>
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <div>
          <Prompt path="LIVE" label="type tech.txt" />
          <h2 className="text-mid mt-4 md:text-head">{dict.live.techTitle}</h2>
        </div>
        <div>
          <p className="longform text-muted">{dict.live.techBody}</p>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost mt-5">
            {dict.live.techCta}{" "}<span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
