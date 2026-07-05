import { NextRequest, NextResponse } from "next/server";

const AUTH_SECRET = process.env.AI_STUDIO_SECRET;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ai_studio_auth");

  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === "/login";

  const isAuthorized =
    AUTH_SECRET &&
    token?.value === AUTH_SECRET;

  // Пользователь уже вошел
  if (isAuthorized) {
    if (isLoginPage) {
      return NextResponse.redirect(
        new URL("/", request.url)
      );
    }

    return NextResponse.next();
  }

  // Не вошел
  if (!isLoginPage) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next|favicon.ico|robots.txt|.*\\..*).*)",
  ],
};