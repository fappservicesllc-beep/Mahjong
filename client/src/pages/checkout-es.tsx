import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import ExitIntentModal from "@/components/ExitIntentModal";
import { initiateCheckoutThenGo, trackViewContent } from "@/lib/pixel";
import { ArrowLeft, Lock, Check } from "lucide-react";

const BASE_PRICE = 19.95;
const BUMP_PRICE = 8.99;
const BUMP2_PRICE = 8.99;

// Carritos de Shopify para cada combinación de order bumps (checkout en español).
const CART_BASE = "https://www.themodernprotocols.com/cart/48023695392994:1"; // producto único $19.95
const CART_BUMP1 = "http://themodernprotocols.com/cart/48055228498146:1"; // + $8.99 = $28.94
const CART_BUMP2 = "http://themodernprotocols.com/cart/48071890075874:1"; // + $8.99 = $28.94
const CART_BOTH = "http://themodernprotocols.com/cart/48071864156386:1"; // + ambos = $37.93

// Oferta de salida: Colección COMPLETA de La Llave Maestra, 30% off ($38.00 -> $26.55).
const CART_EXIT_OFFER = "https://themodernprotocols.com/cart/48052030767330:1"; // $26.55

export default function CheckoutEs() {
  const [bumpAdded, setBumpAdded] = useState(false);
  const [bump2Added, setBump2Added] = useState(false);

  const total =
    BASE_PRICE + (bumpAdded ? BUMP_PRICE : 0) + (bump2Added ? BUMP2_PRICE : 0);
  const totalLabel = `${total.toFixed(2)}`;

  const handleCheckout = () => {
    // Cero fricción: un clic directo al carrito exacto de Shopify.
    let url = CART_BASE;
    const contents = ["llave-maestra"];
    if (bumpAdded && bump2Added) {
      url = CART_BOTH;
      contents.push("bump-codigos-secretos", "bump-manos-2026");
    } else if (bumpAdded) {
      url = CART_BUMP1;
      contents.push("bump-codigos-secretos");
    } else if (bump2Added) {
      url = CART_BUMP2;
      contents.push("bump-manos-2026");
    }
    // Dispara InitiateCheckout (nunca Purchase — todavía no hay pago) y luego
    // redirige a Shopify, que es el único dueño del evento Purchase.
    initiateCheckoutThenGo(url, {
      content_name: "La Gran Llave Maestra del Mahjong",
      content_type: "product",
      content_ids: contents,
      num_items: contents.length,
      value: Number(total.toFixed(2)),
      currency: "USD",
    });
  };

  useEffect(() => {
    trackViewContent({
      content_name: "La Gran Llave Maestra del Mahjong",
      content_type: "product",
      value: BASE_PRICE,
      currency: "USD",
    });
  }, []);

  return (
    <div className="min-h-screen cream-bg py-8 md:py-12">
      <ExitIntentModal
        lang="es"
        ctaHref={CART_EXIT_OFFER}
        storageKey="mk-exit-offer-es"
      />
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/espanol">
          <button
            className="inline-flex items-center gap-2 text-sm text-brand-ink/70 hover:text-brand-ink mb-8 transition"
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>
        </Link>

        {/* Título — siempre ocupa todo el ancho arriba de las dos columnas */}
        <div className="mb-6">
          <div className="divider-flourish justify-start mb-4 text-xs tracking-[0.3em] uppercase" style={{ color: "#C9A961" }}>
            Resumen del Pedido
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold" data-testid="text-checkout-headline">
            Estás a un paso de <span className="italic text-brand-orange">entrar al círculo.</span>
          </h1>
        </div>

        {/* Móvil: una columna, orden = imagen → bump → detalles → caja de checkout.
            Escritorio (md+): dos columnas. Izquierda = imagen (fila 1) + detalles (fila 2).
            Derecha = order bump (fila 1, misma altura que la imagen) + caja de checkout (fila 2, misma altura que los detalles). */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8 lg:gap-12 md:items-stretch">

          {/* Imagen del producto — columna izquierda, fila 1 */}
          <div className="order-1 md:order-none md:col-start-1 md:row-start-1 flex">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-brand-gold/30 mb-6 md:mb-0 max-w-md md:max-w-none mx-auto md:mx-0 w-full md:h-full">
              <img src="/product-mockup-es.png" alt="La Llave Maestra del Mahjong" className="w-full h-auto md:h-full md:object-cover block" />
            </div>
          </div>

          {/* Solo móvil: CTA justo debajo de la imagen, luego el gancho "¡Espera, hay más!" que
              introduce los order bumps. Oculto en escritorio, donde el CTA vive en la caja de la
              derecha. Usa el mismo handleCheckout — los permalinks no cambian. */}
          <div className="order-2 md:hidden mb-5 max-w-md mx-auto w-full">
            <Button
              type="button"
              onClick={handleCheckout}
              className="hover-elevate active-elevate-2 w-full bg-brand-teal hover:bg-brand-teal text-brand-ink text-base font-semibold py-6 rounded-full h-auto shadow-lg shadow-brand-teal/40 whitespace-normal text-center leading-tight"
              data-testid="button-submit-order-mobile"
            >
              COMPLETAR PEDIDO · {totalLabel}
            </Button>

            <div className="mt-6 text-center">
              <div
                className="divider-flourish justify-center text-xs tracking-[0.3em] uppercase"
                style={{ color: "#C9A961" }}
              >
                ¡Espera, hay más!
              </div>
              <p className="text-sm text-brand-ink/70 mt-3" data-testid="text-wait-theres-more">
                Agrega estas mejoras por única vez a tu pedido aquí abajo.
              </p>
            </div>
          </div>

          {/* Order Bumps — móvil orden 3; escritorio columna derecha, fila 1 (misma altura que la imagen).
              Ambos bumps se apilan verticalmente en la misma celda. */}
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
                  alt="Los Secretos de La Gran Llave Maestra del Mahjong — Cheat Codes"
                  className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg border border-[#d4af37]/40 object-cover shadow-sm"
                  data-testid="img-order-bump"
                />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-serif text-base md:text-lg font-bold text-brand-ink leading-tight">
                      Sí, agrégalo... Los Secretos de La Gran Llave Maestra del Mahjong™
                    </h3>
                    <span className="font-serif font-bold text-[#b8964a] whitespace-nowrap" data-testid="text-bump-price">
                      + $8.99
                    </span>
                  </div>
                  <p className="text-sm text-brand-ink/70 leading-relaxed mt-1.5">
                    Desbloquea el panel interactivo de estrategia privado + los
                    cheat-codes descargables. Tu ventaja definitiva en la mesa.
                  </p>
                </div>
              </div>
            </button>

            {/* Order Bump secundario — mismo tamaño que el primero */}
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
                  alt="Estrategias para las Manos de 2026 — Guía de Estrategia 2026"
                  className="shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg border border-[#d4af37]/40 object-cover shadow-sm"
                  data-testid="img-order-bump-2"
                />
                <div className="min-w-0">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="font-serif text-base md:text-lg font-bold text-brand-ink leading-tight">
                      Estrategias para las Manos de 2026
                    </h3>
                    <span className="font-serif font-bold text-[#b8964a] whitespace-nowrap" data-testid="text-bump-2-price">
                      + $8.99
                    </span>
                  </div>
                  <p className="text-sm text-brand-ink/70 leading-relaxed mt-1.5">
                    Tácticas Especializadas 2026: Deja de adivinar tus jugadas.
                    Aprende cómo juegan los maestros las manos de este año.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Detalles — móvil orden 4; escritorio columna izquierda, fila 2 */}
          <div className="order-4 md:order-none md:col-start-1 md:row-start-2 mt-8 md:mt-8">
            <ul className="space-y-2.5 mb-6">
              {[
                "La Guía Maestra Completa",
                "5 Hojas de Referencia Visual",
                "Glosario Estratégico",
                "Actualizaciones de por Vida",
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

          {/* Caja de checkout — móvil orden 5; escritorio columna derecha, fila 2 (misma altura que los detalles) */}
          <div className="order-5 md:order-none md:col-start-2 md:row-start-2 mt-6 md:mt-8 mb-4 md:mb-0 flex">
            <div className="bg-white rounded-3xl border border-brand-gold/30 shadow-xl p-6 md:p-8 w-full md:h-full flex flex-col justify-center">
              <div className="space-y-4" data-testid="form-checkout">
                <Button
                  type="button"
                  onClick={handleCheckout}
                  className="hover-elevate active-elevate-2 w-full bg-brand-teal hover:bg-brand-teal text-brand-ink text-base font-semibold py-6 rounded-full h-auto shadow-lg shadow-brand-teal/40 whitespace-normal text-center leading-tight"
                  data-testid="button-submit-order"
                >
                  COMPLETAR PEDIDO · {totalLabel}
                </Button>

                <div className="pt-2">
                  <h2 className="font-serif text-2xl font-bold mb-1">Completa tu pedido</h2>
                  <p className="text-sm text-brand-ink/60">
                    Confirma tu selección de arriba y continúa al pago seguro.
                  </p>
                </div>

                <div className="rounded-lg bg-brand-cream border border-brand-gold/25 p-4 text-xs text-brand-ink/70 leading-relaxed">
                  <div className="flex items-center gap-2 mb-1.5 font-semibold text-brand-ink">
                    <Lock className="w-3.5 h-3.5 text-brand-sage" />
                    Acceso inmediato. Pago seguro.
                  </div>
                  <p data-testid="text-checkout-policy">
                    Debido a que este es un producto digital de entrega inmediata, las compras
                    son generalmente definitivas. Si tienes algún problema para acceder a tu
                    compra o consideras que el producto fue sustancialmente diferente a lo
                    descrito, contáctanos y trabajaremos contigo para resolverlo.
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
