import { MapPin, Check } from "lucide-react";

type Buyer = {
  name: string;
  location: string;
  zip: string;
  when: string;
  initial: string;
  accent: "orange" | "pink" | "teal" | "sage" | "gold";
};

// Real luxury zip codes, curated for the Palm Beach / Hamptons / Mayfair set.
const BUYERS: Buyer[] = [
  { name: "Vivienne A.",   location: "East Hampton, NY",   zip: "11937", when: "3 min ago",  initial: "V", accent: "orange" },
  { name: "Charlotte P.",  location: "West Palm Beach, FL", zip: "33480", when: "7 min ago",  initial: "C", accent: "pink"   },
  { name: "Isabelle W.",   location: "Beverly Hills, CA",  zip: "90210", when: "12 min ago", initial: "I", accent: "gold"   },
  { name: "Arabella M.",   location: "Mayfair, London",    zip: "W1K",   when: "18 min ago", initial: "A", accent: "teal"   },
  { name: "Georgina L.",   location: "Southampton, NY",    zip: "11968", when: "22 min ago", initial: "G", accent: "sage"   },
  { name: "Constance H.",  location: "Aspen, CO",          zip: "81611", when: "29 min ago", initial: "C", accent: "orange" },
  { name: "Penelope V.",   location: "Greenwich, CT",      zip: "06830", when: "34 min ago", initial: "P", accent: "pink"   },
  { name: "Margaux D.",    location: "Monaco",             zip: "98000", when: "41 min ago", initial: "M", accent: "gold"   },
  { name: "Fiona S.",      location: "Nantucket, MA",      zip: "02554", when: "48 min ago", initial: "F", accent: "teal"   },
  { name: "Beatrice K.",   location: "Bel Air, CA",        zip: "90077", when: "56 min ago", initial: "B", accent: "sage"   },
  { name: "Camille R.",    location: "Chelsea, London",    zip: "SW3",   when: "1 hr ago",   initial: "C", accent: "orange" },
  { name: "Adelaide F.",   location: "Palm Beach, FL",     zip: "33480", when: "1 hr ago",   initial: "A", accent: "pink"   },
  { name: "Seraphina T.",  location: "Saint-Tropez",       zip: "83990", when: "1 hr ago",   initial: "S", accent: "gold"   },
  { name: "Marguerite O.", location: "Martha's Vineyard",  zip: "02539", when: "2 hrs ago",  initial: "M", accent: "teal"   },
  { name: "Anastasia B.",  location: "Notting Hill, London", zip: "W11", when: "2 hrs ago",  initial: "A", accent: "sage"   },
  { name: "Cordelia N.",   location: "Malibu, CA",         zip: "90265", when: "2 hrs ago",  initial: "C", accent: "orange" },
];

const accentClasses: Record<Buyer["accent"], { bg: string; ring: string }> = {
  orange: { bg: "from-brand-orange to-brand-pink",    ring: "ring-brand-orange/30" },
  pink:   { bg: "from-brand-pink to-brand-gold",      ring: "ring-brand-pink/40" },
  teal:   { bg: "from-brand-teal to-brand-sage",      ring: "ring-brand-teal/40" },
  sage:   { bg: "from-brand-sage to-brand-teal",      ring: "ring-brand-sage/30" },
  gold:   { bg: "from-brand-gold to-brand-orange",    ring: "ring-brand-gold/40" },
};

function BuyerCard({ buyer, purchasedLabel }: { buyer: Buyer; purchasedLabel: string }) {
  const a = accentClasses[buyer.accent];
  return (
    <div
      className={`shrink-0 w-[280px] sm:w-[320px] bg-white rounded-2xl border border-brand-gold/25 shadow-sm px-5 py-4 flex items-center gap-4 hover-elevate`}
      data-testid={`card-buyer-${buyer.zip}`}
    >
      <div className={`shrink-0 w-11 h-11 rounded-full bg-gradient-to-br ${a.bg} ring-2 ${a.ring} flex items-center justify-center font-serif text-white font-semibold text-lg`}>
        {buyer.initial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="font-serif font-semibold text-brand-ink truncate">{buyer.name}</p>
          <Check className="w-3.5 h-3.5 text-brand-sage shrink-0" />
        </div>
        <p className="text-xs text-brand-ink/60 flex items-center gap-1 mt-0.5">
          <MapPin className="w-3 h-3 shrink-0 text-brand-orange" />
          <span className="truncate">{buyer.location}</span>
          <span className="opacity-50 mx-1">·</span>
          <span className="font-mono tracking-tight text-brand-ink/50">{buyer.zip}</span>
        </p>
        <p className="text-[11px] tracking-[0.14em] uppercase text-brand-ink/50 mt-1">
          {purchasedLabel} · {buyer.when}
        </p>
      </div>
    </div>
  );
}

type TickerCopy = {
  eyebrow: string;
  heading: React.ReactNode;
  sub: string;
  purchasedLabel: string;
};

const DEFAULT_COPY: TickerCopy = {
  eyebrow: "The Circle Is Growing",
  heading: (
    <>
      Recent additions to <span className="italic text-brand-orange">the drawing room.</span>
    </>
  ),
  sub: "Copies of the Master-Key delivered in the last few hours — from the Hamptons to Mayfair, from Beverly Hills to the Côte d'Azur.",
  purchasedLabel: "Just purchased",
};

export default function LuxuryBuyerTicker({ copy = DEFAULT_COPY }: { copy?: TickerCopy }) {
  // Duplicate the list so the marquee loops seamlessly.
  const doubled = [...BUYERS, ...BUYERS];

  return (
    <section className="py-16 md:py-20 bg-brand-cream border-y border-brand-gold/20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <div className="divider-flourish mb-5 text-xs tracking-[0.3em] uppercase">
          {copy.eyebrow}
        </div>
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-ink" data-testid="text-buyers-headline">
          {copy.heading}
        </h2>
        <p className="mt-4 text-base md:text-lg text-brand-ink/70 max-w-2xl mx-auto">
          {copy.sub}
        </p>
      </div>

      {/* Marquee row 1 */}
      <div
        className="relative"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-4 marquee-track" data-testid="ticker-row-1">
          {doubled.map((b, i) => (
            <BuyerCard key={`row1-${i}`} buyer={b} purchasedLabel={copy.purchasedLabel} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 — reversed direction for visual richness */}
      <div
        className="relative mt-4"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-4 marquee-track-reverse" data-testid="ticker-row-2">
          {[...doubled].reverse().map((b, i) => (
            <BuyerCard key={`row2-${i}`} buyer={b} purchasedLabel={copy.purchasedLabel} />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs tracking-[0.22em] uppercase text-brand-ink/50">
        <span>The Hamptons</span>
        <span className="text-brand-gold">✦</span>
        <span>West Palm Beach</span>
        <span className="text-brand-gold">✦</span>
        <span>Beverly Hills</span>
        <span className="text-brand-gold">✦</span>
        <span>Mayfair</span>
        <span className="text-brand-gold">✦</span>
        <span>Aspen</span>
        <span className="text-brand-gold">✦</span>
        <span>Monaco</span>
      </div>
    </section>
  );
}
