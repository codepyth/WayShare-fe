import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/cookies";
import { authPaths, loginPath } from "@/features/auth/lib/paths";
import { isGuestOnlyPath } from "@/features/auth/lib/session";

/**
 * Route guard. Optimistic: checks the session cookie exists; Django still
 * authorises every API call.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);
  const guestOnly = isGuestOnlyPath(pathname);

  if (!hasSession && !guestOnly) {
    return NextResponse.redirect(
      new URL(loginPath({ requested: `${pathname}${search}` }), request.url),
    );
  }
  if (hasSession && guestOnly) {
    return NextResponse.redirect(new URL(authPaths.home, request.url));
  }
  return NextResponse.next();
}

export const config = {
  // Pages only: skips the API rewrite, Next internals, metadata routes and files.
  matcher: [
    "/((?!api/|_next/static|_next/image|robots\\.txt|sitemap\\.xml|opengraph-image|.*\\.[^/]+$).*)",
  ],
};
