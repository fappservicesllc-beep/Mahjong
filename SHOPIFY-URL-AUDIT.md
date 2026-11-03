# Original production → conservative V2: Shopify URL audit

Baseline: production commit `2ade472`. Eleven source occurrences, ten distinct URLs. Every before/after string is identical.

| Source / selector | Before | After |
| --- | --- | --- |
| client/src/pages/checkout.tsx — CART_BASE | `https://www.themodernprotocols.com/cart/48023691034850:1` | `https://www.themodernprotocols.com/cart/48023691034850:1` |
| client/src/pages/checkout.tsx — CART_BUMP1 | `https://www.themodernprotocols.com/cart/48052023558370:1` | `https://www.themodernprotocols.com/cart/48052023558370:1` |
| client/src/pages/checkout.tsx — CART_BUMP2 | `https://themodernprotocols.com/cart/48071781908706:1` | `https://themodernprotocols.com/cart/48071781908706:1` |
| client/src/pages/checkout.tsx — CART_BOTH | `https://themodernprotocols.com/cart/48071766409442:1` | `https://themodernprotocols.com/cart/48071766409442:1` |
| client/src/pages/checkout.tsx — CART_EXIT_OFFER | `https://themodernprotocols.com/cart/48192546603234:1` | `https://themodernprotocols.com/cart/48192546603234:1` |
| client/src/pages/checkout-es.tsx — CART_BASE | `https://www.themodernprotocols.com/cart/48023695392994:1` | `https://www.themodernprotocols.com/cart/48023695392994:1` |
| client/src/pages/checkout-es.tsx — CART_BUMP1 | `http://themodernprotocols.com/cart/48055228498146:1` | `http://themodernprotocols.com/cart/48055228498146:1` |
| client/src/pages/checkout-es.tsx — CART_BUMP2 | `http://themodernprotocols.com/cart/48071890075874:1` | `http://themodernprotocols.com/cart/48071890075874:1` |
| client/src/pages/checkout-es.tsx — CART_BOTH | `http://themodernprotocols.com/cart/48071864156386:1` | `http://themodernprotocols.com/cart/48071864156386:1` |
| client/src/pages/checkout-es.tsx — CART_EXIT_OFFER | `https://themodernprotocols.com/cart/48052030767330:1` | `https://themodernprotocols.com/cart/48052030767330:1` |
| client/src/pages/espanol.tsx — SPANISH_CHECKOUT_URL | `https://www.themodernprotocols.com/cart/48023695392994:1` | `https://www.themodernprotocols.com/cart/48023695392994:1` |

## CTA flow comparison

| CTA | Original destination | Conservative V2 destination |
| --- | --- | --- |
| English hero purchase | `/checkout` | `/checkout` |
| English final offer purchase | `/checkout` | `/checkout` |
| English Spanish button | `/espanol` | `/espanol` |
| Spanish hero purchase | `/checkout-es` | `/checkout-es` |
| Spanish final offer purchase | `https://www.themodernprotocols.com/cart/48023695392994:1` | `https://www.themodernprotocols.com/cart/48023695392994:1` |
| Spanish language switch | `/english` | `/english` |

Both purchase buttons on each checkout page use the same unchanged handler. It chooses the original base, Cheat Codes, 2026 Hand Strategies, or both-upgrades cart permalink. Both exit offers retain their original links.

**Flow distinction:** the upgrade selectors are on this site’s `/checkout` and `/checkout-es` pages, before handing off to Shopify. This audit does not claim those selectors are Shopify-native checkout widgets. The earlier V2 did not alter these URLs either.
