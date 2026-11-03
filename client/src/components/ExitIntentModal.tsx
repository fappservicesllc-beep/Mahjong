import { useState, useEffect, useRef, useCallback } from "react";
import { initiateCheckoutThenGo } from "@/lib/pixel";
import { Check, X, Sparkles } from "lucide-react";

const COPY = {
  en: {
    eyebrow: "One-Time Exclusive Offer",
    headline: "WAIT! Don't leave your first Mahj on the table...",
    subheadline:
      "Get the COMPLETE Master-Key Collection at an exclusive one-time price.",
    includes: "Everything included:",
    items: [
      {
        title: "The Grand Mahjong Master-Key",
        note: "Main Guide",
      },
      {
        title: "The Visual Strategy Cheat Sheets",
        note: "Bonus",
      },
      {
        title: "The Table-Side Reference Cards",
        note: "Bonus",
      },
    ],
    savings: "SAVE 30% RIGHT NOW",
    wasLabel: "Regular",
    nowLabel: "Today only",
    cta: "YES! UPGRADE MY ORDER",
    dismiss: "No thanks, I'll pay full price later.",
    close: "Close offer",
    guarantee: "Instant digital delivery",
  },
  es: {
    eyebrow: "Oferta Exclusiva por Única Vez",
    headline: "¡ESPERA! No dejes tu primer Mahj sobre la mesa...",
    subheadline:
      "Obtén la Colección COMPLETA de La Llave Maestra a un precio exclusivo por única vez.",
    includes: "Todo lo que incluye:",
    items: [
      {
        title: "La Gran Llave Maestra del Mahjong",
        note: "Guía Principal",
      },
      {
        title: "Las Hojas de Estrategia Visual",
        note: "Bono",
      },
      {
        title: "Las Tarjetas de Referencia de Mesa",
        note: "Bono",
      },
    ],
    savings: "AHORRA 30% AHORA MISMO",
    wasLabel: "Regular",
    nowLabel: "Solo hoy",
    cta: "¡SÍ! MEJORA MI PEDIDO",
    dismiss: "No gracias, pagaré el precio completo después.",
    close: "Cerrar oferta",
    guarantee: "Entrega digital inmediata",
  },
} as const;

const ORIGINAL_PRICE = "$38.00";
const OFFER_PRICE = "$26.55";

interface ExitIntentModalProps {
  /** Language variant for all copy. */
  lang?: "en" | "es";
  /** Shopify cart permalink for the discounted complete collection. */
  ctaHref: string;
  /** Milliseconds of inactivity before the offer appears. Default 10s. */
  idleDelay?: number;
  /** sessionStorage key so the offer only interrupts once per visit. */
  storageKey?: string;
}

