import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SheetDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Right
        </p>
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            Details
          </SheetTrigger>
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
              <SheetClose render={<Button variant="outline" />}>
                Cancel
              </SheetClose>
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
          <SheetTrigger render={<Button variant="outline" />}>
            Filters
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow the records shown in this list.
              </SheetDescription>
            </SheetHeader>
            <p className="p-4 text-sm leading-normal text-oc-foreground">
              Status, channel, and date range for this list.
            </p>
            <SheetFooter>
              <SheetClose render={<Button variant="outline" />}>
                Cancel
              </SheetClose>
              <Button>Apply</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export { SheetDemo };
