import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "troptions_session";
const LOGIN_PATH = "/troptions/auth/login";

export function middleware(request: NextRequest) {
  const session = request.cookies.get(SESSION_COOKIE);

  if (!session?.value) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/troptions/gated/:path*"],
};
