import { db } from '#/server/lib/db'

export async function deleteFile(id: string): Promise<void> {
  await db.execute({ sql: 'DELETE FROM files WHERE id = ?', args: [id] })
}
