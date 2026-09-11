import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto'
import { getRequestHeader } from '@tanstack/react-start/server'

import { db } from '#/lib/server/db'
import { ensureMigrations } from '#/lib/server/migrate'
import { onScheduledWake } from '#/lib/server/hitpay-wake-hook'
import type {
  WakeChannel,
  WakeDeliveryStatus,
  WakeDestination,
  WakeEvent,
  WakeJson,
  WakeReceiveStatus,
  WakeRow,
} from '#/lib/server/hitpay-wake-types'

export type { WakeChannel, WakeDeliveryStatus, WakeDestination, WakeEvent, WakeReceiveStatus, WakeRow }

const EVENT_COLUMNS =
  'id, key, source, frequency, timezone, triggered_at, config, data, status, received_at, processed_at, error'
const ROW_COLUMNS =
  'id, event_id, key, source, triggered_at, payload, status, delivery_status, channel, destination, delivered_at, delivery_error'
const DESTINATION_COLUMNS = 'id, key, channel, destination, enabled'

const CHANNELS = new Set<WakeChannel>(['in_app', 'discord', 'resend', 'twilio'])
const RECEIVE_STATUSES = new Set<WakeReceiveStatus>(['received', 'processed', 'failed'])
const DELIVERY_STATUSES = new Set<WakeDeliveryStatus>(['pending', 'sent', 'skipped', 'failed'])

function signaturesMatch(left: string, right: string): boolean {
  const a = Buffer.from(left)
  const b = Buffer.from(right)

  return a.length === b.length && timingSafeEqual(a, b)
}

function verifySignature(rawBody: string, header: string): boolean {
  const secret = process.env.HITPAY_SESSION_SECRET?.trim()

  if (!secret) {
    throw new Error('HITPAY_SESSION_SECRET is not set on this server.')
  }

  const prefix = 'sha256='
  const given = header.trim()

  if (!given.toLowerCase().startsWith(prefix)) {
    return false
  }

  const expected = `${prefix}${createHmac('sha256', secret).update(rawBody).digest('hex')}`

  return signaturesMatch(expected, given)
}

function asObject(value: unknown): { [key: string]: WakeJson } {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return {}
  }

  return value as { [key: string]: WakeJson }
}

function asRows(value: unknown): WakeJson[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value.slice(0, 50) as WakeJson[]
}

function nullableString(value: unknown): string | null {
  return typeof value === 'string' && value !== '' ? value : null
}

function parseIncoming(rawBody: string): Pick<
  WakeEvent,
  'key' | 'source' | 'frequency' | 'timezone' | 'triggered_at' | 'config' | 'data'
> {
  let parsed: unknown

  try {
    parsed = JSON.parse(rawBody) as unknown
  } catch {
    throw new Error('Wake payload is not JSON.')
  }

  const body = asObject(parsed)

  if (body.reason !== 'scheduled_wake') {
    throw new Error('Wake payload reason is invalid.')
  }

  if (typeof body.key !== 'string' || !/^[a-z][a-z0-9_-]*$/.test(body.key)) {
    throw new Error('Wake payload key is invalid.')
  }

  return {
    key: body.key,
    source: typeof body.source === 'string' && body.source !== '' ? body.source : 'none',
    frequency: typeof body.frequency === 'string' ? body.frequency : '',
    timezone: typeof body.timezone === 'string' ? body.timezone : '',
    triggered_at: typeof body.triggered_at === 'string' ? body.triggered_at : new Date().toISOString(),
    config: asObject(body.config),
    data: asRows(body.data),
  }
}

function mapEvent(row: Record<string, unknown>): WakeEvent {
  const status = RECEIVE_STATUSES.has(row.status as WakeReceiveStatus)
    ? (row.status as WakeReceiveStatus)
    : 'received'

  return {
    id: String(row.id),
    key: String(row.key),
    source: String(row.source),
    frequency: String(row.frequency),
    timezone: String(row.timezone),
    triggered_at: String(row.triggered_at),
    config: asObject(safeJson(row.config, {})),
    data: asRows(safeJson(row.data, [])),
    status,
    received_at: String(row.received_at ?? row.created_at ?? ''),
    processed_at: nullableString(row.processed_at),
    error: nullableString(row.error),
  }
}

