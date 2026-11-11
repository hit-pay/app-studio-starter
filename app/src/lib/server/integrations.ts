import { getNangoSession, request } from '#/lib/server/request'
import type { NangoSession } from '#/lib/server/request'

export type IntegrationStatus = 'requested' | 'granted' | 'declined'

export type Integration = {
  key: string
  title: string
  image: string | null
  connected: boolean
  needs_reconnect: boolean
  status: IntegrationStatus | null
  reason: string | null
  requested_by_run_id: string | null
}

export type IntegrationsResponse = {
  integrations: Integration[]
  available: { key: string; title: string }[]
}

export type IntegrationRequestResult = {
  key: string
  title: string
  status: IntegrationStatus
  connected: boolean
  needs_reconnect: boolean
}

export type NangoToolResult = {
  content: { type: string; text?: string; [key: string]: unknown }[]
  structuredContent?: unknown
  isError?: boolean
}

/** Integrations the business can connect and what this app has been allowed. */
export function listIntegrations(): Promise<IntegrationsResponse> {
  return request.get<IntegrationsResponse>({ endpoint: '/integrations' })
}

/**
 * Asks the business owner to allow an integration. Works only with the run
 * token the agent gets during generation, not from a signed-in viewer.
 */
export function requestIntegration(key: string, reason?: string): Promise<IntegrationRequestResult> {
  return request.post<IntegrationRequestResult>({
    endpoint: '/integrations/requests',
    body: reason ? { key, reason } : { key },
  })
}

/** Tools the Nango session exposes for the allowed integrations. Null without a session. */
export async function listNangoTools(): Promise<{ name: string; description?: string; inputSchema?: unknown }[] | null> {
  const session = await getNangoSession()
  if (!session) return null
  const result = await mcp<{ tools: { name: string; description?: string; inputSchema?: unknown }[] }>(
    session,
    'tools/list',
    {},
  )
  return result.tools
}

/**
 * Calls one Nango MCP tool, for example to read rows from a Google Sheet.
 * Returns null when the business owner has not allowed any integration yet.
 */
export async function callNangoTool(
  name: string,
  args: Record<string, unknown> = {},
): Promise<NangoToolResult | null> {
  const session = await getNangoSession()
  if (!session) return null
  const result = await mcp<NangoToolResult>(session, 'tools/call', { name, arguments: args })
  if (result.isError) {
    const text = result.content.map((item) => item.text).filter(Boolean).join(' ')
    throw new Error(`The ${name} tool failed${text ? `: ${text}` : '.'}`)
  }
  return result
}

const MCP_PROTOCOL_VERSION = '2025-06-18'

// A minimal MCP client over streamable HTTP: initialize, one request, close.
async function mcp<T>(session: NangoSession, method: string, params: unknown): Promise<T> {
  const init = await rpc(session, null, { jsonrpc: '2.0', id: 1, method: 'initialize', params: {
    protocolVersion: MCP_PROTOCOL_VERSION,
    capabilities: {},
    clientInfo: { name: 'app-studio-app', version: '1.0.0' },
  } })
  const sessionId = init.sessionId

  try {
    await rpc(session, sessionId, { jsonrpc: '2.0', method: 'notifications/initialized' })
    const response = await rpc(session, sessionId, { jsonrpc: '2.0', id: 2, method, params })
    return response.result as T
  } finally {
    if (sessionId) {
      await fetch(session.mcpUrl, {
        method: 'DELETE',
        headers: mcpHeaders(session, sessionId),
        signal: AbortSignal.timeout(5_000),
      }).catch(() => undefined)
    }
  }
}

function mcpHeaders(session: NangoSession, sessionId: string | null): Headers {
  const headers = new Headers({
    accept: 'application/json, text/event-stream',
    authorization: `Bearer ${session.token}`,
    'content-type': 'application/json',
    'mcp-protocol-version': MCP_PROTOCOL_VERSION,
  })
  if (sessionId) headers.set('mcp-session-id', sessionId)
  return headers
}

async function rpc(
  session: NangoSession,
  sessionId: string | null,
  message: { jsonrpc: '2.0'; id?: number; method: string; params?: unknown },
): Promise<{ sessionId: string | null; result?: unknown }> {
  const response = await fetch(session.mcpUrl, {
    method: 'POST',
    headers: mcpHeaders(session, sessionId),
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(60_000),
  })
  const nextSessionId = response.headers.get('mcp-session-id') ?? sessionId

  if (!response.ok) {
    throw new Error(`Unable to reach the integration (HTTP ${response.status}, method=${message.method}).`)
  }
  if (message.id === undefined) return { sessionId: nextSessionId }

  const reply = await readReply(response, message.id)
  if (reply.error) {
    throw new Error(`The integration returned an error (method=${message.method}): ${reply.error.message ?? 'unknown error'}`)
  }
  return { sessionId: nextSessionId, result: reply.result }
}

type JsonRpcReply = { id?: number; result?: unknown; error?: { message?: string } }

async function readReply(response: Response, id: number): Promise<JsonRpcReply> {
  const text = await response.text()
  if (!(response.headers.get('content-type') ?? '').includes('text/event-stream')) {
    return JSON.parse(text) as JsonRpcReply
  }

  for (const event of text.split(/\r?\n\r?\n/)) {
    const data = event
      .split(/\r?\n/)
      .filter((line) => line.startsWith('data:'))
      .map((line) => line.slice(5).trimStart())
      .join('\n')
    if (!data) continue
    const reply = JSON.parse(data) as JsonRpcReply
    if (reply.id === id) return reply
  }
  throw new Error('The integration closed the connection without replying.')
}
