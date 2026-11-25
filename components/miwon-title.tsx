import Image from "next/image";
import manifest from "@/data/miwon-titles.json";
import type { Locale } from "@/lib/i18n";

type Slug = keyof typeof manifest;

export function MiwonTitle({
  slug,
  locale,
  alt,
  className = "",
  priority = false,
  sizes,
}: {
  slug: Slug;
  locale: Locale;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const size = manifest[slug][locale];
  return (
    <Image
      src={`/images/type/${slug}-${locale}.png`}
      alt={alt}
      width={Math.round(size.w)}
      height={Math.round(size.h)}
      className={`h-auto max-w-full ${className}`}
      preload={priority}
      quality={90}
      sizes={sizes}
    />
  );
}
