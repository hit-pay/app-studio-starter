import { createFileRoute } from '@tanstack/react-router'
import { ChevronDownIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Checkbox, CheckboxGroup } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export const Route = createFileRoute('/collapsible')({
  component: CollapsibleExamplesPage,
})

function CollapsibleExamplesPage() {
  return (
    <DocExamplePage
      to="/collapsible"
      usage={`import { ChevronDownIcon } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

<Collapsible>
  <CollapsibleTrigger>
    Advanced
    <ChevronDownIcon className="size-4 transition-transform group-data-open/collapsible:rotate-180" />
  </CollapsibleTrigger>
  <CollapsibleContent>
    {/* optional fields */}
  </CollapsibleContent>
</Collapsible>`}
    >
      <div className="grid gap-8 md:grid-cols-2">
        <div className="max-w-sm space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Collapsible>
            <CollapsibleTrigger>
              Advanced
              <ChevronDownIcon className="size-4 shrink-0 text-oc-muted-foreground transition-transform group-data-open/collapsible:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-3">
              <Field>
                <FieldLabel htmlFor="collapsible-memo">Memo</FieldLabel>
                <Input id="collapsible-memo" defaultValue="Studio membership — March" />
              </Field>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="max-w-sm space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Open
          </p>
          <Collapsible defaultOpen>
            <CollapsibleTrigger>
              Filters
              <ChevronDownIcon className="size-4 shrink-0 text-oc-muted-foreground transition-transform group-data-open/collapsible:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CheckboxGroup defaultValue={['paid']}>
                <Field orientation="Horizontal">
                  <Checkbox id="filter-paid" value="paid" />
                  <FieldLabel htmlFor="filter-paid">Paid</FieldLabel>
                </Field>
                <Field orientation="Horizontal">
                  <Checkbox id="filter-pending" value="pending" />
                  <FieldLabel htmlFor="filter-pending">Pending</FieldLabel>
                </Field>
              </CheckboxGroup>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </DocExamplePage>
  )
}
