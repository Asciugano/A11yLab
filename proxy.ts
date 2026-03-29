import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  // INFO: utenti gia' loggati non tornano sulla pagina di login
  if (token && req.nextUrl.pathname.startsWith("/auth/login"))
    return NextResponse.redirect(new URL("/", req.url));

  // INFO: utenti non loggati vanno sulla pagina di login
  if (!token) return NextResponse.redirect(new URL("/auth/login", req.url));

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (e) {
    console.error("error in the middleware ", e);
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/lessons/:path*"],
};
