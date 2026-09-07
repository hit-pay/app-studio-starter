import { studioStorageKey } from '#/lib/studio-app-id'

export function formDraftKey(id: string): string {
  return studioStorageKey(`form-draft:${id}`)
}

export function readFormDraft(id: string): Record<string, unknown> | null {
  if (typeof localStorage === 'undefined' || !id) return null

  try {
    const raw = localStorage.getItem(formDraftKey(id))
    if (!raw) return null

    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return null

    return parsed as Record<string, unknown>
  } catch {
    return null
  }
}

/** Call only after a failed save. Do not write on every field change. */
export function writeFormDraft(id: string, values: Record<string, unknown>): void {
  if (typeof localStorage === 'undefined' || !id) return

  try {
    localStorage.setItem(formDraftKey(id), JSON.stringify(values))
  } catch {
    // Quota or private mode — keep typing; Turso remains the source of truth.
  }
}

export function clearFormDraft(id: string): void {
  if (typeof localStorage === 'undefined' || !id) return

  try {
    localStorage.removeItem(formDraftKey(id))
  } catch {
    // ignore
  }
}
