import Link from "next/link";

export function ClerkSetupMessage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-lg border border-border bg-card">
        <h1 className="text-2xl font-semibold text-foreground">
          Sign-in not configured
        </h1>
        <p className="text-muted-foreground">
          Add your Clerk keys so sign-in and the rest of the app work.
        </p>
        <ul className="text-left text-sm text-muted-foreground space-y-2">
          <li>
            <strong>Local:</strong> Add to <code className="bg-muted px-1 rounded">.env.local</code>
          </li>
          <li>
            <strong>Netlify / Vercel / Cloudflare:</strong> Add in Environment variables
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          Required: <code className="bg-muted px-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
          <code className="bg-muted px-1 rounded">CLERK_SECRET_KEY</code>
        </p>
        <a
          href="https://dashboard.clerk.com/last-active?path=api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Get keys from Clerk Dashboard
        </a>
        <p className="text-xs text-muted-foreground">
          After adding keys, restart the dev server or trigger a new deploy.
        </p>
        <Link href="/" className="block text-sm text-primary hover:underline">
          Try again
        </Link>
      </div>
    </div>
  );
}
