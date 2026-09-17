// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const dialogRegistry = registry.items.find(
  (item: { name: string }) => item.name === "dialog",
);

const dialogDocs = {
  ...dialogRegistry,
  category: "ui",
  props: {
    size: ["sm", "default", "medium", "lg", "confirmation", "fullscreen"],
    persistent: "boolean",
    showCloseButton: "boolean",
  },
  examples: [
    {
      description: "Confirmation",
      code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>
    Review invoice
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Review invoice INV-2048</DialogTitle>
      <DialogDescription>
        Confirm details before sending to the customer.
      </DialogDescription>
    </DialogHeader>
    <p className="text-sm text-oc-foreground">
      Alex Turner · SGD 128.00 · PayNow or card.
    </p>
    <DialogFooter>
      <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
      <Button>Send invoice</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
    },
    {
      description: "Large size",
      code: `<Dialog>
  <DialogTrigger render={<Button variant="outline" />}>Add customer</DialogTrigger>
  <DialogContent size="lg">
    <DialogHeader>
      <DialogTitle>Add customer</DialogTitle>
      <DialogDescription>Enter the customer details below.</DialogDescription>
    </DialogHeader>
    <DialogFooter showCloseButton />
  </DialogContent>
</Dialog>`,
    },
    {
      description: "Persistent",
      code: `<Dialog persistent>
  <DialogTrigger render={<Button variant="outline" />}>
    Connect POS terminal
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Connect POS terminal</DialogTitle>
      <DialogDescription>
        Clicking outside will not close this dialog.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`,
    },
  ],
  related_components: ["drawer", "confirmation-modal", "form-layout", "button"],
};

export default dialogDocs;
