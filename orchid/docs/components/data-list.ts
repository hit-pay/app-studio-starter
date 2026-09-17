// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const dataListRegistry = registry.items.find(
  (item: { name: string }) => item.name === "data-list",
);

const dataListDocs = {
  ...dataListRegistry,
  category: "components",
  props: {
    layout: ["default", "stack", "media"],
  },
  examples: [
    {
      description: "Default rows",
      code: `<DataList
  items={[
    {
      key: "priya",
      title: "Priya Nair",
      description: "INV-2048 · Cards · SGD 128.00",
      badges: <Badge tone="green">Paid</Badge>,
      details: [
        { key: "city", text: "Singapore" },
        { key: "currency", text: "SGD" },
      ],
    },
    {
      key: "matcha",
      title: "Matcha Latte",
      description: "SKU-TEA-12 · Online Store and POS",
      meta: "24 in stock",
      badges: <Badge tone="green">Active</Badge>,
    },
  ]}
/>`,
    },
    {
      description: "Stack with copy rows",
      code: `<DataList
  layout="stack"
  items={[
    {
      key: "invoice",
      title: "Invoice paid",
      copyRows: [
        {
          label: "URL:",
          value: "https://hooks.hitpayapp.com/invoice/a9ad4444",
        },
      ],
    },
  ]}
/>`,
    },
    {
      description: "Media layout",
      code: `<DataList
  items={[
    {
      key: "home",
      title: "Home",
      description: "Welcome to our store.",
      layout: "media",
      media: {
        src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=128&h=128&fit=crop",
      },
      badges: <Badge tone="green">Published</Badge>,
    },
  ]}
/>`,
    },
  ],
  related_components: ["data-table", "detail-card", "copy-button", "dropdown-menu"],
};

export default dataListDocs;
