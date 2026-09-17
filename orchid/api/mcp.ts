import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

import mcpCatalog from "./mcp-catalog.json";

type CatalogEntry = (typeof mcpCatalog.components)[number];

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_orchid_components",
      {
        description:
          "Returns Orchid component docs as JSON { components: [...] }. Each entry: name, title, description, category, props, examples[{description,code}], related_components, files (registry install paths). Filter category: ui | components. Filter name: e.g. resource-picker | resource-list. HitPay: both share ResourcePickerLoad + loadResourcePickerPage; types product|order|charge|invoice; API shapes in app/docs/hitpay/*.md. Prefer examples titled App Studio load for production wiring.",
        inputSchema: {
          category: z.string().optional(),
          name: z.string().optional(),
        },
      },
      async ({ category, name }) => {
        const components = (mcpCatalog.components as CatalogEntry[]).filter(
          (component) =>
            (!category || component.category === category) &&
            (!name || component.name === name),
        );

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ components }),
            },
          ],
        };
      },
    );
  },
);

export { handler as GET, handler as POST, handler as DELETE };
