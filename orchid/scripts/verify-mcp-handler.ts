/**
 * Smoke-test Orchid MCP handler (initialize + list_orchid_components).
 * Default: import api/mcp.ts in-process. Set MCP_URL to hit HTTP (e.g. dev server).
 */
import { POST } from "../api/mcp.ts";

const mcpUrl = process.env.MCP_URL?.trim();
const accept = "application/json, text/event-stream";

async function mcpPost(body: unknown, viaHttp: boolean) {
  const payload = JSON.stringify(body);
  if (!viaHttp) {
    return POST(
      new Request("http://orchid.local/api/mcp", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: accept },
        body: payload,
      }),
    );
  }

  return fetch(mcpUrl!, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: accept },
    body: payload,
  });
}

function parseToolText(responseText: string) {
  const dataLine = responseText.split("\n").find((line) => line.startsWith("data: "));
  if (!dataLine) {
    throw new Error(`Unexpected MCP response: ${responseText.slice(0, 400)}`);
  }
  const envelope = JSON.parse(dataLine.slice(6)) as {
    result?: { content?: Array<{ text?: string }> };
    error?: { message?: string };
  };
  if (envelope.error) {
    throw new Error(envelope.error.message ?? "MCP error");
  }
  const text = envelope.result?.content?.[0]?.text;
  if (!text) {
    throw new Error("MCP tool returned no text content.");
  }
  return JSON.parse(text) as { components: unknown[] };
}

const viaHttp = Boolean(mcpUrl);

const initRes = await mcpPost(
  {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: { name: "orchid-verify", version: "1.0" },
    },
  },
  viaHttp,
);

const initText = await initRes.text();
if (!initRes.ok) {
  throw new Error(`initialize failed: ${initRes.status} ${initText}`);
}

const callRes = await mcpPost(
  {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/call",
    params: {
      name: "list_orchid_components",
      arguments: {},
    },
  },
  viaHttp,
);

const callText = await callRes.text();
if (!callRes.ok) {
  throw new Error(`tools/call failed: ${callRes.status} ${callText}`);
}

const { components } = parseToolText(callText);
if (!Array.isArray(components) || components.length !== 45) {
  throw new Error(`Expected 45 components, got ${components?.length ?? 0}`);
}

const filteredRes = await mcpPost(
  {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "list_orchid_components",
      arguments: { name: "resource-picker" },
    },
  },
  viaHttp,
);
const filtered = parseToolText(await filteredRes.text());
if (filtered.components.length !== 1 || (filtered.components[0] as { name?: string }).name !== "resource-picker") {
  throw new Error("name filter failed for resource-picker");
}

const mode = viaHttp ? `HTTP ${mcpUrl}` : "in-process handler";
console.log(`MCP OK (${mode}): ${components.length} components, filter by name works.`);
