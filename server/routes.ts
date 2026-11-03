import type { Express } from "express";
import path from "path";
import fs from "fs";
import { insertOrderSchema } from "@shared/schema";
import { storage } from "./storage";

/**
 * Source-code ZIP downloads.
 *
 * Why this is an explicit Express route instead of a plain static file:
 * in production the SPA catch-all (`app.use("*")` in serveStatic) answers any
 * path it does not recognize with index.html. If the ZIP is missing from the
 * built output for any reason, `/download/foo.zip` silently returns 4KB of HTML
 * with `content-type: text/html` — the browser saves a broken "ZIP" that is
 * really the home page. This route runs BEFORE the fallback, looks in every
 * location the file can legitimately live, and returns a real 404 if it is
 * genuinely absent, so a broken download can never masquerade as a success.
 */
const DOWNLOAD_DIRS = [
  // Production: vite build copies client/public/** into dist/public/**
  path.resolve(import.meta.dirname, "public", "download"),
  // Development: served straight from the source tree
  path.resolve(import.meta.dirname, "..", "client", "public", "download"),
];

function resolveDownload(fileName: string): string | null {
  // Defence in depth: never let a request escape the download directory.
  if (!/^[A-Za-z0-9._-]+\.zip$/.test(fileName)) return null;
  for (const dir of DOWNLOAD_DIRS) {
    const candidate = path.join(dir, fileName);
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

export function registerRoutes(app: Express) {
  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.get("/download/:file", (req, res) => {
    const filePath = resolveDownload(req.params.file);
    if (!filePath) {
      return res
        .status(404)
        .type("text/plain")
        .send(
          `Download not found: ${req.params.file}\n\n` +
            `Regenerate the packages with:  python3 scripts/make-zip.py\n`,
        );
    }
    // Content-Disposition forces a real download instead of the browser trying
    // to render the bytes, and names the file correctly on disk.
    res.download(filePath, req.params.file, (err) => {
      if (err && !res.headersSent) {
        console.error("download failed:", err);
        res.status(500).type("text/plain").send("Download failed");
      }
    });
  });

  app.post("/api/orders", async (req, res) => {
    const parsed = insertOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
    }
    try {
      const order = await storage.createOrder(parsed.data);
      res.json({ ok: true, order });
    } catch (err) {
      console.error("createOrder failed:", err);
      res.status(500).json({ error: "Could not create order" });
    }
  });
}
