import { cpSync, mkdirSync, rmSync, unlinkSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = resolve(root, "public/r");
const catalog = resolve(root, "registry.json");
const orchidCatalog = resolve(root, "public/registry.json");
const appItemsDir = resolve(root, "../app/public/r");

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const build = spawnSync(
  "bunx",
  ["--bun", "shadcn@4.17.0", "build", "--output", "./public/r"],
  { cwd: root, stdio: "inherit" },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const nestedCatalog = resolve(outDir, "registry.json");
if (existsSync(nestedCatalog)) {
  unlinkSync(nestedCatalog);
}

cpSync(catalog, orchidCatalog);

rmSync(appItemsDir, { recursive: true, force: true });
mkdirSync(appItemsDir, { recursive: true });
cpSync(outDir, appItemsDir, { recursive: true });

console.log(`Wrote items to ${outDir} and ${appItemsDir}`);
console.log(`Wrote catalog to ${orchidCatalog}`);
