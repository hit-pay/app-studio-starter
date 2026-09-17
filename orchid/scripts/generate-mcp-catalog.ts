import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { orchidComponentCatalog } from "../api/mcp-catalog-source.ts";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const payload = `${JSON.stringify({ components: orchidComponentCatalog }, null, 2)}\n`;
const orchidOut = resolve(root, "api/mcp-catalog.json");
const appOut = resolve(root, "../app/public/mcp/orchid-ui-catalog.json");

writeFileSync(orchidOut, payload);
writeFileSync(appOut, payload);
console.log(
  `Wrote ${orchidComponentCatalog.length} components to ${orchidOut} and ${appOut}`,
);
