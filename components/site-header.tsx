"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { BrandTitle } from "@/components/brand-title";

type Nav = {
  album: string;
  about: string;
  live: string;
  press: string;
  contact: string;
  menu: string;
  close: string;
};

export function SiteHeader({
  locale,
  nav,
  languageLabel,
  wordmark,
}: {
  locale: Locale;
  nav: Nav;
  languageLabel: string;
  wordmark: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const rest = pathname.replace(/^\/(ko|en)/, "") || "";
  const other: Locale = locale === "ko" ? "en" : "ko";
  const otherHref = `/${other}${rest}`;

  const items = [
    { href: `/${locale}/album`, label: nav.album },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/live`, label: nav.live },
    { href: `/${locale}/press`, label: nav.press },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <>
      <header className="no-print sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link href={`/${locale}`} className="group flex min-w-0 items-center gap-2">
          <BrandTitle
            slug="brand-small"
            locale={locale}
            alt={wordmark}
            priority
            className="h-[17px] w-auto max-w-[54vw] object-contain object-left md:h-[19px]"
          />
          <span className="mono hidden text-muted sm:inline">EPK</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {items.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline text-[13px] font-medium tracking-[-0.01em] ${
                  active ? "opacity-100" : "opacity-65 hover:opacity-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={otherHref}
            className="mono border border-line px-2.5 py-1.5 text-muted transition-colors hover:border-ink hover:text-ink"
          >
            {languageLabel}
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Link
            href={otherHref}
            onClick={() => setOpen(false)}
            className="mono border border-line px-2 py-1 text-muted"
          >
            {other.toUpperCase()}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? nav.close : nav.menu}
            className="mono border border-ink px-3 py-2"
          >
            {open ? nav.close : nav.menu}
          </button>
        </div>
      </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-paper px-6 py-10 md:hidden">
          <nav className="flex flex-col">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-5 text-3xl font-bold tracking-[-0.04em]"
              >
                <span>{item.label}</span>
                <span className="mono text-muted">0{i + 1}</span>
              </Link>
            ))}
          </nav>
          <p className="mono mt-10 text-muted">2026.11.17 — AFTERNOON</p>
        </div>
      )}
    </>
  );
}
