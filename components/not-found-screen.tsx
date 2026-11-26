import Link from "next/link";
import { SITE } from "@/data/site";

/**
 * Shared 404 body. Rendered from app/global-not-found.tsx (unmatched URLs) and
 * app/[locale]/not-found.tsx (notFound() thrown inside a locale segment), so
 * the two routes cannot drift apart. Both lines are shown because a locale
 * segment's not-found.tsx does not receive the locale param.
 */
export function NotFoundScreen() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <p className="mono text-signal">C:\BD&gt; error 404</p>
      <h1 className="text-head mt-4 md:text-hero">
        파일을 찾을 수 없습니다
      </h1>
      <p className="longform mt-4 text-muted">
        주소가 바뀌었거나 아직 만들지 않은 페이지입니다.
        <br />
        Bad command or file name. / This page could not be found.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/ko" className="btn btn-solid">
          C:\&gt; cd ..
        </Link>
        <Link href="/en" className="btn">
          English
        </Link>
        <a
          href={SITE.showUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ticket"
        >
          12.04 쇼케이스 예매 <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}
