/**
 * Small runtime guards for server function input. Server functions are reachable
 * over HTTP, so their `data` is untrusted even though it is typed in the client.
 */

function asRecord(data: unknown): Record<string, unknown> {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Invalid request.')
  }
  return data as Record<string, unknown>
}

export function inputObject(data: unknown): Record<string, unknown> {
  return data === undefined ? {} : asRecord(data)
}

export function requiredString(value: unknown, field: string, maxLength = 1024): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${field} is required.`)
  }
  if (value.length > maxLength) throw new Error(`${field} is too long.`)
  return value
}

export function optionalString(value: unknown, field: string, maxLength = 1024): string | undefined {
  if (value === undefined || value === null) return undefined
  if (typeof value !== 'string') throw new Error(`${field} must be text.`)
  if (value.length > maxLength) throw new Error(`${field} is too long.`)
  return value
}

export function nullableString(value: unknown, field: string, maxLength = 1024): string | null | undefined {
  if (value === null) return null
  return optionalString(value, field, maxLength)
}