function mapRow(row: Record<string, unknown>): WakeRow {
  const status = RECEIVE_STATUSES.has(row.status as WakeReceiveStatus)
    ? (row.status as WakeReceiveStatus)
    : 'received'
  const deliveryStatus = DELIVERY_STATUSES.has(row.delivery_status as WakeDeliveryStatus)
    ? (row.delivery_status as WakeDeliveryStatus)
    : 'pending'

  return {
    id: String(row.id),
    event_id: String(row.event_id),
    key: String(row.key),
    source: String(row.source),
    triggered_at: String(row.triggered_at),
    payload: asObject(safeJson(row.payload, {})),
    status,
    delivery_status: deliveryStatus,
    channel: nullableString(row.channel),
    destination: nullableString(row.destination),
    delivered_at: nullableString(row.delivered_at),
    delivery_error: nullableString(row.delivery_error),
  }
}

function mapDestination(row: Record<string, unknown>): WakeDestination {
  const channel = CHANNELS.has(row.channel as WakeChannel) ? (row.channel as WakeChannel) : 'in_app'

  return {
    id: String(row.id),
    key: String(row.key),
    channel,
    destination: String(row.destination ?? ''),
    enabled: Number(row.enabled) === 1,
  }
}

function safeJson(value: unknown, fallback: unknown): unknown {
  try {
    return JSON.parse(String(value ?? JSON.stringify(fallback)))
  } catch {
    return fallback
  }
}

export async function persistScheduledWake(rawBody: string): Promise<WakeEvent | null> {
  const header = getRequestHeader('x-hitpay-signature') ?? ''

  if (!verifySignature(rawBody, header)) {
    throw new Error('Wake signature is invalid.')
  }

  const incoming = parseIncoming(rawBody)
  await ensureMigrations()

  const existing = await db.execute({
    sql: `SELECT ${EVENT_COLUMNS} FROM wake_events WHERE key = ? AND triggered_at = ? LIMIT 1`,
    args: [incoming.key, incoming.triggered_at],
  })

  if (existing.rows[0]) {
    return mapEvent(existing.rows[0] as Record<string, unknown>)
  }

  const receivedAt = new Date().toISOString()
  const event: WakeEvent = {
    id: randomUUID(),
    ...incoming,
    status: 'received',
    received_at: receivedAt,
    processed_at: null,
    error: null,
  }

  const statements = [
    {
      sql: `INSERT INTO wake_events (
              id, key, source, frequency, timezone, triggered_at, config, data,
              status, received_at, processed_at, error, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'received', ?, NULL, NULL, ?)`,
      args: [
        event.id,
        event.key,
        event.source,
        event.frequency,
        event.timezone,
        event.triggered_at,
        JSON.stringify(event.config),
        JSON.stringify(event.data),
        receivedAt,
        receivedAt,
      ],
    },
  ]

  for (const item of event.data) {
    statements.push({
      sql: `INSERT INTO wake_rows (
              id, event_id, key, source, triggered_at, payload, status, delivery_status,
              channel, destination, delivered_at, delivery_error, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, 'received', 'pending', NULL, NULL, NULL, NULL, ?)`,
      args: [
        randomUUID(),
        event.id,
        event.key,
        event.source,
        event.triggered_at,
        JSON.stringify(asObject(item)),
        receivedAt,
      ],
    })
  }

  await db.batch(statements)
  await onScheduledWake(event)

  return event
}

