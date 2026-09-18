import { randomUUID } from 'node:crypto'

import { db } from '#/server/lib/db'
import { FILE_MAX_BYTES, type FileMeta } from './file-meta'

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
