import { createMcpHandler } from "mcp-handler";

import { registerOrchidTools } from "./register-orchid-tools.js";

const handler = createMcpHandler((server) => {
  registerOrchidTools(server);
});

export { handler as GET, handler as POST, handler as DELETE };
