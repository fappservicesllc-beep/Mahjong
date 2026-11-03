import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Download, FileCode2, Images, ArrowLeft, Terminal } from "lucide-react";

type Pack = {
  id: string;
  title: string;
  size: string;
  file: string;
  icon: typeof FileCode2;
  blurb: string;
  contents: string[];
};

const PACKS: Pack[] = [
  {
    id: "source",
    title: "Source code only",
    size: "132 KB",
    file: "/download/mahjong-master-key-source.zip",
    icon: FileCode2,
    blurb:
      "Every file a developer needs to run, edit, or re-deploy the site. No images, no node_modules.",
    contents: [
      "client/src — all 9 pages, 6 components, 4 shadcn primitives",
      "client/src/lib/pixel.ts — the full Meta Pixel configuration",
      "client/src/index.css — Tailwind tokens for the brand palette",
      "server/ — the complete Express backend",
      "shared/schema.ts — Drizzle table definitions",
      "package.json, package-lock.json, vite.config.ts, tsconfig.json",
      "tailwind.config.ts, postcss.config.js, drizzle.config.ts, components.json",
      "README.md — setup steps, script table, route map, pixel notes",
    ],
  },
  {
    id: "full",
    title: "Full backup (code + assets)",
    size: "27 MB",
    file: "/download/mahjong-master-key-full.zip",
    icon: Images,
    blurb:
      "Everything in the source pack, plus all 12 images the live site serves. This is the complete snapshot.",
    contents: [
      "Everything in the source pack",
      "master-key-cover.png + master-key-cover-es.png — bilingual covers",
      "Printable reference cards, both languages",
      "Sample winning hand photography",
      "iPad / iPhone product mockups",
      "Order bump product shots",
      "Decorative tile motifs",
    ],
  },
];

export default function Downloads() {
  return (
    <div className="min-h-screen cream-bg">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <Link href="/english">
          <button
            className="hover-elevate active-elevate-2 inline-flex items-center gap-2 text-sm text-brand-ink/60 mb-10 rounded-full px-3 py-1.5"
            data-testid="link-back-home"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to the Master-Key
          </button>
        </Link>

        <p className="font-accent italic text-xl text-brand-ink/60 mb-2">Private archive</p>
        <h1
          className="font-serif text-4xl md:text-6xl font-bold mb-5 leading-tight"
          data-testid="text-downloads-title"
        >
          Download the project files.
        </h1>
        <p className="text-brand-ink/70 text-lg max-w-2xl mb-14 leading-relaxed">
          Two packages, both generated from the live code. Click a button below — no
          URLs to type, no typos possible. Your browser will start the download
          immediately.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-16">
          {PACKS.map((pack) => {
            const Icon = pack.icon;
            return (
              <div
                key={pack.id}
                className="bg-card border rounded-2xl p-7 flex flex-col"
                data-testid={`card-pack-${pack.id}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <Icon className="w-8 h-8 text-brand-ink/40" />
                  <span
                    className="text-xs font-semibold tracking-widest uppercase text-brand-ink/50 bg-brand-ink/5 rounded-full px-3 py-1"
                    data-testid={`text-size-${pack.id}`}
                  >
                    {pack.size}
                  </span>
                </div>

                <h2 className="font-serif text-2xl font-bold mb-3">{pack.title}</h2>
                <p className="text-brand-ink/70 text-sm leading-relaxed mb-6">{pack.blurb}</p>

                <ul className="space-y-2 mb-8 flex-1">
                  {pack.contents.map((line, i) => (
                    <li
                      key={i}
                      className="text-sm text-brand-ink/65 flex gap-2.5 leading-relaxed"
                    >
                      <span className="text-brand-gold mt-0.5 shrink-0">◆</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <a href={pack.file} download>
                  <Button
                    className="hover-elevate active-elevate-2 w-full bg-brand-teal hover:bg-brand-teal text-brand-ink rounded-full py-6 font-semibold tracking-wide"
                    data-testid={`button-download-${pack.id}`}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download ZIP
                  </Button>
                </a>
              </div>
            );
          })}
        </div>

        <div className="bg-card border rounded-2xl p-7 md:p-9">
          <div className="flex items-center gap-3 mb-5">
            <Terminal className="w-5 h-5 text-brand-ink/40" />
            <h2 className="font-serif text-2xl font-bold">Running it on your machine</h2>
          </div>
          <p className="text-brand-ink/70 mb-6 leading-relaxed">
            This is a React app built with Vite — not Next.js, and not loose HTML files
            you can double-click. The only HTML file is the shell React mounts into. To
            see it running you need Node.js 18 or newer, then three steps:
          </p>
          <ol className="space-y-4 mb-7">
            <li className="flex gap-4" data-testid="step-unzip">
              <span className="font-serif text-2xl font-bold gold-foil leading-none shrink-0">1</span>
              <div>
                <p className="font-semibold mb-1">Unzip the folder</p>
                <p className="text-sm text-brand-ink/65">
                  Anywhere you like, then open a terminal inside it.
                </p>
              </div>
            </li>
            <li className="flex gap-4" data-testid="step-install">
              <span className="font-serif text-2xl font-bold gold-foil leading-none shrink-0">2</span>
              <div>
                <p className="font-semibold mb-1">
                  Install dependencies —{" "}
                  <code className="font-mono text-sm bg-brand-ink/5 rounded px-2 py-0.5">
                    npm install
                  </code>
                </p>
                <p className="text-sm text-brand-ink/65">
                  This rebuilds node_modules, which is why it isn't in the ZIP.
                </p>
              </div>
            </li>
            <li className="flex gap-4" data-testid="step-run">
              <span className="font-serif text-2xl font-bold gold-foil leading-none shrink-0">3</span>
              <div>
                <p className="font-semibold mb-1">
                  Start it —{" "}
                  <code className="font-mono text-sm bg-brand-ink/5 rounded px-2 py-0.5">
                    npm run dev
                  </code>
                </p>
                <p className="text-sm text-brand-ink/65">
                  Then open localhost:5173 in your browser.
                </p>
              </div>
            </li>
          </ol>
          <p className="text-sm text-brand-ink/60 leading-relaxed border-t pt-6">
            If you'd rather have plain static files for a host without Node, run{" "}
            <code className="font-mono bg-brand-ink/5 rounded px-2 py-0.5">npm run build</code>{" "}
            and upload the contents of <span className="font-mono">dist/public</span> — that
            output is ordinary HTML, CSS, and JS.
          </p>
        </div>
      </div>
    </div>
  );
}
