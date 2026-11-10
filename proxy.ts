import { NextResponse, type NextRequest } from "next/server";

/**
 * portfolio.<domain> serves the portfolio at its root.
 *
 *   portfolio.asterixstudio.site/  ->  renders /portfolio (URL stays on the subdomain)
 *
 * Everything else on the subdomain (/_next assets, images, /projects/* case studies)
 * is served normally by the same app, so links from the portfolio keep working.
 * Works for any parent domain (portfolio.asterixstudio.id later too) and for local
 * testing via portfolio.localhost:3000.
 */
export function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (host.startsWith("portfolio.")) {
    const url = request.nextUrl.clone();
    url.pathname = "/portfolio";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

// Only the root path is ever rewritten, so the proxy never runs for assets or other pages.
export const config = {
  matcher: "/",
};
