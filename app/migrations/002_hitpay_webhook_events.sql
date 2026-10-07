CREATE TABLE IF NOT EXISTS hitpay_webhook_events (
  id TEXT PRIMARY KEY,
  event_object TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  received_at TEXT NOT NULL,
  processed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_hitpay_webhook_events_status ON hitpay_webhook_events(status, received_at);
