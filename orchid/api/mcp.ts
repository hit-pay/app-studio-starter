import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

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
        const components = [{ name: "button", category: "ui" }].filter(
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
