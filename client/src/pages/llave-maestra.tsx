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

/* ── Ficha: renderiza una sola ficha de Mahjong como chip de alto contraste ─ */

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

/* ── Piezas presentacionales reutilizables ────────────────────────── */

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
          Atención
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
          Perspectiva 2026
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

/* Bloque completo de un capítulo con número, título, cuerpo y visual opcional */
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

/* ── Tabla PUEDE / NO PUEDE de los jokers ──────────────────────────── */

const jokerCan = [
  "Completar un pung (3 iguales), kong (4 iguales), quint (5 iguales) o sextet donde lo permitan las reglas y la mano.",
  "Aumentar tu flexibilidad mientras aún evalúas las manos posibles.",
  "Ayudar a preservar fichas naturales más fuertes para decisiones posteriores.",
];
const jokerCannot = [
  "Usarse como ficha suelta cuando la mano requiere una ficha específica.",
  "Sustituir un par si la mano oficial exige un par natural.",
  "Reemplazar flores o cualquier ficha que las reglas NMJL exijan que sea natural.",
  "Pasarse durante el Charleston bajo las reglas NMJL.",
];

/* ── Etiquette Vault (Do's & Don'ts de jokers) ────────────────────── */

const jokerDos = [
  "Construye flexibilidad.",
  "Mantén las opciones abiertas.",
  "Rastrea cada joker expuesto.",
  "Recuerda quién recuperó un joker.",
  "Piensa en los jokers como recursos estratégicos, no como soluciones automáticas.",
];
const jokerDonts = [
  "Desperdiciar un joker temprano si es probable el progreso natural.",
  "Suponer que un joker arregla una mano débil.",
  "Olvidar que exponer jokers le da información a tus oponentes.",
  "Encerrarte en un solo plan solo porque tienes varios jokers.",
];

/* ── Datos de ejemplo de puntuación de rack ───────────────────────── */

const rackScore = [
  { label: "Flores", stars: 5 },
  { label: "Pares", stars: 4 },
  { label: "Jokers", stars: 5 },
  { label: "Concentración de palo", stars: 3 },
  { label: "Flexibilidad", stars: 5 },
];

/* ── Jugadas estratégicas de jokers ───────────────────────────────── */

const jokerPlays = [
  {
    n: "1",
    name: "El Joker Oculto",
    body: "A veces, mantener tu mano oculta preserva la incertidumbre y limita la información que revelas.",
  },
  {
    n: "2",
    name: "Natural Antes que Joker",
    body: "Cuando ambas opciones estén disponibles, usa primero las fichas naturales cuando eso preserve la flexibilidad y cumpla con los requisitos de la mano.",
  },
  {
    n: "3",
    name: "Los Jokers Crean Opciones",
    body: "Un solo joker puede sostener varias manos potenciales distintas. Trátalo como flexibilidad, no como certeza.",
  },
  {
    n: "4",
    name: "Cuenta los Jokers Faltantes",
    body: "Cuantos menos jokers sin ver queden, más debes ajustar tus expectativas. (Usa el total correcto según las reglas y la edición vigentes.)",
  },
  {
    n: "5",
    name: "Leer las Exposiciones de Jokers",
    body: "Cada joker expuesto ofrece información. Pregúntate: ¿por qué expuso ese jugador ahora? ¿Qué fichas naturales debe tener ya? ¿Qué manos se vuelven menos probables?",
  },
  {
    n: "6",
    name: "No te Enamores de los Jokers",
    body: 'Los principiantes piensan "tengo tres jokers." Los expertos piensan "tengo tres decisiones flexibles."',
  },
];

const anchors = [
  { href: "#reglas", label: "Reglas", icon: <BookOpen className="h-4 w-4" /> },
  { href: "#charleston", label: "Charleston", icon: <Shuffle className="h-4 w-4" /> },
  { href: "#jokers", label: "Jokers", icon: <Puzzle className="h-4 w-4" /> },
  { href: "#best-players", label: "Los Mejores", icon: <Crown className="h-4 w-4" /> },
  { href: "#etiqueta", label: "Etiqueta", icon: <HeartHandshake className="h-4 w-4" /> },
];

/* ── Índice completo (alimenta el panel lateral) ──────────────────── */
const tocSections = [
  { href: "#reglas", label: "El Plano de 12 Pasos" },
  { href: "#fichas", label: "Guía de Selección de Palo" },
  { href: "#charleston", label: "El Charleston" },
  { href: "#jokers", label: "La Clase Magistral del Joker" },
  { href: "#notes2026", label: "Notas Estratégicas 2026" },
  { href: "#clinics", label: "Clínicas de Rack" },
  { href: "#best-players", label: "Lo Que Hacen los Mejores" },
  { href: "#etiqueta", label: "La Bóveda de la Etiqueta" },
];

