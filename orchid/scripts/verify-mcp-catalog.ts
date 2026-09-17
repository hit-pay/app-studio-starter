import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const catalogPath = resolve(root, "api/mcp-catalog.json");
const catalog = JSON.parse(readFileSync(catalogPath, "utf8")) as {
  components: Array<{
    name?: string;
    title?: string;
    description?: string;
    category?: string;
    props?: Record<string, unknown>;
    examples?: Array<{ description: string; code: string }>;
    related_components?: string[];
  }>;
};

const expectedUi = 25;
const expectedComponents = 20;
const components = catalog.components ?? [];

if (components.length !== expectedUi + expectedComponents) {
  throw new Error(
    `Expected ${expectedUi + expectedComponents} components, got ${components.length}`,
  );
}

const incomplete = components.filter(
  (entry) =>
    !entry.name ||
    !entry.title ||
    !entry.description ||
    !entry.category ||
    !entry.props ||
    Object.keys(entry.props).length === 0 ||
    !entry.examples?.length ||
    !entry.related_components?.length,
);

if (incomplete.length > 0) {
  console.error(
    "Incomplete entries:",
    incomplete.map((entry) => entry.name),
  );
  process.exit(1);
}

console.log(`OK: ${components.length} Orchid MCP catalog entries with full detail.`);
