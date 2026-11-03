# Migration guide — The Grand Mahjong Master-Key

How to run this site on your own hosting, with no dependency on HeyLloyd.

Companion documents in this same package:

- **`HANDOFF.md`** — full catalog of Shopify permalinks, Meta Pixel inventory,
  assets, fonts, live URLs, and known inconsistencies.
- **`README.md`** — short project overview and folder map.
- **`.env.example`** — environment variable names, no values.

---

## 1. What this app is

A bilingual sales funnel: a client-rendered React SPA served by a small Express
server. **Payments do not happen here.** Every CTA redirects to a Shopify cart
permalink; Shopify owns the checkout, the payment, and the `Purchase` event.

That has one very convenient consequence for migration: **there is no payment
code, no API key, no webhook, and no secret anywhere in this project.** You are
moving a static-ish marketing site with a thin Node wrapper. Nothing can break
in a way that costs you money mid-transaction.

---

## 2. Versions

| Tool | Version | Pinned in |
| --- | --- | --- |
| Node.js | **20.x** (built and verified on 20.20.2) | `.nvmrc`, `engines` in `package.json` |
| npm | **10.x** (verified on 10.8.2) | `engines` in `package.json` |
| Python | 3.9+ (only to regenerate ZIPs; not needed to run the site) | — |

Node 18 will probably work but is untested: the server uses
`import.meta.dirname`, which requires Node 20.11+. **Do not use Node 18.** Node
22 works.

---

## 3. Install, build, run

```
nvm use                # or: nvm install 20
npm ci                 # reproducible install from package-lock.json
npm run build          # frontend -> dist/public, server -> dist/index.js
npm start              # production server
```

`npm start` runs `NODE_ENV=production node dist/index.js` and listens on
`$PORT`, falling back to **5173**. The `NODE_ENV=production` prefix is not
cosmetic: without it the server tries to boot the Vite dev middleware, which
requires devDependencies that a production install has pruned.

For local development instead:

```
npm install
npm run dev            # http://localhost:5173, with HMR
```

### Build output

```
dist/
  index.js             Bundled Express server (ESM, external packages)
  public/              Frontend: index.html, assets/, images, download/*.zip
```

`dist/` is disposable — never edit it, always regenerate with `npm run build`.

### If your host prunes devDependencies

Many hosts run `npm install --production`. That is fine **as long as the build
runs first**, because `dist/` only needs runtime dependencies at that point.
The correct order is always: install everything → build → prune → start. If
your host cannot do that, build in CI and deploy the `dist/` folder plus a
production-only install.

---

## 4. Environment variables

Copy `.env.example` to `.env`. Summary:

| Variable | Required | Notes |
| --- | --- | --- |
| `PORT` | No | Defaults to 5173. Most PaaS hosts inject it. |
| `NODE_ENV` | Yes, in production | `npm start` sets it for you. |
| `DATABASE_URL` | **No** | See below. |

**On `DATABASE_URL`:** the project contains Drizzle + Postgres wiring
(`server/db.ts`, `server/storage.ts`, `shared/schema.ts`) backing a single
endpoint, `POST /api/orders`. **No page in the frontend calls that endpoint** —
verified by searching the whole client. The connection is created lazily inside
`getDb()`, so an unset `DATABASE_URL` does not crash boot; it would only throw
if someone POSTed to `/api/orders`.

So: **you do not need a database to run this site.** Deploy without one. If you
later want to record orders, provision Postgres, set `DATABASE_URL`, and run
`npm run db:push`.

---

## 5. External services

| Service | What it does | What you must configure |
| --- | --- | --- |
| **Shopify** (`themodernprotocols.com`) | Hosts the real checkout and the products behind all 10 cart permalinks. Fires the only `Purchase` event. | Keep the Meta channel connected and conversion tracking on. Do **not** add the pixel ID to `theme.liquid` by hand — that creates genuine duplicate Purchases. |
| **Meta Pixel** `1666692734460053` | PageView, ViewContent, InitiateCheckout from this site. | Nothing. The ID is hardcoded and public. Verify in Events Manager after migrating. |
| **Google Fonts** | Fraunces, Cormorant Garamond, Manrope, loaded from `fonts.googleapis.com` in `client/index.html`. | Nothing — but note **no font files ship in this package**. If you need to be independent of Google (or comply with EU rules on it), self-host them. |
| **DNS for `mahjong.themodernprotocols.com`** | Points the subdomain at the host. | This is the one thing you must change to cut over. See section 7. |

