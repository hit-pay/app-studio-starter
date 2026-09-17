import { useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import {
  ResourceList,
  RESOURCE_PICKER_TYPES,
  useResourcePicker,
  type ResourcePickerResult,
  type ResourceType,
} from '#/business'
import { RESOURCE_CATALOG_LABELS } from '#/business/resource-catalog'
import { PageLayout } from '@/components/layout/page-layout'
import { Button } from '@ui/button'

export const Route = createFileRoute('/prebuild')({
  component: PrebuildPage,
})

function PrebuildPage() {
  const navigate = useNavigate()
  const pick = useResourcePicker()
  const [listType, setListType] = useState<ResourceType>('product')
  const [picked, setPicked] = useState<ResourcePickerResult[] | undefined>()
  const [clickedRow, setClickedRow] = useState<string | null>(null)

  async function openPicker(type: ResourceType, multiple: boolean) {
    const result = await pick({ type, multiple, action: 'select' })
    setPicked(result)
  }

  return (
    <PageLayout
      title="Prebuild"
      description="ResourcePicker and ResourceList examples from #/business."
      onBack={() => navigate({ to: '/' })}
    >
      <div className="flex min-w-0 flex-col gap-8">
        <section className="flex min-w-0 flex-col gap-3">
          <h2 className="text-sm font-medium">ResourcePicker</h2>
          <p className="text-sm text-oc-muted-foreground">
            Open the dialog, pick a HitPay record, then inspect the promise result below.
          </p>
          <div className="flex flex-wrap gap-2">
            {RESOURCE_PICKER_TYPES.map((type) => (
              <Button
                key={type}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => void openPicker(type, false)}
              >
                Pick {RESOURCE_CATALOG_LABELS[type].singular}
              </Button>
            ))}
            <Button
              type="button"
              size="sm"
              onClick={() => void openPicker('product', true)}
            >
              Pick products (multi)
            </Button>
          </div>
          <pre className="max-h-48 overflow-auto rounded-xl border border-oc-border bg-oc-muted/40 p-3 text-xs">
            {picked === undefined
              ? 'Nothing selected yet (cancel returns undefined).'
              : JSON.stringify(
                  picked.map((row) => ({
                    id: row.id,
                    title: row.resource && typeof row.resource === 'object' && 'name' in row.resource
                      ? row.resource.name
                      : undefined,
                    children: row.children?.map((child) => child.id),
                  })),
                  null,
                  2,
                )}
          </pre>
        </section>

        <section className="flex min-w-0 flex-col gap-3">
          <h2 className="text-sm font-medium">ResourceList</h2>
          <p className="text-sm text-oc-muted-foreground">
            Catalog table with search, status tabs, and filters. Click a row to see its id.
          </p>
          <div className="flex flex-wrap gap-2">
            {RESOURCE_PICKER_TYPES.map((type) => (
              <Button
                key={type}
                type="button"
                size="sm"
                variant={listType === type ? 'default' : 'outline'}
                onClick={() => {
                  setListType(type)
                  setClickedRow(null)
                }}
              >
                {RESOURCE_CATALOG_LABELS[type].plural}
              </Button>
            ))}
          </div>
          {clickedRow ? (
            <p className="text-sm">
              Row click: <span className="font-medium">{clickedRow}</span>
            </p>
          ) : null}
          <ResourceList
            type={listType}
            onRowClick={(row) => setClickedRow(row.id)}
          />
        </section>
      </div>
    </PageLayout>
  )
}
