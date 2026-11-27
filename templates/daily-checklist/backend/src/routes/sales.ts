import { HttpError, json, route } from '../lib/app.ts'
import { day, integrationReady } from '../lib/checklists.ts'
import type { Host } from '../lib/host.ts'
import { IntegrationError, nangoRequest } from '../lib/integrations.ts'
import { requiredString } from '../lib/validate.ts'

// The day's cash sales at one location, from HitPay, which a closing checklist compares with the counted cash.

type Charge = { amount: number | string; currency: string }
type ChargePage = { data: Charge[]; meta?: { next_cursor?: string | null } }

export type CashSales = {
  total: number
  /** Null when there was no cash sale. */
  currency: string | null
  count: number
  /** More cash sales than one page (99): the total covers the first page only. */
  partial: boolean
}

/** Null until the owner allows HitPay for this app. */
export async function cashSales(host: Host, locationId: string, date: string): Promise<CashSales | null> {
  if (!(await integrationReady(host, 'hitpay'))) return null

  try {
    const response = await nangoRequest<ChargePage>(host, {
      integration: 'hitpay',
      path: '/v1/charges',
      query: {
        per_page: 99,
        status: 'succeeded',
        date_from: date,
        date_to: date,
        'location_ids[]': [locationId],
        'payment_methods[]': ['cash'],
      },
    })
    if (!response) return null

    const charges = response.body.data
    const cents = charges.reduce((sum, charge) => sum + Math.round(Number(charge.amount) * 100), 0)
    return {
      total: cents / 100,
      currency: charges[0]?.currency?.toUpperCase() ?? null,
      count: charges.length,
      partial: Boolean(response.body.meta?.next_cursor),
    }
  } catch (error) {
    if (error instanceof IntegrationError) throw new HttpError(502, `HitPay: ${error.message}`)
    throw error
  }
}

/** /api/cash-sales?locationId=&date= */
export const cashSalesRoute = {
  GET: route(async (c) => {
    const locationId = requiredString(c.query.get('locationId'), 'Location', 100)
    const sales = await cashSales(c.host, locationId, day(c.query.get('date')))
    return json(sales ? { status: 'ready' as const, ...sales } : { status: 'waiting' as const })
  }),
}
