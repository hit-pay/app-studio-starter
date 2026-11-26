import { HTTPException } from 'hono/http-exception'
import { validator } from 'hono/validator'

import { router } from '../lib/app.ts'
import { db } from '../lib/db.ts'
import type { FileMeta } from '../lib/types.ts'
import { optionalString, requiredString } from '../lib/validate.ts'

// Files travel as raw bytes both ways: no base64, so a 10 MB file stays well inside a request's memory.
export const MAX_FILE_BYTES = 10 * 1024 * 1024

const COLUMNS = 'id, entity_type, entity_id, name, mime_type, size, created_at'

function toMeta(row: Record<string, unknown>): FileMeta {
  return {
    id: String(row.id),
    entityType: row.entity_type == null ? null : String(row.entity_type),
    entityId: row.entity_id == null ? null : String(row.entity_id),
    name: String(row.name),
    mimeType: String(row.mime_type),
    size: Number(row.size),
    createdAt: String(row.created_at),
  }
}

const owner = validator('query', (query) => ({
  entityType: optionalString(query.entityType, 'entityType', 100),
  entityId: optionalString(query.entityId, 'entityId', 255),
}))

export const files = router()
  /** The files attached to one record, newest first. Never selects the file data. */
  .get('/', owner, async (c) => {
    const { entityType, entityId } = c.req.valid('query')
    const result = await db.execute({
      sql: `SELECT ${COLUMNS} FROM files WHERE entity_type IS ? AND entity_id IS ? ORDER BY created_at DESC`,
      args: [entityType, entityId],
    })
    return c.json(result.rows.map((row) => toMeta(row as Record<string, unknown>)))
  })

  /** Uploads one file: the request body is the file itself, its name in ?name=. */
  .post(
    '/',
    validator('query', (query) => ({
      entityType: optionalString(query.entityType, 'entityType', 100),
      entityId: optionalString(query.entityId, 'entityId', 255),
      name: requiredString(query.name, 'File name', 255),
    })),
    async (c) => {
      const { entityType, entityId, name } = c.req.valid('query')
      const bytes = new Uint8Array(await c.req.arrayBuffer())
      if (bytes.byteLength === 0) throw new HTTPException(400, { message: 'The file is empty.' })
      if (bytes.byteLength > MAX_FILE_BYTES) throw new HTTPException(413, { message: 'Files must be 10 MB or smaller.' })

      const meta: FileMeta = {
        id: crypto.randomUUID(),
        entityType,
        entityId,
        name,
        mimeType: c.req.header('content-type')?.split(';')[0]?.trim() || 'application/octet-stream',
        size: bytes.byteLength,
        createdAt: new Date().toISOString(),
      }
      await db.execute({
        sql: 'INSERT INTO files (id, entity_type, entity_id, name, mime_type, size, data, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        args: [meta.id, meta.entityType, meta.entityId, meta.name, meta.mimeType, meta.size, bytes, c.var.user.id, meta.createdAt],
      })
      return c.json(meta, 201)
    },
  )

  /** The file's bytes, as a download. */
  .get('/:id', async (c) => {
    const result = await db.execute({ sql: 'SELECT name, mime_type, data FROM files WHERE id = ?', args: [c.req.param('id')] })
    const row = result.rows[0] as Record<string, unknown> | undefined
    if (!row) throw new HTTPException(404, { message: 'File not found.' })

    const data = row.data as ArrayBuffer
    return c.body(new Uint8Array(data), 200, {
      'content-type': String(row.mime_type),
      'content-disposition': `attachment; filename*=UTF-8''${encodeURIComponent(String(row.name))}`,
      'cache-control': 'private, no-store',
    })
  })

  .delete('/:id', async (c) => {
    await db.execute({ sql: 'DELETE FROM files WHERE id = ?', args: [c.req.param('id')] })
    return c.body(null, 204)
  })
