/**
 * Local stdio MCP for the sprite app (no ../orchid).
 * Same tools as orchid-ui: list_orchid_components, get_orchid_component.
 */
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerOrchidTools } from "./register-orchid-tools.ts";

serveStdio(() => {
  const server = new McpServer(
    { name: "orchid-ui", version: "1.0.0" },
    { capabilities: { tools: {} } },
  );
  registerOrchidTools(server);
  return server;
});
