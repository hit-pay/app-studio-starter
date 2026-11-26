import type { Host, NangoSession } from './host.ts'

// Outside services the owner allowed (Google Sheets, Calendar, WhatsApp, HitPay, …), reached through one Nango
// session for every allowed integration. Server only: never send the session token to the browser.
//
// Two ways to call an integration:
// * nangoAction: run one of its Nango actions, such as `google-mail__list-messages`. Find the name and input with
//   the `nango_tool_search` MCP tool while building; the app cannot list them at runtime.
// * nangoRequest: call its own API directly, for an integration with no action for the job. HitPay has no actions,
//   so HitPay always goes through nangoRequest. Nango adds the credentials; never send a key or Authorization header.

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

type ToolResult = {
  content: { type: string; text?: string; [key: string]: unknown }[]
  structuredContent?: unknown
  isError?: boolean
}

export type NangoRequest = {
  /** The integration's key, as `bun run integrations list` prints it, e.g. `hitpay`. */
  integration: string
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  /** The path on the provider's API, starting with `/`, e.g. `/v1/products`. */
  path: string
  /** An array value is sent once per item; name the key `statuses[]` when the API expects that form. */
  query?: Record<string, string | number | (string | number)[]>
  /** Sent as JSON. */
  body?: unknown
}

export type NangoResponse<T> = { status: number; body: T }

/** The provider answered with an error. `status` is its HTTP status: 401 or 403 usually means a missing scope. */
export class IntegrationError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: unknown,
  ) {
    super(message)
  }
}

/** Integrations the business can connect and what this app has been allowed. */
export function listIntegrations(host: Host): Promise<IntegrationsResponse> {
  return host.get<IntegrationsResponse>('/integrations')
}

/**
 * Asks the business owner to allow an integration. Works only with the run
 * token the agent gets during generation, not from a signed-in viewer.
 */
export function requestIntegration(host: Host, key: string, reason?: string): Promise<IntegrationRequestResult> {
  return host.post<IntegrationRequestResult>('/integrations/requests', reason ? { key, reason } : { key })
}

/**
 * Runs a Nango action and returns its output, e.g. `nangoAction(host, 'google-mail__list-messages', { maxResults: 20 })`.
 * Null until the owner allows an integration.
 */
export async function nangoAction<T = unknown>(host: Host, tool: string, input: Record<string, unknown> = {}): Promise<T | null> {
  const result = await callTool(host, 'nango_execute', { tool, input, goal: GOAL, intent: `Run ${tool} for this app's page` })
  if (!result) return null
  if (result.structuredContent !== undefined && !isEmptyObject(result.structuredContent)) return result.structuredContent as T

  const text = result.content.map((item) => item.text ?? '').join('')
  try {
    return JSON.parse(text) as T
  } catch {
    return text as T
  }
}

/**
 * Calls an integration's own API through Nango, which adds the connection's credentials. Throws IntegrationError
 * when the provider answers 4xx or 5xx. Null until the owner allows an integration.
 */
export async function nangoRequest<T = unknown>(host: Host, request: NangoRequest): Promise<NangoResponse<T> | null> {
  const method = request.method ?? 'GET'
  const result = await callTool(host, 'nango_proxy', {
    integration: request.integration,
    method,
    path: request.path,
    ...(request.query ? { query_params: request.query } : {}),
    ...(request.body !== undefined ? { body: request.body } : {}),
    goal: GOAL,
    intent: `${method} ${request.path}: the integration has no action for this`,
  })
  if (!result) return null

  const reply = result.structuredContent as { status?: number; body?: unknown } | undefined
  const status = reply?.status ?? 0
  const body = reply?.body as T
  if (status < 200 || status >= 300) {
    throw new IntegrationError(`${request.integration} answered HTTP ${status} to ${method} ${request.path}${errorText(body)}`, status, body)
  }
  return { status, body }
}

// Nango asks every call for the user's task. An app serves many viewers, so the task is the app's own.
const GOAL = 'Serve a page of this App Studio app with data from the business integrations'

async function callTool(host: Host, name: string, args: Record<string, unknown>): Promise<ToolResult | null> {
  const session = await host.nangoSession()
  if (!session) return null
  const result = await mcp<ToolResult>(session, 'tools/call', { name, arguments: args })
  if (result.isError) {
    const text = result.content.map((item) => item.text).filter(Boolean).join(' ')
    throw new Error(`The integration call failed${text ? `: ${text}` : '.'}`)
  }
  return result
}

function errorText(body: unknown): string {
  if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') return `: ${body.message}`
  return ''
}

function isEmptyObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && Object.keys(value).length === 0
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
        headers: mcpHeaders(session, sessionId)
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
    body: JSON.stringify(message)
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
