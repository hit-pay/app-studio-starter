import { HttpError, json, route, type Json } from '../lib/app.ts'
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

function owner(query: URLSearchParams) {
  return {
    entityType: optionalString(query.get('entityType'), 'entityType', 100),
    entityId: optionalString(query.get('entityId'), 'entityId', 255),
  }
}

/** /api/files: the files attached to one record, and uploading one. */
export const files = {
  /** The files attached to one record, newest first. Never selects the file data. */
  GET: route(async (c) => {
    const { entityType, entityId } = owner(c.query)
    const result = await db.execute({
      sql: `SELECT ${COLUMNS} FROM files WHERE entity_type IS ? AND entity_id IS ? ORDER BY created_at DESC`,
      args: [entityType, entityId],
    })
    return json(result.rows.map((row) => toMeta(row as Record<string, unknown>)))
  }),

  /** Uploads one file: the request body is the file itself, its name in ?name=. */
  POST: route(async (c) => {
    const { entityType, entityId } = owner(c.query)
    const name = requiredString(c.query.get('name'), 'File name', 255)
    const bytes = new Uint8Array(await c.req.arrayBuffer())
    if (bytes.byteLength === 0) throw new HttpError(400, 'The file is empty.')
    if (bytes.byteLength > MAX_FILE_BYTES) throw new HttpError(413, 'Files must be 10 MB or smaller.')

    const meta: FileMeta = {
      id: crypto.randomUUID(),
      entityType,
      entityId,
      name,
      mimeType: c.req.headers.get('content-type')?.split(';')[0]?.trim() || 'application/octet-stream',
      size: bytes.byteLength,
      createdAt: new Date().toISOString(),
    }
    await db.execute({
      sql: 'INSERT INTO files (id, entity_type, entity_id, name, mime_type, size, data, created_by, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [meta.id, meta.entityType, meta.entityId, meta.name, meta.mimeType, meta.size, bytes, c.user.id, meta.createdAt],
    })
    return json(meta, 201)
  }),
}

/** /api/files/:id: one file's bytes, and removing it. */
export const file = {
  /** The file's bytes, as a download. */
  GET: route<'/api/files/:id', Response>(async (c) => {
    const result = await db.execute({ sql: 'SELECT name, mime_type, data FROM files WHERE id = ?', args: [c.params.id] })
    const row = result.rows[0] as Record<string, unknown> | undefined
    if (!row) throw new HttpError(404, 'File not found.')

    return new Response(new Uint8Array(row.data as ArrayBuffer), {
      headers: {
        'content-type': String(row.mime_type),
        'content-disposition': `attachment; filename*=UTF-8''${encodeURIComponent(String(row.name))}`,
        'cache-control': 'private, no-store',
      },
    })
  }),

  DELETE: route<'/api/files/:id', Json<null>>(async (c) => {
    await db.execute({ sql: 'DELETE FROM files WHERE id = ?', args: [c.params.id] })
    return new Response(null, { status: 204 }) as Json<null>
  }),
}
