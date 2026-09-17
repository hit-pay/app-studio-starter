// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const switchRegistry = registry.items.find(
  (item: { name: string }) => item.name === "switch",
);

const switchDocs = {
  ...switchRegistry,
  category: "ui",
  props: {
    size: ["default", "sm"],
    disabled: "boolean",
    "aria-invalid": "boolean",
  },
  examples: [
    {
      description: "With label",
      code: `<div className="flex items-center gap-3">
  <Switch id="paynow" defaultChecked />
  <Label htmlFor="paynow">Accept PayNow</Label>
</div>`,
    },
    {
      description: "Small size",
      code: `<div className="flex items-center gap-3">
  <Switch id="pos-tips" size="sm" defaultChecked />
  <Label htmlFor="pos-tips">Point of Sale tips</Label>
</div>`,
    },
    {
      description: "Disabled states",
      code: `<div className="flex items-center gap-4">
  <Switch disabled />
  <Switch defaultChecked disabled />
</div>`,
    },
  ],
  related_components: ["field", "form-section", "checkbox", "label"],
};

export default switchDocs;
