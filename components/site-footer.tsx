import Link from "next/link";
import type { Dictionary } from "@/messages/ko";
import type { Locale } from "@/lib/i18n";
import { ALBUM } from "@/data/album";
import { SITE } from "@/data/site";

export function SiteFooter({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="site-footer no-print mt-16 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div>
          <p className="text-mid leading-none">김동산과 블루이웃</p>
          <p className="mono mt-2 text-muted">Kim Dongsan &amp; Blueeewoot</p>
          <p className="longform mt-5 max-w-sm text-muted">
            {dict.footer.tagline}
          </p>
          <a
            href={locale === "ko" ? SITE.showUrl : SITE.showUrlEn}
            className="btn btn-ticket mt-6"
            target="_blank"
            rel="noreferrer"
          >
            {dict.common.tickets}{" "}<span aria-hidden="true">↗</span>
          </a>
        </div>

        <div>
          <p className="eyebrow">NAV</p>
          <ul className="mt-3 space-y-1">
            {[
              ["album", dict.nav.album],
              ["about", dict.nav.about],
              ["live", dict.nav.live],
              ["press", dict.nav.press],
              ["gallery", dict.nav.gallery],
              ["contact", dict.nav.contact],
            ].map(([slug, label]) => (
              <li key={slug}>
                <Link className="link-underline mono" href={`/${locale}/${slug}`}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow">CONTACT</p>
          <ul className="plain mt-3 space-y-1 break-all">
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
                LONG PLAYER · 수원
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line bg-panel-deep">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-2 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="mono text-muted">
            <span className="text-signal">F1</span> {dict.footer.rights}
            <span className="mx-2 text-line">│</span>
            <span className="text-signal">F2</span> {dict.common.tickets}
          </p>
          <p className="mono text-muted">
            {ALBUM.runtime} · 2026.11.17 · {dict.press.credit}
          </p>
        </div>
      </div>
    </footer>
  );
}
