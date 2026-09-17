// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const customerCardRegistry = registry.items.find(
  (item: { name: string }) => item.name === "customer-card",
);

const customerCardDocs = {
  ...customerCardRegistry,
  category: "components",
  props: {
    variant: ["small", "big", "float", "empty"],
    hover: "boolean",
    active: "boolean",
    loading: "boolean",
    edit: "boolean",
    closable: "boolean",
    beneficiary: "boolean",
  },
  examples: [
    {
      description: "Small summary",
      code: `<CustomerCard variant="small" customer={customer} />`,
    },
    {
      description: "Expanded details",
      code: `<CustomerCard variant="big" customer={customer} />`,
    },
    {
      description: "With badge",
      code: `<CustomerCard
  variant="small"
  customer={customer}
  badge={<Badge tone="blue">Invoice</Badge>}
/>`,
    },
    {
      description: "Empty state",
      code: `<CustomerCard variant="empty" />`,
    },
  ],
  related_components: ["avatar", "detail-card", "copy-button", "badge"],
};

export default customerCardDocs;
