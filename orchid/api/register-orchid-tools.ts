import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import mcpCatalog from "./mcp-catalog.json" with { type: "json" };

const listOrchidComponentsArgs = {
  search: z
    .string()
    .optional()
    .describe(
      "Case-insensitive search across name, title, description, category, related components, and example descriptions. Use this to explore; then get_orchid_component for full docs.",
    ),
  category: z
    .string()
    .optional()
    .describe("Filter by category: ui | components"),
  name: z
    .string()
    .optional()
    .describe("Exact component slug, e.g. data-table"),
} satisfies z.ZodRawShape;

const getOrchidComponentArgs = {
  name: z
    .string()
    .optional()
    .describe("One slug, e.g. button. Prefer names when fetching several."),
  names: z
    .array(z.string())
    .optional()
    .describe(
      'One or more slugs in a single call, e.g. ["button","page-layout","toast"]. Full props/examples for each.',
    ),
} satisfies z.ZodRawShape;

type CatalogEntry = (typeof mcpCatalog.components)[number];

function matchesSearch(component: CatalogEntry, query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return true;

  const haystack = [
    component.name,
    component.title,
    component.description,
    component.category,
    ...(component.related_components ?? []),
    ...(component.examples ?? []).map((example) => example.description),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(q);
}

function slimComponent(component: CatalogEntry) {
  return {
    name: component.name,
    title: component.title,
    description: component.description,
    category: component.category,
    related_components: component.related_components,
    example_count: component.examples?.length ?? 0,
    install: `npx shadcn@latest add @orchid/${component.name} -y --overwrite`,
    use: "Call get_orchid_component with name or names[] for props, examples, and files.",
  };
}

function filterComponents(args: {
  search?: string;
  category?: string;
  name?: string;
}) {
  const { search, category, name } = args;
  return (mcpCatalog.components as CatalogEntry[]).filter(
    (component) =>
      (!category || component.category === category) &&
      (!name || component.name === name) &&
      (!search || matchesSearch(component, search)),
  );
}

function withInstall(component: CatalogEntry) {
  return {
    ...component,
    install: `npx shadcn@latest add @orchid/${component.name} -y --overwrite`,
  };
}

function findComponent(slug: string) {
  const key = slug.trim().toLowerCase();
  return (mcpCatalog.components as CatalogEntry[]).find(
    (entry) => entry.name === slug || entry.name === key,
  );
}

function requestedSlugs(name?: string, names?: string[]) {
  const slugs = [
    ...(name?.trim() ? [name.trim()] : []),
    ...(names ?? []).map((item) => item.trim()).filter(Boolean),
  ];
  return [...new Set(slugs)];
}

function jsonResult(payload: unknown, isError = false) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(payload) }],
    ...(isError ? { isError: true } : {}),
  };
}

const REGISTRY_HOST = "https://orchid-ui-hitpay.vercel.app";

/**
 * Single source of truth for Orchid's one-time project setup, returned by
 * the get_orchid_setup MCP tool and rendered on the docs site
 * (docs/doc-setup-steps.tsx) so the steps are never hand-duplicated.
 */
export const SETUP_GUIDE = {
  summary:
    "Orchid installs as open code via the shadcn CLI. Run these steps once per project before calling `add` for any component. list_orchid_components / get_orchid_component work without this setup.",
  steps: [
    {
      step: 1,
      title: "Initialize with shadcn",
      command: "bunx --bun shadcn@latest init -t vite",
      note: "-t accepts next | vite | start | react-router | astro. Generates components.json and a Tailwind CSS v4 project.",
    },
    {
      step: 2,
      title: "Point components.json at the Orchid registry",
      file: "components.json",
      patch: { registries: { "@orchid": `${REGISTRY_HOST}/r/{name}.json` } },
      note: `Merge into the existing components.json, don't replace it. Use the per-item template above, not ${REGISTRY_HOST}/registry.json directly — that URL is the full browsable catalog, not what the CLI fetches per component.`,
    },
    {
      step: 3,
      title: "Install the Orchid CSS variables",
      file: "the global stylesheet referenced by components.json (e.g. src/styles.css)",
      append: `@import "${REGISTRY_HOST}/orchid-tokens.css";`,
      note: 'Place after `@import "tailwindcss";`. Variables use the --oc-* prefix (--oc-background, --oc-primary, ...), mapped to Tailwind utilities like bg-oc-background. Override under :root (light) and .dark (dark); keep the variable names as-is.',
    },
    {
      step: 4,
      title: "Install components",
      command: "bunx --bun shadcn@latest add @orchid/all",
      note: "Use @orchid/all for a new project (installs the full catalog, registry dependencies resolve automatically). For an existing project, install one slug at a time with the install command from list_orchid_components/get_orchid_component.",
    },
  ],
  registry_catalog_url: `${REGISTRY_HOST}/registry.json`,
  css_tokens_url: `${REGISTRY_HOST}/orchid-tokens.css`,
};

export function registerOrchidTools(server: McpServer) {
  server.registerTool(
    "get_orchid_setup",
    {
      description:
        "One-time project setup: initialize shadcn, configure the @orchid registry in components.json, and install Orchid's CSS variables. Call this before the first `add` command in a project that doesn't have Orchid configured yet. No arguments.",
      inputSchema: {},
    },
    async () => jsonResult(SETUP_GUIDE),
  );

  server.registerTool(
    "list_orchid_components",
    {
      description:
        "Search or list Orchid UI components (slim: name, title, description, category, install). Always search before building UI. Then get_orchid_component with name or names[] for props/examples/files. Filter category: ui | components. Filter name: exact slug (full docs). If the project isn't set up yet, call get_orchid_setup first.",
      inputSchema: listOrchidComponentsArgs,
    },
    async (args) => {
      const components = filterComponents(args);
      const payload = {
        components: args.name ? components : components.map(slimComponent),
      };

      return jsonResult(payload);
    },
  );

  server.registerTool(
    "get_orchid_component",
    {
      description:
        "Full docs for one or more Orchid components: props, examples[{description,code}], related_components, files. Pass name for one slug, or names for several in one call. Use list_orchid_components with search first if you do not know the slugs.",
      inputSchema: getOrchidComponentArgs,
    },
    async ({ name, names }) => {
      const slugs = requestedSlugs(name, names);

      if (slugs.length === 0) {
        return jsonResult(
          {
            error:
              "Pass name or names[]. Use list_orchid_components with search to find slugs.",
          },
          true,
        );
      }

      const components = [];
      const notFound = [];

      for (const slug of slugs) {
        const match = findComponent(slug);
        if (match) {
          components.push(withInstall(match));
        } else {
          notFound.push(slug);
        }
      }

      if (components.length === 0) {
        return jsonResult(
          {
            error: `Component(s) not found: ${notFound.join(", ")}. Use list_orchid_components with search to find slugs.`,
            not_found: notFound,
            components: [],
          },
          true,
        );
      }

      const payload: {
        components: ReturnType<typeof withInstall>[];
        not_found?: string[];
        component?: ReturnType<typeof withInstall>;
      } = { components };

      if (notFound.length) {
        payload.not_found = notFound;
      }
      if (slugs.length === 1) {
        payload.component = components[0];
      }

      return jsonResult(payload);
    },
  );
}
