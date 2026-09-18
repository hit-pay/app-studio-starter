import { db } from '#/server/lib/db'
import { FILE_META_COLUMNS, fileMetaFromRow, type FileMeta } from './file-meta'

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