/* ── "Lo Que Hacen los Mejores" — 14 secretos + el bono del 80% ──── */
const bestPlayerSecrets = [
  {
    n: 1,
    title: "Nunca Juegues Una Sola Mano… Juega Dos",
    body: "Los mejores jugadores nunca se comprometen con una sola mano en los primeros turnos. En cambio, mantienen dos —o incluso tres— manos posibles abiertas mientras observan qué sacan de la muralla, qué reciben durante el Charleston y qué está descartando todo el mundo.",
    rule: "No elijas una mano demasiado pronto. Deja que las fichas te digan qué mano tiene la mayor probabilidad de completarse.",
    track: [],
  },
  {
    n: 2,
    title: 'Cuenta las Fichas "Muertas"',
    body: "Una mano puede verse perfecta… pero quizás ya sea imposible de completar. Los grandes jugadores rastrean constantemente lo que ya está fuera de juego. Si tres de los cuatro 5 Bam que necesitas ya están expuestos, quizás sea hora de cambiar de estrategia.",
    rule: "¿Sigue siendo mi mano matemáticamente posible?",
    track: ["Flores expuestas", "Dragones", "Vientos", "Pares importantes", "Tus números clave"],
  },
  {
    n: 3,
    title: "No Reveles Información",
    body: 'Cada descarte cuenta una historia. Un jugador promedio simplemente se deshace de las fichas que no quiere. Un experto se pregunta: "¿Qué estoy revelando sobre mi mano?" Cuanta menos información des, más difícil será para tus oponentes defenderse de ti.',
    rule: "Evita descartar demasiado pronto: varias fichas del mismo palo, un par completo, todas tus Flores o todos tus Dragones.",
    track: [],
  },
  {
    n: 4,
    title: "El Charleston Gana Partidas",
    body: "Muchos jugadores creen que el Mahjong empieza después del Charleston. Los mejores saben que el Charleston ES parte del juego. Muchas partidas se ganan —o se pierden— antes del primer descarte.",
    rule: "Los objetivos del Charleston: mejorar la eficiencia, mantener la flexibilidad, ocultar tu estrategia y recopilar información sobre tus oponentes.",
    track: [],
  },
  {
    n: 5,
    title: "Piensa en Eficiencia, No en Belleza",
    body: 'No conserves una ficha solo porque "se ve bien." Conserva la ficha que te dé el mayor número de posibilidades. Si un 5 Dot aparece en cuatro manos distintas de la tarjeta y un 8 Crak aparece en solo una, el 5 Dot suele ser mucho más valioso estratégicamente.',
    rule: "¿Qué ficha mantiene abiertas más opciones?",
    track: [],
  },
  {
    n: 6,
    title: "Aprende Cuándo Abandonar una Mano",
    body: "Uno de los mayores errores en el Mahjong es enamorarte de una mano. Cambia cuando demasiadas fichas clave ya estén expuestas, cuando otra mano se haya vuelto mucho más probable, o cuando estés robando fichas más fuertes para una mano distinta. Cambiar temprano suele ser mucho más rentable que forzar una mano casi imposible.",
    rule: "Cambiar temprano supera a forzar una mano muerta.",
    track: [],
  },
  {
    n: 7,
    title: "Observa Más de lo Que Juegas",
    body: "El Mahjong es un juego de información. Mientras todos los demás se concentran solo en su propio rack, los mejores jugadores observan qué recoge cada jugador, qué nunca descarta, qué pide para exponer y qué palo parece estar evitando. A menudo puedes predecir exactamente qué está construyendo un oponente.",
    rule: "Lee la mesa, no solo tu rack.",
    track: [],
  },
  {
    n: 8,
    title: "Los Jokers Son Aceleradores, No Salvavidas",
    body: "Muchos jugadores desperdician sus Jokers. Los grandes los reservan para donde generan el mayor valor. Nunca uses un Joker demasiado pronto si aún hay una buena probabilidad de completar ese grupo de forma natural.",
    rule: "Prioridad: 🥇 Kong  ·  🥈 Quint  ·  🥉 Sextet",
    track: [],
  },
  {
    n: 9,
    title: "Piensa Tres Turnos por Delante",
    body: "Antes de cada descarte, pregúntate qué harás si robas un Dragón Blanco, si aparece otro 5, o si robas un Joker. Los mejores jugadores siempre tienen un plan para sus próximas jugadas.",
    rule: "Ten siempre un plan para tus próximas jugadas.",
    track: [],
  },
  {
    n: 10,
    title: "La Mano de Mayor Valor No Siempre Es la Mejor",
    body: "Una mano de menor puntaje que puede completarse mucho más rápido suele ganar más partidas que una mano espectacular que es casi imposible de terminar. La velocidad gana más partidas que la ambición.",
    rule: "¿Qué mano puedo completar antes que los demás?",
    track: [],
  },
  {
    n: 11,
    title: "Juega las Probabilidades, No tus Esperanzas",
    body: "Los grandes jugadores no persiguen la mano \"perfecta.\" Persiguen la mano con mayor probabilidad de completarse. Pregúntate constantemente: ¿qué ficha aún tiene la mayor cantidad de copias disponibles? ¿Qué combinación aparece en varias manos? ¿Qué mano me da más flexibilidad si necesito pivotar?",
    rule: "Nunca te enamores de una mano. Enamórate de las probabilidades.",
    track: [],
  },
  {
    n: 12,
    title: "Cada Descarte Cuenta una Historia",
    body: "Cada ficha que descarta un oponente te da información. Piensa como un detective. No solo observes tu propio rack: aprende a leer el rack invisible de todos los demás.",
    rule: "Observa: ¿nunca descartan 2 o 6? ¿Están guardando Dragones Blancos? ¿Rompieron un posible Pung? ¿Descartaron todas sus Flores?",
    track: [],
  },
  {
    n: 13,
    title: "Gana el Charleston Antes de Empezar la Partida",
    body: "Muchos jugadores creen que la partida empieza con la primera robada. No es así: empieza durante el Charleston. Los mejores lo usan para eliminar manos imposibles, reunir fichas que encajen en varias categorías, recopilar información de los oponentes y prepararse para pivotar desde el primer minuto.",
    rule: "El Charleston no se trata de deshacerte de fichas. Se trata de crear posibilidades.",
    track: [],
  },
  {
    n: 14,
    title: "Sabe Cuándo Alejarte de una Mano",
    body: "Uno de los errores más costosos en el Mahjong es negarte a pivotar. Cambia cuando demasiados Dragones Blancos estén expuestos, cuando tus 2 o 6 estén muertos, cuando tu par haya sido descartado, o cuando otra mano tenga ahora probabilidades mucho más altas. El jugador promedio termina la mano que eligió al principio; el gran jugador termina la mano que la muralla le permite construir.",
    rule: "No ganas siendo terco. Ganas adaptándote.",
    track: [],
  },
];

