// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const formSectionRegistry = registry.items.find(
  (item: { name: string }) => item.name === "form-section",
);

const formSectionDocs = {
  ...formSectionRegistry,
  category: "ui",
  props: {
    variant: ["default", "background"],
  },
  examples: [
    {
      description: "Section heading",
      code: `<FormSection
  title="Online Store"
  description="Storefront URL, theme, and password protection."
/>`,
    },
    {
      description: "Badge and actions",
      code: `<FormSection
  title="Payment Channels"
  description="Upgrade to accept GrabPay, PayNow, and cards at checkout."
  badge={<Badge tone="purple">Upgrade</Badge>}
  actions={<Button>Upgrade Now</Button>}
/>`,
    },
    {
      description: "Settings row",
      code: `<FormSectionItem
  title="Password protection"
  description="Visitors must enter a password before they can view the store."
  actions={<Switch defaultChecked />}
>
  <Input placeholder="Enter password" type="password" />
</FormSectionItem>`,
    },
  ],
  related_components: ["field", "tooltip", "form-builder", "badge", "button"],
};

export default formSectionDocs;
