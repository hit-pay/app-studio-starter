import { db } from '#/server/lib/db'
import { FILE_META_COLUMNS, fileMetaFromRow, type StoredFile } from './file-meta'

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
