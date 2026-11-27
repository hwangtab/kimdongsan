import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { SITE } from "@/data/site";

// DOS font family (MIT, leedheo). Subsets are committed; they only carry the
// characters this site actually renders.
const dos = localFont({
  src: "../../public/fonts/DosGothic-subset.woff2",
  variable: "--font-dos",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: false,
});

const dosSerif = localFont({
  src: "../../public/fonts/DosMyeongjo-subset.woff2",
  variable: "--font-dos-serif",
  display: "swap",
  weight: "400",
  preload: false,
  adjustFontFallback: false,
});

// DosGothic has no punctuation or box drawing at all. MiraeroNormal fills
// those gaps character by character.
const dosSymbols = localFont({
  src: "../../public/fonts/DosSymbols-subset.woff2",
  variable: "--font-dos-symbols",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: false,
});

export const generateStaticParams = () =>
  LOCALES.map((locale) => ({ locale }));

// Keeps mobile browser chrome and native widgets (scrollbars, form controls)
// on the navy theme instead of defaulting to light.
export const viewport: Viewport = {
  themeColor: "#070a18",
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ko";
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE.url),
    verification: {
      google: "89qyJKaq_jvjQe8T1bniJbm7YDSTLP2Kc9WGblgUA6A",
      other: {
        "naver-site-verification": "897702ad4f751e2e4baabded22011c0445d2f4c3",
        "msvalidate.01": "69198AE16B8F17326D9BA1DE992B3897",
      },
    },
    title: {
      default: dict.meta.homeTitle,
      template: locale === "ko" ? `%s — 김동산과 블루이웃` : `%s — Kim Dongsan & Blueeewoot`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", en: "/en", "x-default": "/ko" },
    },
    openGraph: {
      type: "website",
      locale: locale === "ko" ? "ko_KR" : "en_US",
      title: dict.meta.homeTitle,
      description: dict.meta.description,
      siteName: "김동산과 블루이웃",
      images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.homeTitle,
      description: dict.meta.description,
      images: ["/images/og.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${dos.variable} ${dosSerif.variable} ${dosSymbols.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="no-print sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-ink focus:bg-ink focus:px-4 focus:py-2 focus:text-void"
        >
          {locale === "ko" ? "본문으로 건너뛰기" : "Skip to content"}
        </a>
        <SiteHeader
          locale={locale}
          nav={dict.nav}
          languageLabel={dict.common.language}
          wordmark={
            locale === "ko" ? "김동산과 블루이웃" : "Kim Dongsan & Blueeewoot"
          }
        />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
