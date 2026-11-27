import { notFound } from './lib/app.ts'
import { clockIn, clockOut, myAttendance } from './routes/attendance.ts'
import { file, files } from './routes/files.ts'
import { locations } from './routes/locations.ts'
import { me } from './routes/me.ts'
import { copyWeek, sendToCalendar, shift, shifts } from './routes/shifts.ts'
import { staff } from './routes/staff.ts'
import { swap, swaps } from './routes/swaps.ts'
import { team, teamMember } from './routes/team.ts'
import { timesheetExport, timesheetRoute, timesheetSales } from './routes/timesheet.ts'

// The app's API: Bun.serve routes, every path under /api. Add a resource as one file in src/routes that exports
// its handlers by method ({ GET, POST, … }, each made with route()), and map its path here. The frontend calls it
// through call() in frontend/src/lib/api.ts, typed from this map.
export const routes = {
  '/api/me': me,
  '/api/staff': staff,
  '/api/locations': locations,
  '/api/files': files,
  '/api/files/:id': file,
  '/api/shifts': shifts,
  '/api/shifts/copy-week': copyWeek,
  '/api/shifts/send-to-calendar': sendToCalendar,
  '/api/shifts/:id': shift,
  '/api/attendance/me': myAttendance,
  '/api/attendance/clock-in': clockIn,
  '/api/attendance/clock-out': clockOut,
  '/api/swaps': swaps,
  '/api/swaps/:id': swap,
  '/api/team': team,
  '/api/team/:staffId': teamMember,
  '/api/timesheet': timesheetRoute,
  '/api/timesheet/sales': timesheetSales,
  '/api/timesheet/export': timesheetExport,
  '/api/*': notFound,
}

export type Api = typeof routes
export type { Json } from './lib/app.ts'
export type { Attendance, PayRate, Shift, SwapRequest, SwapStatus, TimesheetRow } from './lib/shifts.ts'
export type { TeamMember } from './routes/team.ts'
export type { StaffSales } from './routes/timesheet.ts'
