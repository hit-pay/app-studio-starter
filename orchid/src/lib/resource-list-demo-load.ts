/** Docs / live examples only — fake HitPay pagination. App Studio uses loadResourcePickerPage. */
import { fakeHitPayListPayload } from '#/lib/resource-picker-fake'
import { mapResourcePickerPayload } from '#/lib/resource-picker-map'
import type { ResourcePickerLoad, ResourcePickerType } from '@/components/form/resource-picker'

function demoPageSize(type: ResourcePickerType) {
  return type === 'invoice' ? 10 : 25
}

const resourceListDemoLoad: ResourcePickerLoad = async (input) => {
  await new Promise((resolve) => setTimeout(resolve, 160))
  const mapped = mapResourcePickerPayload(input, fakeHitPayListPayload(input))
  const pageSize = demoPageSize(input.type)
  const page = input.page || 1
  const start = (page - 1) * pageSize
  const items = mapped.items.slice(start, start + pageSize)
  return {
    items,
    hasMore: start + pageSize < mapped.items.length,
    total: mapped.items.length,
  }
}

export { resourceListDemoLoad }
