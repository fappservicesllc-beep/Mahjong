import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import LuxuryBuyerTicker from "@/components/LuxuryBuyerTicker";
import { trackViewContent } from "@/lib/pixel";
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
} from "lucide-react";

export default function Home() {
  useEffect(() => {
    trackViewContent({ content_name: "The Grand Mahjong Master-Key" });
  }, []);

  return (
    <div className="min-h-screen cream-bg text-brand-ink">
      <Seo
        title="The Grand Mahjong Master-Key — Go From Nervous Newbie to Confident Player"
        description="Stop being the nervous newbie at the Mahjong table. Master the tiles, the card, and the social etiquette in 48 hours with the Master-Key + 5 Visual Cheat Sheets. Flash sale price $19.95 (regular $37)."
        lang="en"
        path="/english"
        image="/master-key-cover.png"
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
              Regular Price:{" "}
              <span className="line-through opacity-70 font-normal">$37.00</span>
              {" — "}
              <span className="uppercase tracking-wide">Flash Sale Price:</span>{" "}
              <span className="underline underline-offset-4 decoration-white/70 decoration-1">$19.95</span>
              <span className="italic font-normal not-italic ml-1 opacity-90">for a limited time</span>
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
              Stop being the{" "}
              <span className="italic text-brand-orange">"nervous newbie"</span>{" "}
              at the Mahjong table.
            </h1>

            <p
              className="mt-6 text-lg md:text-xl text-brand-ink/75 leading-relaxed max-w-xl"
              data-testid="text-hero-subheadline"
            >
              Go from confused to confident in 48 hours. Master the tiles, the card, and
              the social etiquette — without the fear of a single rookie mistake.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link href="/checkout">
                <Button
                  size="lg"
                  className="hover-elevate active-elevate-2 bg-brand-teal hover:bg-brand-teal text-brand-ink text-sm sm:text-base md:text-lg font-semibold px-5 sm:px-7 py-5 sm:py-6 rounded-full shadow-xl shadow-brand-teal/40 h-auto whitespace-normal text-center leading-tight max-w-full"
                  data-testid="button-hero-cta"
                >
                  YES, I WANT THE MASTER-KEY
                  <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
                </Button>
              </Link>
              <Link href="/espanol">
                <Button
                  size="lg"
                  variant="outline"
                  className="hover-elevate active-elevate-2 bg-transparent border-brand-gold/50 text-brand-ink text-sm sm:text-base font-semibold px-5 sm:px-7 py-5 sm:py-6 rounded-full h-auto whitespace-normal text-center leading-tight max-w-full"
                  data-testid="button-hero-lang"
                >
                  Ver en Español
                </Button>
              </Link>
            </div>
            <p className="mt-3 text-xs text-brand-ink/60 tracking-wide" data-testid="text-hero-cta-sub">
              Instant access · Works on any device
            </p>

            <div className="mt-8 flex items-center gap-6 text-xs text-brand-ink/70">
              <div className="flex items-center gap-1.5" data-testid="badge-hero-rating">
                <div className="flex text-brand-gold">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="font-medium">Loved by 2,400+ hostesses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-brand-sage" />
                <span className="font-medium">Instant PDF access</span>
              </div>
            </div>
          </div>

          {/* Product mockup */}
          <div className="relative max-w-md mx-auto lg:max-w-none lg:mx-0 w-full">
            <div className="absolute -inset-8 bg-gradient-to-br from-brand-pink/30 via-transparent to-brand-orange/20 rounded-[3rem] blur-2xl pointer-events-none" />
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-orange/20 border border-brand-gold/20">
              <img
                src="/product-mockup.png"
                alt="The Grand Mahjong Master-Key ebook shown on iPad and iPhone with luxury Palm Beach styling"
                className="w-full h-auto block"
                data-testid="img-hero-product"
              />
            </div>
            <div className="absolute bottom-2 right-2 md:-bottom-4 md:-right-4 bg-brand-cream border border-brand-gold/40 rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg text-[10px] md:text-xs font-semibold tracking-wider uppercase" data-testid="badge-hero-instant">
              <span className="gold-foil">Instant PDF Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: AGITATION */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
            The Problem
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-ink" data-testid="text-agitation-headline">
            The <span className="italic text-brand-orange">"clack-clack-clack"</span>
            <br className="hidden md:block" /> of a secret code.
          </h2>
          <div className="mt-8 space-y-5 text-lg text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
            <p>
              You hear it every afternoon. The rhythmic sound of ceramic tiles.
              The laughter. The community.
            </p>
            <p>
              You've been invited to the circle, but every time you look at the
              National Mahjongg League card, it reads like a foreign tax document.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 text-left">
            {[
              {
                title: "Throwing Mahjong",
                body: "Discarding the winning tile to an opponent because you didn't read the table.",
              },
              {
                title: "Misidentifying a Tile",
                body: "Calling a bam a crak — and having the entire room go pin-drop silent.",
              },
              {
                title: "Breaking the Charleston",
                body: "Passing in the wrong direction and quietly ruining the game for everyone.",
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
            The result? You stay on the sidelines. You decline the invitations.
            You miss out on the best social currency of the season.
          </p>
        </div>
      </section>

      {/* SECTION 2: REVELATION */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #FBF7F2 0%, #F4B8B0 100%)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              The Revelation
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-ink max-w-3xl mx-auto" data-testid="text-revelation-headline">
              Why standard rulebooks <span className="italic">(and YouTube)</span> fail you.
            </h2>
            <p className="mt-6 text-lg text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
              Most guides are either 400-page academic history books or blurry videos
              that move so fast they skip the "obvious" stuff. They don't teach you the
              social code. They don't teach you how to pivot when your hand falls apart.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-3xl p-8 md:p-12 border border-brand-gold/30 shadow-xl">
            <p className="text-xs tracking-[0.3em] uppercase text-brand-orange font-semibold mb-3">
              Introducing
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold mb-5">
              The Grand Mahjong <span className="gold-foil">Master-Key</span>.
            </h3>
            <p className="text-lg text-brand-ink/80 leading-relaxed mb-6">
              We don't just teach you the rules. We give you a{" "}
              <span className="font-semibold text-brand-orange">Pattern Recognition Engine.</span>{" "}
              Instead of memorizing 152 individual tiles, you'll learn to see{" "}
              <em>Families.</em>
            </p>
            <p className="text-lg text-brand-ink/80 leading-relaxed">
              Once you see the family, the strategy becomes invisible — and your
              confidence becomes unshakable.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT'S INSIDE */}
      <section className="py-20 md:py-28 bg-brand-cream">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              What's Inside
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" data-testid="text-inside-headline">
              Everything you need to <span className="italic text-brand-orange">own the table.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-tr from-brand-sage/20 via-brand-pink/30 to-brand-orange/20 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/30">
                <img
                  src="/product-mockup.png"
                  alt="The Grand Mahjong Master-Key digital book displayed on iPad and iPhone"
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
                  title: "The Master-Key Roadmap",
                  body: "The full foundational guide, available in English or Spanish editions.",
                },
                {
                  icon: Sparkles,
                  emoji: "🃏",
                  title: "The Joker Swap Cheat Sheet",
                  body: "How to steal Jokers from the table legally — and aggressively.",
                },
                {
                  icon: Users,
                  emoji: "💃",
                  title: "The Charleston Dance Map",
                  body: "A visual flow-chart so you never pass in the wrong direction again.",
                },
                {
                  icon: ShieldCheck,
                  emoji: "🚫",
                  title: 'The "Dead Hand" Prevention Guide',
                  body: "The 5 mistakes that get you kicked out of a game — and how to avoid them.",
                },
                {
                  icon: Wine,
                  emoji: "🍸",
                  title: "The Hostess Protocol",
                  body: "How to set the table, manage scoring, and lead the circle with authority.",
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

      {/* SECTION 4: TESTIMONIAL */}
      <section className="py-20 md:py-28 bg-brand-pink text-brand-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
          <TileFlower className="absolute -left-8 top-16 w-40 rotate-[-12deg]" />
          <TileBamboo className="absolute right-6 bottom-8 w-36 rotate-[10deg]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase text-brand-orange">
            Social Proof
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
            "I was the <span className="text-brand-orange">'perpetual spectator'</span> for two years.
            I read Lloyd's guide on a Tuesday, joined my neighborhood game on Thursday,
            and by the second round I was swapping Jokers like I'd been playing for a decade.
            <br />
            <span className="gold-foil not-italic font-semibold">The fear is gone.</span>"
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

      {/* LUXURY BUYER TICKER — social proof from expensive zip codes */}
      <LuxuryBuyerTicker />

      {/* SECTION 5: OFFER */}
      <section className="py-20 md:py-28 marble-bg relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              The No-Brainer Offer
            </div>
            <h2 className="text-3xl md:text-5xl font-bold" data-testid="text-offer-headline">
              Table confidence costs less than{" "}
              <span className="italic text-brand-orange">a single lunch.</span>
            </h2>
            <p className="mt-4 text-lg text-brand-ink/70 max-w-xl mx-auto">
              Mastering this game is a lifetime investment in your social life.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-brand-gold/40 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h3 className="font-serif text-2xl font-bold mb-6 text-center">
                You get everything:
              </h3>

              <ul className="space-y-3 mb-8 max-w-md mx-auto">
                {[
                  { label: "The Master-Key Guide", value: "$97" },
                  { label: "The 5 Visual Cheat Sheets", value: "$47" },
                  { label: "Strategic Glossary", value: "$27" },
                  { label: "Lifetime Updates", value: "Priceless" },
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
                  Flash Sale Price
                </p>
                <p className="text-lg font-serif text-brand-ink/50 line-through -mb-1" data-testid="text-price-regular">
                  $37.00
                </p>
                <p className="font-serif text-6xl md:text-7xl font-bold gold-foil" data-testid="text-price">
                  $19.95
                </p>
                <p className="mt-4 text-sm font-serif italic text-brand-ink/70" data-testid="text-price-warning">
                  Flash sale — for a limited time only. The price goes up soon.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="hover-elevate active-elevate-2 bg-brand-teal hover:bg-brand-teal text-brand-ink text-sm sm:text-base md:text-lg font-semibold px-5 sm:px-8 py-5 sm:py-6 rounded-full shadow-xl shadow-brand-teal/40 h-auto whitespace-normal text-center leading-tight max-w-full"
                    data-testid="button-offer-cta"
                  >
                    GET THE MASTER-KEY & JOIN THE CIRCLE
                    <ArrowRight className="ml-2 w-5 h-5 shrink-0" />
                  </Button>
                </Link>
                <p className="mt-3 text-xs text-brand-ink/60 tracking-wide">
                  Instant download · Works on any device
                </p>
              </div>
            </div>
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
            <a href="#" className="hover:text-brand-ink transition" data-testid="link-footer-terms">Terms</a>
            <a href="#" className="hover:text-brand-ink transition" data-testid="link-footer-privacy">Privacy</a>
            <a href="mailto:hello@luxetilepress.com" className="hover:text-brand-ink transition" data-testid="link-footer-contact">
              Contact
            </a>
          </div>
          <p className="text-xs text-brand-ink/50">
            © {new Date().getFullYear()} Luxe Tile Press. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
