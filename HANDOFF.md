# Handoff — The Grand Mahjong Master-Key

Complete technical inventory of the live site, prepared for handoff to another
developer or agent (e.g. Codex). Everything below was verified against the
running server and the live production domain, not from memory.

**Verified:** 2026-11-03

---

## 1. Live URLs

| Item | Value |
| --- | --- |
| Production domain | `https://mahjong.themodernprotocols.com` |
| Primary landing (EN) | `https://mahjong.themodernprotocols.com/english` — verified HTTP 200 |
| Primary landing (ES) | `https://mahjong.themodernprotocols.com/espanol` — verified HTTP 200 |
| Resolved IP | `8.232.19.50` |
| Shopify store domain | `themodernprotocols.com` / `www.themodernprotocols.com` |
| Canonical host used in SEO tags | `https://www.themodernprotocols.com` (see caveat §6) |

### Route table

All routes are client-side (wouter SPA). Every one verified 200 in production
and in the dev sandbox.

| Path | Page file | Purpose |
| --- | --- | --- |
| `/` | redirect | Redirects to `/english` |
| `/english` | `client/src/pages/home.tsx` | English landing / funnel entry |
| `/espanol` | `client/src/pages/espanol.tsx` | Spanish landing / funnel entry |
| `/checkout` | `client/src/pages/checkout.tsx` | EN pre-checkout with order bumps |
| `/checkout-es` | `client/src/pages/checkout-es.tsx` | ES pre-checkout with order bumps |
| `/thank-you` | `client/src/pages/thank-you.tsx` | EN post-purchase landing (no Purchase event — see §5) |
| `/gracias` | `client/src/pages/gracias.tsx` | ES post-purchase landing (no Purchase event) |
| `/master-key` | `client/src/pages/master-key.tsx` | EN long-form instructional product content |
| `/llave-maestra` | `client/src/pages/llave-maestra.tsx` | ES instructional content |
| `/downloads` | `client/src/pages/downloads.tsx` | Source-code download page |
| `*` | `client/src/pages/not-found.tsx` | 404 |

### Server routes (Express)

| Method | Path | Handler |
| --- | --- | --- |
| GET | `/api/health` | `server/routes.ts` — liveness probe |
| POST | `/api/orders` | `server/routes.ts` — validated by `insertOrderSchema`, writes via `server/storage.ts` |
| GET | `/download/:file` | `server/routes.ts` — serves the source ZIPs with a real 404 instead of the SPA fallback |

---

## 2. Shopify cart permalinks — FULL CATALOG

**These ten URLs are the entire revenue path. Treat them as immutable.**
They are hardcoded as named constants at the top of each page file. No query
parameters are ever appended to them — `initiateCheckoutThenGo()` hands the URL
off byte-for-byte unchanged.

### English funnel — `client/src/pages/checkout.tsx`

| Line | Constant | Permalink | Variant ID | Price |
| --- | --- | --- | --- | --- |
| 13 | `CART_BASE` | `https://www.themodernprotocols.com/cart/48023691034850:1` | 48023691034850 | $19.95 |
| 14 | `CART_BUMP1` | `https://www.themodernprotocols.com/cart/48052023558370:1` | 48052023558370 | $28.94 (base + bump 1) |
| 15 | `CART_BUMP2` | `https://themodernprotocols.com/cart/48071781908706:1` | 48071781908706 | $28.94 (base + bump 2) |
| 16 | `CART_BOTH` | `https://themodernprotocols.com/cart/48071766409442:1` | 48071766409442 | $37.93 (base + both bumps) |
| 19 | `CART_EXIT_OFFER` | `https://themodernprotocols.com/cart/48192546603234:1` | 48192546603234 | $26.55 (exit-intent offer) |

### Spanish funnel — `client/src/pages/checkout-es.tsx`