export default function LlaveMaestra() {
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    document.title = "Panel de la Llave Maestra · Grand Mahjong Master-Key";
  }, []);

  return (
    <div className="marble-bg min-h-screen w-full overflow-x-hidden">
      {/* ── Botón flotante "Índice" + panel (todos los tamaños) ── */}
      <div className="fixed right-4 top-4 z-50 flex flex-col items-end gap-3">
        <button
          onClick={() => setTocOpen((v) => !v)}
          className="hover-elevate active-elevate-2 flex items-center gap-2 rounded-full border border-[#EADFCE] bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.15em] text-primary-foreground shadow-xl"
          data-testid="button-toc-toggle"
        >
          {tocOpen ? <X className="h-4 w-4" /> : <List className="h-4 w-4" />}
          Índice
        </button>
        {tocOpen && (
          <nav
            className="w-64 max-w-[calc(100vw-2.5rem)] overflow-hidden rounded-2xl border border-[#EADFCE] bg-white/95 shadow-2xl backdrop-blur-md"
            data-testid="toc-panel"
          >
            <div className="flex items-center justify-between border-b border-[#EFE6D5] bg-[#FBF6EC] px-4 py-3 text-xs font-bold uppercase tracking-[0.22em] text-[#B8964A]">
              <span className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                En esta página
              </span>
              <button
                onClick={() => setTocOpen(false)}
                className="hover-elevate active-elevate-2 -mr-1 rounded-md p-1 text-[#1F3D34]"
                aria-label="Cerrar índice"
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
          El Panel de Miembros
        </div>
        <img
          src="/master-key-cover-es.png"
          alt="Los Secretos de The Grand Mahjong Master-Key"
          className="mx-auto mb-6 w-40 rounded-2xl shadow-xl ring-1 ring-black/5 sm:w-52"
          data-testid="img-master-key-cover"
        />
        <h1
          className="font-serif text-4xl leading-[1.05] text-[#1F3D34] sm:text-5xl"
          data-testid="heading-hero"
        >
          La Llave Maestra,
          <span className="block text-primary">en la mesa.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Tu centro de mando sereno y fácil de escanear. Echa un vistazo a mitad
          de partida, encuentra la jugada y juega con confianza tranquila — sin
          revisar capítulos enteros.
        </p>

        <a
          href="/master-key-card-es.png"
          download
          className="hover-elevate active-elevate-2 mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#7FD4CE] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0E3B37] shadow-md"
          data-testid="button-download-pdf"
        >
          <Printer className="h-4 w-4" />
          Descargar tarjeta imprimible
        </a>
      </header>

      {/* ── Vista previa de la Tarjeta Maestra imprimible ────────── */}
      <section className="mx-auto max-w-4xl px-5 pb-6">
        <div className="rounded-2xl border border-[#EADFCE] bg-white p-4 shadow-md sm:p-6">
          <div className="mb-3 flex flex-col items-center gap-1 text-center">
            <div className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8964A]">
              La Tarjeta Maestra de una Página
            </div>
            <p className="text-sm text-muted-foreground">
              Todas las reglas de un vistazo. Imprímela, plastifícala y tenla junto a tu rack.
            </p>
          </div>
          <a
            href="/master-key-card-es.png"
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-xl border border-[#E7DECF] ring-1 ring-black/5"
            data-testid="link-card-preview"
          >
            <img
              src="/master-key-card-es.png"
              alt="Tarjeta de referencia imprimible de La Llave Maestra del Mahjong — 15 paneles que cubren anatomía de una mano, cómo leer la tarjeta, elección de manos, selección de palo, cuándo cambiar de plan, Charleston, jokers y referencia rápida."
              className="w-full"
              loading="lazy"
              data-testid="img-master-card"
            />
          </a>
          <div className="mt-4 flex justify-center">
            <a
              href="/master-key-card-es.png"
              download
              className="hover-elevate active-elevate-2 inline-flex items-center justify-center gap-2 rounded-full border border-[#E0D6C6] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-[#1F3D34] shadow-sm"
              data-testid="button-download-card"
            >
              <Printer className="h-4 w-4" />
              Descargar la tarjeta imprimible
            </a>
          </div>
        </div>
      </section>

      {/* ── Navegación sticky de anclas ──────────────────────────── */}
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
        {/* ── PARTE I — PIENSA COMO JUGADOR (capítulos completos) ─ */}
        <section className="pt-12">
          <SectionHeading
            id="reglas"
            eyebrow="Parte I · Piensa Como Jugador"
            title="El Plano de 12 Pasos"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            El camino de decisión completo que siguen los expertos — cada capítulo,
            en orden. Escanea el número, lee el ejemplo, haz la jugada.
          </p>

          <div className="mt-8 space-y-6">
            {/* Capítulo 1 */}
            <Chapter n={1} icon={<Layers className="h-5 w-5" />} title="La Regla de Tres">
              <p>
                <strong>Idea clave:</strong> nunca elijas UNA mano de inmediato.
                En cambio, elige TRES manos posibles.
              </p>
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">
                  Rack de ejemplo
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
                    { label: "Roj", suit: "dragon" },
                    { label: "Roj", suit: "dragon" },
                    { label: "Bln", suit: "dragon" },
                    { label: "Jkr", suit: "joker" },
                    { label: "5C", suit: "crak" },
                    { label: "7C", suit: "crak" },
                  ]}
                />
              </div>
              <p>
                En lugar de decir <em>"Estoy jugando la Mano #___,"</em> piensa en
                candidatas con calificación:
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3 text-center">
                  <div className="font-serif font-bold text-[#1F3D34]">Mano A</div>
                  <Stars count={5} />
                </div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3 text-center">
                  <div className="font-serif font-bold text-[#1F3D34]">Mano B</div>
                  <Stars count={4} />
                </div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3 text-center">
                  <div className="font-serif font-bold text-[#1F3D34]">Mano C</div>
                  <Stars count={3} />
                </div>
              </div>
              <p>
                A medida que avanza el Charleston, vas <strong>eliminando</strong>{" "}
                manos — no fuerzas ninguna.
              </p>
              <InsightBox>
                Fíjate cómo esta familia de manos puede compartir las mismas fichas
                de apertura. Algunos grupos de manos premian la flexibilidad en vez
                de comprometerte temprano — mantén vivas las aperturas compartidas
                el mayor tiempo posible.
              </InsightBox>
            </Chapter>

            {/* Capítulo 2 */}
            <Chapter n={2} icon={<HeartHandshake className="h-5 w-5" />} title="Por Qué los Pares Son Oro">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">
                  Rack
                </div>
                <TileRow
                  tiles={[
                    { label: "6D", suit: "dot" },
                    { label: "6D", suit: "dot" },
                    { label: "Roj", suit: "dragon" },
                    { label: "Roj", suit: "dragon" },
                    { label: "🌸", suit: "flower" },
                    { label: "🌸", suit: "flower" },
                  ]}
                />
              </div>
              <p>
                Un principiante ve tres pares. Un experto ve múltiples posibilidades
                futuras. <strong>Los pares mantienen puertas abiertas. Las fichas
                sueltas cierran puertas.</strong>
              </p>
              <InsightBox>
                Muchas manos de la tarjeta actual empiezan con bases sólidas de
                pares — protege tus pares temprano y deja que ellos te digan hacia
                qué familia inclinarte.
              </InsightBox>
            </Chapter>

            {/* Capítulo 3 */}
            <Chapter n={3} icon={<GitBranch className="h-5 w-5" />} title="La Flexibilidad Vence al Compromiso">
              <div className="mx-auto flex max-w-sm flex-col items-center gap-1">
                {[
                  { label: "Inicio", val: "8 manos posibles", w: "w-full" },
                  { label: "Charleston", val: "5 manos posibles", w: "w-4/5" },
                  { label: "Medio Juego", val: "2 manos posibles", w: "w-2/3" },
                  { label: "Final", val: "UNA mano", w: "w-1/2" },
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
                Así es exactamente como piensan los jugadores experimentados.
              </p>
            </Chapter>

            {/* Capítulo 4 */}
            <Chapter n={4} icon={<Star className="h-5 w-5" />} title="Lee tu Rack Como un Experto">
              <p>En lugar de contar fichas, <strong>puntúa tu rack.</strong></p>
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
                <p className="mt-3 text-sm italic text-muted-foreground">Excelente rack de apertura.</p>
              </div>
            </Chapter>

            {/* Capítulo 5 */}
            <Chapter n={5} icon={<Shuffle className="h-5 w-5" />} title="El Charleston Es Información">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">Pasas</div>
                <TileRow
                  tiles={[
                    { label: "1B", suit: "bam" },
                    { label: "2B", suit: "bam" },
                    { label: "3B", suit: "bam" },
                  ]}
                />
              </div>
              <p>
                ¿Qué aprendió todo el mundo? Tal vez no quieres Bambú — o tal vez
                estás faroleando. <strong>Cada pase es un mensaje; envíalo a propósito.</strong>
              </p>
            </Chapter>

            {/* Capítulo 6 */}
            <Chapter n={6} icon={<Eye className="h-5 w-5" />} title="Cada Exposición Cuenta una Historia">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">Un oponente expone</div>
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
                Pregúntate: ¿qué manos se vuelven <strong>probables</strong>? ¿Qué
                manos se vuelven {" "}<strong>imposibles</strong>? Leer a los oponentes
                convierte sus jugadas en tu información.
              </p>
            </Chapter>

            {/* Capítulo 7 */}
            <Chapter n={7} icon={<GitBranch className="h-5 w-5" />} title="Cuándo Pivotar">
              <div className="rounded-lg bg-[#FBF7F2] p-3">
                <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">Empezaste con</div>
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
                Ahora tres fichas críticas ya no están. ¿Los expertos continúan? No
                — <strong>pivotan</strong>. Revisa la lista de decisión:
              </p>
              <ul className="ml-1 space-y-1.5">
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> ¿Siguen vivas en la muralla las fichas que necesito?</li>
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> ¿Ha expuesto un oponente lo que estoy persiguiendo?</li>
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> ¿Comparte otra candidata mis fichas restantes?</li>
                <li className="flex gap-2"><span className="text-[#C9A961]">▸</span> ¿Es el pivote más rápido de completar que la mano original?</li>
              </ul>
            </Chapter>

            {/* Capítulo 8 */}
            <Chapter n={8} icon={<Target className="h-5 w-5" />} title="Deja de Perseguir Manos Bonitas">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-[#F3C7BE] bg-[#FDECE7] p-4">
                  <div className="font-serif font-bold text-[#1F3D34]">Mano rara</div>
                  <div className="mt-1 text-sm">Pago <Stars count={5} /></div>
                  <div className="text-sm">Probabilidad <Stars count={2} /></div>
                </div>
                <div className="rounded-lg border border-[#BEE3DE] bg-[#EEF9F7] p-4">
                  <div className="font-serif font-bold text-[#1F3D34]">Mano simple</div>
                  <div className="mt-1 text-sm">Pago <Stars count={3} /></div>
                  <div className="text-sm">Finalización <Stars count={5} /></div>
                </div>
              </div>
              <p><strong>El valor esperado vence al pensamiento ilusorio.</strong></p>
            </Chapter>

            {/* Capítulo 9 */}
            <Chapter n={9} icon={<Eye className="h-5 w-5" />} title="Leer la Mesa">
              <div className="space-y-1.5">
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3"><strong>Jugador A</strong> — muchas Flores</div>
                <div className="text-center text-[#C9A961]">↓</div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3"><strong>Jugador B</strong> — muchos Dragones</div>
                <div className="text-center text-[#C9A961]">↓</div>
                <div className="rounded-lg border border-[#EADFCE] bg-white p-3"><strong>Jugador C</strong> — exposición de Bambú</div>
                <div className="text-center text-[#C9A961]">↓</div>
                <div className="rounded-lg bg-[#1F3D34] p-3 text-center font-serif font-bold text-[#F4E4C1]">Tu decisión</div>
              </div>
              <p><strong>La observación crea información. La información crea victorias.</strong></p>
            </Chapter>

            {/* Capítulo 10 */}
            <Chapter n={10} icon={<Target className="h-5 w-5" />} title="Pensamiento de Fin de Partida">
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-lg border border-[#BEE3DE] bg-[#EEF9F7] p-3 text-center"><div className="text-xs font-bold uppercase tracking-wide text-[#2E7D5B]">Juego temprano</div><div className="font-serif text-lg text-[#1F3D34]">Flexible</div></div>
                <div className="rounded-lg border border-[#EADFCE] bg-[#FBF3E4] p-3 text-center"><div className="text-xs font-bold uppercase tracking-wide text-[#B8964A]">Juego tardío</div><div className="font-serif text-lg text-[#1F3D34]">Comprometido</div></div>
                <div className="rounded-lg border border-[#F3C7BE] bg-[#FDECE7] p-3 text-center"><div className="text-xs font-bold uppercase tracking-wide text-primary">Turnos finales</div><div className="font-serif text-lg text-[#1F3D34]">Defensivo</div></div>
              </div>
            </Chapter>
          </div>
        </section>

        {/* ── TABLA DE SELECCIÓN DE PALO ─────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="fichas"
            eyebrow="Conoce tus Fichas"
            title="Guía de Selección de Palo"
          />
          <img
            src="/tiles-3-colors.png"
            alt="Cada ficha de Mahjong en Craks, Dots y Bams"
            className="mx-auto mt-6 w-full rounded-2xl border border-[#EADFCE] shadow-sm"
            data-testid="img-tile-chart"
          />
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#EADFCE] shadow-sm">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#1F3D34] text-[#F4E4C1]">
                  <th className="px-4 py-3 font-semibold uppercase tracking-wide">Palo</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wide">Color</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wide">Mejor cuando…</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-[#F0E8DB]">
                  <td className="px-4 py-3 font-serif text-lg font-bold text-[#C0392B]">Craks</td>
                  <td className="px-4 py-3">Rojo</td>
                  <td className="px-4 py-3 text-foreground/80">Alta concentración de Craks en tu rack.</td>
                </tr>
                <tr className="border-b border-[#F0E8DB]">
                  <td className="px-4 py-3 font-serif text-lg font-bold text-[#D97A2B]">Dots</td>
                  <td className="px-4 py-3">Naranja</td>
                  <td className="px-4 py-3 text-foreground/80">Dots emparejados que abren varias manos.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-serif text-lg font-bold text-[#2E7D5B]">Bams</td>
                  <td className="px-4 py-3">Verde</td>
                  <td className="px-4 py-3 text-foreground/80">Secuencias fuertes de Bam; palos mezclados = poca flexibilidad.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── CHARLESTON ─────────────────────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="charleston"
            eyebrow="El Intercambio Ritual"
            title="Estrategia del Charleston"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#BEE3DE] bg-[#EEF9F7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-[#2E7D5B]">
                <CheckCircle2 className="h-5 w-5" /> Buenos Pases
              </div>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li>Pasa bloques grandes (999, 888…) que no puedas usar.</li>
                <li>Pasa vientos duplicados.</li>
                <li>Pasa flores extra que no necesites.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-[#F3C7BE] bg-[#FDECE7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <ShieldAlert className="h-5 w-5" /> Malos Pases
              </div>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li>Pasar pares que vas a conservar.</li>
                <li>Pasar oportunidades de joker.</li>
                <li>Pasar dragones importantes.</li>
              </ul>
            </div>
          </div>

          <GoldenRuleBox label="Regla de Oro">
            El Charleston es <em>información</em>, no solo barajar fichas. Cada pase
            le dice algo a la mesa — decide qué quieres que diga.
          </GoldenRuleBox>
        </section>

        {/* ── JOKERS (Sección Especial) ──────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="jokers"
            eyebrow="Sección Especial · La Clase Magistral"
            title="Todo Sobre los Jokers"
          />

          {/* PUEDE / NO PUEDE */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#BEE3DE] bg-[#EEF9F7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-[#2E7D5B]">
                <CheckCircle2 className="h-5 w-5" /> Los Jokers PUEDEN
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
                Sigue siempre las reglas oficiales de la NMJL del año en curso.
              </p>
            </div>
            <div className="rounded-2xl border border-[#F3C7BE] bg-[#FDECE7] p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <ShieldAlert className="h-5 w-5" /> Los Jokers NO PUEDEN
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

          {/* Visual de contar jokers */}
          <div className="mt-6 rounded-2xl border border-[#EADFCE] bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl text-[#1F3D34]">Cuenta los jokers faltantes</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Vistos</div>
                <div className="mt-1 font-mono text-2xl tracking-widest text-[#1F3D34]">■■■■□□□</div>
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Restantes</div>
                <div className="mt-1 font-mono text-2xl tracking-widest text-primary">???</div>
              </div>
            </div>
            <p className="mt-3 text-sm italic text-muted-foreground">
              Usa el total correcto según las reglas y la edición vigentes. Cuantos
              menos jokers sin ver queden, más debes ajustar tus expectativas.
            </p>
          </div>

          {/* Jugadas estratégicas */}
          <h3 className="mt-8 text-center font-serif text-2xl text-[#1F3D34]">
            Seis Jugadas Estratégicas de Joker
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

          <GoldenRuleBox label="Regla de Oro">
            No te enamores de los jokers. Tres jokers no son tres fichas — son{" "}
            <strong>tres decisiones flexibles.</strong>
          </GoldenRuleBox>
        </section>

        {/* ── CAPÍTULO 12 — NOTAS ESTRATÉGICAS 2026 ──────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="notes2026"
            eyebrow="Capítulo 12"
            title="Notas Estratégicas 2026"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            Análisis y ejemplos — nunca una copia de la tarjeta oficial.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              "Qué estilos de manos aparecen especialmente comunes este año.",
              "Qué patrones de fichas de apertura ofrecen amplia flexibilidad.",
              "Trampas de decisión comunes con las que los jugadores pueden toparse.",
              "Formas prácticas de evaluar aperturas frente a las tendencias de este año.",
            ].map((t, i) => (
              <div key={i} className="flex gap-3 rounded-2xl border border-[#EADFCE] bg-white p-5 shadow-sm">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5FB8B1] text-xs font-bold text-white">{i + 1}</span>
                <p className="text-sm leading-relaxed text-foreground/85">{t}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BONO — CLÍNICAS DE RACK ────────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="clinics"
            eyebrow="Bono"
            title="Clínicas de Rack"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            Ejercicios recurrentes e interactivos. Cada clínica sigue el mismo
            formato de cinco partes para que apliques los conceptos de inmediato.
          </p>

          {/* Explicación del formato */}
          <div className="mt-6 grid gap-2 sm:grid-cols-5">
            {[
              "Tu Rack",
              "Tres Direcciones Posibles",
              "Qué Hace un Intermedio",
              "Qué Piensa un Experto",
              "Conclusión Clave",
            ].map((s, i) => (
              <div key={i} className="rounded-xl border border-[#EADFCE] bg-[#FBF3E4] p-3 text-center">
                <div className="font-serif text-lg font-bold text-[#B8964A]">{i + 1}</div>
                <div className="text-xs font-medium text-foreground/80">{s}</div>
              </div>
            ))}
          </div>

          {/* Clínica de ejemplo */}
          <div className="mt-8 rounded-2xl border border-[#EADFCE] bg-white p-6 shadow-sm" data-testid="card-rack-clinic">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <Stethoscope className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Clínica N.º 1</span>
            </div>

            <div className="rounded-lg bg-[#FBF7F2] p-3">
              <div className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8964A]">Tu rack</div>
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
                  { label: "Nte", suit: "wind" },
                ]}
              />
            </div>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/85">
              <p><strong>Dirección posible A:</strong> inclínate por manos de números consecutivos.</p>
              <p><strong>Dirección posible B:</strong> preserva los pares y evalúa otra familia de manos.</p>
              <div className="rounded-lg border-l-4 border-[#5FB8B1] bg-[#EEF9F7] p-4">
                <div className="text-xs font-bold uppercase tracking-wide text-[#2E7D5B]">Pensamiento experto</div>
                <p className="mt-1 font-serif text-lg text-[#1F3D34]">
                  "Todavía no estoy eligiendo una mano — estoy eligiendo opciones."
                </p>
              </div>
              <p className="italic text-muted-foreground">
                Conclusión clave: las clínicas recurrentes convierten la teoría en
                instinto — aplica el concepto antes de siquiera tocar la tarjeta oficial.
              </p>
            </div>
          </div>
        </section>

        {/* ── LO QUE HACEN LOS MEJORES ───────────────────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="best-players"
            eyebrow="El Juego Interior"
            title="Lo Que Hacen los Mejores Jugadores"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            Catorce secretos que separan a los ganadores del resto — más la regla
            que decide tu partida antes del primer descarte.
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
                    Secreto #{s.n}: {s.title}
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

            {/* Bono: la regla del 80% */}
            <div
              className="rounded-2xl border-2 border-[#C9A961] bg-gradient-to-br from-[#FBF3E4] to-[#FBF7F2] p-6 shadow-md"
              data-testid="secret-bonus-80"
            >
              <div className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-[#B8964A]">
                💎 Bono: La Regla del 80%
              </div>
              <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                Si, después del Charleston, no tienes al menos el 80% de las fichas
                clave para una mano —o un camino claro para conseguirlas— empieza a
                buscar una alternativa más fuerte. Los jugadores expertos toman
                decisiones temprano. Los principiantes esperan demasiado.
              </p>
            </div>
          </div>
        </section>

        {/* ── BÓVEDA DE LA ETIQUETA (Do's & Don'ts) ──────────────── */}
        <section className="pt-14">
          <SectionHeading
            id="etiqueta"
            eyebrow="El Código Social"
            title="La Bóveda de la Etiqueta"
          />
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-muted-foreground">
            Los sí y los no de los jokers que separan a una habitual bienvenida de
            una invitada de una sola vez.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-[#BEE3DE] bg-[#EEF9F7] p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-[#2E7D5B]">
                <CheckCircle2 className="h-5 w-5" /> Sí
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
                <ShieldAlert className="h-5 w-5" /> No
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
            <h3 className="font-serif text-2xl text-[#1F3D34]">Qué cambia en 7 días</h3>
            <p className="mx-auto mt-2 max-w-lg text-base leading-relaxed text-foreground/80">
              Para el fin de la semana ya no estarás solo "emparejando fichas".
              Estarás planeando tu pase del Charleston tres pasos por delante,
              intercambiando jokers de la mesa como una profesional y manteniéndote
              en la conversación sin perderte un solo descarte.
            </p>
          </div>
        </section>

        {/* ── Llamado final a jugar ──────────────────────────────── */}
        <section className="mt-16 scroll-mt-24" data-testid="section-ready-to-call">
          <div className="rounded-2xl border border-[#E7C9A0] bg-[#FDF7EF] px-6 py-10 text-center shadow-sm sm:px-10 sm:py-12">
            <h2
              className="font-serif text-3xl leading-tight text-[#0E3B37] sm:text-4xl"
              data-testid="text-ready-to-call"
            >
              ¿Estás lista para cantar tu primer <em className="italic">Mahjong</em>!?
            </h2>
            <figure className="mx-auto mt-8 max-w-2xl">
              <img
                src="/master-key-hand-sample-es.png"
                alt="Mano ganadora de ejemplo — NN 1111 33 5555 SS, un solo palo, solo Norte y Sur"
                className="w-full rounded-xl shadow-lg ring-1 ring-black/5"
                data-testid="img-hand-sample"
              />
              <figcaption className="mt-3 text-xs uppercase tracking-wide text-muted-foreground">
                Mano ganadora de ejemplo · Un solo palo · Solo Norte y Sur
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ── Acciones de pie de página ──────────────────────────── */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <a
            href="/master-key-card-es.png"
            download
            className="hover-elevate active-elevate-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#7FD4CE] px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0E3B37] shadow-md"
            data-testid="button-download-pdf-footer"
          >
            <Printer className="h-4 w-4" />
            Descargar tarjeta imprimible
          </a>
          <Link
            href="/espanol"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            data-testid="link-back-home"
          >
            <HomeIcon className="h-4 w-4" />
            Volver al inicio
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </main>
    </div>
  );
}
