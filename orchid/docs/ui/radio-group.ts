// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const radioGroupRegistry = registry.items.find(
  (item: { name: string }) => item.name === "radio-group",
);

const radioGroupDocs = {
  ...radioGroupRegistry,
  category: "ui",
  props: {
    disabled: "boolean",
    "aria-invalid": "boolean",
  },
  examples: [
    {
      description: "Vertical options",
      code: `<RadioGroup defaultValue="paynow">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="paynow" id="payment-paynow" />
    <Label htmlFor="payment-paynow">PayNow</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="cards" id="payment-cards" />
    <Label htmlFor="payment-cards">Cards</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="link" id="payment-link" />
    <Label htmlFor="payment-link">Payment Link</Label>
  </div>
</RadioGroup>`,
    },
    {
      description: "Horizontal layout",
      code: `<RadioGroup className="flex flex-wrap gap-4" defaultValue="sgd">
  <div className="flex items-center gap-2">
    <RadioGroupItem value="sgd" id="currency-sgd" />
    <Label htmlFor="currency-sgd">SGD</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="usd" id="currency-usd" />
    <Label htmlFor="currency-usd">USD</Label>
  </div>
  <div className="flex items-center gap-2">
    <RadioGroupItem value="myr" id="currency-myr" />
    <Label htmlFor="currency-myr">MYR</Label>
  </div>
</RadioGroup>`,
    },
    {
      description: "Option with description",
      code: `<RadioGroup defaultValue="invoice">
  <div className="flex items-start gap-2">
    <RadioGroupItem value="invoice" id="commerce-invoice" />
    <div className="grid gap-0.5">
      <Label htmlFor="commerce-invoice">Invoice</Label>
      <p className="text-xs leading-normal text-oc-muted-foreground">
        Create INV-2048 and email it to the customer.
      </p>
    </div>
  </div>
</RadioGroup>`,
    },
  ],
  related_components: ["label", "field", "checkbox", "choice-card"],
};

export default radioGroupDocs;
