import { createMcpHandler } from "mcp-handler";
import { z } from "zod";
// @ts-ignore — component documentation is intentionally authored as standalone JavaScript.
import buttonDocs from "../docs/ui/button";
import buttonGroupDocs from "../docs/ui/button-group";
import avatarDocs from "../docs/ui/avatar";

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      "list_orchid_components",
      {
        description: "Returns a small sample list of Orchid UI components.",
        inputSchema: {
          category: z.string().optional(),
        },
      },
      async ({ category }) => {
        const components = [buttonDocs, buttonGroupDocs, avatarDocs].filter(
          (component) => !category || component.category === category,
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
