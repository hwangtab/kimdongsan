import "./globals.css";
import localFont from "next/font/local";
import { NotFoundScreen } from "@/components/not-found-screen";

// This file bypasses app/[locale]/layout.tsx, so it loads the DOS faces itself.
const dos = localFont({
  src: "../public/fonts/DosGothic-subset.woff2",
  variable: "--font-dos",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: false,
});

const dosSerif = localFont({
  src: "../public/fonts/DosMyeongjo-subset.woff2",
  variable: "--font-dos-serif",
  display: "swap",
  weight: "400",
  preload: false,
  adjustFontFallback: false,
});

const dosSymbols = localFont({
  src: "../public/fonts/DosSymbols-subset.woff2",
  variable: "--font-dos-symbols",
  display: "swap",
  weight: "400",
  preload: true,
  adjustFontFallback: false,
});

export const metadata = {
  title: "파일을 찾을 수 없습니다 — 김동산과 블루이웃",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <html
      lang="ko"
      className={`${dos.variable} ${dosSerif.variable} ${dosSymbols.variable}`}
    >
      <body>
        <main id="main">
          <NotFoundScreen />
        </main>
      </body>
    </html>
  );
}
