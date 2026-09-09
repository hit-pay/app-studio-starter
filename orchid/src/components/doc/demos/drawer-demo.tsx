import { Button } from '@/base-ui/actions/button'
import { Field, FieldLabel } from '@/base-ui/form/field'
import { Input } from '@/base-ui/form/input'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/base-ui/overlays/drawer'

function DrawerDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Down
        </p>
        <Drawer showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" />}>
            Open
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Invoice peek</DrawerTitle>
              <DrawerDescription>
                Read-only panel. Create or edit uses a centered Dialog.
              </DrawerDescription>
            </DrawerHeader>
            <Field className="p-4">
              <FieldLabel htmlFor="drawer-memo">Memo</FieldLabel>
              <Input id="drawer-memo" defaultValue="Studio membership — March" />
            </Field>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
              <Button>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Right
        </p>
        <Drawer swipeDirection="right">
          <DrawerTrigger render={<Button variant="outline" />}>
            Details
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Invoice peek</DrawerTitle>
              <DrawerDescription>
                Side drawer for a quick look at one record.
              </DrawerDescription>
            </DrawerHeader>
            <Field className="p-4">
              <FieldLabel htmlFor="drawer-right-memo">Memo</FieldLabel>
              <Input id="drawer-right-memo" defaultValue="Studio membership — March" />
            </Field>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
              <Button>Save</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Left
        </p>
        <Drawer swipeDirection="left">
          <DrawerTrigger render={<Button variant="outline" />}>
            Filters
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
              <DrawerDescription>
                Narrow the records shown in this list.
              </DrawerDescription>
            </DrawerHeader>
            <p className="p-4 text-sm leading-normal text-oc-foreground">
              Status, channel, and date range for this list.
            </p>
            <DrawerFooter>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
              <Button>Apply</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  )
}

export { DrawerDemo }
