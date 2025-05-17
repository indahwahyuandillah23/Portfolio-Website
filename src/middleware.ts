import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { log } from "util";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") {
    return NextResponse.next(); // Login boleh tanpa token
  }

  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  try {
    // jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next(); // Token valid → lanjut
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url)); // Token invalid
  }
}

export const config = {
  matcher: ["/admin/:path*"], // Middleware hanya untuk /admin/*
};
