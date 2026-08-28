import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export const Route = createFileRoute('/sheet')({
  component: SheetExamplesPage,
})

function SheetExamplesPage() {
  return (
    <DocExamplePage
      to="/sheet"
      usage={`import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

<Sheet>
  <SheetTrigger render={<Button variant="outline" />}>Details</SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Invoice peek</SheetTitle>
      <SheetDescription>Read-only side panel.</SheetDescription>
    </SheetHeader>
    <div className="p-4">{/* peek content */}</div>
  </SheetContent>
</Sheet>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Right
        </p>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Details</SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Invoice peek</SheetTitle>
              <SheetDescription>
                Read-only side panel. Create/edit uses a centered Dialog.
              </SheetDescription>
            </SheetHeader>
            <Field className="p-4">
              <FieldLabel htmlFor="sheet-memo">Memo</FieldLabel>
              <Input id="sheet-memo" defaultValue="Studio membership — March" />
            </Field>
            <SheetFooter>
              <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
              <Button>Save</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Left
        </p>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>Filters</SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Narrow the records shown in this list.</SheetDescription>
            </SheetHeader>
            <p className="p-4 text-sm leading-normal text-oc-foreground">
              Status, channel, and date range for this list.
            </p>
            <SheetFooter>
              <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
              <Button>Apply</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </DocExamplePage>
  )
}
