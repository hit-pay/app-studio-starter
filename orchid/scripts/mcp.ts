/**
 * Local stdio MCP — same shape as `npx shadcn@latest mcp`.
 * JSON-RPC on stdin/stdout (no HTTP GET/POST).
 */
import { McpServer } from "@modelcontextprotocol/server";
import { serveStdio } from "@modelcontextprotocol/server/stdio";

import { registerOrchidTools } from "../api/register-orchid-tools.ts";

serveStdio(() => {
  const server = new McpServer(
    { name: "orchid-ui", version: "1.0.0" },
    { capabilities: { tools: {} } },
  );
  registerOrchidTools(server);
  return server;
});
