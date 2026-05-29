import { cpSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const staticDir = join(root, ".vercel", "output", "static");

if (!existsSync(staticDir)) {
  console.log("[sync-public] No .vercel/output/static — skip (run after vite build)");
  process.exit(0);
}

cpSync(publicDir, staticDir, { recursive: true, force: true });
console.log("[sync-public] Copied public/ → .vercel/output/static");
