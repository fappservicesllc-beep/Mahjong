import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ExitIntentModal from "@/components/ExitIntentModal";
import { initiateCheckoutThenGo, trackViewContent } from "@/lib/pixel";
import { ArrowLeft, Lock, Check } from "lucide-react";

const BASE_PRICE = 19.95;
const BUMP_PRICE = 8.99;
const BUMP2_PRICE = 8.99;

// Dedicated Shopify carts for every combination of order bumps.
const CART_BASE = "https://www.themodernprotocols.com/cart/48023691034850:1"; // $19.95
const CART_BUMP1 = "https://www.themodernprotocols.com/cart/48052023558370:1"; // + $8.99 = $28.94
const CART_BUMP2 = "https://themodernprotocols.com/cart/48071781908706:1"; // + $8.99 = $28.94
const CART_BOTH = "https://themodernprotocols.com/cart/48071766409442:1"; // + both = $37.93

// Exit-intent offer: COMPLETE Master-Key Collection, 30% off ($38.00 -> $26.55).
const CART_EXIT_OFFER = "https://themodernprotocols.com/cart/48192546603234:1"; // $26.55

export default function Checkout() {
  const [bumpAdded, setBumpAdded] = useState(false);
  const [bump2Added, setBump2Added] = useState(false);

  const total =
    BASE_PRICE + (bumpAdded ? BUMP_PRICE : 0) + (bump2Added ? BUMP2_PRICE : 0);
  const totalLabel = `${total.toFixed(2)}`;

  const handleCheckout = () => {
    // Zero friction: one click straight to the exact Shopify cart.
    let url = CART_BASE;
    const contents = ["master-key"];
    if (bumpAdded && bump2Added) {
      url = CART_BOTH;
      contents.push("bump-cheat-codes", "bump-2026-hands");
    } else if (bumpAdded) {
      url = CART_BUMP1;
      contents.push("bump-cheat-codes");
    } else if (bump2Added) {
      url = CART_BUMP2;
      contents.push("bump-2026-hands");
    }
    // Fire InitiateCheckout (never Purchase — no money has moved yet), then
    // hand off to Shopify, which owns the Purchase event on its own domain.
    initiateCheckoutThenGo(url, {
      content_name: "The Grand Mahjong Master-Key",
      content_type: "product",
      content_ids: contents,
      num_items: contents.length,
      value: Number(total.toFixed(2)),
      currency: "USD",
    });
  };

  useEffect(() => {
    trackViewContent({
      content_name: "The Grand Mahjong Master-Key",
      content_type: "product",
      value: BASE_PRICE,
      currency: "USD",
    });
  }, []);

  return (
    <div className="min-h-screen cream-bg py-8 md:py-12">
      <ExitIntentModal
        lang="en"
        ctaHref={CART_EXIT_OFFER}
        storageKey="mk-exit-offer-en"
      />
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/">
          <button
            className="inline-flex items-center gap-2 text-sm text-brand-ink/70 hover:text-brand-ink mb-8 transition"
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </Link>

        {/* Heading — always spans full width above the two columns */}
        <div className="mb-6">
          <div className="divider-flourish justify-start mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: "#C9A961" }}>
            Order Summary
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold" data-testid="text-checkout-headline">
            You're one step from <span className="italic text-brand-orange">the circle.</span>
          </h1>
        </div>

        {/* Mobile: single column, order = image → bump → details → checkout box.
            Desktop (md+): two columns. Left = image (row 1) + details (row 2).
            Right = order bump (row 1, matches image height) + checkout box (row 2, matches details height). */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-stretch">

          {/* Product image — left column, row 1 */}
          <div className="order-1 md:order-none md:col-start-1 md:row-start-1 flex">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-brand-gold/30 mb-6 md:mb-0 max-w-md md:max-w-none mx-auto md:mx-0 w-full md:h-full">
              <img src="/product-mockup.png" alt="The Grand Mahjong Master-Key" className="w-full h-auto md:h-full md:object-cover block" />
            </div>
          </div>

          {/* Mobile-only: CTA immediately under the image, then the "Wait, there's more!" lead-in
              that introduces the order bumps. Hidden on desktop, where the CTA lives in the
              checkout box on the right. Uses the exact same handleCheckout — carts unchanged. */}
          <div className="order-2 md:hidden mb-5 max-w-md mx-auto w-full">
            <Button
              type="button"
              onClick={handleCheckout}
              className="hover-elevate active-elevate-2 w-full bg-brand-teal hover:bg-brand-teal text-brand-ink text-base font-semibold py-6 rounded-full h-auto shadow-lg shadow-brand-teal/40 whitespace-normal text-center leading-tight"
              data-testid="button-submit-order-mobile"
            >
              COMPLETE ORDER · {totalLabel}
            </Button>

            <div className="mt-6 text-center">
              <div
                className="divider-flourish justify-center text-xs tracking-[0.3em] uppercase"
                style={{ color: "#C9A961" }}
              >
                Wait, there's more!
              </div>
              <p className="text-sm text-brand-ink/70 mt-3" data-testid="text-wait-theres-more">
                Add these one-time upgrades to your order below.
              </p>
            </div>
          </div>

          {/* Order Bumps — mobile order 3; desktop right column, row 1 (matches image height).
              Both bumps stack vertically in the same grid cell. */}
          <div className="order-3 md:order-none md:col-start-2 md:row-start-1 flex flex-col gap-3 mb-4 md:mb-0 md:h-full">
            <button
              type="button"
              onClick={() => setBumpAdded((v) => !v)}
              aria-pressed={bumpAdded}
              className={`bump-pulse w-full text-left rounded-2xl border-2 bg-white/90 p-4 md:p-5 max-w-md md:max-w-none mx-auto md:mx-0 flex flex-col justify-center md:flex-1 transition-colors ${
                bumpAdded ? "border-[#d4af37]" : "border-[#d4af37]/60"
              }`}
              data-testid="button-order-bump"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 transition-colors ${
                    bumpAdded ? "bg-[#d4af37] border-[#d4af37]" : "bg-white border-[#d4af37]"
                  }`}
                  data-testid="checkbox-order-bump"
                >
                  {bumpAdded && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </span>
                <img
                  src="/order-bump-cheatcodes.png"
                  alt="The Secrets of The Grand Mahjong Master-Key — Cheat Codes"
                  className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg border border-[#d4af37]/40 object-cover shadow-sm"
                  data-testid="img-order-bump"
                />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-serif text-base md:text-lg font-bold text-brand-ink leading-tight">
                      Yes add... The Secrets of The Grand Mahjong Master Key™
                    </h3>
                    <span className="font-serif font-bold text-[#b8964a] whitespace-nowrap" data-testid="text-bump-price">
                      + $8.99
                    </span>
                  </div>
                  <p className="text-sm text-brand-ink/70 leading-relaxed mt-1.5">
                    Unlock the private interactive strategy dashboard + downloadable
                    cheat-codes. Your ultimate edge at the table.
                  </p>
                </div>
              </div>
            </button>

            {/* Secondary Order Bump — same size as the first */}
            <button
              type="button"
              onClick={() => setBump2Added((v) => !v)}
              aria-pressed={bump2Added}
              className={`bump-pulse w-full text-left rounded-2xl border-2 bg-white/90 p-4 md:p-5 max-w-md md:max-w-none mx-auto md:mx-0 flex flex-col justify-center md:flex-1 transition-colors ${
                bump2Added ? "border-[#d4af37]" : "border-[#d4af37]/60"
              }`}
              data-testid="button-order-bump-2"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 shrink-0 flex items-center justify-center w-6 h-6 rounded-md border-2 transition-colors ${
                    bump2Added ? "bg-[#d4af37] border-[#d4af37]" : "bg-white border-[#d4af37]"
                  }`}
                  data-testid="checkbox-order-bump-2"
                >
                  {bump2Added && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </span>
                <img
                  src="/order-bump-2026.png"
                  alt="Strategies for 2026 Hands — 2026 Hands Strategy Guide"
                  className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg border border-[#d4af37]/40 object-cover shadow-sm"
                  data-testid="img-order-bump-2"
                />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-serif text-base md:text-lg font-bold text-brand-ink leading-tight">
                      Strategies for 2026 Hands
                    </h3>
                    <span className="font-serif font-bold text-[#b8964a] whitespace-nowrap" data-testid="text-bump-2-price">
                      + $8.99
                    </span>
                  </div>
                  <p className="text-sm text-brand-ink/70 leading-relaxed mt-1.5">
                    Specialized 2026 Tactics: Stop guessing your moves. Learn how the
                    masters play this year's hands.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Details — mobile order 4; desktop left column, row 2 */}
          <div className="order-4 md:order-none md:col-start-1 md:row-start-2 mt-8 md:mt-8">
            <ul className="space-y-2.5 mb-6">
              {[
                "The Master-Key Roadmap",
                "5 Visual Cheat Sheets",
                "Strategic Glossary",
                "Lifetime Updates",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-ink/80">
                  <Check className="w-4 h-4 text-brand-sage shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-brand-gold/20 pt-4 flex justify-between items-baseline">
              <span className="text-brand-ink font-semibold">Total</span>
              <span className="font-serif text-3xl font-bold gold-foil" data-testid="text-checkout-total">{totalLabel}</span>
            </div>
          </div>

          {/* Checkout box — mobile order 5; desktop right column, row 2 (same height as details) */}
          <div className="order-5 md:order-none md:col-start-2 md:row-start-2 mt-6 md:mt-8 mb-4 md:mb-0 flex">
            <div className="bg-white rounded-3xl border border-brand-gold/30 shadow-xl p-6 md:p-8 w-full md:h-full flex flex-col justify-center">
              <div className="space-y-4" data-testid="form-checkout">
                <Button
                  type="button"
                  onClick={handleCheckout}
                  className="hover-elevate active-elevate-2 w-full bg-brand-teal hover:bg-brand-teal text-brand-ink text-base font-semibold py-6 rounded-full h-auto shadow-lg shadow-brand-teal/40 whitespace-normal text-center leading-tight"
                  data-testid="button-submit-order"
                >
                  COMPLETE ORDER · {totalLabel}
                </Button>

                <div className="pt-2">
                  <h2 className="font-serif text-2xl font-bold mb-1">Complete your order</h2>
                  <p className="text-sm text-brand-ink/60">
                    Confirm your selection above and continue to secure checkout.
                  </p>
                </div>

                <div className="rounded-lg bg-brand-cream border border-brand-gold/25 p-4 text-xs text-brand-ink/70 leading-relaxed">
                  <div className="flex items-center gap-2 mb-1.5 font-semibold text-brand-ink">
                    <Lock className="w-3.5 h-3.5 text-brand-sage" />
                    Instant access. Secure checkout.
                  </div>
                  <p data-testid="text-checkout-policy">
                    Because this is a digital product delivered immediately, purchases are
                    generally final. If you have any trouble accessing your purchase or feel the
                    product was materially different from what was described, contact us and
                    we'll work with you to make it right.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
