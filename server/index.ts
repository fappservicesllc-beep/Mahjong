import express from "express";
import http from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";

const app = express();
app.use(express.json());

const server = http.createServer(app);

const isProd = process.env.NODE_ENV === "production";

async function main() {
  registerRoutes(app);

  if (isProd) {
    serveStatic(app);
  } else {
    await setupVite(app, server);
  }

  const port = Number(process.env.PORT) || 5173;
  server.listen(port, "0.0.0.0", () => {
    console.log(`[server] listening on http://0.0.0.0:${port}`);
  });
}

main().catch((err) => {
  console.error("Fatal boot error:", err);
  process.exit(1);
});
