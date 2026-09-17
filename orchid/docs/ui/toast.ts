// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const toastRegistry = registry.items.find(
  (item: { name: string }) => item.name === "toast",
);

const toastDocs = {
  ...toastRegistry,
  category: "ui",
  props: {
    type: ["success", "info", "warning", "error", "loading"],
    placement: [
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right",
    ],
  },
  examples: [
    {
      description: "Default toast",
      code: `<Button
  variant="outline"
  size="sm"
  onClick={() =>
    toast.add({
      title: "Invoice created",
      description: "INV-2048 · SGD 128.00 · Priya Nair",
    })
  }
>
  Create invoice
</Button>`,
    },
    {
      description: "Semantic types",
      code: `<Button
  variant="outline"
  size="sm"
  onClick={() =>
    toast.add({
      title: "Payment received",
      description: "PayNow · INV-2048 · SGD 128.00",
      type: "success",
    })
  }
>
  Payment received
</Button>`,
    },
    {
      description: "Toast with action",
      code: `<Button
  variant="outline"
  size="sm"
  onClick={() => {
    const id = toast.add({
      title: "Payment link sent",
      description: "Sent to Priya Nair for INV-2048",
      actionProps: {
        children: "Undo",
        onClick() {
          toast.close(id);
        },
      },
    });
  }}
>
  Undo send link
</Button>`,
    },
  ],
  related_components: ["banner", "button"],
};

export default toastDocs;