| Line | Constant | Permalink | Variant ID | Price |
| --- | --- | --- | --- | --- |
| 13 | `CART_BASE` | `https://www.themodernprotocols.com/cart/48023695392994:1` | 48023695392994 | $19.95 |
| 14 | `CART_BUMP1` | `http://themodernprotocols.com/cart/48055228498146:1` | 48055228498146 | $28.94 (base + bump 1) |
| 15 | `CART_BUMP2` | `http://themodernprotocols.com/cart/48071890075874:1` | 48071890075874 | $28.94 (base + bump 2) |
| 16 | `CART_BOTH` | `http://themodernprotocols.com/cart/48071864156386:1` | 48071864156386 | $37.93 (base + both bumps) |
| 19 | `CART_EXIT_OFFER` | `https://themodernprotocols.com/cart/48052030767330:1` | 48052030767330 | $26.55 (exit-intent offer) |

### Spanish landing direct CTA — `client/src/pages/espanol.tsx`

| Line | Constant | Permalink | Notes |
| --- | --- | --- | --- |
| 21 | `SPANISH_CHECKOUT_URL` | `https://www.themodernprotocols.com/cart/48023695392994:1` | Same variant as the ES `CART_BASE` — bypasses `/checkout-es` |

### Selection logic (identical in both checkout pages, lines 31–40)

```
both bumps checked -> CART_BOTH
bump 1 only        -> CART_BUMP1
bump 2 only        -> CART_BUMP2
neither            -> CART_BASE
```

The exit-intent offer is passed to `<ExitIntentModal ctaHref={CART_EXIT_OFFER}>`
(line 68 in both files). `ExitIntentModal.tsx` contains **no** hardcoded cart
URL of its own — it receives one via props.

### ⚠️ Known inconsistencies — flagged, deliberately NOT changed

Three ES permalinks (`CART_BUMP1`, `CART_BUMP2`, `CART_BOTH`) and two EN ones
(`CART_BUMP2`, `CART_BOTH`, `CART_EXIT_OFFER`) differ from the others in
protocol and subdomain:

- ES bumps use **`http://`** (not `https://`) — Shopify will 301-redirect to
  HTTPS, which works but costs a round trip and can drop referrer data.
- Some use the apex `themodernprotocols.com`, others use `www.` — these are
  different origins, so a cross-origin redirect occurs on the mixed ones.

These were left **exactly as found** because they are confirmed-working revenue
paths and normalizing them is a revenue-affecting change that needs the owner's
explicit sign-off plus a live test order per variant. Recommended fix, once
approved: make all ten `https://www.themodernprotocols.com/cart/<id>:1`.

---

## 3. Meta Pixel / tracking inventory

**Pixel ID: `1666692734460053`** — the only analytics system on the site. There
is no Google Analytics, GTM, TikTok pixel, Hotjar, or any other tracker.

### Base pixel — `client/index.html` (lines 12–65)

Load order matters and is deliberate:

1. Standard `fbevents.js` loader snippet.
2. `fbq('set', 'autoConfig', false, '1666692734460053')` — **must run before
   `init`** or it has no effect. This disables codeless/automatic event
   detection, which was inferring `Purchase` from on-page button text and
   prices and reporting sales that never happened (they arrived tagged
   `cs_est: true`).
3. `fbq('init', '1666692734460053', { external_id })` — Advanced Matching with
   an anonymous per-visitor UUID read from `localStorage` key
   `mk_external_id`, generated via `crypto.randomUUID()` with a fallback.
4. **No `fbq('track', ...)` call of any kind in the HTML.** This is intentional,
   not an omission — see §5.
5. `<noscript>` 1×1 fallback pixel in `<body>`.

Verified live: production HTML contains only `set autoConfig` and `init`, with
zero `track` calls.

### Event helper — `client/src/lib/pixel.ts`

Exports and what they do:

