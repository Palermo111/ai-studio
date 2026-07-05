import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  const sitePassword = process.env.SITE_PASSWORD;
  const authSecret = process.env.AI_STUDIO_SECRET;

  if (!sitePassword) {
    return NextResponse.json(
      {
        detail: "SITE_PASSWORD не задан",
      },
      {
        status: 500,
      }
    );
  }

  if (!authSecret) {
    return NextResponse.json(
      {
        detail: "AI_STUDIO_SECRET не задан",
      },
      {
        status: 500,
      }
    );
  }

  if (password !== sitePassword) {
    return NextResponse.json(
      {
        detail: "Неверный пароль",
      },
      {
        status: 401,
      }
    );
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set({
    name: "ai_studio_auth",
    value: authSecret,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}