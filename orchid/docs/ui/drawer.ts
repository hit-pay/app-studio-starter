// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const drawerRegistry = registry.items.find(
  (item: { name: string }) => item.name === "drawer",
);

const drawerDocs = {
  ...drawerRegistry,
  category: "ui",
  props: {
    swipeDirection: ["up", "right", "down", "left"],
    showSwipeHandle: "boolean",
    modal: "boolean",
  },
  examples: [
    {
      description: "Bottom sheet",
      code: `<Drawer showSwipeHandle>
  <DrawerTrigger render={<Button variant="outline" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Invoice peek</DrawerTitle>
      <DrawerDescription>
        Read-only panel. Create or edit uses a centered Dialog.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
    {
      description: "Right edge",
      code: `<Drawer swipeDirection="right">
  <DrawerTrigger render={<Button variant="outline" />}>Details</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Invoice peek</DrawerTitle>
      <DrawerDescription>
        Side drawer for a quick look at one record.
      </DrawerDescription>
    </DrawerHeader>
    <p className="p-4 text-sm text-oc-foreground">
      INV-2048 · Priya Nair · SGD 128.00
    </p>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline" />}>Close</DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
    {
      description: "Left filters",
      code: `<Drawer swipeDirection="left">
  <DrawerTrigger render={<Button variant="outline" />}>Filters</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
      <DrawerDescription>
        Narrow the records shown in this list.
      </DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
      <Button>Apply</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>`,
    },
  ],
  related_components: ["dialog", "app-layout", "button", "field"],
};

export default drawerDocs;
