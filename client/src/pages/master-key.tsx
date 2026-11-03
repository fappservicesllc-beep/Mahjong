import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Printer,
  List,
  X,
  BookOpen,
  Shuffle,
  Sparkles,
  HeartHandshake,
  Star,
  Target,
  Eye,
  GitBranch,
  Layers,
  Puzzle,
  ShieldAlert,
  ArrowRight,
  Crown,
  CheckCircle2,
  Lightbulb,
  Stethoscope,
  Home as HomeIcon,
} from "lucide-react";

/* ── Tile chip: renders a single Mahjong tile as a small high-contrast chip ─ */

type Suit = "crak" | "dot" | "bam" | "dragon" | "wind" | "flower" | "joker";

const suitColor: Record<Suit, string> = {
  crak: "#C0392B",
  dot: "#D97A2B",
  bam: "#2E7D5B",
  dragon: "#C0392B",
  wind: "#2C3E50",
  flower: "#B8964A",
  joker: "#7A3E9D",
};

function Tile({ label, suit }: { label: string; suit: Suit }) {
  return (
    <span
      className="inline-flex min-w-[2.1rem] flex-col items-center justify-center rounded-md border border-[#E0D6C6] bg-white px-1.5 py-1 text-center shadow-sm"
      style={{ color: suitColor[suit] }}
      data-testid={`tile-${suit}-${label.replace(/\s+/g, "-")}`}
    >
      <span className="font-serif text-sm font-bold leading-none">{label}</span>
    </span>
  );
}

function TileRow({
  tiles,
  className = "",
}: {
  tiles: { label: string; suit: Suit }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {tiles.map((t, i) => (
        <Tile key={`${t.label}-${i}`} label={t.label} suit={t.suit} />
      ))}
    </div>
  );
}

/* ── Small reusable presentational pieces ─────────────────────────── */

function GoldenRuleBox({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="my-6 rounded-xl border-l-4 border-[#C9A961] bg-gradient-to-br from-[#FBF3E4] to-[#FBF7F2] p-5 shadow-sm"
      data-testid={`box-golden-rule-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="mb-1 flex items-center gap-2 text-[#B8964A]">
        <Crown className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>
      <div className="font-serif text-lg leading-snug text-foreground">
        {children}
      </div>
    </div>
  );
}

function AttentionBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-6 rounded-xl border-l-4 border-primary bg-[#FDECE7] p-5 shadow-sm"
      data-testid="box-attention"
    >
      <div className="mb-1 flex items-center gap-2 text-primary">
        <ShieldAlert className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-[0.18em]">
          Attention
        </span>
      </div>
      <div className="text-base leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function InsightBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="my-6 rounded-xl border-l-4 border-[#5FB8B1] bg-[#EEF9F7] p-5 shadow-sm"
      data-testid="box-insight-2026"
    >
      <div className="mb-1 flex items-center gap-2 text-[#2E7D5B]">
        <Lightbulb className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-[0.18em]">
          2026 Insight
        </span>
      </div>
      <div className="text-base leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

function Stars({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5 align-middle">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < count
              ? "fill-[#C9A961] text-[#C9A961]"
              : "fill-none text-[#D8CDBB]"
          }`}
        />
      ))}
    </span>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
}: {
  id: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-24 pt-2">
      <div className="divider-flourish mb-3 text-xs font-semibold uppercase tracking-[0.3em]">
        {eyebrow}
      </div>
      <h2
        className="text-center font-serif text-3xl leading-tight text-[#1F3D34] sm:text-4xl"
        data-testid={`heading-${id}`}
      >
        {title}
      </h2>
    </div>
  );
}

