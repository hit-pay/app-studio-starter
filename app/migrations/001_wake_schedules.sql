CREATE TABLE wake_events (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  source TEXT NOT NULL,
  frequency TEXT NOT NULL,
  timezone TEXT NOT NULL,
  triggered_at TEXT NOT NULL,
  config TEXT NOT NULL DEFAULT '{}',
  data TEXT NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'received',
  received_at TEXT NOT NULL,
  processed_at TEXT,
  error TEXT,
  created_at TEXT NOT NULL
);
CREATE UNIQUE INDEX idx_wake_events_key_triggered ON wake_events(key, triggered_at);
CREATE INDEX idx_wake_events_status ON wake_events(status, triggered_at DESC);

CREATE TABLE wake_rows (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  key TEXT NOT NULL,
  source TEXT NOT NULL,
  triggered_at TEXT NOT NULL,
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  delivery_status TEXT NOT NULL DEFAULT 'pending',
  channel TEXT,
  destination TEXT,
  delivered_at TEXT,
  delivery_error TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX idx_wake_rows_event ON wake_rows(event_id);
CREATE INDEX idx_wake_rows_delivery ON wake_rows(key, delivery_status, triggered_at DESC);

CREATE TABLE wake_destinations (
  id TEXT PRIMARY KEY,
  key TEXT NOT NULL,
  channel TEXT NOT NULL,
  destination TEXT NOT NULL,
  enabled INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE UNIQUE INDEX idx_wake_destinations_key_channel_dest ON wake_destinations(key, channel, destination);
