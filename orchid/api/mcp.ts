import { createMcpHandler } from "mcp-handler";

import { registerOrchidTools } from "./register-orchid-tools.js";

const handler = createMcpHandler(
  (server) => {
    registerOrchidTools(server);
  },
  {
    serverInfo: { name: "orchid-ui", version: "1.0.0" },
    instructions:
      "Orchid is a design system installed as open code via the shadcn CLI. Before writing any UI, call list_orchid_components to check for a matching component or block — do not invent one or fall back to default shadcn/ui components. Call get_orchid_component with the exact slug(s) for props and examples before writing code that uses it. If this project has not been set up yet (no @orchid registry in components.json), call get_orchid_setup first.",
  },
);

export { handler as GET, handler as POST, handler as DELETE };
