// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const labelRegistry = registry.items.find(
  (item: { name: string }) => item.name === "label",
);

const labelDocs = {
  ...labelRegistry,
  category: "ui",
  props: {
    htmlFor: "string",
    className: "string",
  },
  examples: [
    {
      description: "Checkbox label",
      code: `<div className="flex items-center gap-2">
  <Checkbox id="gst" defaultChecked />
  <Label htmlFor="gst">Add GST to this invoice</Label>
</div>`,
    },
    {
      description: "Input label",
      code: `<div className="grid max-w-sm gap-1.5">
  <Label htmlFor="store-name">Store name</Label>
  <Input id="store-name" placeholder="HitPay Studio" />
</div>`,
    },
  ],
  related_components: ["field", "input", "checkbox", "radio-group"],
};

export default labelDocs;
