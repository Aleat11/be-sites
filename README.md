# Be-Sites

Marketing site for **Be-Sites** — fast, SEO-ready websites for home-service businesses.

**Live:** https://be-sites-web.vercel.app

## Offer

- **Starter** — $850 flat, 1–3 pages
- **Growth** — $1,799, up to 8 pages
- **Care Plan** — $79/mo

The quote form posts to the lead endpoint and feeds the CRM + Google Sheet pipeline. No free mockups — hot leads only.

## Development

Node.js + bun. Install deps and run the dev server:

```sh
bun install
bun run dev
```

Build:

```sh
bun run build
```

Deploys to Vercel (`be-sites-web`) via `deploy-vercel.py` (local helper, not committed).
