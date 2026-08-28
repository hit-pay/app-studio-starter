import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

export const Route = createFileRoute('/sheet')({
  component: SheetExamplesPage,
})

function SheetExamplesPage() {
  return (
    <DocExamplePage
      to="/sheet"
      usage={`import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

<Sheet>
  <SheetTrigger render={<Button variant="Secondary" />}>Details</SheetTrigger>
  <SheetContent side="Right" title="Invoice peek" description="Read-only side panel. Create/edit uses Dialog.">
    {/* peek content */}
  </SheetContent>
</Sheet>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Right
        </p>
        <Sheet>
          <SheetTrigger render={<Button variant="Secondary" />}>Details</SheetTrigger>
          <SheetContent
            side="Right"
            title="Invoice peek"
            description="Read-only side panel. Create/edit uses a centered Dialog."
          >
            <Field>
              <FieldLabel htmlFor="sheet-memo">Memo</FieldLabel>
              <Input id="sheet-memo" defaultValue="Studio membership — March" />
            </Field>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Left
        </p>
        <Sheet>
          <SheetTrigger render={<Button variant="Secondary" style="Border" />}>Filters</SheetTrigger>
          <SheetContent side="Left" size="Small" title="Filters" confirmLabel="Apply">
            <p className="text-sm leading-[1.5] text-oc-foreground">
              Status, channel, and date range for this list.
            </p>
          </SheetContent>
        </Sheet>
      </div>
    </DocExamplePage>
  )
}