/* A single full chapter block with number, title, body and optional visual */
function Chapter({
  n,
  icon,
  title,
  children,
}: {
  n: number;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-2xl border border-[#EADFCE] bg-white/80 p-6 shadow-sm"
      data-testid={`chapter-${n}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1F3D34] font-serif text-lg font-bold text-[#F4E4C1]">
          {n}
        </span>
        <span className="text-[#C9A961]">{icon}</span>
        <h3 className="font-serif text-xl leading-tight text-[#1F3D34] sm:text-2xl">
          {title}
        </h3>
      </div>
      <div className="space-y-3 text-sm leading-relaxed text-foreground/85 sm:text-base">
        {children}
      </div>
    </div>
  );
}

/* ── Joker CAN / CANNOT table data ────────────────────────────────── */

const jokerCan = [
  "Complete a pung (3 of a kind), kong (4 of a kind), quint (5 of a kind), or sextet where permitted by the rules and the hand.",
  "Increase flexibility while you're still evaluating possible hands.",
  "Help preserve stronger natural tiles for later decisions.",
];
const jokerCannot = [
  "Be used as a singleton when the hand requires a specific tile.",
  "Substitute for a pair if the official hand requires a natural pair.",
  "Replace flowers or any tile the NMJL rules specifically require to be natural.",
  "Be passed during the Charleston under NMJL rules.",
];

/* ── Etiquette Vault (Joker Do's & Don'ts) ────────────────────────── */

const jokerDos = [
  "Build flexibility.",
  "Keep options open.",
  "Track every exposed joker.",
  "Remember who reclaimed a joker.",
  "Think of jokers as strategic resources, not automatic solutions.",
];
const jokerDonts = [
  "Waste a joker early if natural progress is likely.",
  "Assume a joker fixes a weak hand.",
  "Forget that exposing jokers gives opponents information.",
  "Lock yourself into one plan just because you have multiple jokers.",
];

/* ── Rack-score sample data ───────────────────────────────────────── */

const rackScore = [
  { label: "Flowers", stars: 5 },
  { label: "Pairs", stars: 4 },
  { label: "Jokers", stars: 5 },
  { label: "Suit concentration", stars: 3 },
  { label: "Flexibility", stars: 5 },
];

/* ── Joker strategic plays ────────────────────────────────────────── */

const jokerPlays = [
  {
    n: "1",
    name: "The Hidden Joker",
    body: "Sometimes keeping your hand concealed preserves uncertainty and limits the information you reveal.",
  },
  {
    n: "2",
    name: "Natural Before Joker",
    body: "When both options are available, use natural tiles first when doing so preserves flexibility and complies with the hand requirements.",
  },
  {
    n: "3",
    name: "Jokers Create Optionality",
    body: "One joker can support several different potential hands. Treat it like flexibility — not certainty.",
  },
  {
    n: "4",
    name: "Count the Missing Jokers",
    body: "The fewer unseen jokers remain, the more your expectations should adjust. (Use the correct total for the current rules and edition.)",
  },
  {
    n: "5",
    name: "Reading Joker Exposures",
    body: "Every exposed joker provides information. Ask: why did that player expose now? What natural tiles must they already have? What hands become less likely?",
  },
  {
    n: "6",
    name: "Don't Fall in Love With Jokers",
    body: 'Beginners think "I have three jokers." Experts think "I have three flexible decisions."',
  },
];

const anchors = [
  { href: "#reglas", label: "Rules", icon: <BookOpen className="h-4 w-4" /> },
  { href: "#charleston", label: "Charleston", icon: <Shuffle className="h-4 w-4" /> },
  { href: "#jokers", label: "Jokers", icon: <Puzzle className="h-4 w-4" /> },
  { href: "#best-players", label: "Best Players", icon: <Crown className="h-4 w-4" /> },
  { href: "#etiqueta", label: "Etiquette", icon: <HeartHandshake className="h-4 w-4" /> },
];

/* ── Full table of contents (drives the side rail) ────────────────── */
const tocSections = [
  { href: "#reglas", label: "The 12-Step Blueprint" },
  { href: "#fichas", label: "Suit Selection Guide" },
  { href: "#charleston", label: "The Charleston" },
  { href: "#jokers", label: "The Joker Masterclass" },
  { href: "#notes2026", label: "2026 Strategy Notes" },
  { href: "#clinics", label: "Rack Clinics" },
  { href: "#best-players", label: "What the Best Players Do" },
  { href: "#etiqueta", label: "The Etiquette Vault" },
];

/* ── "What the Best Players Do" — 14 secrets + the 80% bonus ───────── */
const bestPlayerSecrets = [
  {
    n: 1,
    title: "Never Play One Hand… Play Two",
    body: "The best players never commit to a single hand during the early turns. Instead, they keep two — or even three — possible hands open while watching what they draw from the wall, what they receive during the Charleston, and what everyone else is discarding.",
    rule: "Don't choose a hand too early. Let the tiles tell you which hand has the highest probability of being completed.",
    track: [],
  },
  {
    n: 2,
    title: 'Count the "Dead" Tiles',
    body: "A hand may look perfect… but it may already be impossible to complete. Great players constantly track what's already out of play. If three of the four 5 Bams you need are already exposed, it may be time to change strategies.",
    rule: "Is my hand still mathematically possible?",
    track: ["Exposed Flowers", "Dragons", "Winds", "Important pairs", "Your key numbers"],
  },
  {
    n: 3,
    title: "Don't Give Away Information",
    body: 'Every discard tells a story. An average player simply gets rid of unwanted tiles. An expert asks: "What am I revealing about my hand?" The less information you give away, the harder it is for opponents to defend against you.',
    rule: "Avoid discarding too early: multiple tiles from the same suit, a complete pair, all your Flowers, or all your Dragons.",
    track: [],
  },
  {
    n: 4,
    title: "The Charleston Wins Games",
    body: "Many players believe Mahjong begins after the Charleston. The best players know the Charleston IS part of the game. Many games are won — or lost — before the very first discard.",
    rule: "The goals of the Charleston: improve efficiency, maintain flexibility, hide your strategy, and gather information about your opponents.",
    track: [],
  },
  {
    n: 5,
    title: "Think Efficiency, Not Beauty",
    body: 'Don\'t keep a tile just because it "looks good." Keep the tile that gives you the greatest number of possibilities. If a 5 Dot appears in four different hands on the card and an 8 Crak appears in only one, the 5 Dot is usually far more valuable strategically.',
    rule: "Which tile keeps the most options open?",
    track: [],
  },
  {
    n: 6,
    title: "Learn When to Abandon a Hand",
    body: "One of the biggest mistakes in Mahjong is falling in love with a hand. Switch when too many key tiles are already exposed, another hand has become much more likely, or you're drawing stronger tiles for a different hand. Changing early is often far more profitable than forcing an almost-impossible hand.",
    rule: "Changing early beats forcing a dead hand.",
    track: [],
  },
  {
    n: 7,
    title: "Watch More Than You Play",
    body: "Mahjong is a game of information. While everyone else focuses only on their own rack, the best players watch what each player picks up, what they never discard, what they call for exposures, and which suit they seem to be avoiding. Often you can predict exactly what an opponent is building.",
    rule: "Read the table, not just your rack.",
    track: [],
  },
  {
    n: 8,
    title: "Jokers Are Accelerators, Not Lifelines",
    body: "Many players waste their Jokers. Great players save them for where they create the greatest value. Never use a Joker too early if there's still a good chance you'll complete that group naturally.",
    rule: "Priority: 🥇 Kong  ·  🥈 Quint  ·  🥉 Sextet",
    track: [],
  },
  {
    n: 9,
    title: "Think Three Turns Ahead",
    body: "Before every discard, ask yourself what you'll do if you draw a White Dragon, if another 5 appears, or if you draw a Joker. The best players always have a plan for their next several draws.",
    rule: "Always have a plan for your next several draws.",
    track: [],
  },
  {
    n: 10,
    title: "The Highest-Value Hand Isn't Always the Best Hand",
    body: "A lower-scoring hand that can be completed much faster often wins more games than a spectacular hand that's nearly impossible to finish. Speed wins more games than ambition.",
    rule: "Which hand can I complete before everyone else?",
    track: [],
  },
  {
    n: 11,
    title: "Play the Odds, Not Your Hopes",
    body: "Great players don't chase the \"perfect\" hand. They chase the hand with the highest probability of being completed. Constantly ask: which tile still has the most copies available? Which combination appears in multiple hands? Which hand gives me the most flexibility if I need to pivot?",
    rule: "Never fall in love with a hand. Fall in love with the odds.",
    track: [],
  },
  {
    n: 12,
    title: "Every Discard Tells a Story",
    body: "Every tile an opponent discards gives you information. Think like a detective. Don't just watch your own rack — learn to read everyone else's invisible rack.",
    rule: "Watch: do they never discard 2s or 6s? Are they holding White Dragons? Did they break up a potential Pung? Did they discard all their Flowers?",
    track: [],
  },
  {
    n: 13,
    title: "Win the Charleston Before the Game Begins",
    body: "Many players think the game starts with the first draw. It doesn't — it starts during the Charleston. The best players use it to eliminate impossible hands, collect tiles that fit multiple categories, gather information about opponents, and prepare to pivot from the very first minute.",
    rule: "The Charleston isn't about getting rid of tiles. It's about creating possibilities.",
    track: [],
  },
  {
    n: 14,
    title: "Know When to Walk Away from a Hand",
    body: "One of the most expensive mistakes in Mahjong is refusing to pivot. Switch when too many White Dragons are exposed, your 2s or 6s are dead, your pair has been discarded, or another hand now has much higher odds. Average players finish the hand they originally chose; great players finish the hand the wall allows them to build.",
    rule: "You don't win by being stubborn. You win by adapting.",
    track: [],
  },
];

export default function MasterKey() {
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    document.title = "The Master-Key Dashboard · Grand Mahjong Master-Key";
  }, []);

  return (
    <div className="marble-bg min-h-screen w-full overflow-x-hidden">
      {/* ── Floating "Contents" button + panel (all screen sizes) ── */}
      <div className="fixed right-4 top-4 z-50 flex flex-col items-end gap-3">
        <button
          onClick={() => setTocOpen((v) => !v)}
          className="hover-elevate active-elevate-2 flex items-center gap-2 rounded-full border border-[#EADFCE] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-xl"
          data-testid="button-toc-toggle"
        >
          {tocOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
          Contents
        </button>
        {tocOpen && (
          <nav
            className="w-64 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-[#EADFCE] bg-white/95 shadow-2xl backdrop-blur-md"
            data-testid="toc-panel"
          >
            <div className="flex items-center justify-between border-b border-[#EFE6D5] bg-[#FBF6EC] px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#B8964A]">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                On this page
              </span>
              <button
                onClick={() => setTocOpen(false)}
                className="hover-elevate active-elevate-2 -mr-1 rounded-md p-1 text-[#1F3D34]"
                aria-label="Close contents"
                data-testid="button-toc-close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="max-h-[60vh] space-y-0.5 overflow-y-auto p-2">
              {tocSections.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    onClick={() => setTocOpen(false)}
                    className="hover-elevate active-elevate-2 block rounded-md px-3 py-2 text-sm leading-snug text-[#1F3D34]"
                    data-testid={`toc-link-${s.href.replace("#", "")}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="relative mx-auto max-w-3xl px-5 pb-8 pt-12 text-center sm:pt-16">
        <div className="divider-flourish mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#B8964A]">
          The Members Dashboard
        </div>
        <img
          src="/master-key-cover.png"
          alt="The Grand Mahjong Master-Key"
          className="mx-auto mb-6 w-40 rounded-2xl shadow-xl ring-1 ring-black/5 sm:w-52"
          data-testid="img-master-key-cover"
        />
        <h1
          className="font-serif text-4xl leading-[1.05] text-[#1F3D34] sm:text-5xl"
          data-testid="heading-hero"
        >
          The Master-Key,
          <span className="block text-primary">at the table.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Your calm, scannable command center. Glance down mid-game, find the
          move, and play with quiet confidence — no scrolling through chapters.
        </p>

        <a
          href="/master-key-card.png"
          download
          className="hover-elevate active-elevate-2 mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#7FD4CE] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0E3B37] shadow-md"
          data-testid="button-download-pdf"
        >
          <Printer className="h-4 w-4" />
          Download printable card
        </a>
      </header>

      {/* ── Printable Master Card preview ────────────────────────── */}
      <section className="mx-auto max-w-4xl px-5 pb-6">
        <div className="rounded-2xl border border-[#EADFCE] bg-white p-4 shadow-md sm:p-6">
          <div className="mb-3 flex flex-col items-center gap-1 text-center">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8964A]">
              The One-Page Master Card
            </div>
            <p className="text-sm text-muted-foreground">
              Every rule at a glance. Print it, laminate it, keep it beside your rack.
            </p>
          </div>
          <a
            href="/master-key-card.png"
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-xl border border-[#E7DECF] ring-1 ring-black/5"
            data-testid="link-card-preview"
          >
            <img
              src="/master-key-card.png"
              alt="The Grand Mahjong Master-Key printable reference card — 15 panels covering anatomy of a hand, reading the card, choosing hands, suit selection, pivoting, Charleston, jokers and quick reference."
              className="w-full"
              loading="lazy"
              data-testid="img-master-card"
            />
          </a>
          <div className="mt-4 flex justify-center">
            <a
              href="/master-key-card.png"
              download
              className="hover-elevate active-elevate-2 inline-flex items-center justify-center gap-2 rounded-full border border-[#E0D6C6] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-[#1F3D34] shadow-sm"
              data-testid="button-download-card"
            >
              <Printer className="h-4 w-4" />
              Download the printable card
            </a>
          </div>
        </div>
      </section>

      {/* ── Sticky anchor nav ────────────────────────────────────── */}
      <nav className="sticky top-0 z-30 border-y border-[#E7DECF] bg-[#FBF7F2]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-2 overflow-x-auto px-3 py-3">
          {anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="hover-elevate active-elevate-2 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#E0D6C6] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#1F3D34]"
              data-testid={`link-anchor-${a.label.toLowerCase()}`}
            >
              {a.icon}
              {a.label}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-5 pb-24">
        {/* ── PART I — THINK LIKE A PLAYER (full chapters) ───────── */}
        <section className="pt-12">
          <SectionHeading
            id="reglas"
            eyebrow="Part I · Think Like a Player"
            title="The 12-Step Blueprint"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            The complete decision path experts run — every chapter, in order.
            Scan the number, read the example, make the move.
          </p>

          <div className="mt-8 space-y-6">
            {/* Chapter 1 */}
            <Chapter n={1} icon={<Layers className="h-5 w-5" />} title="The Rule of Three">
              <p>
                <strong>Big idea:</strong> never choose ONE hand immediately.
                Instead, choose THREE possible hands.
              </p>
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">
                  Example rack
                </div>
                <TileRow
                  tiles={[
                    { label: "🌸", suit: "flower" },
                    { label: "🌸", suit: "flower" },
                    { label: "1B", suit: "bam" },
                    { label: "2B", suit: "bam" },
                    { label: "3B", suit: "bam" },
                    { label: "6D", suit: "dot" },
                    { label: "6D", suit: "dot" },
                    { label: "Red", suit: "dragon" },
                    { label: "Red", suit: "dragon" },
                    { label: "Wht", suit: "dragon" },
                    { label: "Jkr", suit: "joker" },
                    { label: "5C", suit: "crak" },
                    { label: "7C", suit: "crak" },
                  ]}
                />
              </div>
              <p>
                Instead of saying <em>"I'm playing Hand #___,"</em> think in rated
                candidates:
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3 text-center">
                  <div className="font-serif font-bold text-[#1F3D34]">Hand A</div>
                  <Stars count={5} />
                </div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3 text-center">
                  <div className="font-serif font-bold text-[#1F3D34]">Hand B</div>
                  <Stars count={4} />
                </div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3 text-center">
                  <div className="font-serif font-bold text-[#1F3D34]">Hand C</div>
                  <Stars count={3} />
                </div>
              </div>
              <p>
                As the Charleston develops, you <strong>eliminate</strong> hands —
                you don't force one.
              </p>
              <InsightBox>
                Notice how this family of hands can share the same opening tiles.
                Some groups of hands reward flexibility rather than committing
                early — keep the shared openers alive as long as you can.
              </InsightBox>
            </Chapter>

            {/* Chapter 2 */}
            <Chapter n={2} icon={<HeartHandshake className="h-5 w-5" />} title="Why Pairs Are Gold">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">
                  Rack
                </div>
                <TileRow
                  tiles={[
                    { label: "6D", suit: "dot" },
                    { label: "6D", suit: "dot" },
                    { label: "Red", suit: "dragon" },
                    { label: "Red", suit: "dragon" },
                    { label: "🌸", suit: "flower" },
                    { label: "🌸", suit: "flower" },
                  ]}
                />
              </div>
              <p>
                A beginner sees three pairs. An expert sees multiple future
                possibilities. <strong>Pairs keep doors open. Singles close doors.</strong>
              </p>
              <InsightBox>
                Many hands on the current card begin with strong paired
                foundations — protect your pairs early and let them tell you which
                family to lean into.
              </InsightBox>
            </Chapter>

            {/* Chapter 3 */}
            <Chapter n={3} icon={<GitBranch className="h-5 w-5" />} title="Flexibility Beats Commitment">
              <div className="mx-auto flex max-w-sm flex-col items-center gap-1">
                {[
                  { label: "Beginning", val: "8 possible hands", w: "w-full" },
                  { label: "Charleston", val: "5 possible hands", w: "w-4/5" },
                  { label: "Mid Game", val: "2 possible hands", w: "w-2/3" },
                  { label: "End Game", val: "ONE hand", w: "w-1/2" },
                ].map((row, i) => (
                  <div key={row.label} className="flex w-full flex-col items-center">
                    <div
                      className={`${row.w} rounded-lg bg-gradient-to-r from-[#7FD4CE] to-[#5FB8B1] px-4 py-2.5 text-center text-sm font-semibold text-[#0E3B37]`}
                    >
                      <span className="block text-[11px] font-bold uppercase tracking-wide opacity-70">
                        {row.label}
                      </span>
                      {row.val}
                    </div>
                    {i < 3 && <span className="my-1 text-[#C9A961]">↓</span>}
                  </div>
                ))}
              </div>
              <p className="text-center italic text-muted-foreground">
                This is exactly how experienced players think.
              </p>
            </Chapter>

            {/* Chapter 4 */}
            <Chapter n={4} icon={<Star className="h-5 w-5" />} title="Reading Your Rack Like an Expert">
              <p>Instead of counting tiles, <strong>score your rack.</strong></p>
              <div className="rounded-xl border border-[#EADFCE] bg-white p-4" data-testid="card-rack-score">
                <table className="w-full border-collapse text-left">
                  <tbody>
                    {rackScore.map((r) => (
                      <tr key={r.label} className="border-b border-[#F0E8DB] last:border-0">
                        <td className="py-2.5 text-sm font-medium text-foreground">{r.label}</td>
                        <td className="py-2.5 text-right"><Stars count={r.stars} /></td>
                      </tr>
                    ))}
                    <tr className="bg-[#FBF3E4]">
                      <td className="py-3 font-serif text-lg font-bold text-[#1F3D34]">Total</td>
                      <td className="py-3 text-right font-serif text-lg font-bold text-[#B8964A]">20 / 25</td>
                    </tr>
                  </tbody>
                </table>
                <p className="mt-3 text-sm italic text-muted-foreground">Excellent opening rack.</p>
              </div>
            </Chapter>

            {/* Chapter 5 */}
            <Chapter n={5} icon={<Shuffle className="h-5 w-5" />} title="The Charleston Is Information">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">Pass</div>
                <TileRow
                  tiles={[
                    { label: "1B", suit: "bam" },
                    { label: "2B", suit: "bam" },
                    { label: "3B", suit: "bam" },
                  ]}
                />
              </div>
              <p>
                What did everyone learn? Maybe you don't want Bamboo — or maybe
                you're bluffing. <strong>Every pass is a message; send it on purpose.</strong>
              </p>
            </Chapter>

            {/* Chapter 6 */}
            <Chapter n={6} icon={<Eye className="h-5 w-5" />} title="Every Exposure Tells a Story">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">Opponent exposes</div>
                <TileRow
                  tiles={[
                    { label: "4D", suit: "dot" },
                    { label: "4D", suit: "dot" },
                    { label: "4D", suit: "dot" },
                    { label: "4D", suit: "dot" },
                  ]}
                />
              </div>
              <p>
                Ask: what hands become <strong>likely</strong>? What hands become
                {" "}<strong>impossible</strong>? Reading opponents turns their moves
                into your information.
              </p>
            </Chapter>

            {/* Chapter 7 */}
            <Chapter n={7} icon={<GitBranch className="h-5 w-5" />} title="When to Pivot">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">You started with</div>
                <TileRow
                  tiles={[
                    { label: "2", suit: "bam" },
                    { label: "4", suit: "bam" },
                    { label: "6", suit: "bam" },
                    { label: "8", suit: "bam" },
                  ]}
                />
              </div>
              <p>
                Now three critical tiles are gone. Do experts continue? No — they
                {" "}<strong>pivot</strong>. Run the decision checklist:
              </p>
              <ul className="ml-1 space-y-1.5">
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> Are the tiles I need still live in the wall?</li>
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> Has an opponent exposed what I'm chasing?</li>
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> Does another candidate share my remaining tiles?</li>
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> Is the pivot faster to complete than the original?</li>
              </ul>
            </Chapter>

            {/* Chapter 8 */}
            <Chapter n={8} icon={<Target className="h-5 w-5" />} title="Stop Chasing Pretty Hands">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[#F3C7BE] bg-[#FDECE7] p-4">
                  <div className="font-serif font-bold text-[#1F3D34]">Rare hand</div>
                  <div className="mt-1 text-sm">Payout <Stars count={5} /></div>
                  <div className="text-sm">Probability <Stars count={2} /></div>
                </div>
                <div className="rounded-lg border border-[#BEE3DE] bg-[#EEF9F7] p-4">
                  <div className="font-serif font-bold text-[#1F3D34]">Simple hand</div>
                  <div className="mt-1 text-sm">Payout <Stars count={3} /></div>
                  <div className="text-sm">Completion <Stars count={5} /></div>
                </div>
              </div>
              <p><strong>Expected value beats wishful thinking.</strong></p>
            </Chapter>

            {/* Chapter 9 */}
            <Chapter n={9} icon={<Eye className="h-5 w-5" />} title="Reading the Table">
              <div className="space-y-1.5">
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3"><strong>Player A</strong> — many Flowers</div>
                <div className="text-center text-[#C9A961]">↓</div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3"><strong>Player B</strong> — many Dragons</div>
                <div className="text-center text-[#C9A961]">↓</div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3"><strong>Player C</strong> — Bamboo exposure</div>
                <div className="text-center text-[#C9A961]">↓</div>
                <div className="rounded-lg bg-[#1F3D34] p-3 text-center font-serif font-bold text-[#F4E4C1]">Your decision</div>
              </div>
              <p><strong>Observation creates information. Information creates wins.</strong></p>
            </Chapter>

            {/* Chapter 10 */}
            <Chapter n={10} icon={<Target className="h-5 w-5" />} title="Endgame Thinking">
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border border-[#BEE3DE] bg-[#EEF9F7] p-3 text-center"><div className="text-xs font-bold uppercase tracking-wide text-[#2E7D5B]">Early game</div><div className="font-serif text-lg text-[#1F3D34]">Flexible</div></div>
                <div className="rounded-lg border border-[#EADFCE] bg-[#FBF3E4] p-3 text-center"><div className="text-xs font-bold uppercase tracking-wide text-[#B8964A]">Late game</div><div className="font-serif text-lg text-[#1F3D34]">Committed</div></div>
                <div className="rounded-lg border border-[#F3C7BE] bg-[#FDECE7] p-3 text-center"><div className="text-xs font-bold uppercase tracking-wide text-primary">Final turns</div><div className="font-serif text-lg text-[#1F3D34]">Defensive</div></div>
              </div>
            </Chapter>
          </div>
        </section>

        {/* ── SUIT SELECTION TABLE ───────────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="fichas"
            eyebrow="Know Your Tiles"
            title="Suit Selection Guide"
          />
          <img
            src="/tiles-3-colors.png"
            alt="Every Mahjong tile in Craks, Dots and Bams"
            className="mx-auto mt-6 w-full rounded-2xl border border-[#EADFCE] shadow-sm"
            data-testid="img-tile-chart"
          />
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#EADFCE] shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#1F3D34] text-[#F4E4C1]">
                  <th className="px-4 py-3 font-semibold uppercase tracking-wide">Suit</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wide">Color</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wide">Best when…</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#F0E8DB]">
                  <td className="px-4 py-3 font-serif text-lg font-bold text-[#C0392B]">Craks</td>
                  <td className="px-4 py-3">Red</td>
                  <td className="px-4 py-3 text-foreground/80">High Crak concentration in your rack.</td>
                </tr>
                <tr className="border-b border-[#F0E8DB]">
                  <td className="px-4 py-3 font-serif text-lg font-bold text-[#D97A2B]">Dots</td>
                  <td className="px-4 py-3">Orange</td>
                  <td className="px-4 py-3 text-foreground/80">Paired Dots that open several hands.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-serif text-lg font-bold text-[#2E7D5B]">Bams</td>
                  <td className="px-4 py-3">Green</td>
                  <td className="px-4 py-3 text-foreground/80">Strong Bam runs; mixed suits = low flexibility.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CHARLESTON ─────────────────────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="charleston"
            eyebrow="The Ritual Exchange"
            title="Charleston Strategy"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#BEE3DE] bg-[#EEF9F7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-[#2E7D5B]">
                <CheckCircle2 className="h-5 w-5" /> Good Passes
              </div>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li>Pass big blocks (999, 888…) you can't use.</li>
                <li>Pass duplicate winds.</li>
                <li>Pass extra flowers you don't need.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#F3C7BE] bg-[#FDECE7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <ShieldAlert className="h-5 w-5" /> Poor Passes
              </div>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li>Passing pairs you're keeping.</li>
                <li>Passing joker opportunities.</li>
                <li>Passing important dragons.</li>
              </ul>
            </div>
          </div>

          <GoldenRuleBox label="Golden Rule">
            The Charleston is <em>information</em>, not just tile-shuffling. Every
            pass tells the table something — decide what you want it to say.
          </GoldenRuleBox>
        </section>

        {/* ── JOKERS (Special Section) ───────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="jokers"
            eyebrow="Special Section · The Masterclass"
            title="Everything About Jokers"
          />

          {/* CAN / CANNOT */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#BEE3DE] bg-[#EEF9F7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-[#2E7D5B]">
                <CheckCircle2 className="h-5 w-5" /> Jokers CAN
              </div>
              <ul className="space-y-2.5">
                {jokerCan.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-foreground/85">
                    <span className="mt-0.5 shrink-0">✅</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs italic text-muted-foreground">
                Always follow the official NMJL rules for the current year.
              </p>
            </div>
            <div className="rounded-2xl border border-[#F3C7BE] bg-[#FDECE7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <ShieldAlert className="h-5 w-5" /> Jokers CANNOT
              </div>
              <ul className="space-y-2.5">
                {jokerCannot.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-foreground/85">
                    <span className="mt-0.5 shrink-0">❌</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Count-the-jokers visual */}
          <div className="mt-6 rounded-2xl border border-[#EADFCE] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl text-[#1F3D34]">Count the missing jokers</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Seen</div>
                <div className="mt-1 font-mono text-2xl tracking-widest text-[#1F3D34]">■■■■□□□</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Remaining</div>
                <div className="mt-1 font-mono text-2xl tracking-widest text-primary">???</div>
              </div>
            </div>
            <p className="mt-3 text-sm italic text-muted-foreground">
              Use the correct total for the current rules and edition. The fewer
              unseen jokers remain, the more your expectations should adjust.
            </p>
          </div>

          {/* Strategic plays */}
          <h3 className="mt-8 text-center font-serif text-2xl text-[#1F3D34]">
            Six Strategic Joker Plays
          </h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {jokerPlays.map((p) => (
              <div
                key={p.n}
                className="hover-elevate rounded-2xl border border-[#EADFCE] bg-white p-5 shadow-sm"
                data-testid={`card-joker-play-${p.n}`}
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C9A961] text-xs font-bold text-white">
                    {p.n}
                  </span>
                  <span className="font-serif text-lg font-bold text-[#1F3D34]">{p.name}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{p.body}</p>
              </div>
            ))}
          </div>

          <GoldenRuleBox label="Golden Rule">
            Don't fall in love with jokers. Three jokers aren't three tiles — they
            are <strong>three flexible decisions.</strong>
          </GoldenRuleBox>
        </section>

        {/* ── CHAPTER 12 — 2026 STRATEGY NOTES ───────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="notes2026"
            eyebrow="Chapter 12"
            title="2026 Strategy Notes"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            Analysis and examples — never a copy of the official card.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Which styles of hands appear especially common this year.",
              "Which opening tile patterns offer broad flexibility.",
              "Common decision traps players may encounter.",
              "Practical ways to evaluate openings against this year's trends.",
            ].map((t, i) => (
              <div key={i} className="flex gap-3 rounded-2xl border border-[#EADFCE] bg-white p-5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5FB8B1] text-xs font-bold text-white">{i + 1}</span>
                <p className="text-sm leading-relaxed text-foreground/85">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BONUS — RACK CLINICS ───────────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="clinics"
            eyebrow="Bonus"
            title="Rack Clinics"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            Recurring, interactive drills. Each clinic follows the same five-part
            format so you can apply the concepts immediately.
          </p>

          {/* Format explainer */}
          <div className="mt-6 grid gap-2 sm:grid-cols-5">
            {[
              "Your Rack",
              "Three Possible Directions",
              "What an Intermediate Does",
              "What an Expert Is Thinking",
              "Key Takeaway",
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-[#EADFCE] bg-[#FBF3E4] p-3 text-center">
                <div className="font-serif text-lg font-bold text-[#B8964A]">{i + 1}</div>
                <div className="text-xs font-medium text-foreground/80">{s}</div>
              </div>
            ))}
          </div>

          {/* Sample clinic */}
          <div className="mt-8 rounded-2xl border border-[#EADFCE] bg-white p-6 shadow-sm" data-testid="card-rack-clinic">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Stethoscope className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Clinic No. 1</span>
            </div>

            <div className="rounded-lg bg-[#FBF7F2] p-3">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">Your rack</div>
              <TileRow
                tiles={[
                  { label: "🀄", suit: "dragon" },
                  { label: "🀄", suit: "dragon" },
                  { label: "🀅", suit: "bam" },
                  { label: "🀅", suit: "bam" },
                  { label: "2B", suit: "bam" },
                  { label: "3B", suit: "bam" },
                  { label: "4B", suit: "bam" },
                  { label: "6D", suit: "dot" },
                  { label: "6D", suit: "dot" },
                  { label: "Jkr", suit: "joker" },
                  { label: "5C", suit: "crak" },
                  { label: "7C", suit: "crak" },
                  { label: "Nth", suit: "wind" },
                ]}
              />
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/85">
              <p><strong>Possible Direction A:</strong> lean into consecutive-number hands.</p>
              <p><strong>Possible Direction B:</strong> preserve pairs and evaluate another family of hands.</p>
              <div className="rounded-lg border-l-4 border-[#5FB8B1] bg-[#EEF9F7] p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-[#2E7D5B]">Expert thought</div>
                <p className="mt-1 font-serif text-lg text-[#1F3D34]">
                  "I'm not choosing a hand yet — I'm choosing options."
                </p>
              </div>
              <p className="italic text-muted-foreground">
                Key takeaway: recurring clinics turn theory into instinct — apply
                the concept before you ever touch the official card.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT THE BEST PLAYERS DO ───────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="best-players"
            eyebrow="The Inner Game"
            title="What the Best Players Do"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            Fourteen secrets that separate winners from the rest — plus the one
            rule that decides your game before the first discard.
          </p>

          <div className="mt-8 space-y-5">
            {bestPlayerSecrets.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-[#EADFCE] bg-white/80 p-6 shadow-sm"
                data-testid={`secret-${s.n}`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A961] font-serif text-sm font-bold text-white">
                    {s.n}
                  </span>
                  <h3 className="font-serif text-lg leading-tight text-[#1F3D34] sm:text-xl">
                    Secret #{s.n}: {s.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                  {s.body}
                </p>
                {s.track.length > 0 && (
                  <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                    {s.track.map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2E7D5B]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-4 flex items-start gap-2 rounded-lg border-l-4 border-[#7FD4CE] bg-[#EEF9F7] p-3">
                  <Crown className="mt-0.5 h-4 w-4 shrink-0 text-[#0E8079]" />
                  <p className="text-sm font-medium italic text-[#0E3B37]">
                    {s.rule}
                  </p>
                </div>
              </div>
            ))}

            {/* Bonus: the 80% rule */}
            <div
              className="rounded-2xl border-2 border-[#C9A961] bg-gradient-to-br from-[#FBF3E4] to-[#FBF7F2] p-6 shadow-md"
              data-testid="secret-bonus-80"
            >
              <div className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-[#B8964A]">
                💎 Bonus: The 80% Rule
              </div>
              <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                If, after the Charleston, you don't have at least 80% of the key
                tiles for a hand — or a clear path to getting them — start looking
                for a stronger alternative. Expert players make decisions early.
                Beginners wait too long.
              </p>
            </div>
          </div>
        </section>

        {/* ── ETIQUETTE VAULT (Do's & Don'ts) ────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="etiqueta"
            eyebrow="The Social Code"
            title="The Etiquette Vault"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            The joker do's &amp; don'ts that separate a welcome regular from a
            one-time guest.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#BEE3DE] bg-[#EEF9F7] p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-[#2E7D5B]">
                <CheckCircle2 className="h-5 w-5" /> Do
              </div>
              <ul className="space-y-3">
                {jokerDos.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85" data-testid="item-etiquette-do">
                    <span className="mt-0.5 shrink-0">✅</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-[#F3C7BE] bg-[#FDECE7] p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-primary">
                <ShieldAlert className="h-5 w-5" /> Don't
              </div>
              <ul className="space-y-3">
                {jokerDonts.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-foreground/85" data-testid="item-etiquette-dont">
                    <span className="mt-0.5 shrink-0">❌</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#EADFCE] bg-white p-6 text-center shadow-sm" data-testid="card-7-day-promise">
            <Sparkles className="mx-auto mb-2 h-6 w-6 text-[#C9A961]" />
            <h3 className="font-serif text-2xl text-[#1F3D34]">What changes in 7 days</h3>
            <p className="mx-auto mt-2 max-w-lg text-base leading-relaxed text-foreground/80">
              By the end of the week you won't just be "matching tiles." You'll be
              planning your Charleston pass three steps ahead, swapping jokers off
              the table like a pro, and staying in the conversation without missing
              a single discard.
            </p>
          </div>
        </section>

        {/* ── Closing call-to-play ───────────────────────────────── */}
        <section className="mt-16 scroll-mt-24" data-testid="section-ready-to-call">
          <div className="rounded-2xl border border-[#E7C9A0] bg-[#FDF7EF] px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
            <h2
              className="font-serif text-3xl leading-tight text-[#0E3B37] sm:text-4xl"
              data-testid="text-ready-to-call"
            >
              Are you ready to call your first <em className="italic">Mahjong</em>!?
            </h2>
            <figure className="mx-auto mt-8 max-w-2xl">
              <img
                src="/master-key-hand-sample.png"
                alt="Sample winning hand — NN 1111 33 5555 SS, any one suit, North and South only"
                className="w-full rounded-xl shadow-lg ring-1 ring-black/5"
                data-testid="img-hand-sample"
              />
              <figcaption className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                Sample winning hand · Any 1 suit · North and South only
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Footer actions ─────────────────────────────────────── */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <a
            href="/master-key-card.png"
            download
            className="hover-elevate active-elevate-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#7FD4CE] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0E3B37] shadow-md"
            data-testid="button-download-pdf-footer"
          >
            <Printer className="h-4 w-4" />
            Download printable card
          </a>
          <Link
            href="/english"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            data-testid="link-back-home"
          >
            <HomeIcon className="h-4 w-4" />
            Back to home
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
