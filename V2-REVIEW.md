# Conservative conversion V2 — review only

Branch: `v2-conversion`. Original production baseline: `2ade472` on
`migration/netlify-preview`. Do not merge or promote this branch without approval.

## Visual restoration

The English landing was reconstructed from the production `home.tsx`, then edited
for copy. Restored the original hero grid, 2rem/mobile and original desktop type
sizes and bold weights, coral italic emphasis, spacing, rounded teal purchase
buttons and their shadows, full outlined Spanish button, original PNG product
mockups, decorative tiles and glows, flourishes, gradient introduction panel,
icon cards, coral editorial panel, gold price treatment, offer card and footer.
The replacement navigation/header and WebP derivatives from the first V2 were
removed. Existing font families (Fraunces, Cormorant Garamond and Manrope), global
CSS, Tailwind theme, button component and original image files remain unchanged.

A browser comparison against a separately built production-baseline copy verified
identical computed font, color, spacing, radius and shadow properties for the
hero heading/body, purchase buttons, Spanish button, price and mockup at 360,
390, 768 and 1440px. The Spanish button is fully visible in the initial viewport
at all four sizes, in its original position beside/below the purchase button.
Copy length changes line wrapping; this is not a pixel-identical content snapshot.

## Copy retained within the production design

- American Mahjong, finally made simple; clear beginner positioning.
- 2026 relevance in the hero and original gradient introduction section.
- Concrete card-reading, Charleston, Joker, calling-tile and game-flow language.
- Original five illustrated contents cards retained with clearer descriptions.
- Original coral panel retained for factual audience guidance instead of a quote.
- Straightforward $19.95 offer inside the original gold-accented offer layout.
- Practical FAQs using the original typography, spacing and white/gold card style.

The old testimonial, star rating, buyer count, simulated buyer ticker and artificial
sale claims were not restored because supporting records are unavailable. English
purchase popups remain suppressed; Spanish popup behavior is unchanged. The
original sticky coral bar is retained with factual price copy, not sale urgency.
No useful section was removed merely to shorten the page.

## Shopify and upgrade flow

See **SHOPIFY-URL-AUDIT.md** for the complete literal before/after comparison:
11 source occurrences, 10 distinct URLs, all identical. The first V2 had not
changed them either. No Shopify URL was created or normalized.

Original and revised English path:
`/english` → `/checkout` → original Shopify cart for the selected combination.

The Cheat Codes and 2026 Hand Strategies selectors belong to this site's
intermediate checkout page. They are not claimed to be Shopify-native widgets.
Both checkout source files, their buttons/handlers, prices, bump selection logic,
exit offers and every Shopify destination remain byte-for-byte unchanged.
Spanish remains `/espanol` → `/checkout-es`, with its existing direct offer CTA
also preserved. The core guide does not give away the paid strategy upgrade.

## Preserved integrations and scope

No edits to Spanish page source, checkout source, tracking helper, shared HTML
tracking snippet, routes, downloads implementation, domain configuration, theme,
font imports, dependencies or lockfile. Original production images are reused.
No product-name standardization, new guarantee or lifetime-access promise was
introduced. The earlier name audit recommended The Grand Mahjong Master-Key;
approval to standardize variants is still pending.

Existing Terms/Privacy placeholders and unverified delivery/access/affiliation
facts remain owner-review items; this revision does not invent policies or proof.
The FAQ retains the conservative copy from the prior preview.

## Verification

- Production build passes through `python3 scripts/netlify-build.py`.
- 166 functional checks passed: four viewport sizes, English/Spanish navigation,
  FAQ controls, totals, every existing cart selection/exit offer, captured Pixel
  calls, valid downloads, missing-download 404 and source/hash comparisons.
- Four production-vs-conservative computed-style comparisons passed; Spanish
  immediately visible at each viewport.
- All ten live Shopify carts returned the expected variant ID, quantity 1 and
  totals: USD 19.95 base, 28.94 one upgrade, 37.93 both, 26.55 exit offers.
  Cart handoffs redirect to shop.app. No purchases were made.
- Evidence and screenshots: `/workspace/scratch/v2-conservative/`.

Meta calls were captured without sending test conversion events. Browser font
resources used TLS-verified requests through the configured proxy. Test-only
animation disabling stabilizes clicks and screenshots; application styles remain
unchanged. Local checks do not confirm public branch deployment or final payment.

## Preview and production safety

Push only `v2-conversion`. Keep the production branch `migration/netlify-preview`
and its domain untouched. The existing branch-preview URL should update after
Netlify builds the new commit, if branch deploys are enabled. Confirm the deploy
in Netlify and its URL before treating it as ready for public review.

This environment's active network policy currently blocks the standard branch
preview hostname. The saved draft already includes that domain, but saving does
not apply it. No Netlify API credential is available. Public deployment status
must be confirmed separately; do not substitute the production URL for a preview.
