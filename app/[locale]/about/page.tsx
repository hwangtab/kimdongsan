import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BIOS, MEMBERS, SITE, TIMELINE } from "@/data/site";
import { DISCOGRAPHY } from "@/data/discography";
import { QUOTES } from "@/data/press";
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
    title: { absolute: dict.meta.aboutTitle },
    description: dict.about.lead,
    alternates: alternates(locale, "/about"),
    openGraph: {
      title: dict.meta.aboutTitle,
      description: dict.about.lead,
      images: [{ url: "/images/album/cover-2000.jpg", width: 2000, height: 2000 }],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const bio = locale === "ko" ? BIOS.ko.long : BIOS.en.long;
  const quote = QUOTES[0];

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
      <p className="eyebrow">{dict.about.eyebrow}</p>
      <h1 className="display mt-5 whitespace-pre-line text-[clamp(2.8rem,7.4vw,5.8rem)]">
        {dict.about.title}
      </h1>
      <p className="serif mt-7 max-w-2xl text-[clamp(1.1rem,2.2vw,1.4rem)] leading-[1.7]">
        {dict.about.lead}
      </p>

      <div className="mt-14 grid gap-10 border-t border-line pt-10 md:grid-cols-[0.7fr_1.3fr] md:gap-16">
        <div>
          <p className="eyebrow">{dict.about.bioTitle}</p>
        </div>
        <div className="space-y-5 text-[16px] leading-[1.95] text-muted">
          {bio.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>

      <section className="mt-20 md:mt-28">
        <p className="eyebrow">{dict.about.methodEyebrow}</p>
        <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
          {dict.about.methodTitle}
        </h2>
        <div className="mt-10 grid gap-8 border-t border-ink pt-8 md:grid-cols-3">
          {dict.about.method.map((step) => (
            <div key={step.step}>
              <p className="latin text-4xl font-light text-muted">{step.step}</p>
              <h3 className="mt-4 text-lg font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-[1.85] text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="eyebrow">{dict.about.timelineEyebrow}</p>
            <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
              {dict.about.timelineTitle}
            </h2>
          </div>
        </div>
        <div className="mt-10 border-t border-line">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-[120px_1fr] md:gap-10"
            >
              <p className="latin text-2xl font-light">{item.year}</p>
              <p className="max-w-3xl text-[15px] leading-[1.85] text-muted">
                {t(locale, { ko: item.ko, en: item.en })}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <p className="eyebrow">{dict.about.discographyEyebrow}</p>
        <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
          {dict.about.discographyTitle}
        </h2>
        <div className="mt-10 border-t border-ink">
          {DISCOGRAPHY.map((release) => (
            <div
              key={`${release.date}-${release.title}`}
              className="grid gap-2 border-b border-line py-5 md:grid-cols-[82px_1fr_auto] md:items-baseline md:gap-8"
            >
              <p className="latin text-xl font-light">{release.year}</p>
              <div className="flex items-baseline gap-4">
                {release.art && (
                  <Image
                    src={release.art}
                    alt=""
                    width={56}
                    height={56}
                    className="hidden h-14 w-14 border border-line object-cover sm:block"
                  />
                )}
                <div>
                  <p className="font-medium tracking-[-0.01em]">
                    {t(locale, {
                      ko: release.title,
                      en: release.titleEn,
                    })}
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    {t(locale, { ko: release.type, en: release.typeEn })} ·{" "}
                    {t(locale, { ko: release.role, en: release.roleEn })}
                  </p>
                  {release.note && (
                    <p className="mt-1 text-[12px] text-muted">
                      {t(locale, { ko: release.note, en: release.noteEn })}
                    </p>
                  )}
                </div>
              </div>
              <p className="mono text-muted">{release.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <p className="eyebrow">{dict.about.membersEyebrow}</p>
        <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
          {dict.about.membersTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-muted">
          {dict.about.membersNote}
        </p>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((member) => (
            <div key={member.name}>
              <div className="relative aspect-square overflow-hidden border border-line bg-paper-deep">
                <Image
                  src={member.photo}
                  alt={t(locale, { ko: member.name, en: member.nameEn })}
                  width={480}
                  height={480}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <p className="mt-3 text-base font-semibold tracking-[-0.02em]">
                {t(locale, { ko: member.name, en: member.nameEn })}
              </p>
              <p className="mono mt-1 text-muted">
                {t(locale, { ko: member.role, en: member.roleEn })}
              </p>
              {member.note && (
                <p className="mt-1 text-[12px] text-muted">
                  {t(locale, { ko: member.note, en: member.noteEn })}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-20 grid gap-10 border-y border-line py-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16 md:py-16">
        <div>
          <p className="eyebrow">{dict.about.longPlayerEyebrow}</p>
          <h2 className="display mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
            {dict.about.longPlayerTitle}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-muted">
            {dict.about.longPlayerBody}
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={SITE.longPlayer.naver}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              {dict.live.mapNaver}
            </a>
            <a
              href={SITE.longPlayer.kakao}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              {dict.live.mapKakao}
            </a>
          </div>
        </div>
        <dl className="space-y-4 self-end text-sm">
          <div className="border-t border-line pt-3">
            <dt className="mono text-muted">{dict.contact.address}</dt>
            <dd className="mt-1">
              {t(locale, {
                ko: SITE.longPlayer.address,
                en: SITE.longPlayer.addressEn,
              })}
            </dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className="mono text-muted">{dict.contact.hours}</dt>
            <dd className="mt-1">
              {t(locale, {
                ko: SITE.longPlayer.hours,
                en: SITE.longPlayer.hoursEn,
              })}
            </dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className="mono text-muted">{dict.contact.phone}</dt>
            <dd className="mt-1">
              <a href={`tel:${SITE.longPlayer.phoneHref}`} className="link-underline">
                {SITE.longPlayer.phone}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <blockquote className="mx-auto mt-16 max-w-3xl text-center md:mt-24">
        <p className="serif text-[clamp(1.4rem,3vw,2.2rem)] leading-[1.6]">
          “{t(locale, { ko: quote.text, en: quote.textEn })}”
        </p>
        <footer className="mono mt-5 text-muted">
          {t(locale, { ko: quote.source, en: quote.sourceEn })} · {quote.date}
        </footer>
      </blockquote>
    </div>
  );
}
