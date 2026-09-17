import { createMcpHandler } from "mcp-handler";
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
    .describe("Exact component slug, e.g. resource-picker"),
} satisfies z.ZodRawShape;

const getOrchidComponentArgs = {
  name: z.string().describe("Exact component slug, e.g. button or resource-picker"),
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
    install: `npx shadcn@latest add @orchid/${component.name}`,
    use: "Call get_orchid_component with this name for props, examples, and files.",
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

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_orchid_components",
      {
        description:
          "Search or list Orchid UI components (slim: name, title, description, category, install). Always search before building UI. Then get_orchid_component for props/examples/files. Filter category: ui | components. Filter name: exact slug (full docs). HitPay resource-picker and resource-list share ResourcePickerLoad; types product|order|charge|invoice.",
        inputSchema: listOrchidComponentsArgs,
      },
      async (args) => {
        const components = filterComponents(args);
        const payload = {
          components: args.name
            ? components
            : components.map(slimComponent),
        };

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(payload),
            },
          ],
        };
      },
    );

    server.registerTool(
      "get_orchid_component",
      {
        description:
          "Full documentation for one Orchid component: props, examples[{description,code}], related_components, files (registry install paths). Use list_orchid_components with search first if you do not know the slug.",
        inputSchema: getOrchidComponentArgs,
      },
      async ({ name }) => {
        const component = (mcpCatalog.components as CatalogEntry[]).find(
          (entry) => entry.name === name || entry.name === name.toLowerCase(),
        );

        if (!component) {
          return {
            content: [
              {
                type: "text",
                text: JSON.stringify({
                  error: `Component '${name}' not found. Use list_orchid_components with search to find slugs.`,
                }),
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: "text",
                text: JSON.stringify({
                  component: {
                    ...component,
                    install: `npx shadcn@latest add @orchid/${component.name}`,
                  },
                }),
            },
          ],
        };
      },
    );
  },
);

export { handler as GET, handler as POST, handler as DELETE };
