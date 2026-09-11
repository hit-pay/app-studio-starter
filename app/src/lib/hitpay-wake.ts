import { createServerFn } from '@tanstack/react-start'

import { HITPAY_ALL_ROLES } from '#/lib/hitpay-roles'
import { requireHitPayRoles } from '#/lib/server/hitpay'
import {
  deleteWakeDestination as removeWakeDestination,
  listLatestWakeRows as loadLatestWakeRows,
  listWakeDestinations as loadWakeDestinations,
  listWakeEvents as loadWakeEvents,
  listWakeRows as loadWakeRows,
  updateWakeEventStatus as saveWakeEventStatus,
  updateWakeRowDelivery as saveWakeRowDelivery,
  upsertWakeDestination as saveWakeDestination,
  type WakeChannel,
  type WakeDeliveryStatus,
  type WakeDestination,
  type WakeEvent,
  type WakeReceiveStatus,
  type WakeRow,
} from '#/lib/server/hitpay-wake'

export type { WakeChannel, WakeDeliveryStatus, WakeDestination, WakeEvent, WakeReceiveStatus, WakeRow }

export const listWakeEvents = createServerFn({ method: 'GET' })
  .inputValidator((data: { key?: string; status?: WakeReceiveStatus; limit?: number } = {}) => data)
  .handler(async ({ data }): Promise<WakeEvent[]> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    return loadWakeEvents(data)
  })

export const listLatestWakeRows = createServerFn({ method: 'GET' })
  .inputValidator((data: { key: string }) => data)
  .handler(async ({ data }): Promise<WakeRow[]> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    return loadLatestWakeRows(data)
  })

export const listWakeRows = createServerFn({ method: 'GET' })
  .inputValidator((data: { key?: string; eventId?: string; deliveryStatus?: WakeDeliveryStatus; limit?: number } = {}) => data)
  .handler(async ({ data }): Promise<WakeRow[]> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    return loadWakeRows(data)
  })

export const updateWakeEventStatus = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string; status: WakeReceiveStatus; error?: string | null }) => data)
  .handler(async ({ data }): Promise<void> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    await saveWakeEventStatus(data)
  })

export const updateWakeRowDelivery = createServerFn({ method: 'POST' })
  .inputValidator((data: {
    id: string
    deliveryStatus: WakeDeliveryStatus
    channel?: string | null
    destination?: string | null
    error?: string | null
  }) => data)
  .handler(async ({ data }): Promise<void> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    await saveWakeRowDelivery(data)
  })

export const listWakeDestinations = createServerFn({ method: 'GET' })
  .inputValidator((data: { key?: string } = {}) => data)
  .handler(async ({ data }): Promise<WakeDestination[]> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    return loadWakeDestinations(data)
  })

export const upsertWakeDestination = createServerFn({ method: 'POST' })
  .inputValidator((data: { key: string; channel: WakeChannel; destination: string; enabled?: boolean }) => data)
  .handler(async ({ data }): Promise<WakeDestination> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    return saveWakeDestination(data)
  })

export const deleteWakeDestination = createServerFn({ method: 'POST' })
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data }): Promise<void> => {
    await requireHitPayRoles(HITPAY_ALL_ROLES)
    await removeWakeDestination(data)
  })
