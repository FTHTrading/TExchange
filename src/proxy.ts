import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hasSessionToken(request: NextRequest): boolean {
  const auth = request.headers.get("authorization");
  if (auth && auth.toLowerCase().startsWith("bearer ")) return true;

  const sessionCookie = request.cookies.get("troptions_session")?.value;
  return Boolean(sessionCookie);
}

export function proxy(request: NextRequest) {
  if (!hasSessionToken(request)) {
    return NextResponse.json(
      { ok: false, error: "Authentication required." },
      { status: 401 },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/troptions/:path*"],
};