| Export | Event fired | Where used |
| --- | --- | --- |
| `PIXEL_ID` | — | constant |
| `getExternalId()` | — | returns/creates the `mk_external_id` UUID |
| `getMatchData()` | — | builds the Advanced Matching payload |
| `trackPageView()` | `PageView` | `App.tsx` — initial load + every route change |
| `trackViewContent()` | `ViewContent` | `home.tsx`, `espanol.tsx`, `checkout.tsx`, `checkout-es.tsx` |
| `initiateCheckoutThenGo(url, params, delay)` | `InitiateCheckout` | all four Shopify handoff buttons |

**Exactly three events exist in this codebase: `PageView`, `ViewContent`,
`InitiateCheckout`.** No `Purchase`, no `AddToCart`, no `Lead`. The former
`trackAddToCart`, `addToCartThenGo`, and `trackPurchase` functions were deleted
outright so they cannot be called by accident.

Key mechanics:

- **Per-path dedupe.** `trackPageView` and `trackViewContent` each remember the
  last path and suppress a repeat of the same one. This absorbs the
  `/` → `/english` redirect (which counts as a route change) and React
  StrictMode's intentional double-invocation of mount effects in dev.
- **Re-`init` before each event.** `fire()` calls `fbq('init', PIXEL_ID, matchData)`
  before `track`, which refreshes the Advanced Matching payload rather than
  creating a second pixel.
- **320ms handoff delay.** `initiateCheckoutThenGo` fires the event, waits
  ~320ms, then sets `window.location.href`. Without the delay the browser tears
  down the page with the beacon still in flight — the single most common cause
  of missing events on cross-domain handoffs.
- **`eventID`** of the form `ic-<externalId>-<timestamp>` is attached for
  server-side deduplication.
- **Advanced Matching.** `external_id` always. `em`/`ph` are added only if the
  visitor arrives with `?email=` / `?phone=` on the URL; they are normalized to
  Meta's spec (lowercase trimmed email, digits-only phone) and cached in
  `localStorage` under `mk_match_data`. `fbevents.js` SHA-256 hashes them in the
  browser — raw values never leave the device.

### Advanced Matching storage keys

| Key | Contents |
| --- | --- |
| `mk_external_id` | anonymous visitor UUID, survives the round trip to Shopify |
| `mk_match_data` | `{ em?, ph? }` if ever supplied via URL |

---

## 4. Assets

All site images live in `client/public/` and are referenced by absolute path
(e.g. `/master-key-cover.png`). `vite build` copies them to `dist/public/`.

| File | Size | Used by |
| --- | --- | --- |
| `master-key-cover.png` | 2.5 MB | `/master-key` hero, EN OG image |
| `master-key-cover-es.png` | 2.6 MB | `/llave-maestra` hero, ES OG image |
| `master-key-card.png` | 2.1 MB | EN printable card preview |
| `master-key-card-es.png` | 2.1 MB | ES printable card preview |
| `master-key-hand-sample.png` | 2.1 MB | EN winning hand (NN 1111 33 5555 SS) |
| `master-key-hand-sample-es.png` | 2.0 MB | ES winning hand |
| `product-mockup.png` | 2.8 MB | EN product mockup |
| `product-mockup-es.png` | 3.0 MB | ES product mockup |
| `order-bump-cheatcodes.png` | 2.5 MB | Order bump 1 visual |
| `order-bump-2026.png` | 2.0 MB | Order bump 2 visual |
| `tiles-3-colors.png` | 2.7 MB | Decorative tile imagery |

**Optimization note:** every PNG is 2–3 MB and uncompressed. Converting to WebP
would cut ~25 MB of page weight. Not done here because it is a visual-quality
decision for the owner.

### Fonts

**No font files are bundled.** All three typefaces load from Google Fonts via a
single `<link>` in `client/index.html` line 10, with `preconnect` hints:

- **Fraunces** — headlines (weights 300–800, plus italics)
- **Cormorant Garamond** — accent/display italic (300–700, plus italics)
- **Manrope** — body (300–800)