export default function ExitIntentModal({
  lang = "en",
  ctaHref,
  idleDelay = 10000,
  storageKey = "mk-exit-offer-seen",
}: ExitIntentModalProps) {
  const t = COPY[lang];
  const [open, setOpen] = useState(false);
  const firedRef = useRef(false);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const trigger = useCallback(() => {
    if (firedRef.current) return;
    try {
      if (sessionStorage.getItem(storageKey) === "1") return;
      sessionStorage.setItem(storageKey, "1");
    } catch {
      /* private mode — still show once per mount */
    }
    firedRef.current = true;
    setOpen(true);
  }, [storageKey]);

  const close = useCallback(() => setOpen(false), []);

  // Fire InitiateCheckout for the upgrade offer, then hand off to Shopify.
  const acceptOffer = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      initiateCheckoutThenGo(ctaHref, {
        content_name:
          lang === "es"
            ? "Colección COMPLETA de La Llave Maestra"
            : "COMPLETE Master-Key Collection",
        content_type: "product",
        content_ids: ["exit-offer-complete-collection"],
        num_items: 3,
        value: 26.55,
        currency: "USD",
      });
    },
    [ctaHref, lang],
  );

  // Exit intent (cursor leaves through the top of the viewport) + idle timeout.
  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "1") {
        firedRef.current = true;
        return;
      }
    } catch {
      /* ignore */
    }

    let idleTimer: number | undefined;
    const resetIdle = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(trigger, idleDelay);
    };

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) trigger();
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") trigger();
    };

    const activity: (keyof DocumentEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "scroll",
      "touchstart",
      "wheel",
    ];
    activity.forEach((evt) =>
      document.addEventListener(evt, resetIdle, { passive: true }),
    );
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("visibilitychange", onVisibility);
    resetIdle();

    return () => {
      window.clearTimeout(idleTimer);
      activity.forEach((evt) => document.removeEventListener(evt, resetIdle));
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [trigger, idleDelay, storageKey]);

  // Lock scroll, focus the CTA, close on Escape.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => ctaRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-offer-headline"
      data-testid="modal-exit-offer"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-ink/70 backdrop-blur-sm modal-fade-in"
        onClick={close}
        data-testid="overlay-exit-offer"
      />

      {/* Card */}
      <div className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl border border-brand-gold/50 bg-brand-cream shadow-2xl modal-pop-in">
        {/* Gold top rule */}
        <div
          className="h-1.5 w-full rounded-t-3xl"
          style={{
            background:
              "linear-gradient(90deg,#C9A961 0%,#E4C776 40%,#B8964A 60%,#C9A961 100%)",
          }}
        />

        <button
          type="button"
          onClick={close}
          aria-label={t.close}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 border border-brand-gold/30 text-brand-ink/60 hover:text-brand-ink hover-elevate active-elevate-2"
          data-testid="button-close-exit-offer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="px-6 pt-7 pb-7 sm:px-9 sm:pt-9 sm:pb-9 text-center">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-semibold mb-4"
            style={{ color: "#B8964A" }}
            data-testid="text-exit-offer-eyebrow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.eyebrow}
          </div>

          <h2
            id="exit-offer-headline"
            className="font-serif text-2xl sm:text-[2rem] font-bold leading-[1.15] text-brand-ink"
            data-testid="text-exit-offer-headline"
          >
            {t.headline}
          </h2>

          <p
            className="mt-3 text-sm sm:text-base text-brand-ink/70 leading-relaxed max-w-md mx-auto"
            data-testid="text-exit-offer-subheadline"
          >
            {t.subheadline}
          </p>

          {/* Offer details */}
          <div className="mt-6 rounded-2xl bg-white border border-brand-gold/25 p-5 sm:p-6 text-left shadow-sm">
            <div className="text-[10px] tracking-[0.24em] uppercase font-semibold text-brand-ink/45 mb-3.5">
              {t.includes}
            </div>
            <ul className="space-y-3">
              {t.items.map((item, i) => (
                <li
                  key={item.title}
                  className="flex items-start gap-3"
                  data-testid={`item-exit-offer-${i}`}
                >
                  <span className="mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-brand-sage/15 border border-brand-sage/40">
                    <Check
                      className="w-3 h-3 text-brand-sage"
                      strokeWidth={3.5}
                    />
                  </span>
                  <span className="text-sm sm:text-[0.95rem] text-brand-ink leading-snug">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-brand-ink/50 font-normal">
                      {" "}
                      ({item.note})
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price comparison */}
          <div className="mt-6 flex items-end justify-center gap-4 sm:gap-5">
            <div className="text-center pb-1.5">
              <div className="text-[10px] tracking-[0.2em] uppercase text-brand-ink/45 mb-1">
                {t.wasLabel}
              </div>
              <div
                className="font-serif text-xl text-brand-ink/45 line-through decoration-brand-orange/70 decoration-2"
                data-testid="text-exit-offer-original-price"
              >
                {ORIGINAL_PRICE}
              </div>
            </div>

            <div
              className="w-px self-stretch my-1"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(201,169,97,0.6), transparent)",
              }}
            />

            <div className="text-center">
              <div className="text-[10px] tracking-[0.2em] uppercase text-brand-ink/45 mb-1">
                {t.nowLabel}
              </div>
              <div
                className="font-serif text-4xl sm:text-5xl font-bold gold-foil leading-none"
                data-testid="text-exit-offer-price"
              >
                {OFFER_PRICE}
              </div>
            </div>
          </div>

          {/* Savings badge */}
          <div
            className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase text-white shadow-sm"
            style={{
              background: "linear-gradient(135deg,#0F7B5F 0%,#12946F 100%)",
            }}
            data-testid="badge-exit-offer-savings"
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.savings}
          </div>

          {/* CTA */}
          <a
            ref={ctaRef}
            href={ctaHref}
            onClick={acceptOffer}
            className="hover-elevate active-elevate-2 mt-6 flex w-full items-center justify-center rounded-full px-6 py-4 text-sm sm:text-base font-bold tracking-wide text-white shadow-lg text-center leading-tight focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
            style={{
              background: "linear-gradient(135deg,#0F7B5F 0%,#12946F 55%,#0F7B5F 100%)",
              boxShadow: "0 10px 30px -8px rgba(15,123,95,0.55)",
            }}
            data-testid="button-accept-exit-offer"
          >
            {t.cta}
          </a>

          <p className="mt-3 text-[11px] text-brand-ink/50">{t.guarantee}</p>

          <button
            type="button"
            onClick={close}
            className="mt-4 text-xs text-brand-ink/45 underline underline-offset-4 hover:text-brand-ink/75 transition"
            data-testid="link-dismiss-exit-offer"
          >
            {t.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
}
