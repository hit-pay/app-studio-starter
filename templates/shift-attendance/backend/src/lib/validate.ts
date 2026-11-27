import { HttpError } from './app.ts'

// Guards for request input. Input from the browser is untrusted even though the frontend is typed, so every route
// reads its query and body through these: a bad value answers 400 with a message the page can show.

function fail(message: string): never {
  throw new HttpError(400, message)
}

/** The request's JSON body as an object, or 400. */
export async function jsonBody(req: Request): Promise<Record<string, unknown>> {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    fail('The request body must be JSON.')
  }
  return object(body)
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
