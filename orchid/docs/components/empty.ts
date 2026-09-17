// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const emptyRegistry = registry.items.find(
  (item: { name: string }) => item.name === "empty",
);

const emptyDocs = {
  ...emptyRegistry,
  category: "components",
  props: {
    media: ["icon", "search", "upgrade"],
  },
  examples: [
    {
      description: "With actions",
      code: `<Empty
  media="icon"
  title="No invoices yet"
  description="Create an invoice to bill a customer by email or payment link."
  actions={[
    { key: "learn", label: "Learn more", variant: "outline" },
    {
      key: "create",
      label: "Create invoice",
      icon: <AddIcon data-icon="inline-start" />,
    },
  ]}
/>`,
    },
    {
      description: "Search empty state",
      code: `<Empty
  media="search"
  title="No matching invoices"
  description="Try another invoice number, customer, or payment channel."
/>`,
    },
    {
      description: "Text only",
      code: `<Empty
  title="No customers yet"
  description="Customer Data appears here after a payment, invoice, or POS sale."
/>`,
    },
  ],
  related_components: ["data-table", "data-list", "spinner", "button"],
};

export default emptyDocs;
