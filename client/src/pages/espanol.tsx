import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import LuxuryBuyerTicker from "@/components/LuxuryBuyerTicker";
import { initiateCheckoutThenGo, trackViewContent } from "@/lib/pixel";
import { TileBamboo, TileDragon, TileFlower } from "@/components/TileMotif";
import {
  BookOpen,
  Sparkles,
  Users,
  ShieldCheck,
  Wine,
  BadgeCheck,
  Star,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

const SPANISH_CHECKOUT_URL = "https://www.themodernprotocols.com/cart/48023695392994:1";

function goToCheckout() {
  // Este CTA salta directo a Shopify, así que dispara InitiateCheckout antes.
  initiateCheckoutThenGo(SPANISH_CHECKOUT_URL, {
    content_name: "La Gran Llave Maestra del Mahjong",
    content_type: "product",
    content_ids: ["llave-maestra"],
    num_items: 1,
    value: 19.95,
    currency: "USD",
  });
}

export default function Espanol() {
  const [, setLocation] = useLocation();
  const goToInternalCheckout = () => setLocation("/checkout-es");

  useEffect(() => {
    trackViewContent({ content_name: "La Gran Llave Maestra del Mahjong" });
  }, []);

  return (
    <div className="min-h-screen cream-bg text-brand-ink">
      <Seo
        title="La Gran Llave Maestra del Mahjong — De Principiante Nerviosa a Jugadora Segura"
        description="Deja de ser la principiante nerviosa en la mesa de Mahjong. Domina las fichas, la tarjeta y la etiqueta social en 48 horas con la Llave Maestra + 5 Guías Visuales. Precio de oferta flash $19.95 (regular $37)."
        lang="es"
        path="/espanol"
        image="/master-key-cover-es.png"
      />
      {/* STICKY URGENCY BAR */}
      <div
        className="sticky top-0 z-50 bg-brand-orange text-white border-b border-brand-gold/50 shadow-sm"
        data-testid="bar-urgency"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-center">
          <p className="font-serif italic text-sm sm:text-base leading-tight">
            <span className="mr-1.5">✦</span>
            <span className="not-italic font-semibold tracking-tight">
              Precio Regular:{" "}
              <span className="line-through opacity-70 font-normal">$37.00</span>
              {" — "}
              <span className="uppercase tracking-wide">Precio de Oferta Flash:</span>{" "}
              <span className="underline underline-offset-4 decoration-white/70 decoration-1">$19.95</span>
              <span className="italic font-normal not-italic ml-1 opacity-90">por tiempo limitado</span>
            </span>
          </p>
        </div>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden marble-bg">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <TileBamboo className="absolute -left-6 top-24 w-24 md:w-32 rotate-[-18deg]" />
          <TileDragon className="absolute right-10 top-40 w-20 md:w-28 rotate-[12deg]" />
          <TileFlower className="absolute left-1/3 bottom-8 w-16 md:w-24 rotate-[8deg] hidden md:block" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-12 md:pt-24 pb-12 md:pb-24 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-pink/40 border border-brand-gold/30 mb-6" data-testid="badge-hero-eyebrow">
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-brand-ink/80">
                Luxe Tile Press · Est. Palm Beach
              </span>
            </div>

            <h1
              className="font-serif text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] font-bold text-brand-ink"
              data-testid="text-hero-headline"
            >
              La Llave Maestra del Mahjong: tu hoja de ruta hacia la{" "}
              <span className="italic text-brand-orange">confianza en la mesa.</span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl text-brand-ink/75 leading-relaxed max-w-xl"
              data-testid="text-hero-subheadline"
            >
              Pasa de ser "La Novata Nerviosa" a "Estratega Experimentada" en 48 horas
              — domina las fichas, las reglas y la etiqueta del Mahjong Americano.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Button
                size="lg"
                onClick={goToInternalCheckout}
                className="hover-elevate active-elevate-2 bg-brand-teal hover:bg-brand-teal text-brand-ink text-sm sm:text-base md:text-lg font-semibold px-5 sm:px-7 py-5 sm:py-6 rounded-full shadow-xl shadow-brand-teal/40 h-auto whitespace-normal text-center leading-tight max-w-full"
                data-testid="button-hero-cta"
              >
                SÍ, QUIERO LA LLAVE MAESTRA — $19.95
                <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
              </Button>
              <Link href="/english">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover-elevate active-elevate-2 bg-transparent border-brand-gold/50 text-brand-ink text-sm sm:text-base font-semibold px-5 sm:px-7 py-5 sm:py-6 rounded-full h-auto whitespace-normal text-center leading-tight max-w-full"
                  data-testid="button-hero-lang"
                >
                  See in English
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-xs text-brand-ink/60 tracking-wide" data-testid="text-hero-cta-sub">
              Acceso inmediato · Funciona en cualquier dispositivo
            </p>

            <div className="mt-8 flex items-center gap-6 text-xs text-brand-ink/70">
              <div className="flex items-center gap-1.5" data-testid="badge-hero-rating">
                <div className="flex text-brand-gold">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-medium">Amada por más de 2.400 anfitrionas</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-brand-sage" />
                <span className="font-medium">Descarga digital inmediata</span>
              </div>
            </div>
          </div>

          {/* Product mockup */}
          <div className="relative max-w-md mx-auto lg:max-w-none lg:mx-0 w-full">
            <div className="absolute -inset-8 bg-gradient-to-br from-brand-pink/30 via-transparent to-brand-orange/20 rounded-[3rem] blur-2xl pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-orange/20 border border-brand-gold/20">
              <img
                src="/product-mockup-es.png"
                alt="La Llave Maestra del Mahjong mostrada en iPad y iPhone con estilo lujoso de Palm Beach"
                className="w-full h-auto block"
                data-testid="img-hero-product"
              />
            </div>
            <div className="absolute bottom-2 right-2 md:-bottom-4 md:-right-4 bg-brand-cream border border-brand-gold/40 rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg text-[10px] md:text-xs font-semibold tracking-wider uppercase" data-testid="badge-hero-instant">
              <span className="gold-foil">Descarga inmediata</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: AGITATION / OPENING HOOK */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
            El Problema
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-ink" data-testid="text-agitation-headline">
            El <span className="italic text-brand-orange">"clac-clac-clac"</span>
            <br className="hidden md:block" /> de un código secreto.
          </h2>
          <div className="mt-8 space-y-5 text-lg text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
            <p>
              La sala se llena con el rítmico clac-clac-clac de las fichas de cerámica.
              Te sientas, con el corazón acelerado, mientras tres jugadoras experimentadas
              te miran.
            </p>
            <p>
              Abres la tarjeta de la National Mahjongg League y parece un documento fiscal
              en un idioma extraño. Quieres jugar. Quieres ser parte del círculo. Pero el
              miedo a cometer un error de "novata" te está dejando al margen.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 text-left">
            {[
              {
                title: "Regalar el Mahjong",
                body: "Descartar la ficha ganadora a una oponente porque no supiste leer la mesa.",
              },
              {
                title: "Confundir una Ficha",
                body: "Llamar a un bam un crak — y que toda la sala quede en silencio absoluto.",
              },
              {
                title: "Romper el Charleston",
                body: "Pasar en la dirección equivocada y arruinar el flujo del juego para todas.",
              },
            ].map((fear, i) => (
              <div
                key={fear.title}
                className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm hover-elevate"
                data-testid={`card-fear-${i}`}
              >
                <div className="w-10 h-10 rounded-full bg-brand-pink/40 flex items-center justify-center mb-4 text-brand-orange font-serif font-bold">
                  {i + 1}
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{fear.title}</h3>
                <p className="text-sm text-brand-ink/70 leading-relaxed">{fear.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-lg text-brand-ink/80 italic max-w-2xl mx-auto" data-testid="text-agitation-conclusion">
            Esa vergüenza es suficiente para hacer que cualquiera quiera rendirse antes de
            haber comenzado. El resultado: te quedas al margen y rechazas las invitaciones.
          </p>
        </div>
      </section>

      {/* SECTION: WHY WHAT YOU TRIED DIDN'T WORK */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FBF7F2 0%, #F4B8B0 100%)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              Por qué no funcionó
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-ink max-w-3xl mx-auto" data-testid="text-revelation-headline">
              Por qué los manuales estándar <span className="italic">(y YouTube)</span> te fallan.
            </h2>
            <p className="mt-6 text-lg text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
              La mayoría de las guías para principiantes son libros académicos de 400 páginas
              o videos que se mueven tan rápido que omiten los conceptos básicos "obvios".
              No te enseñan cómo manejar la presión social de una mesa de alto nivel.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {[
              "Los libros de reglas estándar ignoran la \u201cEtiqueta Social\u201d que realmente gobierna los juegos de alto nivel.",
              "Las guías genéricas a menudo enseñan la versión equivocada (Mahjong Chino Tradicional) en lugar del estilo Americano de los clubes.",
              "Observar \u201cdesde detrás de la silla\u201d es demasiado lento; no aprendes el \u201cpor qué\u201d detrás de cada movimiento.",
              "Intentar \u201cimprovisar\u201d lleva a regalarle el Mahjong a una oponente — un error costoso y evitable.",
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 bg-white/90 backdrop-blur rounded-2xl p-5 border border-brand-gold/25 shadow-sm"
                data-testid={`card-why-${i}`}
              >
                <X className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
                <p className="text-sm text-brand-ink/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: THE UNIQUE MECHANISM */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              El Mecanismo Único
            </div>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-brand-gold/30 shadow-xl">
            <p className="text-xs tracking-[0.3em] uppercase text-brand-orange font-semibold mb-3">
              Te presentamos
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-5">
              El Motor de <span className="gold-foil">Reconocimiento de Patrones Visuales</span> (RPV).
            </h3>
            <p className="text-lg text-brand-ink/80 leading-relaxed mb-6">
              En lugar de memorizar 152 fichas individuales, esta guía te enseña a ver{" "}
              <span className="font-semibold text-brand-orange">"Familias"</span> de fichas.
              Una vez que escaneas la mesa usando el método RPV, el caótico conjunto de
              símbolos se transforma en un mapa estratégico claro.
            </p>
            <p className="text-lg text-brand-ink/80 leading-relaxed">
              Aprenderás a reconocer manos ganadoras en el momento en que recoges tus fichas
              — y tu confianza se vuelve inquebrantable.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT YOU GET */}
      <section className="py-20 md:py-28 marble-bg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              Lo que obtienes
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" data-testid="text-inside-headline">
              Todo lo que necesitas para <span className="italic text-brand-orange">dominar la mesa.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-tr from-brand-sage/20 via-brand-pink/30 to-brand-orange/20 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/30">
                <img
                  src="/product-mockup-es.png"
                  alt="La Llave Maestra del Mahjong en iPad y iPhone"
                  className="w-full h-auto block"
                  data-testid="img-inside-product"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-4">
              {[
                {
                  icon: BookOpen,
                  emoji: "📖",
                  title: "La Guía Digital Completa",
                  body: "Cada regla, excepción y estrategia escrita para la principiante absoluta.",
                },
                {
                  icon: Sparkles,
                  emoji: "🃏",
                  title: "El Glosario Visual de Fichas",
                  body: "Hojas de identificación visual para cada ficha del juego, en alta resolución.",
                },
                {
                  icon: Users,
                  emoji: "💃",
                  title: "El Mapa de la Danza del Charleston",
                  body: "Un diagrama visual paso a paso para dominar el ritual obligatorio de intercambio.",
                },
                {
                  icon: ShieldCheck,
                  emoji: "🃏",
                  title: "El Decodificador de la Tarjeta",
                  body: "Un sistema simplificado para descifrar la tarjeta oficial de la Liga en segundos.",
                },
                {
                  icon: Wine,
                  emoji: "🍸",
                  title: "El Protocolo de Etiqueta Social",
                  body: "Las reglas no escritas de ser anfitriona y jugadora en círculos de alto nivel.",
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex gap-4 bg-white rounded-2xl p-5 border border-brand-gold/20 shadow-sm hover-elevate"
                    data-testid={`card-inside-item-${i}`}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-pink/40 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg font-semibold flex items-center gap-2">
                        <span>{item.emoji}</span>
                        {item.title}
                      </h4>
                      <p className="text-sm text-brand-ink/70 mt-1 leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FOR WHOM / NOT FOR WHOM */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              ¿Es esto para ti?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" data-testid="text-audience-headline">
              Para quién es <span className="italic text-brand-orange">(y para quién no).</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-brand-sage/30 shadow-sm">
              <h3 className="font-serif text-2xl font-semibold mb-5 flex items-center gap-2">
                <Check className="w-5 h-5 text-brand-sage" /> Para quién es
              </h3>
              <ul className="space-y-3">
                {[
                  "Mujeres invitadas a un grupo de Mahjong sin experiencia previa.",
                  "Anfitrionas y socialités que quieren liderar sus propias noches de juego con autoridad.",
                  "Principiantes cansadas de sentirse perdidas cuando el juego se acelera.",
                  "Pensadoras analíticas que aman la estrategia pero quieren un punto de partida claro.",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-brand-ink/80 leading-relaxed" data-testid={`row-for-${i}`}>
                    <Check className="w-4 h-4 text-brand-sage shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-brand-orange/25 shadow-sm">
              <h3 className="font-serif text-2xl font-semibold mb-5 flex items-center gap-2">
                <X className="w-5 h-5 text-brand-orange" /> Para quién no es
              </h3>
              <ul className="space-y-3">
                {[
                  "Jugadoras de torneos profesionales que buscan trucos avanzados de conteo.",
                  "Quienes buscan reglas del \u201cMahjong de Hong Kong\u201d o el \u201cChino Tradicional\u201d.",
                  "Quienes buscan un libro físico (esta es una descarga digital de alta velocidad).",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-brand-ink/70 leading-relaxed" data-testid={`row-notfor-${i}`}>
                    <X className="w-4 h-4 text-brand-orange shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FBF7F2 0%, #F4B8B0 100%)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              Cómo funciona
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" data-testid="text-how-headline">
              De cero a <span className="italic text-brand-orange">lista para jugar.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Lee el capítulo de \u201cAnatomía\u201d para identificar tus fichas en menos de 20 minutos.",
              "Usa el Mapa del Charleston para practicar tu primer \u201cPase\u201d en la comodidad de tu sala.",
              "Guarda la Hoja de Referencia \u201cSin Pánico\u201d en tu teléfono como apoyo discreto durante tu primer juego en vivo.",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur rounded-2xl p-7 border border-brand-gold/25 shadow-sm"
                data-testid={`card-step-${i}`}
              >
                <div className="w-12 h-12 rounded-full bg-brand-orange/15 flex items-center justify-center mb-4 font-serif font-bold text-2xl text-brand-orange">
                  {i + 1}
                </div>
                <p className="text-brand-ink/80 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-center text-lg text-brand-ink/80 italic max-w-3xl mx-auto" data-testid="text-how-proof">
            En 7 días no solo estarás "combinando fichas". Estarás planificando tu pase del
            Charleston tres pasos adelante, intercambiando Comodines como una profesional y
            manteniéndote en la conversación sin perder ni un solo descarte.
          </p>
        </div>
      </section>

      {/* SECTION 4: TESTIMONIAL */}
      <section className="py-20 md:py-28 bg-brand-pink text-brand-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
          <TileFlower className="absolute -left-8 top-16 w-40 rotate-[-12deg]" />
          <TileBamboo className="absolute right-6 bottom-8 w-36 rotate-[10deg]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase text-brand-orange">
            Prueba Social
          </div>
          <div className="flex justify-center text-brand-orange mb-6" data-testid="stars-testimonial">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <blockquote
            className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug italic text-brand-ink"
            data-testid="text-testimonial-quote"
          >
            "Fui la <span className="text-brand-orange">'espectadora perpetua'</span> durante dos años.
            Leí la guía de Lloyd un martes, me uní al juego de mi vecindario el jueves,
            y en la segunda ronda ya intercambiaba Comodines como si llevara una década jugando.
            <br />
            <span className="gold-foil not-italic font-semibold">El miedo desapareció.</span>"
          </blockquote>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-orange to-brand-teal flex items-center justify-center font-serif font-bold text-white text-lg">
              E
            </div>
            <div className="text-left">
              <p className="font-semibold" data-testid="text-testimonial-name">Elena R.</p>
              <p className="text-sm text-brand-ink/70">Madrid · Miami</p>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY BUYER TICKER — localized */}
      <LuxuryBuyerTicker
        copy={{
          eyebrow: "El Círculo Está Creciendo",
          heading: (
            <>
              Nuevas incorporaciones al <span className="italic text-brand-orange">salón de juego.</span>
            </>
          ),
          sub: "Copias de La Llave Maestra entregadas en las últimas horas — desde los Hamptons hasta Mayfair, desde Beverly Hills hasta la Costa Azul.",
          purchasedLabel: "Recién comprado",
        }}
      />

      {/* SECTION 5: OFFER */}
      <section className="py-20 md:py-28 marble-bg relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              La Oferta
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" data-testid="text-offer-headline">
              La confianza en la mesa cuesta menos que{" "}
              <span className="italic text-brand-orange">un solo almuerzo.</span>
            </h2>
            <p className="mt-4 text-lg text-brand-ink/70 max-w-xl mx-auto">
              Dominar este juego es una inversión de por vida en tu vida social.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-brand-gold/40 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h3 className="font-serif text-2xl font-bold mb-6 text-center">
                Obtienes todo esto:
              </h3>

              <ul className="space-y-3 mb-8 max-w-md mx-auto">
                {[
                  { label: "La Guía Completa La Llave Maestra", value: "$97" },
                  { label: "Las 5 Hojas de Referencia Visual", value: "$47" },
                  { label: "El Glosario Estratégico", value: "$27" },
                  { label: "Actualizaciones de por vida", value: "Invaluable" },
                ].map((row, i) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-4 py-3 border-b border-brand-gold/15 last:border-0"
                    data-testid={`row-offer-${i}`}
                  >
                    <div className="flex items-center gap-3">
                      <Check className="w-4 h-4 text-brand-sage shrink-0" />
                      <span className="text-brand-ink/85">{row.label}</span>
                    </div>
                    <span className="font-serif font-semibold text-brand-ink/70">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-center py-6 border-t border-brand-gold/20">
                <p className="text-sm tracking-[0.2em] uppercase text-brand-orange font-semibold mb-2">
                  Precio de Oferta Flash
                </p>
                <p className="text-lg font-serif text-brand-ink/50 line-through -mb-1" data-testid="text-price-regular">
                  $37.00
                </p>
                <p className="font-serif text-6xl md:text-7xl font-bold gold-foil" data-testid="text-price">
                  $19.95
                </p>
                <p className="mt-4 text-sm font-serif italic text-brand-ink/70" data-testid="text-price-warning">
                  Oferta flash — por tiempo limitado. El precio sube pronto.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <Button
                  size="lg"
                  onClick={goToCheckout}
                  className="hover-elevate active-elevate-2 bg-brand-teal hover:bg-brand-teal text-brand-ink text-sm sm:text-base md:text-lg font-semibold px-5 sm:px-8 py-5 sm:py-6 rounded-full shadow-xl shadow-brand-teal/40 h-auto whitespace-normal text-center leading-tight max-w-full"
                  data-testid="button-offer-cta"
                >
                  OBTÉN LA LLAVE MAESTRA AHORA
                  <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
                </Button>
                <p className="mt-3 text-xs text-brand-ink/60 tracking-wide">
                  Entra a tu próximo juego con absoluta confianza.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: FAQ */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              Preguntas Frecuentes
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" data-testid="text-faq-headline">
              Lo que quieres <span className="italic text-brand-orange">saber.</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "¿Está actualizada para las reglas actuales?",
                a: "Sí, todas las estrategias están diseñadas para funcionar perfectamente con los estándares actuales de la National Mahjongg League.",
              },
              {
                q: "¿Necesito tener un juego de Mahjong para usar esta guía?",
                a: "No. El glosario visual es tan detallado que puedes aprender el juego antes de comprar tu primer set.",
              },
              {
                q: "¿Cuánto tiempo lleva terminar la guía?",
                a: "Puedes pasar de cero a \u201cLista para Jugar\u201d en aproximadamente dos horas de lectura enfocada.",
              },
              {
                q: "¿Esta guía es solo para el Mahjong Americano?",
                a: "Sí. Está diseñada específicamente para el estilo de juego de la National Mahjongg League, el más popular en los clubes sociales de los Estados Unidos.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 border border-brand-gold/20 shadow-sm"
                data-testid={`card-faq-${i}`}
              >
                <h3 className="font-serif text-lg font-semibold mb-2 text-brand-ink">{item.q}</h3>
                <p className="text-brand-ink/75 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-teal text-brand-ink/80 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-serif text-2xl text-brand-ink font-bold mb-3">Luxe Tile Press</p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 text-brand-ink/70">
            Palm Beach · Madrid · Miami
          </p>
          <div className="flex justify-center gap-6 text-xs mb-6">
            <a href="#" className="hover:text-brand-ink transition" data-testid="link-footer-terms">Términos</a>
            <a href="#" className="hover:text-brand-ink transition" data-testid="link-footer-privacy">Privacidad</a>
            <a href="mailto:hello@luxetilepress.com" className="hover:text-brand-ink transition" data-testid="link-footer-contact">
              Contacto
            </a>
          </div>
          <p className="text-xs text-brand-ink/50">
            © {new Date().getFullYear()} Luxe Tile Press. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
