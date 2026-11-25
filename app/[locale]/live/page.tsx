import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SHOWS, SHOW_DETAILS } from "@/data/shows";
import { SITE } from "@/data/site";
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
    title: { absolute: dict.meta.liveTitle },
    description: dict.live.title,
    alternates: alternates(locale, "/live"),
    openGraph: {
      title: dict.meta.liveTitle,
      description: dict.live.title,
      images: [{ url: "/images/live/poster-1800.jpg", width: 1800, height: 2250 }],
    },
  };
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
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
      <p className="eyebrow">{dict.live.eyebrow}</p>
      <h1 className="display mt-5 text-[clamp(2.8rem,7vw,5.4rem)]">
        {dict.live.title}
      </h1>

      <section className="mt-10 grid gap-10 border-t border-ink pt-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div>
          <div className="relative border border-line bg-paper-deep">
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
              className="h-auto w-full"
            />
          </div>
          <p className="mono mt-3 text-muted">{dict.live.poster}</p>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <p className="mono text-muted">{dict.live.upcoming}</p>
            <span className="mono bg-yellow px-2 py-1">
              {t(locale, {
                ko: featured.statusLabel!,
                en: featured.statusLabelEn!,
              })}
            </span>
          </div>
          <p className="latin mt-6 text-[clamp(2.8rem,7vw,5rem)] font-light leading-none">
            12.04
          </p>
          <h2 className="mt-3 text-[clamp(1.3rem,2.6vw,1.7rem)] font-semibold tracking-[-0.03em]">
            {t(locale, { ko: featured.title, en: featured.titleEn })}
          </h2>

          <dl className="mt-7 space-y-3 border-t border-line pt-6 text-sm">
            <div className="grid grid-cols-[72px_1fr] gap-3">
              <dt className="mono text-muted">{dict.live.date}</dt>
              <dd>{featured.dateLabel}</dd>
            </div>
            <div className="grid grid-cols-[72px_1fr] gap-3">
              <dt className="mono text-muted">{dict.live.time}</dt>
              <dd>{t(locale, { ko: featured.time!, en: featured.timeEn! })}</dd>
            </div>
            <div className="grid grid-cols-[72px_1fr] gap-3">
              <dt className="mono text-muted">{dict.live.venue}</dt>
              <dd>
                {t(locale, { ko: featured.venue, en: featured.venueEn })}
                <span className="mt-1 block text-[12px] text-muted">
                  서울특별시 마포구 월드컵북로2길 49
                </span>
              </dd>
            </div>
          </dl>

          <div className="mt-7">
            <p className="mono mb-3 text-muted">{dict.live.prices}</p>
            <div className="border-t border-line">
              {SHOW_DETAILS.prices.map((price) => (
                <div
                  key={price.label}
                  className="flex items-baseline justify-between border-b border-line py-2.5 text-sm"
                >
                  <span className="text-muted">
                    {t(locale, { ko: price.label, en: price.labelEn })}
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="font-medium">
                      {t(locale, { ko: price.price, en: price.priceEn })}
                    </span>
                    <span className="mono w-16 text-right text-[10px] text-muted">
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
            className="btn btn-ticket mt-7 w-full"
          >
            {dict.live.book}
          </a>
          <p className="mono mt-3 text-[10px] leading-relaxed text-muted">
            {dict.live.onSaleNote}
          </p>
        </div>
      </section>

      <section className="mt-14 grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <h3 className="mono mb-4 text-muted">{dict.live.cast}</h3>
          <ul className="space-y-2.5 border-t border-line pt-4 text-[14px] leading-[1.8]">
            {(locale === "ko" ? SHOW_DETAILS.castKo : SHOW_DETAILS.castEn).map(
              (line) => (
                <li key={line}>{line}</li>
              ),
            )}
          </ul>
        </div>
        <div>
          <h3 className="mono mb-4 text-muted">{dict.live.notes}</h3>
          <p className="border-t border-line pt-4 text-[14px] leading-[1.85] text-muted">
            {t(locale, { ko: featured.note, en: featured.noteEn })}
          </p>
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <h2 className="display text-[clamp(1.8rem,4vw,2.8rem)]">
          {dict.live.past}
        </h2>
        <div className="mt-8 border-t border-ink">
          {past.map((show) => (
            <div
              key={show.id}
              className="grid gap-2 border-b border-line py-5 md:grid-cols-[140px_1fr_auto] md:items-baseline md:gap-8"
            >
              <p className="latin text-lg font-light">{show.dateLabel}</p>
              <div>
                <p className="font-medium tracking-[-0.01em]">
                  {t(locale, { ko: show.title, en: show.titleEn })}
                </p>
                <p className="mt-1 text-[13px] text-muted">
                  {t(locale, { ko: show.venue, en: show.venueEn })}
                </p>
              </div>
              <p className="mono text-muted">
                {t(locale, { ko: show.city, en: show.cityEn })}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-8 border-y border-line py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-14">
        <div>
          <p className="eyebrow">{dict.live.techEyebrow}</p>
          <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
            {dict.live.techTitle}
          </h2>
        </div>
        <div>
          <p className="text-[15px] leading-[1.9] text-muted">
            {dict.live.techBody}
          </p>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost mt-6">
            {dict.live.techCta}
          </a>
        </div>
      </section>
    </div>
  );
}
