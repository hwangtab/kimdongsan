import Image from "next/image";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { PrintButton } from "@/components/print-button";
import { BrandTitle } from "@/components/brand-title";
import { ALBUM, CREDITS, TRACKS } from "@/data/album";
import { BIOS, SITE } from "@/data/site";
import { getDictionary, isLocale, t, type Locale } from "@/lib/i18n";

const oneSheetFont = localFont({
  src: "../../../../public/fonts/Pretendard-subset.woff2",
  variable: "--font-one-sheet",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function OneSheetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const bio = locale === "ko" ? BIOS.ko : BIOS.en;

  return (
    <div className={`${oneSheetFont.variable} mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14`}>
      <div className="no-print mb-6 flex items-center justify-between gap-4">
        <p className="eyebrow">{dict.press.oneSheetTitle}</p>
        <PrintButton label={dict.press.print} />
      </div>

      <article className="one-sheet border border-ink bg-white p-7 md:p-10 print:border-0 print:p-0">
        <header className="flex items-start justify-between gap-8 border-b border-ink pb-5">
          <div>
            <p className="mono text-muted">EPK · 2026 · AFTERNOON</p>
            <h1 className="mt-2">
              <BrandTitle
                slug="album-brand"
                locale={locale}
                alt={locale === "ko" ? "김동산과 블루이웃" : "Kim Dongsan & Blueeewoot"}
                className="h-12 w-auto"
              />
            </h1>
            <p className="latin mt-1 text-base font-light tracking-[0.12em] text-muted">
              Kim Dongsan &amp; Blueeewoot
            </p>
          </div>
          <div className="one-sheet-cover w-24 shrink-0 md:w-28">
            <Image
              src={ALBUM.coverSmall}
              alt=""
              width={500}
              height={500}
              className="h-auto w-full border border-line"
            />
          </div>
        </header>

        <p className="mt-4 text-[12px] leading-[1.75]">
          {bio.medium}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 border-y border-line py-3 text-[10px]">
          <p>
            <span className="mono text-muted">{dict.common.released}</span>{" "}
            {ALBUM.releaseLabel}
          </p>
          <p>
            <span className="mono text-muted">{dict.common.label}</span>{" "}
            {ALBUM.label}
          </p>
          <p>
            <span className="mono text-muted">{dict.common.genre}</span>{" "}
            {ALBUM.genre}
          </p>
          <p>
            <span className="mono text-muted">{dict.common.runtime}</span>{" "}
            {ALBUM.runtime}
          </p>
        </div>

        <div className="one-sheet-body mt-4 grid gap-6 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="mono mb-2 text-muted">{dict.album.tracklist}</p>
            <ol className="space-y-0.5 text-[10.5px]">
              {TRACKS.map((track) => (
                <li
                  key={track.no}
                  className="flex justify-between gap-2 border-b border-line/70 py-0.5"
                >
                  <span>
                    {String(track.no).padStart(2, "0")}{" "}
                    {locale === "ko" ? track.title : track.titleEn}
                  </span>
                  <span className="mono text-muted">{track.duration}</span>
                </li>
              ))}
            </ol>

            <p className="mono mt-5 mb-2 text-muted">{dict.contact.eyebrow}</p>
            <div className="space-y-0.5 text-[10.5px] leading-[1.6]">
              <p>
                {SITE.email} · {SITE.phone}
              </p>
              <p>{SITE.instagramHandle}</p>
              <p>
                {t(locale, {
                  ko: SITE.longPlayer.address,
                  en: SITE.longPlayer.addressEn,
                })}
              </p>
              <p>{SITE.url}</p>
            </div>
          </div>

          <div>
            <p className="mono mb-2 text-muted">{dict.album.creditsTitle}</p>
            <div className="space-y-2">
              {CREDITS.map((group) => (
                <div key={group.group}>
                  <p className="mono mb-0.5 text-muted">{group.group}</p>
                  <ul className="text-[9px] leading-[1.4]">
                    {(locale === "ko" ? group.ko : group.en).map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="mono mt-4 border-t border-line pt-2 text-[8px] text-muted">
          {dict.press.credit}
        </footer>
      </article>
    </div>
  );
}
