-- Checklists a manager defines (opening, closing, …), each with its items in order. A checklist with no location
-- applies to every location.
CREATE TABLE IF NOT EXISTS checklists (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (kind IN ('opening', 'closing', 'other')),
  location_id TEXT,
  -- Ask for the counted cash on completion and compare it with the day's HitPay cash sales.
  cash_count INTEGER NOT NULL DEFAULT 0,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  archived_at TEXT
);

-- An item removed from a checklist is kept (removed_at), so past runs still show what was ticked.
CREATE TABLE IF NOT EXISTS checklist_items (
  id TEXT PRIMARY KEY,
  checklist_id TEXT NOT NULL REFERENCES checklists(id),
  position INTEGER NOT NULL,
  label TEXT NOT NULL,
  requires_photo INTEGER NOT NULL DEFAULT 0,
  removed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_checklist_items_checklist ON checklist_items(checklist_id, position);

-- One checklist filled in at one location on one day.
CREATE TABLE IF NOT EXISTS checklist_runs (
  id TEXT PRIMARY KEY,
  checklist_id TEXT NOT NULL REFERENCES checklists(id),
  location_id TEXT NOT NULL,
  run_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'completed')),
  started_by TEXT NOT NULL,
  started_at TEXT NOT NULL,
  completed_by TEXT,
  completed_by_name TEXT,
  completed_at TEXT,
  cash_counted REAL,
  cash_expected REAL,
  currency TEXT,
  note TEXT,
  UNIQUE (checklist_id, location_id, run_date)
);
CREATE INDEX IF NOT EXISTS idx_checklist_runs_date ON checklist_runs(run_date, location_id);

CREATE TABLE IF NOT EXISTS checklist_run_items (
  run_id TEXT NOT NULL REFERENCES checklist_runs(id),
  item_id TEXT NOT NULL REFERENCES checklist_items(id),
  done_by TEXT NOT NULL,
  done_by_name TEXT NOT NULL,
  done_at TEXT NOT NULL,
  PRIMARY KEY (run_id, item_id)
);
