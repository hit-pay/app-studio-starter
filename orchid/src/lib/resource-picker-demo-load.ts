/** Docs / live examples only — fake HitPay pagination. App Studio uses loadResourcePickerPage. */
import { fakeHitPayListPayload } from '#/lib/resource-picker-fake'
import { mapResourcePickerPayload } from '#/lib/resource-picker-map'
import type { ResourcePickerLoad } from '@/components/form/resource-picker'

const PAGE_SIZE = 2

const resourcePickerDemoLoad: ResourcePickerLoad = async (input) => {
  await new Promise((resolve) => setTimeout(resolve, 180))
  const mapped = mapResourcePickerPayload(input, fakeHitPayListPayload(input))
  const start = ((input.page || 1) - 1) * PAGE_SIZE
  const items = mapped.items.slice(start, start + PAGE_SIZE)
  return { items, hasMore: start + PAGE_SIZE < mapped.items.length }
}

export { resourcePickerDemoLoad }
