import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  console.log("middleware executed");
  // Check for a valid token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  console.log("token", token);
  

  if (token &&  request.nextUrl.pathname.startsWith("/signin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If there is no valid token and the user is trying to access the dashboard, redirect to the sign-in page
  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/one"], // Match all routes under /dashboard
};
