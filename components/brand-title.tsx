import Image from "next/image";
import manifest from "@/data/brand-titles.json";
import type { Locale } from "@/lib/i18n";

type Slug = keyof typeof manifest;

export function BrandTitle({
  slug,
  locale,
  alt,
  className = "",
  priority = false,
}: {
  slug: Slug;
  locale: Locale;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const size = manifest[slug][locale];
  return (
    <Image
      src={`/images/type/${slug}-${locale}.png`}
      alt={alt}
      width={Math.round(size.w)}
      height={Math.round(size.h)}
      className={className}
      preload={priority}
      quality={90}
    />
  );
}
