import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";

import mcpCatalog from "./orchid-ui-catalog.json" with { type: "json" };

const listOrchidComponentsArgs = {
  search: z
    .string()
    .optional()
    .describe(
      "Case-insensitive search. Spaces match hyphenated slugs (file upload → file-upload). Multiple words match a phrase (AND) or a list of names (OR on name/title). Searches name, title, description, category, related components, and example descriptions.",
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

function normalizeSearchText(value: string) {
  return value.toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

function matchesSearch(component: CatalogEntry, query: string) {
  const tokens = normalizeSearchText(query).split(" ").filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = normalizeSearchText(
    [
      component.name,
      component.title,
      component.description,
      component.category,
      ...(component.related_components ?? []),
      ...(component.examples ?? []).map((example) => example.description),
    ]
      .filter(Boolean)
      .join(" "),
  );

  const nameHaystack = normalizeSearchText(
    [component.name, component.title].filter(Boolean).join(" "),
  );

  if (haystack.includes(tokens.join(" "))) return true;
  if (tokens.every((token) => haystack.includes(token))) return true;
  if (tokens.length > 1 && tokens.some((token) => nameHaystack.includes(token))) {
    return true;
  }

  return false;
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

export function registerOrchidTools(server: McpServer) {
  server.registerTool(
    "list_orchid_components",
    {
      description:
        "Search or list Orchid UI components (slim: name, title, description, category, install). Always search before building UI. Then get_orchid_component with name or names[] for props/examples/files. Filter category: ui | components. Filter name: exact slug (full docs).",
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
