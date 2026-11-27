import { HttpError } from './app.ts'
import { listIntegrations } from './integrations.ts'
import type { Host } from './host.ts'
import type { RoleTitle, User } from './types.ts'

// What the Daily Checklist app stores, as the API returns it, and the helpers its routes share.

/** Roles that define checklists, see every location's progress and export. Everyone else fills checklists in. */
export const MANAGERS: RoleTitle[] = ['Owner', 'Admin', 'Manager']

export const KINDS = ['opening', 'closing', 'other'] as const
export type ChecklistKind = (typeof KINDS)[number]

export type ChecklistItem = { id: string; label: string; requiresPhoto: boolean }

export type Checklist = {
  id: string
  title: string
  kind: ChecklistKind
  /** Null: every location. */
  locationId: string | null
  cashCount: boolean
  items: ChecklistItem[]
}

export type RunStatus = 'open' | 'completed'

export type RunSummary = {
  id: string
  checklistId: string
  title: string
  kind: ChecklistKind
  locationId: string
  date: string
  status: RunStatus
  done: number
  total: number
  completedByName: string | null
  completedAt: string | null
}

export type RunItem = ChecklistItem & { done: boolean; doneByName: string | null; doneAt: string | null }

export type RunDetail = RunSummary & {
  cashCount: boolean
  cashCounted: number | null
  cashExpected: number | null
  currency: string | null
  note: string | null
  items: RunItem[]
}

/** Files attached to a ticked item are stored with this entity type and `photoOwner()` as the entity id. */
export const PHOTO_ENTITY = 'run-item'

export function photoOwner(runId: string, itemId: string): string {
  return `${runId}:${itemId}`
}

export function isManager(user: User): boolean {
  return (MANAGERS as readonly string[]).includes(user.role?.title ?? '')
}

export function displayName(user: User): string {
  return user.name?.trim() || user.email
}

/** A `YYYY-MM-DD` day. The browser sends its own today, so a day follows the business's clock, not the server's. */
export function day(value: unknown, field = 'Date'): string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(`${value}T00:00:00Z`))) {
    throw new HttpError(400, `${field} must be a date (YYYY-MM-DD).`)
  }
  return value
}

/**
 * Whether the owner allowed `key` for this app and it is connected. A route checks this before calling the
 * integration, so the page can show "Waiting for access" instead of an error.
 */
export async function integrationReady(host: Host, key: string): Promise<boolean> {
  const { integrations } = await listIntegrations(host)
  const integration = integrations.find((item) => item.key === key)
  return integration?.status === 'granted' && integration.connected && !integration.needs_reconnect
}
