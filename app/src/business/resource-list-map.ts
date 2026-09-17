/** Map ResourcePicker items onto SchemaTable rows. */
import type { ResourceItem, ResourceType } from '#/business/resource-picker'
import type { SchemaTableRow } from '@/components/displaying-data/data-table-model'

function readRecordField(
  record: Record<string, unknown> | undefined,
  key: string,
): string | undefined {
  if (!record) return undefined
  const value = record[key]
  if (value == null || value === '') return undefined
  return String(value)
}

function formatMoney(record: Record<string, unknown> | undefined) {
  if (!record) return undefined
  const display = record.price_display ?? record.amount_display
  if (typeof display === 'string' && display) return display
  const amount = record.amount ?? record.price
  const currency = record.currency
  if (typeof amount === 'number' && typeof currency === 'string') {
    return `${currency.toUpperCase()} ${amount}`
  }
  return undefined
}

export function resourceItemToTableRow(
  type: ResourceType,
  item: ResourceItem,
): SchemaTableRow {
  const record = item.resource as Record<string, unknown> | undefined

  if (type === 'product') {
    return {
      id: item.id,
      name: item.title,
      sku: item.subtitle ?? readRecordField(record, 'stock_keeping_unit') ?? '',
      image: item.image ?? '',
      status: readRecordField(record, 'status') ?? item.badge ?? '',
      price: formatMoney(record) ?? '',
      resource: item.resource,
    }
  }

  if (type === 'order') {
    return {
      id: item.id,
      name: item.title,
      status: item.badge ?? readRecordField(record, 'status') ?? '',
      amount: formatMoney(record) ?? '',
      channel: readRecordField(record, 'channel') ?? '',
      date: readRecordField(record, 'created_at') ?? '',
      resource: item.resource,
    }
  }

  if (type === 'charge') {
    const method = record?.payment_method
    const methodName =
      method && typeof method === 'object' && !Array.isArray(method)
        ? readRecordField(method as Record<string, unknown>, 'name')
        : undefined
    return {
      id: item.id,
      name: item.title,
      status: item.badge ?? readRecordField(record, 'status') ?? '',
      amount: formatMoney(record) ?? '',
      method: methodName ?? '',
      date: readRecordField(record, 'created_at') ?? '',
      resource: item.resource,
    }
  }

  return {
    id: item.id,
    name: item.title,
    status: item.badge ?? readRecordField(record, 'status') ?? '',
    amount: formatMoney(record) ?? '',
    email: readRecordField(record, 'email') ?? '',
    resource: item.resource,
  }
}

export function resourceItemsToTableRows(
  type: ResourceType,
  items: ResourceItem[],
): SchemaTableRow[] {
  return items.map((item) => resourceItemToTableRow(type, item))
}

/** Fallback when upstream meta has no total but hasMore is known. */
export function estimateListTotal(
  page: number,
  pageSize: number,
  rowCount: number,
  hasMore: boolean,
  metaTotal?: number,
) {
  if (metaTotal != null && metaTotal >= 0) return metaTotal
  const loaded = (page - 1) * pageSize + rowCount
  if (hasMore) return loaded + 1
  return loaded
}
