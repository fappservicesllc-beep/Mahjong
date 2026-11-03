import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { trackViewContent } from "@/lib/pixel";
import { TileBamboo, TileDragon, TileFlower } from "@/components/TileMotif";
import {
  BookOpen,
  Sparkles,
  Users,
  ShieldCheck,
  Wine,
  BadgeCheck,
  ArrowRight,
  Check,
} from "lucide-react";

const questions = [
  {
    question: "Is this for complete beginners?",
    answer:
      "Yes. The guide introduces the tiles, reading the card, the Charleston, Jokers, calling tiles, and the flow of a turn. You can work through the foundations before moving on to patterns and choosing a direction.",
  },
  {
    question: "Do I need the official Mahjong card?",
    answer:
      "To play the hands on the current National Mah Jongg League card, you need your own official card. Use this guide alongside it to help understand the groups, symbols, and notes.",
  },
  {
    question: "Is the official 2026 card included?",
    answer:
      "This offer is for the learning guide and reference materials, not the official NMJL card. The guide explains how to approach patterns; it does not reproduce the official card. Obtain your official card separately.",
  },
  {
    question: "Is this a physical product?",
    answer:
      "No. This is a digital product. The book and device images illustrate the material; a printed book, tablet, phone, tiles, and the official card are not part of this offer.",
  },
  {
    question: "How do I receive the guide?",
    answer:
      "Purchase through the existing secure Shopify checkout, then follow the access instructions supplied with your order. If you need help finding your materials, contact hello@luxetilepress.com.",
  },
  {
    question: "Can I use it on my phone or tablet?",
    answer:
      "Yes. The digital material can be viewed on your phone, tablet, or computer, so you can refer back to it while learning.",
  },
  {
    question: "Is this affiliated with the National Mah Jongg League?",
    answer:
      "This is a Luxe Tile Press learning guide, not an official NMJL card or publication. References to NMJL identify the rules and card being discussed; no NMJL endorsement is claimed.",
  },
  {
    question: "How long do I have access?",
    answer:
      "Keep your downloaded materials to refer back to as you learn. For questions about continued access to a previous order, contact hello@luxetilepress.com.",
  },
  {
    question: "Does this include the 2026 Hand Strategies add-on?",
    answer:
      "The core guide introduces card-reading and pattern recognition. The separate 2026 Hand Strategies upgrade is an optional paid offer at checkout; its specialized content is not included in the $19.95 base offer.",
  },
];

