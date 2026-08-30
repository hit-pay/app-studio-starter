import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  DOC_BLOCKS,
  DOC_COMPONENTS,
  DOC_FORMS,
  DOC_GUIDES,
} from "../src/components/doc/doc-components.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const output = join(root, "public", "llms.txt");
const homepage = registry.homepage?.replace(/\/$/, "");

if (!homepage) {
  throw new Error("registry.json must define a homepage.");
}

const documented = [...DOC_COMPONENTS, ...DOC_FORMS, ...DOC_BLOCKS];
const registryByName = new Map(registry.items.map((item) => [item.name, item]));

function slug(item) {
  return item.to.replace(/^\//, "");
}

function assertUnique(items, field, label) {
  const seen = new Set();
  for (const item of items) {
    const value = field(item);
    if (seen.has(value)) {
      throw new Error(`Duplicate documented ${label}: ${value}`);
    }
    seen.add(value);
  }
}

assertUnique(documented, slug, "slug");
assertUnique(documented, (item) => item.name, "name");

for (const item of documented) {
  const name = slug(item);
  if (!registryByName.has(name)) {
    throw new Error(
      `Documented component "${item.name}" (${item.to}) has no registry item "${name}".`,
    );
  }
}

const link = (path) => `${homepage}${path}`;
const registryItems = registry.items.filter(
  (item) => item.name !== "all" && item.name !== "utils",
);
const guideItems = DOC_GUIDES.flatMap((item) => [
  item,
  ...("children" in item ? item.children : []),
]);

function docsSection(title, items) {
  return [
    `## ${title}`,
    "",
    ...items.flatMap((item) => {
      const name = slug(item);
      return [
        `### [${item.name}](${link(item.to)})`,
        item.description,
        `Install: \`bunx --bun shadcn@latest add @orchid/${name}\` · [Registry JSON](${link(`/r/${name}.json`)})`,
        "",
      ];
    }),
  ];
}

const lines = [
  "# Orchid UI Documentation",
  "",
  `AI/LLM note: use the [registry index](${link("/registry.json")}) as the machine-readable source of truth for installable items, dependencies, files, and targets. Use these docs for intent and examples, then verify exports and props in the installed source.`,
  "",
  "## Overview",
  "",
  "Orchid is an AI-ready, open-code UI collection focused on business applications for HitPay-style workflows. It is distributed as a shadcn-compatible registry and provides React and TypeScript source styled with Tailwind CSS v4.",
  "",
  "### Quick Stats",
  "",
  `- Documentation pages: ${guideItems.length} guides, ${DOC_COMPONENTS.length} components, ${DOC_FORMS.length} form components, and ${DOC_BLOCKS.length} blocks.`,
  `- Installable registry items: ${registryItems.length}, excluding the helper entries \`all\` and \`utils\`.`,
  "",
  "### Installation",
  "",
  "Install one item after configuring the `@orchid` registry namespace in `components.json`:",
  "",
  "```bash",
  "bunx --bun shadcn@latest add @orchid/<component-name>",
  "```",
  "",
  "Install the complete catalog when that is intentional:",
  "",
  "```bash",
  "bunx --bun shadcn@latest add @orchid/all",
  "```",
  "",
  "## AI Resources",
  "",
  `- [Registry Index](${link("/registry.json")}) — machine-readable catalog and dependency graph.`,
  `- [Orchid Theme Tokens](${link("/orchid-tokens.css")}) — published CSS variables and Tailwind CSS v4 theme mappings.`,
  `- [CLI Guide](${link("/cli")}) — initialize projects and install Orchid items with the shadcn CLI.`,
  `- [components.json Guide](${link("/components-json")}) — configure aliases, Tailwind CSS, and the Orchid namespace.`,
  `- [Theming Guide](${link("/theming")}) — install and customize Orchid light and dark tokens.`,
  "",
  "## MCP Setup for AI Agents",
  "",
  "Orchid does not run a separate MCP server. Use the official shadcn MCP server, which can browse, search, and install items from any shadcn-compatible registry configured in the project's `components.json`.",
  "",
  "First, make sure the Orchid namespace is present in `components.json`:",
  "",
  "```json",
  "{",
  '  "registries": {',
  `    "@orchid": "${homepage}/r/{name}.json"`,
  "  }",
  "}",
  "```",
  "",
  "For Cursor, create or merge `.cursor/mcp.json`:",
  "",
  "```json",
  "{",
  '  "mcpServers": {',
  '    "shadcn": {',
  '      "command": "npx",',
  '      "args": ["shadcn@latest", "mcp"]',
  "    }",
  "  }",
  "}",
  "```",
  "",
  "For Claude Code, use the same server entry in `.mcp.json`. For Codex, add the following to `~/.codex/config.toml`:",
  "",
  "```toml",
  "[mcp_servers.shadcn]",
  'command = "npx"',
  'args = ["shadcn@latest", "mcp"]',
  "```",
  "",
  "An AI agent configuring MCP should preserve existing MCP servers and existing `components.json` settings, merge only the entries above, and ask before changing user-level configuration. Restart or re-enable the MCP client after configuration.",
  "",
  "Example prompts after setup:",
  "",
  "- Show all components available in the Orchid registry.",
  "- Find an Orchid component for a schema-driven form.",
  "- Install `@orchid/button`.",
  "- Build a searchable data page using Orchid SchemaTable and PageLayout.",
  "",
  "## Getting Started",
  "",
  ...DOC_GUIDES.flatMap((guide) => [
    `- [${guide.name}](${link(guide.to)}) — ${guide.description}`,
    ...("children" in guide
      ? guide.children.map(
          (child) =>
            `  - [${child.name}](${link(child.to)}) — ${child.description}`,
        )
      : []),
  ]),
  "",
  ...docsSection("Components", DOC_COMPONENTS),
  ...docsSection("Form Components", DOC_FORMS),
  ...docsSection("Blocks", DOC_BLOCKS),
  "## Complete Registry List (for AI reference)",
  "",
  registryItems.map((item) => item.name).join(", "),
  "",
  "## Usage Guidance",
  "",
  "- Verify actual exports, props, and behavior in the installed source; documentation summaries are not API signatures.",
  "- Registry targets control whether source lands under `@/components` or `@/components/ui`; do not infer the destination from the category.",
  "- Use Orchid `oc-*` design tokens, such as `bg-oc-background`, `text-oc-foreground`, and `border-oc-border`, instead of unrelated hard-coded theme colors.",
  "- Use SchemaForm for schema-driven form fields, SchemaTable for searchable/filterable/sortable/paginated data lists, FormLayout for page or modal form shells, and PageLayout for standard route pages.",
  "",
];

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, lines.join("\n"));
console.log(
  `Wrote ${output} (${guideItems.length} guides, ${DOC_COMPONENTS.length} components, ${DOC_FORMS.length} forms, ${DOC_BLOCKS.length} blocks, ${registryItems.length} registry items)`,
);
