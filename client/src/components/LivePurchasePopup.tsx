import { useEffect, useState, useCallback } from "react";
import { MapPin, Check, X } from "lucide-react";

type Sale = {
  name: string;
  location: string;
  initial: string;
  accent: "orange" | "pink" | "teal" | "sage" | "gold";
};

// Buyers from expensive zip codes across the country — nationwide social proof.
const SALES: Sale[] = [
  { name: "Katherine M.", location: "Atherton, CA",         initial: "K", accent: "teal"   },
  { name: "Eleanor R.",   location: "Scarsdale, NY",         initial: "E", accent: "pink"   },
  { name: "Vivian T.",    location: "Highland Park, TX",     initial: "V", accent: "gold"   },
  { name: "Priscilla D.", location: "Palm Beach, FL",        initial: "P", accent: "orange" },
  { name: "Margaret S.",  location: "Winnetka, IL",          initial: "M", accent: "sage"   },
  { name: "Josephine A.", location: "Newport Beach, CA",     initial: "J", accent: "teal"   },
  { name: "Genevieve L.", location: "Greenwich, CT",         initial: "G", accent: "pink"   },
  { name: "Beatrix W.",   location: "Aspen, CO",             initial: "B", accent: "gold"   },
  { name: "Cecilia H.",   location: "Bel Air, CA",           initial: "C", accent: "orange" },
  { name: "Rosalind P.",  location: "Sag Harbor, NY",        initial: "R", accent: "sage"   },
  { name: "Arabella F.",  location: "Ross, CA",              initial: "A", accent: "teal"   },
  { name: "Sylvia N.",    location: "Naples, FL",            initial: "S", accent: "pink"   },
  { name: "Delphine K.",  location: "Rancho Santa Fe, CA",   initial: "D", accent: "gold"   },
  { name: "Camilla O.",   location: "Chevy Chase, MD",       initial: "C", accent: "orange" },
  { name: "Harriet V.",   location: "Wellesley, MA",         initial: "H", accent: "sage"   },
  { name: "Ophelia B.",   location: "Montecito, CA",         initial: "O", accent: "teal"   },
  { name: "Felicity G.",  location: "Darien, CT",            initial: "F", accent: "pink"   },
  { name: "Theodora C.",  location: "Paradise Valley, AZ",   initial: "T", accent: "gold"   },
  { name: "Isadora E.",   location: "Southampton, NY",       initial: "I", accent: "orange" },
  { name: "Lavinia J.",   location: "Hillsborough, CA",      initial: "L", accent: "sage"   },
];

const accentClasses: Record<Sale["accent"], string> = {
  orange: "from-brand-orange to-brand-pink",
  pink:   "from-brand-pink to-brand-gold",
  teal:   "from-brand-teal to-brand-sage",
  sage:   "from-brand-sage to-brand-teal",
  gold:   "from-brand-gold to-brand-orange",
};

const MINUTES = ["2", "4", "6", "3", "8", "5", "7", "9", "just now", "1"];

const COPY = {
  en: {
    got: " just got the Master-Key",
    justNow: "just now",
    minAgo: (m: string) => `${m} min ago`,
    verified: "Verified purchase",
    dismiss: "Dismiss",
  },
  es: {
    got: " acaba de obtener La Llave Maestra",
    justNow: "ahora mismo",
    minAgo: (m: string) => `hace ${m} min`,
    verified: "Compra verificada",
    dismiss: "Cerrar",
  },
} as const;

export default function LivePurchasePopup({ lang = "en" }: { lang?: "en" | "es" }) {
  const t = COPY[lang];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [minutes] = useState(() => Math.floor(Math.random() * MINUTES.length));

  const sale = SALES[index % SALES.length];
  const minsAgo = MINUTES[(index + minutes) % MINUTES.length];

  const showNext = useCallback(() => {
    setVisible(true);
    // Stay on screen for 5.5s, then slide out.
    const hideId = setTimeout(() => setVisible(false), 5500);
    // Advance to the next buyer after it has slid out.
    const advanceId = setTimeout(() => setIndex((i) => i + 1), 6300);
    return () => {
      clearTimeout(hideId);
      clearTimeout(advanceId);
    };
  }, []);

  useEffect(() => {
    if (dismissed) return;
    // First popup appears after a short delay so it doesn't fight the hero.
    const initialDelay = index === 0 ? 4000 : 8000;
    let cleanup: (() => void) | undefined;
    const startId = setTimeout(() => {
      cleanup = showNext();
    }, initialDelay);
    return () => {
      clearTimeout(startId);
      cleanup?.();
    };
  }, [index, dismissed, showNext]);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-[60] transition-all duration-500 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      data-testid="popup-live-purchase"
      aria-live="polite"
    >
      <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-brand-gold/30 shadow-xl shadow-brand-ink/10 pl-3 pr-9 py-3 max-w-[19rem]">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-2 right-2 text-brand-ink/30 hover:text-brand-ink/70 transition-colors"
          aria-label={t.dismiss}
          data-testid="button-dismiss-popup"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        <div
          className={`shrink-0 w-11 h-11 rounded-full bg-gradient-to-br ${accentClasses[sale.accent]} flex items-center justify-center text-white font-serif text-lg font-semibold shadow-inner`}
        >
          {sale.initial}
        </div>

        <div className="min-w-0">
          <p className="text-sm leading-tight text-brand-ink" data-testid="text-popup-name">
            <span className="font-semibold">{sale.name}</span>
            <span className="text-brand-ink/70">{t.got}</span>
          </p>
          <div className="flex items-center gap-1 mt-0.5 text-xs text-brand-ink/55">
            <MapPin className="w-3 h-3 text-brand-orange shrink-0" />
            <span className="truncate">{sale.location}</span>
            <span className="mx-1 opacity-40">·</span>
            <span className="whitespace-nowrap">
              {minsAgo === "just now" ? t.justNow : t.minAgo(minsAgo)}
            </span>
          </div>
          <div className="flex items-center gap-1 mt-1 text-[11px] text-brand-sage font-medium">
            <Check className="w-3 h-3 shrink-0" />
            <span>{t.verified}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