export default function Home() {
  useEffect(() => {
    trackViewContent({ content_name: "The Grand Mahjong Master-Key" });
  }, []);

  return (
    <div className="min-h-screen cream-bg text-brand-ink">
      <Seo
        title="The Grand Mahjong Master-Key — American Mahjong, Finally Made Simple"
        description="Understand American Mahjong: the card, Charleston, Jokers, calling tiles, and game flow. A beginner-friendly guide to approaching the 2026 card. Digital access: $19.95."
        lang="en"
        path="/english"
        image="/master-key-cover.png"
      />
      {/* ORIGINAL STICKY BAR — clear offer, no artificial urgency */}
      <div
        className="sticky top-0 z-50 bg-brand-orange text-white border-b border-brand-gold/50 shadow-sm"
        data-testid="bar-urgency"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-5 text-center">
          <p className="font-serif italic text-sm sm:text-base leading-tight">
            <span className="mr-1.5">✦</span>
            <span className="not-italic font-semibold tracking-tight">
              American Mahjong, finally made simple.{" "}
              <span className="underline underline-offset-4 decoration-white/70 decoration-1">
                Digital access — $19.95
              </span>
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
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-pink/40 border border-brand-gold/30 mb-6"
              data-testid="badge-hero-eyebrow"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
              <span className="text-xs font-medium tracking-[0.15em] uppercase text-brand-ink/80">
                American Mahjong for beginners
              </span>
            </div>

            <h1
              className="font-serif text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.08] font-bold text-brand-ink"
              data-testid="text-hero-headline"
            >
              American Mahjong,{" "}
              <span className="italic text-brand-orange">
                finally made simple.
              </span>
            </h1>

            <p
              className="mt-6 text-lg md:text-xl text-brand-ink/75 leading-relaxed max-w-xl"
              data-testid="text-hero-subheadline"
            >
              Understand the game. Read the card. Approach the 2026 hands with
              confidence. A beginner-friendly guide to the Charleston, Jokers,
              calling tiles, and game flow.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link href="/checkout">
                <Button
                  size="lg"
                  className="hover-elevate active-elevate-2 bg-brand-teal hover:bg-brand-teal text-brand-ink text-sm sm:text-base md:text-lg font-semibold px-5 sm:px-7 py-5 sm:py-6 rounded-full shadow-xl shadow-brand-teal/40 h-auto whitespace-normal text-center leading-tight max-w-full"
                  data-testid="button-hero-cta"
                >
                  GET INSTANT ACCESS — $19.95
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
            <p
              className="mt-3 text-xs text-brand-ink/60 tracking-wide"
              data-testid="text-hero-cta-sub"
            >
              Instant digital access · Learn at your own pace
            </p>

            <div className="mt-8 flex items-center gap-6 text-xs text-brand-ink/70">
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="w-3.5 h-3.5 text-brand-sage" />
                <span className="font-medium">
                  Use alongside your own official card
                </span>
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
                width={1254}
                height={1254}
                className="w-full h-auto block"
                data-testid="img-hero-product"
              />
            </div>
            <div
              className="absolute bottom-2 right-2 md:-bottom-4 md:-right-4 bg-brand-cream border border-brand-gold/40 rounded-full px-3 py-1.5 md:px-4 md:py-2 shadow-lg text-[10px] md:text-xs font-semibold tracking-wider uppercase"
              data-testid="badge-hero-instant"
            >
              <span className="gold-foil">Instant Digital Access</span>
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
          <h2
            className="text-3xl md:text-5xl font-bold text-brand-ink"
            data-testid="text-agitation-headline"
          >
            The game isn’t impossible.{" "}
            <span className="italic text-brand-orange">
              It just has a lot of moving parts.
            </span>
          </h2>
          <div className="mt-8 space-y-5 text-lg text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
            <p>
              It’s hard to follow the game when you’re still figuring out the
              card, remembering the passing sequence, and deciding what to
              discard.
            </p>
            <p>
              Start with clear explanations of what the symbols mean, when a
              tile can be called, where Jokers can be used, and what happens
              next.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-5 text-left">
            {[
              {
                title: "Reading the Card",
                body: "Understand the colors, groups, symbols, and notes before choosing a direction.",
              },
              {
                title: "Following a Turn",
                body: "Make sense of drawing, racking, discarding, calling tiles, and exposures.",
              },
              {
                title: "Making the Charleston",
                body: "Know the passing sequence and what to think about before you pass your tiles.",
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
                <h3 className="font-serif text-xl font-semibold mb-2">
                  {fear.title}
                </h3>
                <p className="text-sm text-brand-ink/70 leading-relaxed">
                  {fear.body}
                </p>
              </div>
            ))}
          </div>

          <p
            className="mt-12 text-lg text-brand-ink/80 italic max-w-2xl mx-auto"
            data-testid="text-agitation-conclusion"
          >
            Learn the parts one at a time — then understand how they fit
            together at the table.
          </p>
        </div>
      </section>

      {/* SECTION 2: REVELATION */}
      <section
        className="py-20 md:py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #FBF7F2 0%, #F4B8B0 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              The 2026 Card
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-brand-ink max-w-3xl mx-auto"
              data-testid="text-revelation-headline"
            >
              Playing with the 2026 card?{" "}
              <span className="italic">Make the patterns make sense.</span>
            </h2>
            <p className="mt-6 text-lg text-brand-ink/75 leading-relaxed max-w-2xl mx-auto">
              The Master-Key helps you understand the patterns behind the hands
              instead of trying to memorize the entire card. Learn to interpret
              groups, compare directions, and recognize what your tiles could
              become.
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
              A clear reference for the tiles, the Charleston, Jokers, calling
              tiles, and the normal flow of a game. Learn the foundations, then
              use them to understand the groups and patterns on your current
              card.
            </p>
            <p className="text-lg text-brand-ink/80 leading-relaxed">
              Use your own official NMJL card alongside the guide; the official
              card is not included. Specialized 2026 Hand Strategies remain an
              optional paid upgrade at checkout, separate from the $19.95 base
              offer.
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
            <h2
              className="text-3xl md:text-5xl font-bold"
              data-testid="text-inside-headline"
            >
              What you’ll finally{" "}
              <span className="italic text-brand-orange">understand.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-to-tr from-brand-sage/20 via-brand-pink/30 to-brand-orange/20 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-brand-gold/30">
                <img
                  src="/product-mockup.png"
                  alt="The Grand Mahjong Master-Key digital book displayed on iPad and iPhone"
                  width={1254}
                  height={1254}
                  loading="lazy"
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
                  body: "Understand the tiles, the card, and choosing a direction, with English and Spanish editions available.",
                },
                {
                  icon: Sparkles,
                  emoji: "🃏",
                  title: "The Joker Swap Cheat Sheet",
                  body: "Understand where Jokers can and cannot be used, and how a Joker exchange works.",
                },
                {
                  icon: Users,
                  emoji: "💃",
                  title: "The Charleston Dance Map",
                  body: "Follow the passing sequence and think through the tiles you want to keep.",
                },
                {
                  icon: ShieldCheck,
                  emoji: "🚫",
                  title: 'The "Dead Hand" Prevention Guide',
                  body: "Recognize common mistakes with hands, exposures, and calling tiles.",
                },
                {
                  icon: Wine,
                  emoji: "🍸",
                  title: "The Hostess Protocol",
                  body: "Make sense of table setup, scoring, and the etiquette around a game.",
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

      {/* SECTION 4: ORIGINAL EDITORIAL PANEL — factual audience guidance */}
      <section className="py-20 md:py-28 bg-brand-pink text-brand-ink relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
          <TileFlower className="absolute -left-8 top-16 w-40 rotate-[-12deg]" />
          <TileBamboo className="absolute right-6 bottom-8 w-36 rotate-[10deg]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase text-brand-orange">
            This is for you if…
          </div>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug italic text-brand-ink">
            You want clearer explanations{" "}
            <span className="gold-foil not-italic font-semibold">
              before your next game.
            </span>
          </h2>
          <ul className="mt-8 space-y-4 text-lg text-brand-ink/80 text-left max-w-xl mx-auto">
            {[
              "You’re learning American Mahjong for the first time.",
              "You know the tiles but still lose track of game flow.",
              "The Charleston, Jokers, or calling tiles still feel confusing.",
              "You have the current card but aren’t sure how to interpret it.",
              "You want to feel more prepared before sitting at a real table.",
            ].map((text) => (
              <li key={text} className="flex gap-3">
                <Check className="w-4 h-4 shrink-0 mt-1.5 text-brand-ink/70" />
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SECTION 5: OFFER */}
      <section className="py-20 md:py-28 marble-bg relative">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
              The Master-Key Offer
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold"
              data-testid="text-offer-headline"
            >
              Understand the game.{" "}
              <span className="italic text-brand-orange">
                Enjoy learning to play.
              </span>
            </h2>
            <p className="mt-4 text-lg text-brand-ink/70 max-w-xl mx-auto">
              Learn the rules, understand the flow, and approach the 2026 card
              with more confidence.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-2 border-brand-gold/40 shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h3 className="font-serif text-2xl font-bold mb-6 text-center">
                Your $19.95 includes:
              </h3>

              <ul className="space-y-3 mb-8 max-w-md mx-auto">
                {[
                  {
                    label: "The Master-Key Guide",
                    value: "Beginner foundations",
                  },
                  { label: "Visual Cheat Sheets", value: "Quick references" },
                  { label: "Strategic Glossary", value: "Plain-English terms" },
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
                    <span className="font-serif font-semibold text-brand-ink/70 text-right">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="text-center py-6 border-t border-brand-gold/20">
                <p className="text-sm tracking-[0.2em] uppercase text-brand-orange font-semibold mb-2">
                  Instant Digital Access
                </p>
                <p
                  className="font-serif text-6xl md:text-7xl font-bold gold-foil"
                  data-testid="text-price"
                >
                  $19.95
                </p>
                <p
                  className="mt-4 text-sm font-serif italic text-brand-ink/70"
                  data-testid="text-price-warning"
                >
                  Learn at your own pace. Return to your downloaded references
                  when you need a refresher.
                </p>
              </div>

              <div className="mt-8 flex flex-col items-center">
                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="hover-elevate active-elevate-2 bg-brand-teal hover:bg-brand-teal text-brand-ink text-sm sm:text-base md:text-lg font-semibold px-5 sm:px-8 py-5 sm:py-6 rounded-full shadow-xl shadow-brand-teal/40 h-auto whitespace-normal text-center leading-tight max-w-full"
                    data-testid="button-offer-cta"
                  >
                    GET THE MASTER-KEY — $19.95
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

      {/* Practical FAQs, using the original typography, spacing and card styling. */}
      <section
        className="py-20 md:py-28 bg-brand-cream"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="divider-flourish mb-6 text-xs tracking-[0.3em] uppercase">
            Before you begin
          </div>
          <h2
            id="faq-heading"
            className="text-3xl md:text-5xl font-bold text-center mb-12"
          >
            A few practical{" "}
            <span className="italic text-brand-orange">questions.</span>
          </h2>
          <div className="bg-white rounded-3xl border border-brand-gold/30 shadow-sm px-6 md:px-8">
            {questions.map((item, i) => (
              <details
                key={item.question}
                className="border-b border-brand-gold/20 last:border-0"
                data-testid={`faq-${i}`}
              >
                <summary className="cursor-pointer py-5 font-serif text-lg md:text-xl font-semibold">
                  {item.question}
                </summary>
                <p className="pb-6 text-base text-brand-ink/75 leading-relaxed">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-teal text-brand-ink/80 py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-serif text-2xl text-brand-ink font-bold mb-3">
            Luxe Tile Press
          </p>
          <p className="text-xs tracking-[0.3em] uppercase mb-6 text-brand-ink/70">
            Palm Beach · Madrid · Miami
          </p>
          <div className="flex justify-center gap-6 text-xs mb-6">
            <a
              href="#"
              className="hover:text-brand-ink transition"
              data-testid="link-footer-terms"
            >
              Terms
            </a>
            <a
              href="#"
              className="hover:text-brand-ink transition"
              data-testid="link-footer-privacy"
            >
              Privacy
            </a>
            <a
              href="mailto:hello@luxetilepress.com"
              className="hover:text-brand-ink transition"
              data-testid="link-footer-contact"
            >
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
