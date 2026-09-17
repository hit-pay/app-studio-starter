/** Docs / live examples only — fake HitPay pagination. App Studio uses loadResourcePage. */
import { fakeHitPayListPayload } from '#/lib/resource-picker-fake'
import { mapResourcePayload } from '#/lib/resource-picker-map'
import type { ResourceLoad } from '@/components/form/resource-picker'

const PAGE_SIZE = 2

const resourcePickerDemoLoad: ResourceLoad = async (input) => {
  await new Promise((resolve) => setTimeout(resolve, 180))
  const mapped = mapResourcePayload(input, fakeHitPayListPayload(input))
  const start = ((input.page || 1) - 1) * PAGE_SIZE
  const items = mapped.items.slice(start, start + PAGE_SIZE)
  return { items, hasMore: start + PAGE_SIZE < mapped.items.length }
}

export { resourcePickerDemoLoad }
