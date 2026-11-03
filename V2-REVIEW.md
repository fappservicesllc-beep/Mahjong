# English conversion V2 review

Branch: `v2-conversion`. Base: `2ade472` on `migration/netlify-preview`.
This branch must not be merged or published to production until the user approves.

## Scope

The existing React/Vite/Express site, theme, typography, mockups, routes and commerce flow remain the foundation. The English landing is restructured with a concrete beginner hero, 2026 relevance directly after it, clear beginner questions, seven learning areas, included materials, audience fit, a plain $19.95 offer and nine practical FAQs. The optional 2026 Hand Strategies upgrade remains separate from the base guide.

Existing landing purchase CTAs went to `/checkout`, not directly to Shopify. All three V2 purchase CTAs preserve that internal step, so the existing order bumps and exact Shopify destinations remain available. The language link still goes to `/espanol`.

Three responsive WebP derivatives of the existing product mockup replace its PNG only in the English landing. Originals and Spanish assets remain unchanged. The derivatives are 56,408 / 147,484 / 284,530 bytes for 480 / 800 / 1200px, compared with the 2.8 MB original. Explicit dimensions reserve image space; the hero has high fetch priority and the second image loads lazily. No new forms, libraries or page animations were added.

## Naming audit — no standardization applied

| Location | Existing variants |
| --- | --- |
| English landing | The Grand Mahjong Master-Key; Master-Key; The Master-Key Guide; Master-Key Roadmap |
| English checkout | The Grand Mahjong Master-Key; The Master-Key Roadmap; The Secrets of The Grand Mahjong Master Key™ for the first add-on; Strategies for 2026 Hands for the second |
| Main mockup | THE GRAND MAHJONG MASTER-KEY |
| Cover / cheat-codes asset | The Secrets of THE GRAND MAHJONG MASTER-KEY™ — Cheat Codes, 2026 Edition |
| Metadata | The Grand Mahjong Master-Key; new English SEO suffix describes the beginner outcome |
| Spanish | Existing localized names remain untouched |

No “The Mahjong Master-Key 2.0” string was found in the English source. The primary mockup and cover were visually inspected; no 2.0 branding was visible there. Do not treat the pixel library version 2.0 as a product name.

Recommendation: retain **The Grand Mahjong Master-Key**, which matches the main mockup, current checkout and metadata. Await user approval before standardizing shorter visible variants. Shopify titles, tracking content labels and original assets are unchanged.

The original SEO cover image is labeled Cheat Codes, while the main mockup shows the base guide. The V2 social image uses the existing main mockup derivative to avoid presenting the add-on as the base guide. No asset was redrawn.

## Credibility audit

Removed from English landing: “Loved by 2,400+ hostesses,” five-star rating display, Elena R. quote and stars, hardcoded luxury buyer ticker and recent-purchase timestamps. No supporting customer records or review source exists in this repository. Nothing was substituted with invented proof.

The global purchase popup uses a hardcoded buyer array and randomly chosen minute labels. It is suppressed on `/`, `/english` and `/checkout`. Its component and behavior on Spanish routes remain unchanged. Spanish social proof, checkout exit-offer urgency, and existing purchase-page copy are outside this English landing rewrite and still require their own evidence review.

Removed from English landing: flash-sale bar, $37 comparison, “price goes up soon,” limited-time copy, 48-hour transformation claim and $97/$47/$27/Priceless value stack. Price remains $19.95; no countdown added.

## Product facts needing owner confirmation before production

The included-item list comes from the existing offer/checkout: guide, visual cheat sheets and strategic glossary. It adds no bonus, quantity or fulfillment guarantee. Those supplied items still need owner confirmation against the actual Shopify-delivered package; the site source is not proof of fulfillment.

The official NMJL card is not offered or reproduced on the V2 landing. The purchased card and the optional paid strategies upgrade are clearly separate. The FAQ describes the material as a Luxe Tile Press guide and claims no NMJL endorsement. Confirm official-card exclusion and affiliation status before approving production.

The original thank-you copy mentions email, but actual Shopify delivery is not visible in the source. The FAQ directs purchasers to order access instructions without inventing an email timing guarantee. The original checkout says “Lifetime Updates”; no hosted-access duration is independently verified, so no new lifetime guarantee is made. The access FAQ refers to keeping downloaded materials and contacting support. Confirm delivery and hosted access terms before production.

The footer’s existing Terms/Privacy `#` placeholders remain unchanged; actual destinations need to be supplied separately.

## Preserved Shopify destinations

Eleven source occurrences, ten distinct destinations. All must remain byte-for-byte equal to the production baseline, including protocols, apex/www differences, variant IDs and quantities:

- `http://themodernprotocols.com/cart/48055228498146:1`
- `http://themodernprotocols.com/cart/48071864156386:1`
- `http://themodernprotocols.com/cart/48071890075874:1`
- `https://themodernprotocols.com/cart/48052030767330:1`
- `https://themodernprotocols.com/cart/48071766409442:1`
- `https://themodernprotocols.com/cart/48071781908706:1`
- `https://themodernprotocols.com/cart/48192546603234:1`
- `https://www.themodernprotocols.com/cart/48023691034850:1`
- `https://www.themodernprotocols.com/cart/48023695392994:1`
- `https://www.themodernprotocols.com/cart/48052023558370:1`

## Preview deployment

Production is currently `migration/netlify-preview`; keep that unchanged. No DNS or production-domain changes are needed.

Netlify must enable **Branch deploys** for the individual branch `v2-conversion` in Project configuration → Build & deploy → Continuous deployment → Branches and deploy contexts. Pushes to this branch can then deploy it separately. If enabling after a push does not start a build, trigger a deploy for this branch or push the next review commit. Do not change the production branch or promote the V2 deploy.

The public preview hostname must be confirmed from a successful Netlify branch deploy; a predictable hostname alone is not proof a preview exists. No Netlify API credential or plugin is configured in this session. GitHub API access is blocked, so an automated PR/deploy-preview path could not be created either. Git HTTPS branch pushes remain available.

## Verification evidence

Production build: `python3 scripts/netlify-build.py` (generates valid source ZIPs and runs the existing build). A browser test exercises mobile widths 360 and 390, tablet 768 and desktop 1440; English and Spanish rendering; all three English purchase CTAs; language navigation; nine FAQ interactions; checkout selections and both exit offers; captured PageView/ViewContent/InitiateCheckout calls without sending analytics; no Purchase from this app; valid downloads and missing-download 404; exact source hashes for preserved files.

Results and screenshots are saved outside the checkout under `/workspace/scratch/v2-conversion/`. Captured tracking calls verify application behavior, not delivery to Meta Events Manager. Live Shopify payment screens were not changed or purchased through during these V2 tests. Do not label an incomplete or failed run as passed.

Latest local verification: **170 checks executed, 170 passed** across the four viewport sizes. The production build passed. These results do not establish that a public Netlify branch preview has been created.
