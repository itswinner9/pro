// Minimal Worker so "npx wrangler deploy" succeeds on Cloudflare Pages.
// The actual site is served by Cloudflare Pages from the build output.
export default {
  async fetch() {
    return new Response("OK", { status: 200 });
  },
};
