import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LOCALES = new Set(["ko", "en"]);
const KNOWN = new Set([
  "album",
  "about",
  "live",
  "press",
  "gallery",
  "contact",
]);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const first = pathname.split("/")[1];

  if (LOCALES.has(first)) {
    return NextResponse.next();
  }

  const rest = pathname === "/" ? "" : pathname;
  const keepPath = KNOWN.has(first);
  const target = new URL(
    `/ko${keepPath ? rest : ""}${keepPath ? search : ""}`,
    request.url,
  );
  return NextResponse.redirect(target);
}

export const config = {
  matcher: [
    "/((?!_next|images|audio|fonts|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
