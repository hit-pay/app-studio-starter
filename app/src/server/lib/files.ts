import { randomUUID } from 'node:crypto'

import { db } from '#/server/lib/db'

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

const FILE_META_COLUMNS =
  'id, entity_type, entity_id, name, mime_type, size, storage_provider, storage_key, created_at, updated_at'

function fileMetaFromRow(row: Record<string, unknown>): FileMeta {
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

export async function deleteFile(id: string): Promise<void> {
  await db.execute({ sql: 'DELETE FROM files WHERE id = ?', args: [id] })
}

export async function getFile(id: string): Promise<StoredFile | null> {
  const result = await db.execute({
    sql: `SELECT ${FILE_META_COLUMNS}, data FROM files WHERE id = ?`,
    args: [id],
  })
  const row = result.rows[0] as Record<string, unknown> | undefined
  if (!row) return null

  const value = row.data
  let data: Uint8Array
  if (value instanceof Uint8Array) data = value
  else if (value instanceof ArrayBuffer) data = new Uint8Array(value)
  else if (ArrayBuffer.isView(value)) data = new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
  else throw new Error('File data is missing.')

  return {
    ...fileMetaFromRow(row),
    data,
  }
}

export async function insertFile(input: {
  entityType?: string | null
  entityId?: string | null
  name: string
  mimeType: string
  data: Uint8Array
}): Promise<FileMeta> {
  if (!input.name.trim()) throw new Error('File name is required.')
  if (input.data.byteLength === 0) throw new Error('File is empty.')
  if (input.data.byteLength > FILE_MAX_BYTES) throw new Error('File is larger than 10 MB.')

  const id = randomUUID()
  const now = new Date().toISOString()
  const entityType = input.entityType?.trim() || null
  const entityId = input.entityId?.trim() || null
  const mimeType = input.mimeType.trim() || 'application/octet-stream'
  const name = input.name.trim()

  await db.execute({
    sql: `INSERT INTO files (
      id, entity_type, entity_id, name, mime_type, size,
      storage_provider, storage_key, data, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, 'turso', ?, ?, ?, ?)`,
    args: [id, entityType, entityId, name, mimeType, input.data.byteLength, `turso:${id}`, input.data, now, now],
  })

  return {
    id,
    entityType,
    entityId,
    name,
    mimeType,
    size: input.data.byteLength,
    storageProvider: 'turso',
    storageKey: `turso:${id}`,
    createdAt: now,
    updatedAt: now,
  }
}

export async function listFiles(input: {
  entityType: string
  entityId: string
}): Promise<FileMeta[]> {
  const result = await db.execute({
    sql: `SELECT ${FILE_META_COLUMNS} FROM files
      WHERE entity_type = ? AND entity_id = ?
      ORDER BY created_at DESC`,
    args: [input.entityType, input.entityId],
  })

  return result.rows.map((row) => fileMetaFromRow(row as Record<string, unknown>))
}
