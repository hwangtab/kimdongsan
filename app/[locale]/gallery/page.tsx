import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARCHIVE } from "@/data/archive";
import { Prompt, Win } from "@/components/win";
import { getDictionary, isLocale, t, type Locale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = isLocale(raw) ? raw : "ko";
  const dict = getDictionary(locale);
  return pageMetadata({
    locale,
    path: "/gallery",
    title: dict.meta.galleryTitle,
    description: dict.meta.galleryDescription,
    image: {
      url: "/images/archive/long-player-2018.webp",
      width: 800,
      height: 450,
      alt:
        locale === "ko"
          ? "롱플레이어 안에 서 있는 김동산, 2018"
          : "Kim Dongsan inside Long Player, 2018",
    },
  });
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">
      <Prompt path="PHOTO" label="dir /w *.jpg" />

      <h1 className="text-head mt-4 md:text-hero">
        {dict.gallery.title}
        <span className="sr-only">{dict.gallery.h1Note}</span>
      </h1>
      <p className="mono mt-2 text-muted">
        ARCHIVE · 2018 · {ARCHIVE.length} FILES
      </p>
      <p className="longform mt-5 max-w-2xl text-muted">{dict.gallery.intro}</p>
      <p className="mono mt-3 max-w-2xl text-muted">{dict.gallery.creditNote}</p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {ARCHIVE.map((photo, i) => (
          <figure key={photo.src}>
            <Win
              label={`IMG_${String(i + 1).padStart(2, "0")}.JPG`}
              right={`${photo.width}×${photo.height}`}
              bodyClassName="p-0"
            >
              <a href={photo.href} target="_blank" rel="noreferrer" className="block">
                {/* each photo keeps its own ratio instead of a forced 4:3 crop */}
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
                >
                  <Image
                    src={photo.src}
                    alt={t(locale, { ko: photo.alt, en: photo.altEn })}
                    width={photo.width}
                    height={photo.height}
                    sizes="(min-width: 768px) 46vw, 92vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </a>
            </Win>
            <figcaption className="mt-2">
              <p className="longform">
                {t(locale, { ko: photo.caption, en: photo.captionEn })}
              </p>
              <p className="mono mt-1 text-muted">
                <a
                  href={photo.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline"
                >
                  {t(locale, { ko: photo.credit, en: photo.creditEn })}
                </a>
                <span aria-hidden="true" className="ml-2">↗</span>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
