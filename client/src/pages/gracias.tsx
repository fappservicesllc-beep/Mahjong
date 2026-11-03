import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

// NOTA: aquí no se dispara Purchase, a propósito.
// El pago ocurre en Shopify, no en esta página — se puede llegar aquí sin
// pagar (enlace directo, botón atrás, recarga), así que disparar Purchase
// reportaría ventas inexistentes. La integración nativa de Shopify con Meta
// dispara Purchase en su propia página de confirmación, tras cobrar el pago.
export default function Gracias() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const email = params.get("email") || "";

  return (
    <div className="min-h-screen marble-bg">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-sage/20 flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-brand-sage" />
          </div>
          <div className="divider-flourish mb-4 text-xs tracking-[0.3em] uppercase">
            Bienvenida al círculo
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4" data-testid="text-thanks-headline">
            Ya estás dentro.{" "}
            <span className="italic text-brand-orange">Bienvenida.</span>
          </h1>
          <p className="text-lg text-brand-ink/75 max-w-xl mx-auto">
            Tu Llave Maestra está desbloqueada.
            {email && (
              <>
                {" "}Enviamos tus copias a{" "}
                <span className="font-semibold text-brand-ink" data-testid="text-thanks-email">{email}</span>.
              </>
            )}
          </p>
        </div>

        <div className="bg-brand-pink text-brand-ink rounded-3xl p-6 md:p-8 text-center border border-brand-gold/30">
          <Mail className="w-8 h-8 mx-auto mb-3 text-brand-orange" />
          <h3 className="font-serif text-xl font-semibold mb-2">Una última cosa.</h3>
          <p className="text-sm text-brand-ink/80 max-w-md mx-auto">
            Revisa tu bandeja de entrada en los próximos minutos para descargar tu
            ebook, junto con un correo de bienvenida y un bono secreto: nuestra
            lista de las 3 manos ganadoras que debes memorizar primero.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/espanol">
            <Button variant="ghost" className="text-brand-ink/70 hover:text-brand-ink" data-testid="button-back-home">
              Volver al inicio <ArrowRight className="ml-1.5 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
