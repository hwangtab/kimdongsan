import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyBio } from "@/components/copy-bio";
import { BIOS } from "@/data/site";
import { COVERAGE, PRESS_KIT, QUOTES } from "@/data/press";
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
    title: { absolute: dict.meta.pressTitle },
    description: dict.press.bioNote,
    alternates: alternates(locale, "/press"),
    openGraph: {
      title: dict.meta.pressTitle,
      description: dict.press.bioNote,
      images: [{ url: "/images/album/cover-2000.jpg", width: 2000, height: 2000 }],
    },
  };
}

export default async function PressPage({
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
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
      <p className="eyebrow">{dict.press.eyebrow}</p>
      <h1 className="display mt-5 text-[clamp(2.8rem,7vw,5.4rem)]">
        {dict.press.title}
      </h1>

      <section className="mt-12 grid gap-10 border-t border-ink pt-10 md:grid-cols-[0.72fr_1.28fr] md:gap-16">
        <div>
          <p className="eyebrow">{dict.press.bioEyebrow}</p>
          <h2 className="display mt-4 text-[clamp(1.7rem,3.6vw,2.5rem)]">
            {dict.press.bioTitle}
          </h2>
          <p className="mt-4 text-[14px] leading-[1.8] text-muted">
            {dict.press.bioNote}
          </p>
        </div>
        <CopyBio
          bios={[
            {
              label: locale === "ko" ? "짧게" : "Short",
              text: bio.short,
            },
            {
              label: locale === "ko" ? "중간" : "Medium",
              text: bio.medium,
            },
            {
              label: locale === "ko" ? "길게" : "Long",
              text: bio.long,
            },
          ]}
          copyLabel={dict.press.copy}
          copiedLabel={dict.press.copied}
        />
      </section>

      <section className="mt-20 md:mt-28">
        <p className="eyebrow">{dict.press.quotesEyebrow}</p>
        <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
          {dict.press.quotesTitle}
        </h2>
        <div className="mt-8 grid gap-8 border-t border-line pt-8 md:grid-cols-2">
          {QUOTES.map((quote) => (
            <figure key={quote.text} className="flex flex-col">
              <blockquote className="serif flex-1 text-[19px] leading-[1.75]">
                “{t(locale, { ko: quote.text, en: quote.textEn })}”
              </blockquote>
              <figcaption className="mono mt-4 text-muted">
                {quote.url ? (
                  <a
                    href={quote.url}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline"
                  >
                    {t(locale, { ko: quote.source, en: quote.sourceEn })}
                  </a>
                ) : (
                  t(locale, { ko: quote.source, en: quote.sourceEn })
                )}{" "}
                · {quote.date}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <p className="eyebrow">{dict.press.coverageEyebrow}</p>
        <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
          {dict.press.coverageTitle}
        </h2>
        <div className="mt-8 border-t border-ink">
          {COVERAGE.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-1 border-b border-line py-4 md:grid-cols-[120px_1fr_auto] md:items-baseline md:gap-8"
            >
              <span className="mono text-muted">
                {t(locale, { ko: item.outlet, en: item.outletEn })}
              </span>
              <span className="font-medium tracking-[-0.01em] group-hover:underline">
                {t(locale, { ko: item.title, en: item.titleEn })}
              </span>
              <span className="mono text-muted">{item.date}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-20 md:mt-28">
        <p className="eyebrow">{dict.press.kitEyebrow}</p>
        <h2 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
          {dict.press.kitTitle}
        </h2>
        <p className="mt-4 max-w-2xl text-[14px] leading-[1.8] text-muted">
          {dict.press.kitNote}
        </p>
        <div className="mt-8 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {PRESS_KIT.map((item) => (
            <a
              key={item.href}
              href={item.href}
              download={item.download}
              className="group flex items-baseline justify-between border border-line p-5 transition-colors hover:border-ink"
            >
              <span>
                <span className="block font-medium">
                  {t(locale, { ko: item.label, en: item.labelEn })}
                </span>
                <span className="mono mt-1 block text-muted">{item.meta}</span>
              </span>
              <span className="mono shrink-0 text-muted group-hover:text-ink">
                ↓
              </span>
            </a>
          ))}
        </div>
        <Link
          href={`/${locale}/press/one-sheet`}
          className="btn btn-ghost mt-6"
        >
          {dict.press.oneSheet}
        </Link>
        <p className="mono mt-6 text-muted">{dict.press.credit}</p>
      </section>
    </div>
  );
}
