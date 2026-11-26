import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MiwonTitle } from "@/components/miwon-title";
import { ARCHIVE } from "@/data/archive";
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
    title: { absolute: dict.meta.galleryTitle },
    description: dict.meta.galleryDescription,
    alternates: alternates(locale, "/gallery"),
  };
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
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-20">
      <p className="eyebrow">{dict.gallery.eyebrow}</p>
      <h1 className="mt-5">
        <MiwonTitle
          slug="gallery"
          locale={locale}
          alt={dict.gallery.title}
          priority
        />
      </h1>
      <p className="longform mt-7 max-w-2xl text-muted">
        {dict.gallery.intro}
      </p>
      <p className="mono mt-4 max-w-2xl text-muted">{dict.gallery.creditNote}</p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {ARCHIVE.map((photo) => (
          <figure key={photo.src} className="border border-line bg-paper-deep">
            <a
              href={photo.href}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
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
            <figcaption className="p-4">
              <p className="text-[15px] font-medium tracking-[-0.01em]">
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
                <span className="ml-2">{dict.gallery.source} ↗</span>
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
