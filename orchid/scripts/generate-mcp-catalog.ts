import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { orchidComponentCatalog } from "../api/mcp-catalog-source.ts";

const outPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../api/mcp-catalog.json",
);
writeFileSync(
  outPath,
  `${JSON.stringify({ components: orchidComponentCatalog }, null, 2)}\n`,
);
console.log(`Wrote ${orchidComponentCatalog.length} components to ${outPath}`);
