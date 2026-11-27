-- Shifts a manager plans: one staff member at one location from starts_at to ends_at (ISO 8601, UTC).
CREATE TABLE IF NOT EXISTS shifts (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL,
  staff_id TEXT NOT NULL,
  staff_name TEXT NOT NULL,
  starts_at TEXT NOT NULL,
  ends_at TEXT NOT NULL,
  break_minutes INTEGER NOT NULL DEFAULT 0,
  note TEXT,
  -- The Google Calendar event, once the shift was sent there.
  calendar_event_id TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_shifts_starts ON shifts(starts_at);
CREATE INDEX IF NOT EXISTS idx_shifts_staff ON shifts(staff_id, starts_at);

-- A staff member clocking in and out. clock_out_at is null while they are working.
CREATE TABLE IF NOT EXISTS attendance (
  id TEXT PRIMARY KEY,
  staff_id TEXT NOT NULL,
  staff_name TEXT NOT NULL,
  location_id TEXT NOT NULL,
  shift_id TEXT,
  clock_in_at TEXT NOT NULL,
  clock_out_at TEXT,
  note TEXT
);
CREATE INDEX IF NOT EXISTS idx_attendance_staff ON attendance(staff_id, clock_in_at);
CREATE INDEX IF NOT EXISTS idx_attendance_in ON attendance(clock_in_at);

-- A staff member asking to hand a shift to someone else; a manager approves or rejects it.
CREATE TABLE IF NOT EXISTS swap_requests (
  id TEXT PRIMARY KEY,
  shift_id TEXT NOT NULL REFERENCES shifts(id),
  from_staff_id TEXT NOT NULL,
  from_staff_name TEXT NOT NULL,
  to_staff_id TEXT NOT NULL,
  to_staff_name TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  decided_by_name TEXT,
  decided_at TEXT,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_swap_requests_status ON swap_requests(status, created_at);

-- What each staff member earns, for the timesheet's pay estimate and commission.
CREATE TABLE IF NOT EXISTS pay_rates (
  staff_id TEXT PRIMARY KEY,
  hourly_rate REAL NOT NULL DEFAULT 0,
  commission_percent REAL NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL
);
