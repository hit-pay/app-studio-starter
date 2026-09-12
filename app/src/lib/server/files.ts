import { randomUUID } from 'node:crypto'

import { db } from '#/lib/server/db'
import { ensureMigrations } from '#/lib/server/migrate'

export const FILE_MAX_BYTES = 10 * 1024 * 1024

export type FileMeta = {
  id: string
  entityType: string | null
  entityId: string | null
  name: string
  mimeType: string
  size: number
  storageProvider: string
  storageKey: string
  createdAt: string
  updatedAt: string
}

export type StoredFile = FileMeta & {
  data: Uint8Array
}

const META_COLUMNS =
  'id, entity_type, entity_id, name, mime_type, size, storage_provider, storage_key, created_at, updated_at'

function asBytes(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) {
    return value
  }
  if (value instanceof ArrayBuffer) {
    return new Uint8Array(value)
  }
  if (ArrayBuffer.isView(value)) {
    return new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
  }
  throw new Error('File data is missing.')
}

function mapMeta(row: Record<string, unknown>): FileMeta {
  return {
    id: String(row.id),
    entityType: row.entity_type == null ? null : String(row.entity_type),
    entityId: row.entity_id == null ? null : String(row.entity_id),
    name: String(row.name),
    mimeType: String(row.mime_type),
    size: Number(row.size),
    storageProvider: String(row.storage_provider),
    storageKey: String(row.storage_key),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  }
}

export async function insertFile(input: {
  entityType?: string | null
  entityId?: string | null
  name: string
  mimeType: string
  data: Uint8Array
}): Promise<FileMeta> {
  await ensureMigrations()

  if (!input.name.trim()) {
    throw new Error('File name is required.')
  }
  if (input.data.byteLength === 0) {
    throw new Error('File is empty.')
  }
  if (input.data.byteLength > FILE_MAX_BYTES) {
    throw new Error('File is larger than 10 MB.')
  }

  const id = randomUUID()
  const now = new Date().toISOString()
  const entityType = input.entityType?.trim() || null
  const entityId = input.entityId?.trim() || null

  await db.execute({
    sql: `INSERT INTO files (
      id, entity_type, entity_id, name, mime_type, size,
      storage_provider, storage_key, data, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'turso', ?, ?, ?, ?)`,
    args: [
      id,
      entityType,
      entityId,
      input.name.trim(),
      input.mimeType.trim() || 'application/octet-stream',
      input.data.byteLength,
      `turso:${id}`,
      input.data,
      now,
      now,
    ],
  })

  return {
    id,
    entityType,
    entityId,
    name: input.name.trim(),
    mimeType: input.mimeType.trim() || 'application/octet-stream',
    size: input.data.byteLength,
    storageProvider: 'turso',
    storageKey: `turso:${id}`,
    createdAt: now,
    updatedAt: now,
  }
}

export async function getFile(id: string): Promise<StoredFile | null> {
  await ensureMigrations()

  const result = await db.execute({
    sql: `SELECT ${META_COLUMNS}, data FROM files WHERE id = ?`,
    args: [id],
  })
  const row = result.rows[0] as Record<string, unknown> | undefined

  if (!row) {
    return null
  }

  return { ...mapMeta(row), data: asBytes(row.data) }
}

export async function listFiles(input: {
  entityType: string
  entityId: string
}): Promise<FileMeta[]> {
  await ensureMigrations()

  const result = await db.execute({
    sql: `SELECT ${META_COLUMNS} FROM files
      WHERE entity_type = ? AND entity_id = ?
      ORDER BY created_at DESC`,
    args: [input.entityType, input.entityId],
  })

  return result.rows.map((row) => mapMeta(row as Record<string, unknown>))
}

export async function deleteFile(id: string): Promise<void> {
  await ensureMigrations()

  await db.execute({
    sql: 'DELETE FROM files WHERE id = ?',
    args: [id],
  })
}
