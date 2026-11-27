-- Files the app's users upload (photos, receipts, documents), stored in the app's database.
CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  entity_type TEXT,
  entity_id TEXT,
  name TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  data BLOB NOT NULL,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_files_entity ON files(entity_type, entity_id);
