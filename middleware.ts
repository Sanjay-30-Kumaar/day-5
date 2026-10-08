import { NextRequest, NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  verifySession,
} from "@/lib/auth";

export async function middleware(
  request: NextRequest
) {
  const pathname = request.nextUrl.pathname;

  const isPublicRoute =
    pathname === "/login";

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(
    SESSION_COOKIE
  )?.value;

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  const valid = await verifySession(token);

  if (!valid) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/members/:path*",
    "/api/members/:path*",
  ],
};