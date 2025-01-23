import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

/** Custom middleware handler to set the client_id cookie. */
async function customMiddleware(request: NextRequest): Promise<NextResponse> {
  const clientId = request.cookies.get("client_id");
  if (!clientId) {
    const clientId = crypto.randomUUID();
    request.cookies.set("client_id", clientId);
  }
  return NextResponse.next();
}

export default clerkMiddleware((auth, request) => customMiddleware(request), {
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  secretKey: process.env.CLERK_SECRET_KEY,
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
