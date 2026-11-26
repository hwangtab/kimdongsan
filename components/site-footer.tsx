import Link from "next/link";
import type { Dictionary } from "@/messages/ko";
import type { Locale } from "@/lib/i18n";
import { SITE } from "@/data/site";
import { BrandTitle } from "@/components/brand-title";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="site-footer no-print border-t border-line bg-paper-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <BrandTitle
            slug="brand-small"
            locale={locale}
            alt={locale === "ko" ? "김동산과 블루이웃" : "Kim Dongsan & Blueeewoot"}
            className="h-6 w-auto"
          />
          <p className="latin mt-1 text-sm text-muted">
            Kim Dongsan &amp; Blueeewoot
          </p>
          <p className="serif mt-6 max-w-sm text-[15px] leading-relaxed text-muted">
            {dict.footer.tagline}
          </p>
          <a
            href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
            className="btn btn-ticket mt-7"
            target="_blank"
            rel="noreferrer"
          >
            {dict.common.tickets}
          </a>
        </div>

        <div>
          <p className="eyebrow">{dict.footer.album}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link className="link-underline" href={`/${locale}/album`}>
                {dict.nav.album}
              </Link>
            </li>
            <li>
              <Link className="link-underline" href={`/${locale}/about`}>
                {dict.nav.about}
              </Link>
            </li>
            <li>
              <Link className="link-underline" href={`/${locale}/live`}>
                {dict.nav.live}
              </Link>
            </li>
            <li>
              <Link className="link-underline" href={`/${locale}/press`}>
                {dict.nav.press}
              </Link>
            </li>
            <li>
              <Link className="link-underline" href={`/${locale}/gallery`}>
                {dict.nav.gallery}
              </Link>
            </li>
            <li>
              <Link className="link-underline" href={`/${locale}/contact`}>
                {dict.nav.contact}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">{dict.footer.contact}</p>
          <ul className="mt-4 space-y-2.5 text-sm">
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
            <li>
              <a
                className="link-underline"
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a
                className="link-underline"
                href={SITE.longPlayer.naver}
                target="_blank"
                rel="noreferrer"
              >
                {SITE.longPlayer.name} · 수원
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-[11px] text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>{dict.footer.rights}</p>
          <p className="mono">
            {dict.footer.credit} · {dict.press.credit}
          </p>
        </div>
      </div>
    </footer>
  );
}
