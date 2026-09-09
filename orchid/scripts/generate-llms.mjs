import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  DOC_ALL_COMPONENTS,
  DOC_BASE_GROUPS,
  DOC_BLOCK_GROUPS,
  DOC_GUIDES,
} from "../src/components/doc/doc-components.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const output = join(root, "public", "llms.txt");
const docsDir = join(root, "public", "llms");
const homepage = registry.homepage?.replace(/\/$/, "");

if (!homepage) {
  throw new Error("registry.json must define a homepage.");
}

const documented = [...DOC_ALL_COMPONENTS];
const registryByName = new Map(registry.items.map((item) => [item.name, item]));

function slug(item) {
  return item.to.replace(/^\//, "").replaceAll("/", "-");
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
const docsLink = (item) => link(`/llms/${slug(item)}.md`);
const registryItems = registry.items.filter(
  (item) => item.name !== "all" && item.name !== "utils",
);
const guideItems = DOC_GUIDES.flatMap((item) => [
  item,
  ...("children" in item ? item.children : []),
]);

function findMdx(item) {
  const name = slug(item);
  const candidates = [
    join(root, "content/docs/components", `${name}.mdx`),
    join(root, "content/docs/guides", `${name}.mdx`),
  ];
  const found = candidates.find((path) => existsSync(path));
  if (!found) {
    throw new Error(`No MDX source for ${item.to} (${name})`);
  }
  return found;
}

function pascalToKebab(name) {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function resolveDemoFile(specifier, fromFile, exportName) {
  if (exportName?.endsWith("Demo")) {
    const byName = join(
      root,
      "src/components/doc/demos",
      `${pascalToKebab(exportName)}.tsx`,
    );
    if (existsSync(byName)) return byName;
  }
  const base = resolve(dirname(fromFile), specifier);
  if (existsSync(base)) return base;
  for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
    if (existsSync(base + ext)) return base + ext;
  }
  return null;
}

function parseNamedImports(source) {
  const imports = [];
  const re =
    /^import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]\s*;?\s*$/gm;
  let match;
  while ((match = re.exec(source))) {
    imports.push({
      names: match[1].split(",").map((part) => part.trim()).filter(Boolean),
      from: match[2],
    });
  }
  return imports;
}

function rewriteDocHref(href) {
  if (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("#") ||
    href.startsWith("mailto:")
  ) {
    return href;
  }
  if (!href.startsWith("/")) return href;
  const [path, hash] = href.split("#");
  if (
    path.startsWith("/r/") ||
    path === "/registry.json" ||
    path === "/orchid-tokens.css" ||
    path === "/llms.txt" ||
    /\.\w+$/.test(path)
  ) {
    return `${homepage}${href}`;
  }
  const name = path.replace(/^\//, "").replaceAll("/", "-");
  return `${homepage}/llms/${name}.md${hash ? `#${hash}` : ""}`;
}

function mdxToMarkdown(source, mdxFile, title, description) {
  const imports = parseNamedImports(source);
  const demoFiles = new Map();
  for (const item of imports) {
    for (const name of item.names) {
      demoFiles.set(name, resolveDemoFile(item.from, mdxFile, name));
    }
  }

  const fences = [];
  let body = source.replace(/```[\s\S]*?```/g, (block) => {
    const token = `@@FENCE${fences.length}@@`;
    fences.push(block);
    return token;
  });

  body = body.replace(/^import\s+[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, "");

  body = body.replace(/<([A-Z][A-Za-z0-9]*)\s*\/>/g, (_all, name) => {
    const file = demoFiles.get(name);
    if (!file) return "";
    const code = readFileSync(file, "utf8").trim();
    return `## Example\n\n\`\`\`tsx\n${code}\n\`\`\`\n`;
  });

  body = body.replace(/\]\(([^)]+)\)/g, (_all, href) => `](${rewriteDocHref(href)})`);

  body = body.replace(/@@FENCE(\d+)@@/g, (_all, index) => fences[Number(index)]);
  body = body.replace(/\n{3,}/g, "\n\n").trim();

  return [
    `<!-- Generated from ${mdxFile.replace(`${root}/`, "")}. Do not edit. -->`,
    "",
    `# ${title}`,
    "",
    description,
    "",
    body,
    "",
  ].join("\n");
}

function writeMarkdownDocs() {
  rmSync(docsDir, { recursive: true, force: true });
  mkdirSync(docsDir, { recursive: true });

  const pages = [...guideItems, ...documented];
  for (const item of pages) {
    const mdxFile = findMdx(item);
    const markdown = mdxToMarkdown(
      readFileSync(mdxFile, "utf8"),
      mdxFile,
      item.name,
      item.description,
    );
    writeFileSync(join(docsDir, `${slug(item)}.md`), markdown);
  }
  return pages.length;
}

function docsItem(item) {
  const name = slug(item);
  return [
    `### [${item.name}](${docsLink(item)})`,
    item.description,
    `Install: \`bunx --bun shadcn@latest add @orchid/${name}\` · [Registry JSON](${link(`/r/${name}.json`)})`,
    "",
  ];
}

function docsSection(title, items) {
  return [`## ${title}`, "", ...items.flatMap(docsItem)];
}

function docsGroupedSection(title, groups) {
  return [
    `## ${title}`,
    "",
    ...groups.flatMap((group) => [
      `### ${group.label}`,
      "",
      ...group.items.flatMap((item) => {
        const name = slug(item);
        return [
          `#### [${item.name}](${docsLink(item)})`,
          item.description,
          `Install: \`bunx --bun shadcn@latest add @orchid/${name}\` · [Registry JSON](${link(`/r/${name}.json`)})`,
          "",
        ];
      }),
    ]),
  ];
}

const markdownCount = writeMarkdownDocs();

const lines = [
  "# Orchid UI Documentation",
  "",
  `AI/LLM note: use the [registry index](${link("/registry.json")}) as the machine-readable source of truth for installable items, dependencies, files, and targets. Read the generated Markdown docs under ${link("/llms/")} for intent and examples, then verify exports and props in the installed source.`,
  "",
  "## Overview",
  "",
  "Orchid is an AI-ready, open-code UI collection focused on business applications for HitPay-style workflows. It is distributed as a shadcn-compatible registry and provides React and TypeScript source styled with Tailwind CSS v4.",
  "",
  "### Quick Stats",
  "",
  `- Documentation pages: ${guideItems.length} guides and ${DOC_ALL_COMPONENTS.length} components.`,
  `- Installable registry items: ${registryItems.length}, excluding the helper entries \`all\` and \`utils\`.`,
  `- Markdown docs: ${link("/llms/")} — one \`.md\` file per guide and component.`,
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
  `- [Markdown docs](${link("/llms/")}) — generated \`.md\` pages for agents (not the HTML site).`,
  `- [Orchid Theme Tokens](${link("/orchid-tokens.css")}) — published CSS variables and Tailwind CSS v4 theme mappings.`,
  `- [Installation Guide](${docsLink({ to: "/installation", name: "Installation" })}) — initialize a project and add Orchid items with the shadcn CLI.`,
  `- [components.json Guide](${docsLink({ to: "/components-json", name: "components.json" })}) — configure aliases, Tailwind CSS, and the Orchid namespace.`,
  `- [Theming Guide](${docsLink({ to: "/theming", name: "Theming" })}) — install and customize Orchid light and dark tokens.`,
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
  "- Build a searchable data page using Orchid DataTable and PageLayout.",
  "",
  "## Getting Started",
  "",
  ...DOC_GUIDES.flatMap((guide) => [
    `- [${guide.name}](${docsLink(guide)}) — ${guide.description}`,
    ...("children" in guide
      ? guide.children.map(
          (child) =>
            `  - [${child.name}](${docsLink(child)}) — ${child.description}`,
        )
      : []),
  ]),
  "",
  ...docsGroupedSection("Components & Blocks", DOC_BLOCK_GROUPS),
  ...docsGroupedSection("Base Components", DOC_BASE_GROUPS),
  "## Complete Registry List (for AI reference)",
  "",
  registryItems.map((item) => item.name).join(", "),
  "",
  "## Usage Guidance",
  "",
  "- Prefer the Markdown docs under `/llms/*.md` over HTML example pages.",
  "- Read Components & Blocks first. Use a block when one exists. Only then read Base Components.",
  "- Verify actual exports, props, and behavior in the installed source; documentation summaries are not API signatures.",
  "- Both catalogs use AlignUI groups (Actions, Displaying Data, Feedback, Form, Layout, Navigation, Overlays, Utils). Blocks install under `@/components` and are ready to use through props or a schema. Base items install under `@/components/ui`. Do not assemble a block from many base components.",
  "- Use Orchid `oc-*` design tokens, such as `bg-oc-background`, `text-oc-foreground`, and `border-oc-border`, instead of unrelated hard-coded theme colors.",
  "- Use FormBuilder for schema-driven form fields, DataTable for searchable/filterable/sortable/paginated data lists, MetricCard for dashboard KPI tiles (revenue, volume, counts), FormLayout for page or modal form shells, and PageLayout for standard route pages.",
  "",
];

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, lines.join("\n"));
console.log(
  `Wrote ${output} and ${markdownCount} markdown docs in ${docsDir}`,
);
