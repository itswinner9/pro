/**
 * Next.js 16 uses proxy.ts (not middleware.ts).
 * Do NOT call auth() or currentUser() here — they are App Router only and cause
 * "Request constructor: init.headers is a symbol". Admin protection is in app/admin/layout.tsx.
 */
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
