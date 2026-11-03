/**
 * Meta Pixel — hybrid funnel configuration.
 *
 * Funnel shape: [own landing page] -> CTA button -> [Shopify checkout].
 * There is NO own thank-you page in this funnel, so the landing side owns
 * exactly two events and nothing else:
 *
 *   PageView         — on load and on every SPA route change
 *   InitiateCheckout — on click of any button that hands off to Shopify
 *
 * Purchase is deliberately NOT implemented here. It belongs to Shopify's
 * native Meta integration, which fires it on the real order-confirmation page
 * after payment clears. Any Purchase fired from a landing page is a fabricated
 * conversion: it counts people who clicked but never paid, and it poisons ad
 * optimization permanently because events cannot be un-sent.
 *
 * Automatic (codeless) event detection is disabled in `client/index.html`
 * BEFORE init, so fbevents.js cannot infer conversions from button text or
 * on-page prices.
 */

export const PIXEL_ID = "1666692734460053";

type PixelParams = Record<string, unknown>;

/* -------------------------------------------------------------------------- */
/* External ID — the key to cross-domain deduplication                        */
/* -------------------------------------------------------------------------- */

/**
 * A stable, anonymous visitor id shared between this landing page and the
 * Shopify checkout.
 *
 * Why this matters: the visitor crosses a domain boundary at the CTA. Without a
 * shared identifier, Meta sees "someone who did InitiateCheckout on the landing
 * domain" and "someone who did Purchase on the Shopify domain" and may count
 * them as two different people. Sending the SAME external_id on both sides lets
 * Meta stitch them into one person and one conversion.
 *
 * It is a random UUID — NOT an email, name, or anything personally
 * identifying — persisted in localStorage so it survives the round trip back
 * from Shopify. Meta hashes external_id on receipt.
 */
const EXTERNAL_ID_KEY = "mk_external_id";

