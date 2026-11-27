import { HttpError, json, route } from '../lib/app.ts'
import { day, integrationReady, MANAGERS } from '../lib/checklists.ts'
import { db } from '../lib/db.ts'
import { IntegrationError, nangoRequest } from '../lib/integrations.ts'
import type { Location } from '../lib/types.ts'
import { jsonBody } from '../lib/validate.ts'

// Exports the runs of a date range to a new Google Sheets spreadsheet, through the Google Sheets API.

const MAX_ROWS = 5000
const SHEET = 'Checklists'

type Spreadsheet = { spreadsheetId: string; spreadsheetUrl: string }

/** /api/export: `{ from, to }`, for managers. */
export const exportRuns = {
  POST: route(
    async (c) => {
      const body = await jsonBody(c.req)
      const from = day(body.from, 'From')
      const to = day(body.to, 'To')
      if (from > to) throw new HttpError(400, 'From must be on or before To.')
      if (!(await integrationReady(c.host, 'google-sheet'))) return json({ status: 'waiting' as const })

      const [{ locations }, result] = await Promise.all([
        c.host.get<{ locations: Location[] }>('/locations'),
        db.execute({
          sql: `SELECT r.run_date, r.location_id, c.title, c.kind, r.status, r.completed_by_name, r.completed_at,
                       r.cash_counted, r.cash_expected, r.currency, r.note
                FROM checklist_runs r JOIN checklists c ON c.id = r.checklist_id
                WHERE r.run_date BETWEEN ? AND ? ORDER BY r.run_date, r.location_id, c.title LIMIT ${MAX_ROWS}`,
          args: [from, to],
        }),
      ])
      const names = new Map(locations.map((location) => [location.id, location.name ?? location.id]))
      const values = [
        ['Date', 'Location', 'Checklist', 'Type', 'Status', 'Completed by', 'Completed at', 'Cash counted', 'Cash sales (HitPay)', 'Currency', 'Note'],
        ...result.rows.map((row) => [
          String(row.run_date),
          names.get(String(row.location_id)) ?? String(row.location_id),
          String(row.title),
          String(row.kind),
          String(row.status),
          row.completed_by_name == null ? '' : String(row.completed_by_name),
          row.completed_at == null ? '' : String(row.completed_at),
          row.cash_counted == null ? '' : Number(row.cash_counted),
          row.cash_expected == null ? '' : Number(row.cash_expected),
          row.currency == null ? '' : String(row.currency),
          row.note == null ? '' : String(row.note),
        ]),
      ]

      try {
        const created = await nangoRequest<Spreadsheet>(c.host, {
          integration: 'google-sheet',
          method: 'POST',
          path: '/v4/spreadsheets',
          body: { properties: { title: `Checklists ${from} to ${to}` }, sheets: [{ properties: { title: SHEET } }] },
        })
        if (!created) return json({ status: 'waiting' as const })

        await nangoRequest(c.host, {
          integration: 'google-sheet',
          method: 'PUT',
          path: `/v4/spreadsheets/${created.body.spreadsheetId}/values/${encodeURIComponent(`${SHEET}!A1`)}`,
          query: { valueInputOption: 'RAW' },
          body: { values },
        })
        return json({ status: 'ready' as const, url: created.body.spreadsheetUrl, rows: values.length - 1 })
      } catch (error) {
        if (error instanceof IntegrationError) throw new HttpError(502, `Google Sheets: ${error.message}`)
        throw error
      }
    },
    { roles: MANAGERS },
  ),
}
