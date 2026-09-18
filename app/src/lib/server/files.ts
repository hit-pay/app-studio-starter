import { randomUUID } from 'node:crypto'

import { createServerFn } from '@tanstack/react-start'

import { ROLES } from '#/lib/enums'
import { requireRoles } from '#/lib/server/current-user'
import { db } from '#/lib/server/db'
import type { FileMeta } from '#/lib/types'

export const FILE_MAX_BYTES = 10 * 1024 * 1024


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

async function deleteStoredFile(id: string): Promise<void> {
  await db.execute({ sql: 'DELETE FROM files WHERE id = ?', args: [id] })
}

export const uploadFile = createServerFn({ method: 'POST' })
  .validator((data: {
    name: string
    mimeType: string
    dataBase64: string
    entityType?: string | null
    entityId?: string | null
  }) => data)
  .handler(async ({ data }): Promise<FileMeta> => {
    await requireRoles(ROLES)
    if (!data.name.trim()) throw new Error('File name is required.')
    const bytes = new Uint8Array(Buffer.from(data.dataBase64, 'base64'))
    if (bytes.byteLength === 0) throw new Error('File is empty.')
    if (bytes.byteLength > FILE_MAX_BYTES) throw new Error('File is larger than 10 MB.')

    const id = randomUUID()
    const now = new Date().toISOString()
    const entityType = data.entityType?.trim() || null
    const entityId = data.entityId?.trim() || null
    const mimeType = data.mimeType.trim() || 'application/octet-stream'
    const name = data.name.trim()

    await db.execute({
      sql: `INSERT INTO files (
        id, entity_type, entity_id, name, mime_type, size,
        storage_provider, storage_key, data, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'turso', ?, ?, ?, ?)`,
      args: [id, entityType, entityId, name, mimeType, bytes.byteLength, `turso:${id}`, bytes, now, now],
    })

    return {
      id,
      entityType,
      entityId,
      name,
      mimeType,
      size: bytes.byteLength,
      storageProvider: 'turso',
      storageKey: `turso:${id}`,
      createdAt: now,
      updatedAt: now,
    }
  })

export const getFile = createServerFn({ method: 'GET' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<(FileMeta & { dataBase64: string }) | null> => {
    await requireRoles(ROLES)
    const result = await db.execute({
      sql: `SELECT ${FILE_META_COLUMNS}, data FROM files WHERE id = ?`,
      args: [data.id],
    })
    const row = result.rows[0] as Record<string, unknown> | undefined
    if (!row) return null

    const value = row.data
    let bytes: Uint8Array
    if (value instanceof Uint8Array) bytes = value
    else if (value instanceof ArrayBuffer) bytes = new Uint8Array(value)
    else if (ArrayBuffer.isView(value)) bytes = new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
    else throw new Error('File data is missing.')

    return {
      ...fileMetaFromRow(row),
      dataBase64: Buffer.from(bytes).toString('base64'),
    }
  })

export const listFiles = createServerFn({ method: 'GET' })
  .validator((data: { entityType: string; entityId: string }) => data)
  .handler(async ({ data }): Promise<FileMeta[]> => {
    await requireRoles(ROLES)
    const result = await db.execute({
      sql: `SELECT ${FILE_META_COLUMNS} FROM files
        WHERE entity_type = ? AND entity_id = ?
        ORDER BY created_at DESC`,
      args: [data.entityType, data.entityId],
    })
    return result.rows.map((row) => fileMetaFromRow(row as Record<string, unknown>))
  })

export const deleteFile = createServerFn({ method: 'POST' })
  .validator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<void> => {
    await requireRoles(ROLES)
    await deleteStoredFile(data.id)
  })

