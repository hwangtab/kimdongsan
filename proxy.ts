import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = new Set(["ko", "en"]);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (LOCALES.has(first)) {
    return NextResponse.next();
  }

  // Locale-less URLs keep their path so an unknown route reaches the 404
  // instead of being bounced to the home page (a soft 404 that leaves the
  // real page unindexed). 308 tells crawlers the prefix is permanent.
  const rest = pathname === "/" ? "" : pathname;
  const target = new URL(`/ko${rest}${search}`, request.url);
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: [
    "/((?!_next|images|audio|fonts|favicon.ico|robots.txt|sitemap.xml|llms.txt|llms-full.txt|.*\\..*).*)",
  ],
};
