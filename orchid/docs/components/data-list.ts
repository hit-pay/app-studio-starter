// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const dataListRegistry = registry.items.find(
  (item: { name: string }) => item.name === "data-list",
);

const dataListDocs = {
  ...dataListRegistry,
  category: "components",
  props: {
    items: "DataListItem[] (required)",
    layout: {
      default: "horizontal row card",
      stack: "vertical; use with copyRows",
      media: "left thumbnail (auto if media set)",
    },
    empty: "ReactNode when items is []",
    className: "string",
    "items[].key": "string (required)",
    "items[].title": "ReactNode (required)",
    "items[].description": "ReactNode",
    "items[].badges": "ReactNode",
    "items[].meta": "ReactNode",
    "items[].details": "{ key, text, icon? }[]",
    "items[].tokens": "ReactNode[]",
    "items[].tokensLabel": "ReactNode",
    "items[].copyRows": "{ key?, label, value }[] — copyable rows",
    "items[].media": "{ src, alt? } | ReactNode",
    "items[].logo": "ReactNode",
    "items[].layout": "default | stack | media",
    "items[].selected": "boolean",
    "items[].onClick": "() => void",
    "items[].actions": "{ onClick?, trailing?, menu?, hover? }",
    "items[].actions.menu": "{ key?, label, destructive?, onClick? }[]",
    "items[].actions.hover": "{ key, label, icon?, destructive?, onClick? }[]",
    "items[].actions.trailing": "ReactNode",
    "items[].menu": "alias of actions.menu",
    "items[].hoverActions": "alias of actions.hover",
    "items[].trailing": "alias of actions.trailing",
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
      onClick: () => {},
      actions: {
        menu: [
          { key: "edit", label: "Edit" },
          { key: "delete", label: "Delete", destructive: true },
        ],
      },
    },
    {
      key: "matcha",
      title: "Matcha Latte",
      description: "SKU-TEA-12 · Online Store and POS",
      meta: "24 in stock",
      badges: <Badge tone="green">Active</Badge>,
      onClick: () => {},
      actions: {
        menu: [
          { key: "edit", label: "Edit" },
          { key: "delete", label: "Delete", destructive: true },
        ],
      },
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
      onClick: () => {},
      actions: {
        menu: [
          { key: "edit", label: "Edit" },
          { key: "delete", label: "Delete", destructive: true },
        ],
      },
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
      onClick: () => {},
      actions: {
        menu: [
          { key: "edit", label: "Edit" },
          { key: "delete", label: "Delete", destructive: true },
        ],
      },
    },
  ]}
/>`,
    },
    {
      description: "Row actions dropdown",
      code: `<DataList
  items={[
    {
      key: "priya",
      title: "Priya Nair",
      description: "INV-2048 · Cards · SGD 128.00",
      badges: <Badge tone="green">Paid</Badge>,
      onClick: () => {},
      actions: {
        menu: [
          { key: "edit", label: "Edit" },
          { key: "delete", label: "Delete", destructive: true },
        ],
      },
    },
  ]}
/>`,
    },
  ],
  related_components: ["data-table", "detail-card", "copy-button", "dropdown-menu"],
};

export default dataListDocs;