export async function listWakeEvents(input: { key?: string; status?: WakeReceiveStatus; limit?: number } = {}): Promise<WakeEvent[]> {
  await ensureMigrations()
  const limit = Math.min(Math.max(input.limit ?? 20, 1), 50)
  const clauses = []
  const args: Array<string | number> = []

  if (input.key) {
    clauses.push('key = ?')
    args.push(input.key)
  }

  if (input.status) {
    clauses.push('status = ?')
    args.push(input.status)
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  const result = await db.execute({
    sql: `SELECT ${EVENT_COLUMNS} FROM wake_events ${where} ORDER BY triggered_at DESC LIMIT ?`,
    args: [...args, limit],
  })

  return result.rows.map((row) => mapEvent(row as Record<string, unknown>))
}

export async function listLatestWakeRows(input: { key: string }): Promise<WakeRow[]> {
  await ensureMigrations()
  const latest = await db.execute({
    sql: 'SELECT id FROM wake_events WHERE key = ? ORDER BY triggered_at DESC LIMIT 1',
    args: [input.key],
  })
  const eventId = latest.rows[0]?.id

  if (eventId === undefined) {
    return []
  }

  return listWakeRows({ eventId: String(eventId) })
}

export async function listWakeRows(
  input: { key?: string; eventId?: string; deliveryStatus?: WakeDeliveryStatus; limit?: number } = {},
): Promise<WakeRow[]> {
  await ensureMigrations()
  const limit = Math.min(Math.max(input.limit ?? 50, 1), 100)
  const clauses = []
  const args: Array<string | number> = []

  if (input.eventId) {
    clauses.push('event_id = ?')
    args.push(input.eventId)
  }

  if (input.key) {
    clauses.push('key = ?')
    args.push(input.key)
  }

  if (input.deliveryStatus) {
    clauses.push('delivery_status = ?')
    args.push(input.deliveryStatus)
  }

  const where = clauses.length ? `WHERE ${clauses.join(' AND ')}` : ''
  const result = await db.execute({
    sql: `SELECT ${ROW_COLUMNS} FROM wake_rows ${where} ORDER BY triggered_at DESC, id LIMIT ?`,
    args: [...args, limit],
  })

  return result.rows.map((row) => mapRow(row as Record<string, unknown>))
}

export async function updateWakeEventStatus(input: {
  id: string
  status: WakeReceiveStatus
  error?: string | null
}): Promise<void> {
  if (!RECEIVE_STATUSES.has(input.status)) {
    throw new Error('Wake event status is invalid.')
  }

  await ensureMigrations()
  const processedAt = input.status === 'received' ? null : new Date().toISOString()

  await db.execute({
    sql: 'UPDATE wake_events SET status = ?, processed_at = ?, error = ? WHERE id = ?',
    args: [input.status, processedAt, input.error ?? null, input.id],
  })
}

export async function updateWakeRowDelivery(input: {
  id: string
  deliveryStatus: WakeDeliveryStatus
  channel?: string | null
  destination?: string | null
  error?: string | null
}): Promise<void> {
  if (!DELIVERY_STATUSES.has(input.deliveryStatus)) {
    throw new Error('Wake delivery status is invalid.')
  }

  await ensureMigrations()
  const deliveredAt = input.deliveryStatus === 'sent' ? new Date().toISOString() : null

  await db.execute({
    sql: `UPDATE wake_rows
          SET delivery_status = ?, channel = ?, destination = ?, delivered_at = ?, delivery_error = ?
          WHERE id = ?`,
    args: [
      input.deliveryStatus,
      input.channel ?? null,
      input.destination ?? null,
      deliveredAt,
      input.error ?? null,
      input.id,
    ],
  })
}

export async function listWakeDestinations(input: { key?: string } = {}): Promise<WakeDestination[]> {
  await ensureMigrations()
  const result = input.key
    ? await db.execute({
        sql: `SELECT ${DESTINATION_COLUMNS} FROM wake_destinations WHERE key = ? ORDER BY channel, destination`,
        args: [input.key],
      })
    : await db.execute({
        sql: `SELECT ${DESTINATION_COLUMNS} FROM wake_destinations ORDER BY key, channel, destination`,
        args: [],
      })

  return result.rows.map((row) => mapDestination(row as Record<string, unknown>))
}

export async function upsertWakeDestination(input: {
  key: string
  channel: WakeChannel
  destination: string
  enabled?: boolean
}): Promise<WakeDestination> {
  if (!/^[a-z][a-z0-9_-]*$/.test(input.key) || !CHANNELS.has(input.channel) || input.destination.trim() === '') {
    throw new Error('Wake destination is invalid.')
  }

  await ensureMigrations()
  const now = new Date().toISOString()
  const existing = await db.execute({
    sql: `SELECT ${DESTINATION_COLUMNS} FROM wake_destinations WHERE key = ? AND channel = ? AND destination = ? LIMIT 1`,
    args: [input.key, input.channel, input.destination.trim()],
  })

  if (existing.rows[0]) {
    const current = mapDestination(existing.rows[0] as Record<string, unknown>)
    const enabled = input.enabled ?? current.enabled

    await db.execute({
      sql: 'UPDATE wake_destinations SET enabled = ?, updated_at = ? WHERE id = ?',
      args: [enabled ? 1 : 0, now, current.id],
    })

    return { ...current, enabled }
  }

  const row: WakeDestination = {
    id: randomUUID(),
    key: input.key,
    channel: input.channel,
    destination: input.destination.trim(),
    enabled: input.enabled ?? true,
  }

  await db.execute({
    sql: `INSERT INTO wake_destinations (id, key, channel, destination, enabled, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [row.id, row.key, row.channel, row.destination, row.enabled ? 1 : 0, now, now],
  })

  return row
}

export async function deleteWakeDestination(input: { id: string }): Promise<void> {
  await ensureMigrations()
  await db.execute({
    sql: 'DELETE FROM wake_destinations WHERE id = ?',
    args: [input.id],
  })
}
