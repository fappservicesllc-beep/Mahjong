import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";
import { trackViewContent } from "@/lib/pixel";
import { TileBamboo, TileFlower } from "@/components/TileMotif";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  Layers,
  Shuffle,
  Sparkles,
  Target,
} from "lucide-react";

const lessons = [
  {
    icon: BookOpen,
    title: "Read the Card",
    body: "Understand what the colors, groups, symbols, and notes are telling you.",
  },
  {
    icon: Shuffle,
    title: "The Charleston",
    body: "Follow the passing sequence and understand what to think about before passing your tiles.",
  },
  {
    icon: Sparkles,
    title: "Jokers",
    body: "Know where Jokers can help you — and where they cannot be used.",
  },
  {
    icon: Layers,
    title: "Calling Tiles",
    body: "Understand when you can claim a discard and when you need to keep drawing.",
  },
  {
    icon: ArrowRight,
    title: "Game Flow",
    body: "Make sense of drawing, racking, discarding, and exposures. Know what happens next.",
  },
  {
    icon: Target,
    title: "Choosing a Direction",
    body: "Recognize patterns in your tiles, compare your options, and narrow your focus.",
  },
];

const included = [
  {
    title: "The Master-Key Guide",
    body: "A step-by-step beginner reference for understanding American Mahjong.",
  },
  {
    title: "Visual Cheat Sheets",
    body: "Quick references to return to while you learn and play.",
  },
  {
    title: "Strategic Glossary",
    body: "Plain-English explanations of common Mahjong terms and concepts.",
  },
];

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

function PurchaseButton({
  children,
  testId,
}: {
  children: React.ReactNode;
  testId: string;
}) {
  // Preserve the existing landing -> /checkout -> exact Shopify permalink flow.
  return (
    <Link href="/checkout">
      <Button
        size="lg"
        className="h-auto min-h-14 w-full sm:w-auto rounded-full bg-brand-teal hover:bg-brand-teal-dark px-6 py-4 text-brand-ink text-sm sm:text-base font-bold whitespace-normal leading-snug shadow-lg shadow-brand-teal/20 focus-visible:ring-2 focus-visible:ring-brand-ink focus-visible:ring-offset-4"
        data-testid={testId}
      >
        {children}
        <ArrowRight className="ml-3 h-4 w-4 shrink-0" aria-hidden="true" />
      </Button>
    </Link>
  );
}

