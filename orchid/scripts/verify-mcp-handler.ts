/**
 * Smoke-test Orchid MCP handler (initialize, list, search, get).
 * Default: import api/mcp.ts in-process. Set MCP_URL to hit HTTP (e.g. http://127.0.0.1:5177/api/mcp).
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

const searchRes = await mcpPost(
  {
    jsonrpc: "2.0",
    id: 4,
    method: "tools/call",
    params: {
      name: "list_orchid_components",
      arguments: { search: "picker" },
    },
  },
  viaHttp,
);
const searched = parseToolText(await searchRes.text());
const searchNames = searched.components.map((c) => (c as { name?: string }).name);
if (!searchNames.includes("resource-picker")) {
  throw new Error(`search 'picker' missed resource-picker: ${searchNames.join(", ")}`);
}

const getRes = await mcpPost(
  {
    jsonrpc: "2.0",
    id: 5,
    method: "tools/call",
    params: {
      name: "get_orchid_component",
      arguments: { name: "button" },
    },
  },
  viaHttp,
);
const getText = await getRes.text();
if (!getRes.ok) {
  throw new Error(`get_orchid_component failed: ${getRes.status} ${getText}`);
}
const getDataLine = getText.split("\n").find((line) => line.startsWith("data: "));
if (!getDataLine) {
  throw new Error(`Unexpected get_orchid_component response: ${getText.slice(0, 400)}`);
}
const getEnvelope = JSON.parse(getDataLine.slice(6)) as {
  result?: { content?: Array<{ text?: string }> };
};
const getPayload = JSON.parse(getEnvelope.result?.content?.[0]?.text ?? "{}") as {
  component?: { name?: string; examples?: unknown[]; install?: string };
};
if (getPayload.component?.name !== "button" || !getPayload.component.examples?.length) {
  throw new Error("get_orchid_component did not return full button docs");
}
if (
  getPayload.component &&
  "install" in getPayload.component === false
) {
  throw new Error("get_orchid_component missing install command");
}

const batchRes = await mcpPost(
  {
    jsonrpc: "2.0",
    id: 6,
    method: "tools/call",
    params: {
      name: "get_orchid_component",
      arguments: { names: ["button", "page-layout", "missing-slug"] },
    },
  },
  viaHttp,
);
const batchText = await batchRes.text();
if (!batchRes.ok) {
  throw new Error(`get_orchid_component names[] failed: ${batchRes.status} ${batchText}`);
}
const batch = parseToolText(batchText) as {
  components: Array<{ name?: string; examples?: unknown[] }>;
  not_found?: string[];
};
const batchNames = batch.components.map((entry) => entry.name);
if (
  batchNames.length !== 2
  || !batchNames.includes("button")
  || !batchNames.includes("page-layout")
  || !batch.components.every((entry) => (entry.examples?.length ?? 0) > 0)
  || !batch.not_found?.includes("missing-slug")
) {
  throw new Error(`get_orchid_component names[] returned unexpected payload: ${JSON.stringify(batchNames)}`);
}

const listed = components[0] as { examples?: unknown; install?: string };
if (listed?.examples) {
  throw new Error("list without name should be slim (no examples)");
}

const mode = viaHttp ? `HTTP ${mcpUrl}` : "in-process handler";
console.log(
  `MCP OK (${mode}): ${components.length} components, name filter, search, get, and batch get work.`,
);
