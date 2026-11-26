import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyBio } from "@/components/copy-bio";
import { Prompt } from "@/components/win";
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
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
      <Prompt path="PRESS" label="dir" />

      <h1 className="text-head mt-4 md:text-hero">{dict.press.title}</h1>
      <p className="mono mt-2 text-muted">PRESS KIT · 2026.11.17</p>

      <section className="mt-8 grid gap-8 border-t border-line pt-6 md:grid-cols-[0.72fr_1.28fr] md:gap-10">
        <div>
          <p className="mono text-signal">BIO.TXT</p>
          <h2 className="text-mid mt-2 leading-tight">
            {dict.press.bioTitle}
          </h2>
          <p className="mono mt-3 text-muted">{dict.press.bioNote}</p>
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

      <section className="mt-12">
        <Prompt path="PRESS" label="dir quotes\*" />
        <h2 className="text-mid mt-4 md:text-head">{dict.press.quotesTitle}</h2>
        <div className="mt-5 grid border border-line md:grid-cols-2">
          {QUOTES.map((quote) => (
            <figure
              key={quote.text}
              className="flex flex-col border-b border-line p-4 last:border-b-0 md:even:border-l md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <blockquote className="longform flex-1">
                “{t(locale, { ko: quote.text, en: quote.textEn })}”
              </blockquote>
              <figcaption className="mono mt-3 text-muted">
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

      <section className="mt-12">
        <Prompt path="PRESS" label="type coverage.log" />
        <h2 className="text-mid mt-4 md:text-head">{dict.press.coverageTitle}</h2>
        <div className="mt-5 border-t border-line">
          {COVERAGE.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="group grid gap-1 border-b border-line py-3 md:grid-cols-[140px_1fr_110px] md:items-baseline md:gap-8"
            >
              <span className="mono text-muted">
                {t(locale, { ko: item.outlet, en: item.outletEn })}
              </span>
              <span className="group-hover:text-signal">
                {t(locale, { ko: item.title, en: item.titleEn })}
              </span>
              <span className="mono text-muted md:text-right">{item.date}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <Prompt path="PRESS" label="dir assets\*" />
        <h2 className="text-mid mt-4 md:text-head">{dict.press.kitTitle}</h2>
        <p className="longform mt-3 max-w-2xl text-muted">
          {dict.press.kitNote}
        </p>
        <div className="mt-5 grid border border-line sm:grid-cols-2">
          {PRESS_KIT.map((item) => (
            <a
              key={item.href}
              href={item.href}
              download={item.download}
              className="group flex items-baseline justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0 hover:bg-panel sm:[&:nth-last-child(-n+2)]:border-b-0 sm:odd:border-r"
            >
              <span>
                <span className="block group-hover:text-signal">
                  {t(locale, { ko: item.label, en: item.labelEn })}
                </span>
                <span className="mono mt-1 block text-muted">{item.meta}</span>
              </span>
              <span aria-hidden="true" className="mono shrink-0 text-signal">↓</span>
            </a>
          ))}
        </div>
        <Link href={`/${locale}/press/one-sheet`} className="btn btn-ghost mt-5">
          {dict.press.oneSheet}{" "}<span aria-hidden="true">→</span>
        </Link>
        <p className="mono mt-5 text-muted">{dict.press.credit}</p>
      </section>
    </div>
  );
}
