import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("middleware executed");

  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: "/dashboard",
};