There are **no** other third-party services: no analytics beyond Meta, no CDN,
no email provider, no error tracker, no CMS.

---

## 6. HeyLloyd-specific dependencies — and how they are removed

There are exactly **three**, and all three are already handled.

**1. The editor script tags in `client/index.html`.** Two `<script>` tags load
`/__heylloyd/ready.js` (loading overlay) and `/__heylloyd/picker.js` (element
picker). Those files are served by the HeyLloyd sandbox and exist on no other
host, so they would 404 on every page load elsewhere. **The ZIP export strips
them automatically** — `scripts/make-zip.py` rewrites `index.html` on the way
into the archive and leaves an HTML comment in their place. The working copy
keeps them because the sandbox needs them. If you export some other way, delete
those two lines by hand; nothing else references them.

**2. The `.heylloyd/` folder and `client/public/__heylloyd/`.** Editor metadata
and the injected scripts. Excluded from the ZIP and listed in `.gitignore`.

**3. `DATABASE_URL` injection.** HeyLloyd injects it automatically. Your host
will not — and per section 4, it does not matter, because nothing uses it.

**Nothing else is HeyLloyd-coupled.** No proprietary SDK, no custom build
plugin, no runtime import of a HeyLloyd package. `package.json` has no
HeyLloyd-scoped dependency. The stack is stock Vite + React + Express, so it
runs anywhere that runs Node 20.

### Deployment configuration that lives outside the code

There is **no** `Dockerfile`, `fly.toml`, `vercel.json`, or `netlify.toml` in
this repo, and that is expected: the current host is configured in the HeyLloyd
dashboard, not in a file. The entire contract between the code and any host is
two lines of `package.json` — `npm run build` and `npm start` — plus a `$PORT`
to listen on. That is also why migration is low-risk: there is nothing
host-specific to port.

The current production host is **Google Cloud** (`server: Google Frontend`,
`x-cloud-trace-context`, Express behind it), with the subdomain resolving to
`8.232.19.50`.

---

## 7. Cutover with a preview first

Recommended order, so production is never exposed to an untested build:

1. Deploy the ZIP to your new host on a **temporary hostname** (e.g.
   `mahjong-new.yourhost.app`). Do not touch DNS yet.
2. Verify on that hostname: all 9 routes load, both landings render, both
   checkouts compute totals correctly, and — most importantly — **click through
   every CTA and confirm it lands on the right Shopify cart with the right
   price**. Use `HANDOFF.md` section 2 as the checklist.
3. Confirm the Meta Pixel fires `PageView` and `InitiateCheckout` (and no
   `Purchase`) with Meta Pixel Helper, in an incognito window.
4. Only then repoint the DNS record for `mahjong.themodernprotocols.com`.
5. Lower the record's TTL a day in advance so you can roll back quickly.

**Do not change the Shopify permalinks during migration.** They are your
revenue path, several deliberately use mixed `http`/`https` and apex/`www`
hosts, and they are documented as-is in `HANDOFF.md`. Migrate first, normalize
later as a separate, individually tested change.

### A note on the `/` → `/english` redirect

That redirect is **application-level**, implemented in `client/src/App.tsx` as
a wouter route — not a DNS or host rule. It travels with the code, so it keeps
working automatically. Do not re-add it as a host-level redirect: you would get
a double hop.

### SPA fallback

Express already handles it: `serveStatic` in `server/vite.ts` serves
`dist/public` and falls back to `index.html` for unknown paths, which is what
makes deep links like `/espanol` work on refresh. If you ever decide to drop
Node and serve `dist/public` from a pure static host, you must configure that
fallback yourself **and** you will lose `GET /download/:file`.

---

## 8. Regenerating the download packages

```
python3 scripts/make-zip.py     # writes to client/public/download/
npm run build                   # copies them into dist/public/download/
```

Run in that order. Building without regenerating ships stale ZIPs; regenerating
without building leaves production serving the old ones.

`GET /download/:file` (in `server/routes.ts`) deliberately runs **before** the
SPA catch-all and returns a real 404 when a file is missing. Without it, a
missing ZIP silently returned `index.html` with `content-type: text/html` — a
"download" that was really 4KB of home page. Keep that route if you keep the
feature.
