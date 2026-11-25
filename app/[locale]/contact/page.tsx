import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    title: { absolute: dict.meta.contactTitle },
    description: dict.contact.lead,
    alternates: alternates(locale, "/contact"),
    openGraph: {
      title: dict.meta.contactTitle,
      description: dict.contact.lead,
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
      <p className="eyebrow">{dict.contact.eyebrow}</p>
      <h1 className="display mt-5 text-[clamp(2.8rem,7vw,5.4rem)]">
        {dict.contact.title}
      </h1>
      <p className="serif mt-6 max-w-xl text-[clamp(1.1rem,2.2vw,1.4rem)] leading-[1.7]">
        {dict.contact.lead}
      </p>

      <div className="mt-12 grid gap-8 border-t border-ink pt-8 md:grid-cols-3">
        <section>
          <p className="mono text-muted">{dict.contact.booking}</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
            {dict.contact.bookingNote}
          </h2>
          <ul className="mt-5 space-y-2 text-[15px]">
            <li>
              <a
                className="link-underline"
                href={`mailto:${SITE.email}`}
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a className="link-underline" href={`tel:${SITE.phoneHref}`}>
                {SITE.phone}
              </a>
            </li>
          </ul>
        </section>

        <section>
          <p className="mono text-muted">{dict.contact.artist}</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
            {SITE.instagramHandle}
          </h2>
          <p className="mt-2 text-[13px] text-muted">
            {dict.contact.artistNote}
          </p>
          <ul className="mt-5 space-y-2 text-[15px]">
            <li>
              <a
                className="link-underline"
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                className="link-underline"
                href={SITE.facebook}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
          </ul>
        </section>

        <section>
          <p className="mono text-muted">{dict.contact.shop}</p>
          <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
            {t(locale, {
              ko: SITE.longPlayer.name,
              en: SITE.longPlayer.nameEn,
            })}
          </h2>
          <p className="mt-2 text-[13px] text-muted">
            {dict.contact.shopNote}
          </p>
          <dl className="mt-5 space-y-2 text-[14px]">
            <div>
              <dt className="mono text-muted">{dict.contact.address}</dt>
              <dd className="mt-0.5">
                {t(locale, {
                  ko: SITE.longPlayer.address,
                  en: SITE.longPlayer.addressEn,
                })}
              </dd>
            </div>
            <div>
              <dt className="mono text-muted">{dict.contact.hours}</dt>
              <dd className="mt-0.5">
                {t(locale, {
                  ko: SITE.longPlayer.hours,
                  en: SITE.longPlayer.hoursEn,
                })}
              </dd>
            </div>
            <div>
              <dt className="mono text-muted">{dict.contact.phone}</dt>
              <dd className="mt-0.5">
                <a
                  className="link-underline"
                  href={`tel:${SITE.longPlayer.phoneHref}`}
                >
                  {SITE.longPlayer.phone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={SITE.longPlayer.naver}
              target="_blank"
              rel="noreferrer"
              className="mono border border-line px-2.5 py-1.5 transition-colors hover:border-ink"
            >
              {dict.live.mapNaver}
            </a>
            <a
              href={SITE.longPlayer.kakao}
              target="_blank"
              rel="noreferrer"
              className="mono border border-line px-2.5 py-1.5 transition-colors hover:border-ink"
            >
              {dict.live.mapKakao}
            </a>
          </div>
        </section>
      </div>

      <section className="mt-16 grid gap-8 border-y border-line py-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <p className="eyebrow">{dict.contact.tech}</p>
          <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
            {dict.live.techTitle}
          </h2>
        </div>
        <div>
          <p className="text-[15px] leading-[1.9] text-muted">
            {dict.contact.techNote}
          </p>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost mt-6">
            {dict.live.techCta}
          </a>
        </div>
      </section>

      <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow">{dict.live.upcoming}</p>
          <p className="mt-2 text-lg font-semibold">12.04 · 청년문화공간 ju</p>
        </div>
        <a
          href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ticket"
        >
          {dict.live.book}
        </a>
      </div>
    </div>
  );
}
