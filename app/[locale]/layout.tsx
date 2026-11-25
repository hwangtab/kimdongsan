import type { Metadata } from "next";
import localFont from "next/font/local";
import { Gowun_Batang, Jost } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getDictionary, isLocale, LOCALES, type Locale } from "@/lib/i18n";
import { SITE } from "@/data/site";

const pretendard = localFont({
  src: "../../public/fonts/Pretendard-subset.woff2",
  variable: "--font-gothic",
  display: "swap",
  weight: "100 900",
});

const pixel = localFont({
  src: "../../public/fonts/DungGeunMo-subset.woff2",
  variable: "--font-pixel",
  display: "swap",
  weight: "400",
});

const batang = Gowun_Batang({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-batang",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const generateStaticParams = () =>
  LOCALES.map((locale) => ({ locale }));

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
    title: {
      default: dict.meta.homeTitle,
      template: locale === "ko" ? `%s — 김동산과 블루이웃` : `%s — Kim Dongsan & Blueeewoot`,
    },
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { ko: "/ko", en: "/en" },
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
      className={`${pretendard.variable} ${pixel.variable} ${batang.variable} ${jost.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <SiteHeader
          locale={locale}
          nav={dict.nav}
          languageLabel={dict.common.language}
          wordmark={
            locale === "ko" ? "김동산과 블루이웃" : "Kim Dongsan & Blueeewoot"
          }
        />
        <main className="flex-1">{children}</main>
        <SiteFooter locale={locale} dict={dict} />
      </body>
    </html>
  );
}
