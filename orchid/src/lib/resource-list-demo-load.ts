/** Docs / live examples only — fake HitPay pagination. App Studio uses loadResourcePage. */
import { fakeHitPayListPayload } from '#/lib/resource-picker-fake'
import { mapResourcePayload } from '#/lib/resource-picker-map'
import type { ResourceLoad, ResourceType } from '@/components/form/resource-picker'

function demoPageSize(type: ResourceType) {
  return type === 'invoice' ? 10 : 25
}

const resourceListDemoLoad: ResourceLoad = async (input) => {
  await new Promise((resolve) => setTimeout(resolve, 160))
  const mapped = mapResourcePayload(input, fakeHitPayListPayload(input))
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
