// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const fieldRegistry = registry.items.find(
  (item: { name: string }) => item.name === "field",
);

const fieldDocs = {
  ...fieldRegistry,
  category: "ui",
  props: {
    orientation: ["vertical", "horizontal", "responsive"],
  },
  examples: [
    {
      description: "Label and description",
      code: `<Field>
  <FieldLabel htmlFor="full-name">Full name</FieldLabel>
  <Input id="full-name" placeholder="Alex Turner" />
  <FieldDescription>Billing name on INV-2048.</FieldDescription>
</Field>`,
    },
    {
      description: "Validation error",
      code: `<Field data-invalid>
  <FieldLabel htmlFor="customer-email">Email</FieldLabel>
  <Input id="customer-email" placeholder="alex@example.com" aria-invalid />
  <FieldError>Enter a valid email to send the payment link.</FieldError>
</Field>`,
    },
    {
      description: "Horizontal layout",
      code: `<Field orientation="horizontal">
  <Switch defaultChecked />
  <FieldLabel>Email receipt after Point of Sale</FieldLabel>
</Field>`,
    },
  ],
  related_components: ["label", "input", "checkbox", "form-builder"],
};

export default fieldDocs;
