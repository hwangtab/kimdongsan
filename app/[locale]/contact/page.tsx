import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Prompt } from "@/components/win";
import { SITE } from "@/data/site";
import { getDictionary, isLocale, t, type Locale } from "@/lib/i18n";
import { contactGraph } from "@/lib/schema";
import { OG_IMAGES, pageMetadata } from "@/lib/seo";

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
    path: "/contact",
    title: dict.meta.contactTitle,
    description: dict.contact.lead,
    image: OG_IMAGES.contact,
  });
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
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
      <JsonLd graph={contactGraph(locale, [])} />
      <Prompt path="CONTACT" label="mail" />

      <h1 className="text-head mt-4 md:text-hero">
        {dict.contact.title}
        <span className="sr-only">{dict.contact.h1Note}</span>
      </h1>
      <p className="longform mt-4 max-w-xl leading-[1.5] md:text-mid">
        {dict.contact.lead}
      </p>

      <div className="mt-8 grid border border-line md:grid-cols-3">
        <section className="border-b border-line p-4 md:border-b-0 md:border-r">
          <p className="mono text-signal">{dict.contact.booking}</p>
          <h2 className="text-mid mt-2 leading-tight">
            {dict.contact.bookingNote}
          </h2>
          <ul className="plain mt-4 space-y-1">
            <li>
              <a className="link-underline" href={`mailto:${SITE.email}`}>
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

        <section className="border-b border-line p-4 md:border-b-0 md:border-r">
          <p className="mono text-signal">{dict.contact.artist}</p>
          <h2 className="text-mid mt-2 leading-tight">
            {SITE.instagramHandle}
          </h2>
          <p className="mono mt-2 text-muted">{dict.contact.artistNote}</p>
          <ul className="plain mt-4 space-y-1">
            <li>
              <a
                className="link-underline"
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                className="link-underline"
                href={SITE.facebook}
                target="_blank"
                rel="noreferrer"
              >
                Facebook{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                className="link-underline"
                href={SITE.poclanos}
                target="_blank"
                rel="noreferrer"
              >
                Poclanos{" "}
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </section>

        <section className="p-4">
          <p className="mono text-signal">{dict.contact.shop}</p>
          <h2 className="text-mid mt-2 leading-tight">
            {t(locale, {
              ko: SITE.longPlayer.name,
              en: SITE.longPlayer.nameEn,
            })}
          </h2>
          <p className="mono mt-2 text-muted">{dict.contact.shopNote}</p>
          <dl className="plain mt-4 space-y-1">
            <div>
              <dt className="text-muted">{dict.contact.address}</dt>
              <dd>
                {t(locale, {
                  ko: SITE.longPlayer.address,
                  en: SITE.longPlayer.addressEn,
                })}
              </dd>
            </div>
            <div>
              <dt className="text-muted">{dict.contact.hours}</dt>
              <dd>
                {t(locale, {
                  ko: SITE.longPlayer.hours,
                  en: SITE.longPlayer.hoursEn,
                })}
              </dd>
            </div>
            <div>
              <dt className="text-muted">{dict.contact.phone}</dt>
              <dd>
                <a
                  className="link-underline"
                  href={`tel:${SITE.longPlayer.phoneHref}`}
                >
                  {SITE.longPlayer.phone}
                </a>
              </dd>
            </div>
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={SITE.longPlayer.naver}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              {dict.live.mapNaver}{" "}<span aria-hidden="true">↗</span>
            </a>
            <a
              href={SITE.longPlayer.kakao}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              {dict.live.mapKakao}{" "}<span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </div>

      <section className="mt-10 grid gap-8 border-t border-line pt-6 md:grid-cols-[0.8fr_1.2fr] md:gap-10">
        <div>
          <p className="mono text-signal">{dict.contact.tech}</p>
          <h2 className="text-mid mt-2 md:text-head">{dict.live.techTitle}</h2>
        </div>
        <div>
          <p className="longform text-muted">{dict.contact.techNote}</p>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost mt-5">
            {dict.live.techCta}{" "}<span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
        <div>
          <p className="mono text-muted">{dict.live.upcoming}</p>
          <p className="text-mid mt-1 leading-none">{dict.live.showLine}</p>
        </div>
        <a
          href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ticket"
        >
          {dict.live.book}{" "}<span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
