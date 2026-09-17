/** Shared load for Orchid ResourcePicker and ResourceList. Docs use the demo loader. */
import { resourcePickerDemoLoad } from '#/lib/resource-picker-demo-load'
import { mapResourcePayload } from '#/lib/resource-picker-map'
import type {
  ResourceLoadInput,
  ResourcePage,
} from '@/components/form/resource-picker'

export type {
  ResourceItem,
  ResourceLoadInput,
  ResourcePage,
  ResourceRecord,
  ResourceType,
} from '@/components/form/resource-picker'

export { mapResourcePayload }

export async function loadResourcePage(args: { data: ResourceLoadInput }): Promise<ResourcePage> {
  return resourcePickerDemoLoad(args.data)
}
