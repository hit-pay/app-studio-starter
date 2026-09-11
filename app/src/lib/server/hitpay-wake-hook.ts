import type { WakeEvent } from '#/lib/server/hitpay-wake-types'

/**
 * Optional after a wake is stored as `received`.
 * Do not send reminders here by default. Persist destinations with
 * `upsertWakeDestination`, then send later and call `updateWakeRowDelivery`.
 */
export async function onScheduledWake(_event: WakeEvent): Promise<void> {}