export default function Home() {
  useEffect(() => {
    trackViewContent({ content_name: "The Grand Mahjong Master-Key" });
  }, []);

  return (
    <div
      className="min-h-screen cream-bg text-brand-ink"
      data-testid="landing-v2"
    >
      <Seo
        title="The Grand Mahjong Master-Key — American Mahjong, Finally Made Simple"
        description="A beginner-friendly guide to the card, Charleston, Jokers, calling tiles, and American Mahjong game flow. Understand patterns on the 2026 card. Digital access: $19.95."
        lang="en"
        path="/english"
        image="/product-mockup-800.webp"
      />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:block focus:p-4 focus:bg-white"
      >
        Skip to content
      </a>
      <header className="border-b border-brand-gold/25">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 flex items-center justify-between gap-4">
          <span className="font-serif text-lg sm:text-xl font-semibold tracking-tight">
            Luxe Tile Press
            <span className="text-brand-orange ml-1" aria-hidden="true">
              ✦
            </span>
          </span>
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-6 text-xs sm:text-sm"
          >
            <a
              href="#what-you-learn"
              className="hidden md:block hover:underline underline-offset-4"
            >
              What you’ll learn
            </a>
            <a
              href="#included"
              className="hidden md:block hover:underline underline-offset-4"
            >
              What’s included
            </a>
            <a
              href="#faq"
              className="hidden sm:block hover:underline underline-offset-4"
            >
              FAQ
            </a>
            <Link
              href="/espanol"
              className="underline underline-offset-4 decoration-brand-gold"
              data-testid="button-hero-lang"
            >
              Ver en Español
            </Link>
          </nav>
        </div>
      </header>
      <main id="main-content">
        <section
          className="relative overflow-hidden marble-bg"
          aria-labelledby="hero-heading"
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-10 pb-12 md:py-16 lg:py-20 grid lg:grid-cols-2 gap-9 lg:gap-14 items-center">
            <div className="relative z-10">
              <p
                className="text-[11px] sm:text-xs font-bold tracking-[0.17em] uppercase mb-5"
                data-testid="badge-hero-eyebrow"
              >
                American Mahjong for beginners
              </p>
              <h1
                id="hero-heading"
                className="font-serif text-[2.45rem] sm:text-6xl xl:text-[4.25rem] font-semibold leading-[1.06] max-w-xl"
                data-testid="text-hero-headline"
              >
                AMERICAN MAHJONG,
                <br />
                <span className="italic text-brand-orange">
                  FINALLY MADE SIMPLE.
                </span>
              </h1>
              <p
                className="mt-6 text-xl sm:text-2xl font-serif leading-snug max-w-lg"
                data-testid="text-hero-subheadline"
              >
                Understand the game. Read the card. Play the 2026 hands with
                confidence.
              </p>
              <p className="mt-4 text-base text-brand-ink/80 leading-relaxed max-w-lg">
                A clear, beginner-friendly guide to the tiles, the Charleston,
                Jokers, calling tiles, hand patterns, and the actual flow of
                American Mahjong — without the confusing explanations.
              </p>
              <div className="mt-7">
                <PurchaseButton testId="button-hero-cta">
                  GET INSTANT ACCESS — $19.95
                </PurchaseButton>
              </div>
              <p
                className="mt-3 text-xs sm:text-sm text-brand-ink/75"
                data-testid="text-hero-cta-sub"
              >
                Instant digital access <span aria-hidden="true">·</span> Learn
                at your own pace
              </p>
            </div>
            <figure className="relative max-w-xl mx-auto w-full">
              <div className="rounded-[1.5rem] overflow-hidden border border-brand-gold/30 shadow-xl shadow-brand-orange/10">
                <img
                  src="/product-mockup-800.webp"
                  srcSet="/product-mockup-480.webp 480w, /product-mockup-800.webp 800w, /product-mockup-1200.webp 1200w"
                  sizes="(min-width: 1024px) 46vw, (min-width: 640px) 576px, calc(100vw - 40px)"
                  width={1254}
                  height={1254}
                  fetchPriority="high"
                  decoding="async"
                  alt="The Grand Mahjong Master-Key digital guide shown on a tablet and phone"
                  className="w-full h-auto"
                  data-testid="img-hero-product"
                />
              </div>
              <figcaption className="mt-4 flex justify-between gap-4 text-[11px] sm:text-xs tracking-wide text-brand-ink/70">
                <span>The Grand Mahjong Master-Key</span>
                <span>Digital guide + references</span>
              </figcaption>
            </figure>
          </div>
        </section>

        <section
          className="bg-brand-pink/30 border-y border-brand-gold/25 py-12 sm:py-16"
          aria-labelledby="card-2026-heading"
          data-testid="section-2026"
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.1fr_1fr] gap-9 lg:gap-16 items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase mb-4 text-brand-ink/70">
                Start with the current card
              </p>
              <h2
                id="card-2026-heading"
                className="text-3xl sm:text-4xl font-semibold leading-tight"
              >
                PLAYING WITH
                <br />
                THE <span className="italic text-brand-orange">2026 CARD?</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-ink/80 max-w-xl">
                The Master-Key helps you understand the patterns behind the
                hands instead of trying to memorize the entire card.
              </p>
              <p className="mt-3 text-base leading-relaxed text-brand-ink/80 max-w-xl">
                Learn to interpret groups and symbols, compare possible
                directions, and make sense of your options at the table.
              </p>
              <div className="mt-6">
                <PurchaseButton testId="button-2026-cta">
                  MAKE THE 2026 CARD MAKE SENSE
                </PurchaseButton>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-brand-ink/75">
                Official NMJL card not included. Use your own current card
                alongside the guide.
              </p>
            </div>
            <div className="rounded-2xl bg-brand-cream border border-brand-gold/35 p-6 sm:p-8">
              <p className="font-serif text-xl mb-6">
                A way to read it. A way to think.
              </p>
              {[
                [
                  "01",
                  "Read the groups",
                  "See how colors, numbers, and notes describe a hand.",
                ],
                [
                  "02",
                  "Recognize patterns",
                  "Connect the tiles in your rack to possible directions.",
                ],
                [
                  "03",
                  "Choose your next step",
                  "Use the logic of the card as you draw, pass, and discard.",
                ],
              ].map(([n, title, text]) => (
                <div
                  key={n}
                  className="flex gap-4 py-4 border-t border-brand-gold/20"
                >
                  <span className="font-serif text-xl text-brand-ink/60">
                    {n}
                  </span>
                  <div>
                    <h3 className="font-serif text-lg font-semibold">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-brand-ink/75">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20" aria-labelledby="problem-heading">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-8 lg:gap-20">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-ink/65 mb-4">
                One thing at a time
              </p>
              <h2
                id="problem-heading"
                className="font-serif text-3xl sm:text-4xl font-semibold leading-tight"
              >
                THE GAME ISN’T IMPOSSIBLE.
                <br />
                <span className="italic">
                  IT JUST HAS A LOT OF MOVING PARTS.
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-brand-ink/80">
                It’s hard to follow a game when you’re still figuring out the
                card and trying to remember what happens next. Start by
                understanding the pieces, then put them together.
              </p>
            </div>
            <ul className="space-y-0 border-t border-brand-gold/25">
              {[
                "What do the symbols on the card mean?",
                "What happens during the Charleston?",
                "When can I call a discarded tile?",
                "Where can I use a Joker?",
                "What happens during a normal turn?",
                "Which direction should I pursue?",
              ].map((question, i) => (
                <li
                  key={question}
                  className="flex gap-4 py-4 border-b border-brand-gold/25 text-sm sm:text-base"
                >
                  <span className="font-serif text-brand-ink/60 tabular-nums">
                    0{i + 1}
                  </span>
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="what-you-learn"
          className="scroll-mt-6 bg-white/60 py-14 sm:py-20 border-y border-brand-gold/20"
          aria-labelledby="learn-heading"
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-ink/65 mb-4">
                The foundations, explained
              </p>
              <h2
                id="learn-heading"
                className="text-3xl sm:text-4xl font-semibold"
              >
                WHAT YOU’LL FINALLY{" "}
                <span className="italic text-brand-orange">UNDERSTAND</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lessons.map(({ icon: Icon, title, body }, i) => (
                <article
                  key={title}
                  className="rounded-2xl border border-brand-gold/25 bg-brand-cream p-6"
                  data-testid={`card-lesson-${i}`}
                >
                  <Icon
                    className="h-5 w-5 text-brand-ink/70 mb-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <h3 className="font-serif text-xl font-semibold">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-brand-ink/80">
                    {body}
                  </p>
                </article>
              ))}
            </div>
            <div
              className="mt-4 rounded-2xl bg-brand-teal/20 border border-brand-teal/50 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-8"
              data-testid="card-lesson-2026"
            >
              <p className="font-serif text-2xl shrink-0">The 2026 Hands</p>
              <div>
                <p className="text-sm leading-relaxed text-brand-ink/80">
                  Approach the current card with a foundation in reading hands
                  and recognizing patterns, instead of trying to memorize
                  everything.
                </p>
                <p className="mt-2 text-xs leading-relaxed text-brand-ink/75">
                  Looking for specialized tactics? The separate 2026 Hand
                  Strategies upgrade is an optional paid offer at checkout.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="included"
          className="scroll-mt-6 py-14 sm:py-20 relative overflow-hidden"
          aria-labelledby="included-heading"
        >
          <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.9fr_1fr] gap-9 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="/product-mockup-800.webp"
                srcSet="/product-mockup-480.webp 480w, /product-mockup-800.webp 800w"
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 576px, calc(100vw - 40px)"
                width={1254}
                height={1254}
                loading="lazy"
                decoding="async"
                alt="The Grand Mahjong Master-Key on a tablet and phone, with the existing ivory, coral and teal cover"
                className="rounded-3xl border border-brand-gold/30 shadow-lg w-full h-auto"
                data-testid="img-inside-product"
              />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-ink/65 mb-4">
                What’s included
              </p>
              <h2
                id="included-heading"
                className="text-3xl sm:text-4xl font-semibold"
              >
                YOUR <span className="italic text-brand-orange">$19.95</span>{" "}
                INCLUDES:
              </h2>
              <div className="mt-6">
                {included.map((item, i) => (
                  <div
                    key={item.title}
                    className="flex gap-3 py-5 border-b border-brand-gold/25"
                    data-testid={`row-offer-${i}`}
                  >
                    <Check
                      className="h-4 w-4 shrink-0 mt-1 text-brand-ink/70"
                      aria-hidden="true"
                    />
                    <div>
                      <h3 className="font-serif text-xl font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brand-ink/80">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-relaxed text-brand-ink/75">
                Learn at your own pace and return to your downloaded references
                when you need a refresher.
              </p>
            </div>
          </div>
        </section>

        <section
          className="bg-brand-pink/30 border-y border-brand-gold/20 py-14 sm:py-16 relative overflow-hidden"
          aria-labelledby="for-you-heading"
        >
          <TileFlower className="absolute -right-10 -bottom-16 w-56 opacity-[0.08] pointer-events-none" />
          <div className="relative max-w-5xl mx-auto px-5 sm:px-8 grid lg:grid-cols-[0.7fr_1fr] gap-7 lg:gap-16">
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-ink/65 mb-4">
                A clearer place to start
              </p>
              <h2
                id="for-you-heading"
                className="text-3xl sm:text-4xl font-semibold"
              >
                THIS IS
                <br />
                <span className="italic">FOR YOU IF…</span>
              </h2>
            </div>
            <ul className="space-y-4">
              {[
                "You’re learning American Mahjong for the first time.",
                "You know the tiles but still lose track of the game flow.",
                "The Charleston still feels confusing.",
                "You have the current card but aren’t sure how to interpret it.",
                "You want to feel more prepared before sitting at a real table.",
              ].map((text) => (
                <li
                  key={text}
                  className="flex gap-3 text-sm sm:text-base leading-relaxed"
                >
                  <Check
                    className="w-4 h-4 shrink-0 mt-1 text-brand-ink/65"
                    aria-hidden="true"
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="marble-bg py-14 sm:py-20"
          aria-labelledby="offer-heading"
        >
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <div className="rounded-3xl bg-white/90 border border-brand-gold/40 p-7 sm:p-12 text-center relative overflow-hidden">
              <TileBamboo className="absolute -left-8 -bottom-8 w-32 opacity-[0.07] pointer-events-none" />
              <div className="relative">
                <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-ink/65">
                  The Grand Mahjong Master-Key
                </p>
                <h2
                  id="offer-heading"
                  className="text-3xl sm:text-4xl font-semibold mt-5"
                  data-testid="text-offer-headline"
                >
                  Understand the game.
                  <br />
                  <span className="italic text-brand-orange">
                    Enjoy learning to play.
                  </span>
                </h2>
                <p className="mt-5 max-w-lg mx-auto text-base leading-relaxed text-brand-ink/80">
                  Learn the rules, understand the flow, and approach the 2026
                  card with more confidence.
                </p>
                <p
                  className="font-serif text-6xl sm:text-7xl mt-7 font-semibold"
                  data-testid="text-price"
                >
                  $19.95
                </p>
                <p className="mt-2 text-sm text-brand-ink/70">
                  Instant digital access
                </p>
                <div className="mt-7">
                  <PurchaseButton testId="button-offer-cta">
                    GET THE MASTER-KEY — $19.95
                  </PurchaseButton>
                </div>
                <p className="mt-4 text-xs text-brand-ink/70">
                  Secure checkout through Shopify{" "}
                  <span aria-hidden="true">·</span> Official NMJL card sold
                  separately
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="scroll-mt-6 py-14 sm:py-20 border-t border-brand-gold/20"
          aria-labelledby="faq-heading"
        >
          <div className="max-w-3xl mx-auto px-5 sm:px-8">
            <p className="text-xs font-bold tracking-[0.18em] uppercase text-brand-ink/65 mb-4">
              Before you begin
            </p>
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-semibold mb-8"
            >
              A FEW PRACTICAL <span className="italic">QUESTIONS</span>
            </h2>
            <div className="border-t border-brand-gold/30">
              {questions.map((item, i) => (
                <details
                  key={item.question}
                  className="group border-b border-brand-gold/30"
                  data-testid={`faq-${i}`}
                >
                  <summary className="cursor-pointer list-none flex justify-between gap-5 py-5 font-semibold text-sm sm:text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="w-4 h-4 shrink-0 mt-1 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-6 pr-3 sm:pr-10 text-sm sm:text-base leading-relaxed text-brand-ink/80">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-brand-teal text-brand-ink py-10 sm:py-12">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-7">
          <div>
            <p className="font-serif text-2xl font-semibold">Luxe Tile Press</p>
            <p className="mt-2 text-[10px] sm:text-xs tracking-[0.15em] uppercase">
              Palm Beach · Madrid · Miami
            </p>
          </div>
          <div>
            <nav aria-label="Footer" className="flex gap-6 text-sm">
              <a
                href="#"
                className="underline-offset-4 hover:underline"
                data-testid="link-footer-terms"
              >
                Terms
              </a>
              <a
                href="#"
                className="underline-offset-4 hover:underline"
                data-testid="link-footer-privacy"
              >
                Privacy
              </a>
              <a
                href="mailto:hello@luxetilepress.com"
                className="underline-offset-4 hover:underline"
                data-testid="link-footer-contact"
              >
                Contact
              </a>
            </nav>
            <p className="mt-4 text-xs text-brand-ink/75">
              © {new Date().getFullYear()} Luxe Tile Press. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
