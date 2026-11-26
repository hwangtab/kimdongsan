"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

type Nav = {
  album: string;
  about: string;
  live: string;
  press: string;
  gallery: string;
  contact: string;
  menu: string;
  close: string;
};

function clock() {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
}

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
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const id = window.setInterval(() => setTime(clock()), 1000);
    const kick = window.setTimeout(() => setTime(clock()), 0);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(kick);
    };
  }, []);

  const rest = pathname.replace(/^\/(ko|en)/, "") || "";
  const other: Locale = locale === "ko" ? "en" : "ko";
  const otherHref = `/${other}${rest}`;

  const items = [
    { href: `/${locale}/album`, label: nav.album },
    { href: `/${locale}/about`, label: nav.about },
    { href: `/${locale}/live`, label: nav.live },
    { href: `/${locale}/press`, label: nav.press },
    { href: `/${locale}/gallery`, label: nav.gallery },
    { href: `/${locale}/contact`, label: nav.contact },
  ];

  return (
    <>
      <header className="no-print sticky top-0 z-50 border-b border-line bg-void/95 backdrop-blur-sm">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <span aria-hidden className="text-signal">
                ▲
              </span>
              <span className="mono truncate">{wordmark}</span>
            </Link>
            <span className="mono hidden text-muted md:inline">EPK</span>
          </div>

          <nav className="hidden items-baseline gap-5 md:flex">
            {items.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`mono flex h-7 items-center whitespace-nowrap px-1.5 ${
                    active
                      ? "bg-ink text-void"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {active ? `[ ${item.label} ]` : item.label}
                </Link>
              );
            })}
            <Link
              href={otherHref}
              className="mono flex h-7 items-center border border-line px-2 text-muted hover:border-signal hover:text-signal"
            >
              {languageLabel}
            </Link>
          </nav>

          <div className="mono hidden shrink-0 text-muted lg:block">{time}</div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href={otherHref}
              onClick={() => setOpen(false)}
              className="mono flex h-9 min-w-9 items-center justify-center border border-line px-2 text-muted"
            >
              {other.toUpperCase()}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? nav.close : nav.menu}
              className="mono flex h-9 items-center justify-center border border-line px-2 hover:border-signal hover:text-signal"
            >
              {open ? nav.close : nav.menu}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-0 top-11 bottom-0 z-40 overflow-y-auto bg-void px-5 py-5 md:hidden">
          <nav className="win">
            <div className="win-bar">
              <span className="mono text-signal">MENU.TXT</span>
              <span className="mono text-muted">06</span>
            </div>
            <div className="divide-y divide-line">
              {items.map((item, i) => {
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline justify-between px-4 py-3 ${
                      active ? "bg-ink text-void" : ""
                    }`}
                  >
                    <span className="text-mid leading-none">{item.label}</span>
                    <span className="mono">0{i + 1}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
          <p className="mono mt-5 text-muted">2026.11.17 — AFTERNOON</p>
        </div>
      )}
    </>
  );
}
