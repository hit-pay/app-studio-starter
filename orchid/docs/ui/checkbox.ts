// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const checkboxRegistry = registry.items.find(
  (item: { name: string }) => item.name === "checkbox",
);

const checkboxDocs = {
  ...checkboxRegistry,
  category: "ui",
  props: {
    indeterminate: "boolean",
    disabled: "boolean",
    alignment: ["vertical", "horizontal"],
  },
  examples: [
    {
      description: "With label",
      code: `<div className="flex items-center gap-2">
  <Checkbox id="email-receipt" defaultChecked />
  <Label htmlFor="email-receipt">Send receipt by email</Label>
</div>`,
    },
    {
      description: "Indeterminate",
      code: `<div className="flex items-center gap-2">
  <Checkbox id="select-all" indeterminate />
  <Label htmlFor="select-all">Select all invoices</Label>
</div>`,
    },
    {
      description: "Checkbox group",
      code: `<CheckboxGroup label="Payment channels" defaultValue={["paynow"]}>
  <div className="flex items-center gap-2">
    <Checkbox id="channel-paynow" value="paynow" />
    <Label htmlFor="channel-paynow">PayNow</Label>
  </div>
  <div className="flex items-center gap-2">
    <Checkbox id="channel-cards" value="cards" />
    <Label htmlFor="channel-cards">Cards</Label>
  </div>
</CheckboxGroup>`,
    },
  ],
  related_components: ["field", "label", "radio-group", "switch"],
};

export default checkboxDocs;