If the site ever needs to run offline or without third-party requests, these
must be self-hosted; nothing in the export contains them.

---

## 5. Purchase event — read before changing anything

`Purchase` is **not implemented anywhere in this codebase**, and that is
correct, not a bug. Verified by searching frontend, backend, and shared code:
the only remaining matches are explanatory comments.

The reasoning: payment completes on Shopify's domain. `/thank-you` and
`/gracias` are reachable without paying — by direct link, back button, or
refresh — so any `Purchase` fired there reports revenue that never existed. The
events cannot be un-sent, and they permanently degrade ad optimization because
Meta learns to find people who browse rather than people who buy.

**The only correct source of `Purchase` is Shopify's native Meta integration:**
Shopify admin → Settings → Apps and sales channels → Facebook → connect pixel
`1666692734460053` with conversion tracking enabled. Shopify then fires
`Purchase` on the real order-confirmation page with the actual amount charged.

**Do not also paste the pixel into `theme.liquid`.** The native integration plus
a manual snippet is the classic cause of genuinely duplicated `Purchase`.

Optional improvement: a Shopify **Custom Pixel** can read `mk_external_id` from
`localStorage` and attach it to Shopify's `Purchase`, giving perfect
cross-domain identity stitching. Not required — the native integration already
attributes correctly.

---

## 6. Domain / redirect configuration stored outside the code

Two pieces of configuration are **not** in this repository and must be verified
in their own dashboards:

1. **DNS and hosting for `mahjong.themodernprotocols.com`.** The subdomain
   resolves to `8.232.19.50` and serves this app. The A/CNAME record lives with
   whoever manages DNS for `themodernprotocols.com` (likely the Shopify domain
   registrar or an external DNS provider). The deploy host mapping is managed by
   the HeyLloyd publish pipeline, not by any file here.

2. **The `/` → `/english` redirect is application-level, not DNS-level.** It is
   implemented in `client/src/App.tsx` as a wouter route. Anyone migrating this
   app must reimplement it or `/` will 404. Note it fires as a route change,
   which is exactly why `trackPageView` needs its dedupe guard.

**SEO canonical caveat:** `client/src/components/Seo.tsx` line 20 sets the
canonical base to `https://www.themodernprotocols.com`, but the site actually
serves from `mahjong.themodernprotocols.com`. The canonical and `hreflang` tags
therefore point at the Shopify store rather than the landing pages. This is
flagged, not changed — correcting it affects indexing and needs the owner's
decision on which host should be canonical.

**SSR caveat:** this is a client-rendered SPA. `Seo.tsx` injects metadata after
load. Google executes JS and will read it; social scrapers (Facebook, Twitter,
WhatsApp link previews) generally do **not**, and will fall back to the static
tags in `client/index.html`. Fixing this properly requires prerendering or SSR.

---

## 7. Stack and local setup

Vite + React 18 + TypeScript + Tailwind on the frontend; Express + Drizzle ORM +
Postgres on the backend; wouter for routing; TanStack Query for data fetching;
shadcn/ui primitives (`button`, `card`, `input`, `label`).

```
npm install
npm run dev     # http://localhost:5173
```

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server, Express + Vite middleware, port 5173 |
| `npm run build` | `vite build` → `dist/public/`, then esbuild → `dist/index.js` |
| `npm start` | Production: `NODE_ENV=production node dist/index.js` |
| `npm run db:push` | Apply `shared/schema.ts` to Postgres |

`DATABASE_URL` is the only environment variable; it is injected by the host.
The Postgres table is defined in `shared/schema.ts` and backs `POST /api/orders`.

### Regenerating the download packages

```
python3 scripts/make-zip.py
```

Writes both ZIPs to `client/public/download/`. Run it after code changes so the
packages are not stale, then rebuild so they are copied into `dist/public/`.
