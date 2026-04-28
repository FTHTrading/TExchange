import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Hostname-based routing middleware.
 *
 * troptionslive.unykorn.org → rewrite root "/" to "/troptions-live"
 * All other hostnames → standard Next.js routing (root "/" stays as-is)
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  if (
    (host.startsWith("troptionslive") || host.includes("troptions-live")) &&
    pathname === "/"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/troptions-live";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on root and all non-internal paths
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|icons|fonts).*)"],
};