function createId(): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through to the manual generator */
  }
  return `mk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

export function getExternalId(): string {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(EXTERNAL_ID_KEY);
    if (existing) return existing;
    const fresh = createId();
    window.localStorage.setItem(EXTERNAL_ID_KEY, fresh);
    return fresh;
  } catch {
    // Private mode / storage blocked: still return an id so THIS pageview and
    // click share one value, even if it won't survive a reload.
    return createId();
  }
}

/* -------------------------------------------------------------------------- */
/* Advanced Matching                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Advanced Matching customer data.
 *
 * This funnel collects no name/email on the landing page (the checkout pages
 * were deliberately stripped of those fields for conversion reasons), so the
 * only identifier we can honestly supply is external_id. If an email or phone
 * ever becomes available — e.g. a visitor arrives from an email campaign with
 * `?email=` on the URL — it is picked up here and normalized.
 *
 * Meta requires lowercase, trimmed email and digits-only phone with country
 * code. fbevents.js hashes these in the browser (SHA-256) before sending; raw
 * values never leave the device.
 */
type MatchData = {
  external_id: string;
  em?: string;
  ph?: string;
};

const MATCH_STORAGE_KEY = "mk_match_data";

function normalizeEmail(raw: string): string | undefined {
  const email = raw.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
}

function normalizePhone(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, "");
  return digits.length >= 10 ? digits : undefined;
}

/**
 * Capture email/phone if present in the URL (e.g. from an email campaign link)
 * and remember them for the rest of the session so later events match too.
 */
function readStoredMatch(): { em?: string; ph?: string } {
  if (typeof window === "undefined") return {};

  let stored: { em?: string; ph?: string } = {};
  try {
    const raw = window.localStorage.getItem(MATCH_STORAGE_KEY);
    if (raw) stored = JSON.parse(raw) as { em?: string; ph?: string };
  } catch {
    stored = {};
  }

  try {
    const qs = new URLSearchParams(window.location.search);
    const em = normalizeEmail(qs.get("email") || qs.get("em") || "");
    const ph = normalizePhone(qs.get("phone") || qs.get("ph") || "");
    if (em) stored.em = em;
    if (ph) stored.ph = ph;
    if (em || ph) {
      window.localStorage.setItem(MATCH_STORAGE_KEY, JSON.stringify(stored));
    }
  } catch {
    /* storage blocked — use whatever we have in memory */
  }

  return stored;
}

/** Full Advanced Matching payload for `fbq('init', id, matchData)`. */
export function getMatchData(): MatchData {
  return { external_id: getExternalId(), ...readStoredMatch() };
}

/* -------------------------------------------------------------------------- */
/* Event firing                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Re-run `init` with the current match data, then fire the event.
 *
 * Calling init again with the same pixel id does not create a second pixel —
 * it updates the Advanced Matching payload attached to subsequent events. This
 * is how external_id (and email/phone when known) rides along on every event,
 * including the InitiateCheckout that immediately precedes the Shopify jump.
 */
function fire(event: string, params?: PixelParams, eventID?: string) {
  try {
    if (typeof window === "undefined" || typeof window.fbq !== "function") return;

    window.fbq("init", PIXEL_ID, getMatchData());

    const options = eventID ? { eventID } : undefined;
    if (params && options) window.fbq("track", event, params, options);
    else if (params) window.fbq("track", event, params);
    else window.fbq("track", event);

    if (import.meta.env.DEV) {
      console.info(`[pixel] ${event}`, params ?? "", eventID ?? "");
    }
  } catch {
    /* never let analytics break the page */
  }
}

/**
 * Standard PageView — the app is the SINGLE owner of this event.
 *
 * `index.html` deliberately does NOT fire it. It is fired here on first mount
 * and on every SPA route change, with a guard against the two ways a duplicate
 * used to sneak through:
 *
 * 1. The "/" -> "/english" redirect renders twice in quick succession, which
 *    looked like two page views of the same URL.
 * 2. React StrictMode intentionally re-runs mount effects in development.
 *
 * Firing the same path twice in a row is always a bug, never a real second
 * view — a genuine re-visit is separated by a different path in between.
 */
let lastPageViewPath: string | null = null;

export function trackPageView() {
  if (typeof window === "undefined") return;

  const path = window.location.pathname;
  if (path === lastPageViewPath) {
    if (import.meta.env.DEV) {
      console.warn(`[pixel] duplicate PageView suppressed for ${path}`);
    }
    return;
  }
  lastPageViewPath = path;

  fire("PageView");
}

/**
 * Standard ViewContent — product/landing page views.
 *
 * Safe to keep: it is an interest signal, not a conversion, so it cannot
 * inflate reported sales. Deduped per path like PageView.
 */
let lastViewContentPath: string | null = null;

export function trackViewContent(params?: PixelParams) {
  if (typeof window === "undefined") return;

  const path = window.location.pathname;
  if (path === lastViewContentPath) return;
  lastViewContentPath = path;

  fire("ViewContent", params);
}

/* -------------------------------------------------------------------------- */
/* The one and only conversion-path event this landing page owns               */
/* -------------------------------------------------------------------------- */

/**
 * Fire InitiateCheckout, then send the visitor to the Shopify cart.
 *
 * This is the correct standard event for "clicked the button that leads to the
 * checkout". It is NOT Purchase (no money has moved) and NOT Lead (nothing was
 * submitted). Shopify's native integration completes the funnel with its own
 * InitiateCheckout/AddPaymentInfo/Purchase on its domain.
 *
 * Two details that make the event actually land and actually dedupe:
 *
 * - The ~320ms delay gives the beacon a head start. Without it the browser
 *   tears down the page (and the in-flight request) before Meta receives it —
 *   the number one cause of missing events on cross-domain handoffs.
 * - `eventID` + `external_id` let Meta recognize this visitor as the same
 *   person who later purchases on Shopify, instead of two separate users.
 */
export function initiateCheckoutThenGo(
  url: string,
  params?: PixelParams,
  delay = 320,
) {
  const externalId = getExternalId();
  const eventID = `ic-${externalId}-${Date.now()}`;

  fire(
    "InitiateCheckout",
    { ...params, external_id: externalId },
    eventID,
  );

  // The Shopify cart permalink is handed off BYTE-FOR-BYTE unchanged. No query
  // parameters are appended: these permalinks are the revenue path and must not
  // be mutated. The shared external_id lives in localStorage under
  // `mk_external_id` — if you later want Shopify's Purchase to carry the exact
  // same id, read that key from a Shopify Custom Pixel (see the notes handed to
  // you in chat); it is NOT something this app can push through the URL.
  window.setTimeout(() => {
    window.location.href = url;
  }, delay);
}
