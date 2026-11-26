import { HTTPException } from 'hono/http-exception'

// Guards for request input, used inside Hono's `validator`. Input from the browser is untrusted even though the
// frontend is typed, so every route validates it; what the validator returns is the type the route and the typed
// client see.

function fail(message: string): never {
  throw new HTTPException(400, { message })
}

export function object(value: unknown): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) fail('Invalid request.')
  return value as Record<string, unknown>
}

export function requiredString(value: unknown, field: string, maxLength = 1024): string {
  if (typeof value !== 'string' || value.trim() === '') fail(`${field} is required.`)
  if (value.length > maxLength) fail(`${field} is too long.`)
  return value.trim()
}

export function optionalString(value: unknown, field: string, maxLength = 1024): string | null {
  if (value === undefined || value === null || value === '') return null
  if (typeof value !== 'string') fail(`${field} must be text.`)
  if (value.length > maxLength) fail(`${field} is too long.`)
  return value.trim()
}

export function requiredNumber(value: unknown, field: string, { min = -Infinity, max = Infinity } = {}): number {
  const number = typeof value === 'string' && value.trim() !== '' ? Number(value) : value
  if (typeof number !== 'number' || !Number.isFinite(number)) fail(`${field} must be a number.`)
  if (number < min || number > max) fail(`${field} must be between ${min} and ${max}.`)
  return number
}

export function oneOf<T extends string>(value: unknown, field: string, choices: readonly T[]): T {
  if (typeof value !== 'string' || !(choices as readonly string[]).includes(value)) fail(`${field} must be one of: ${choices.join(', ')}.`)
  return value as T
}
