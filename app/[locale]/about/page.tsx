import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BIOS, MEMBERS, PRINCIPLES, SITE, TIMELINE } from "@/data/site";
import { DISCOGRAPHY } from "@/data/discography";
import { SONG_STORIES } from "@/data/songs";
import { QUOTES } from "@/data/press";
import { Prompt, Win } from "@/components/win";
import { JsonLd } from "@/components/json-ld";
import { getDictionary, isLocale, t, type Locale } from "@/lib/i18n";
import { aboutGraph } from "@/lib/schema";
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
    path: "/about",
    title: dict.meta.aboutTitle,
    description: dict.about.lead,
    image: OG_IMAGES.about,
    type: "profile",
  });
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
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
      <JsonLd graph={aboutGraph(locale)} />
      <Prompt path="ABOUT" label="type who.txt" />

      <h1 className="text-head mt-4 md:text-hero">
        {dict.about.title.split("\n").map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
        <span className="sr-only">{dict.about.h1Note}</span>
      </h1>
      <p className="mono mt-2 text-kitsch">{dict.about.latin}</p>
      <p className="longform mt-5 max-w-2xl leading-[1.5] md:text-mid">
        {dict.about.lead}
      </p>

      <div className="mt-8 grid gap-8 border-t border-line pt-6 md:grid-cols-[160px_1fr] md:gap-10">
        <p className="mono text-signal">BIO.TXT</p>
        <div className="space-y-5">
          {bio.split("\n\n").map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="longform">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <section className="mt-12">
        <Prompt path="ABOUT" label="type method.txt" />
        <h2 className="text-mid mt-4 md:text-head">{dict.about.methodTitle}</h2>
        <div className="mt-5 grid border border-line md:grid-cols-3">
          {dict.about.method.map((step, i) => (
            <div
              key={step.step}
              className="border-b border-line px-4 py-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <p className="text-mid leading-none text-signal md:text-head">{step.step}</p>
              <p className="mono mt-2 text-kitsch">{dict.about.methodCook[i]}</p>
              <h3 className="mt-3 text-[16px] leading-[1.5]">{step.title}</h3>
              <p className="longform mt-2 text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Prompt path="ABOUT" label={dict.about.principlesEyebrow} />
        <h2 className="text-mid mt-4 md:text-head">
          {dict.about.principlesTitle}
        </h2>
        <div className="mt-5 grid border border-line sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <div
              key={principle.no}
              className="border-b border-line px-4 py-5 last:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 sm:odd:border-r"
            >
              <p className="text-mid leading-none text-signal md:text-head">
                {principle.no}
              </p>
              <h3 className="mt-3 text-[16px] leading-[1.5]">
                {t(locale, principle.title)}
              </h3>
              <p className="longform mt-2 text-muted">
                {t(locale, principle.body)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Prompt path="ABOUT" label="dir songs\*" />
        <h2 className="text-mid mt-4 md:text-head">{dict.about.songsTitle}</h2>
        <p className="longform mt-3 max-w-2xl text-muted">
          {dict.about.songsIntro}
        </p>
        <div className="mt-5 border-b border-line">
          {SONG_STORIES.map((song) => (
            <Link
              key={song.title}
              href={song.href}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-1 border-t border-line py-4 md:grid-cols-[96px_1fr] md:gap-8"
            >
              <span className="mono text-muted">{song.year}</span>
              <div className="min-w-0">
                <p className="text-mid leading-tight group-hover:text-signal">
                  {t(locale, { ko: song.title, en: song.titleEn })}
                </p>
                <p className="mono mt-1 text-muted">
                  {t(locale, { ko: song.place, en: song.placeEn })} ·{" "}
                  {t(locale, { ko: song.release, en: song.releaseEn })}
                </p>
                <p className="longform mt-2 text-muted">
                  {t(locale, { ko: song.note, en: song.noteEn })}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mono mt-3 text-muted">{dict.about.songsNote}</p>
      </section>

      <section className="mt-12">
        <Prompt path="ABOUT" label="type timeline.log" />
        <h2 className="text-mid mt-4 md:text-head">{dict.about.timelineTitle}</h2>
        <div className="mt-5 border-t border-line">
          {TIMELINE.map((item) => (
            <div
              key={item.year}
              className="grid gap-1 border-b border-line py-3 md:grid-cols-[120px_1fr] md:gap-8"
            >
              <time dateTime={item.year} className="mono text-signal">
                {item.year}
              </time>
              <p className="longform text-muted">
                {t(locale, { ko: item.ko, en: item.en })}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Prompt path="ABOUT" label="dir disc\" />
        <h2 className="text-mid mt-4 md:text-head">{dict.about.discographyTitle}</h2>
        <div className="mt-5 border-t border-line">
          {DISCOGRAPHY.map((release) => (
            <div
              key={`${release.date}-${release.title}`}
              className="grid gap-1 border-b border-line py-3 md:grid-cols-[82px_1fr_120px] md:items-baseline md:gap-8"
            >
              <time dateTime={release.date.replaceAll(".", "-")} className="mono text-signal">
                {release.year}
              </time>
              <div>
                <p>{t(locale, { ko: release.title, en: release.titleEn })}</p>
                <p className="mono mt-1 text-muted">
                  {t(locale, { ko: release.type, en: release.typeEn })} ·{" "}
                  {t(locale, { ko: release.role, en: release.roleEn })}
                </p>
                {release.note && (
                  <p className="longform mt-1 text-muted">
                    {t(locale, { ko: release.note, en: release.noteEn })}
                  </p>
                )}
              </div>
              <p className="mono text-muted md:text-right">
                <time dateTime={release.date.replaceAll(".", "-")}>
                  {release.date}
                </time>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Prompt path="ABOUT" label="dir members\" />
        <h2 className="text-mid mt-4 md:text-head">{dict.about.membersTitle}</h2>
        <p className="longform mt-3 max-w-2xl text-muted">
          {dict.about.membersNote}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((member) => (
            <div key={member.name} className="border border-line">
              <div className="relative aspect-square overflow-hidden border-b border-line">
                <Image
                  src={member.photo}
                  alt={t(locale, { ko: member.name, en: member.nameEn })}
                  width={480}
                  height={480}
                  sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                  className="h-full w-full object-cover grayscale"
                />
              </div>
              <div className="px-3 py-3">
                <p className="text-mid leading-none">
                  {t(locale, { ko: member.name, en: member.nameEn })}
                </p>
                <p className="mono mt-2 text-signal">
                  {t(locale, { ko: member.role, en: member.roleEn })}
                </p>
                {member.note && (
                  <p className="mono mt-1 text-muted">
                    {t(locale, { ko: member.note, en: member.noteEn })}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-8 border-t border-line pt-6 md:grid-cols-[1.1fr_0.9fr] md:gap-10">
        <div>
          <Win label="SHOP.JPG" right="2018" bodyClassName="p-0">
            <Image
              src="/images/archive/shop-2018.webp"
              alt={t(locale, {
                ko: "LP와 중고 물건, 오래된 라디오가 가득한 롱플레이어 내부",
                en: "The interior of Long Player, filled with LPs and old objects",
              })}
              width={800}
              height={450}
              sizes="(min-width: 768px) 55vw, 92vw"
              className="block h-auto w-full border-b border-line"
            />
            <p className="mono px-3 py-2 text-muted">
              {dict.about.shopCredit}
            </p>
          </Win>
          <h2 className="text-mid mt-6 md:text-head">{dict.about.longPlayerTitle}</h2>
          <p className="longform mt-3 max-w-xl text-muted">
            {dict.about.longPlayerBody}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
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
            <Link href={`/${locale}/gallery`} className="btn">
              {dict.about.galleryCta}{" "}<span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <dl className="mono self-end space-y-3">
          <div className="border-t border-line pt-2">
            <dt className="text-muted">{dict.contact.address}</dt>
            <dd className="mt-1">
              {t(locale, {
                ko: SITE.longPlayer.address,
                en: SITE.longPlayer.addressEn,
              })}
            </dd>
          </div>
          <div className="border-t border-line pt-2">
            <dt className="text-muted">{dict.contact.hours}</dt>
            <dd className="mt-1">
              {t(locale, {
                ko: SITE.longPlayer.hours,
                en: SITE.longPlayer.hoursEn,
              })}
            </dd>
          </div>
          <div className="border-t border-line pt-2">
            <dt className="text-muted">{dict.contact.phone}</dt>
            <dd className="mt-1">
              <a href={`tel:${SITE.longPlayer.phoneHref}`} className="link-underline">
                {SITE.longPlayer.phone}
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <figure className="mt-12 border border-line bg-panel px-5 py-6">
        <blockquote className="longform text-mid leading-[1.5]">
          “{t(locale, { ko: quote.text, en: quote.textEn })}”
        </blockquote>
        <figcaption className="mono mt-3 text-muted">
          — {t(locale, { ko: quote.source, en: quote.sourceEn })} ·{" "}
          <time dateTime={quote.date.replaceAll(".", "-")}>{quote.date}</time>
        </figcaption>
      </figure>
    </div>
  );
}
