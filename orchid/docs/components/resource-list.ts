// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const resourceListRegistry = registry.items.find(
  (item: { name: string }) => item.name === "resource-list",
);

const RESOURCE_LIST_TYPES = ["product", "order", "charge", "invoice"] as const;

function liveResourceListExample(type: (typeof RESOURCE_LIST_TYPES)[number], label: string) {
  const component = `${type.charAt(0).toUpperCase()}${type.slice(1)}ResourceListExample`;
  return {
    description: label,
    code: `function ${component}() {
  return (
    <ResourceListProvider load={demoLoad}>
      <ResourceList
        type="${type}"
        className="min-w-0"
        onRowAction={(action, row) => console.log(action, row.id)}
        onSelectionAction={(action, ids) => console.log(action.key, ids)}
        onEmptyAction={(action) => console.log(action.key)}
      />
    </ResourceListProvider>
  );
}

render(<${component} />);`,
  };
}

const resourceListDocs = {
  ...resourceListRegistry,
  category: "components",
  props: {
    "ResourceListProvider.load": "ResourceLoad (required)",
    "ResourceListProvider.children": "ReactNode",
    "ResourceList.type": "product | order | charge | invoice",
    "ResourceList.className": "string",
    "ResourceList.onRowClick": "(row) => void",
    "ResourceList.onRowAction": "(action, row) => void",
    "ResourceList.onSelectionAction": "(action, selectedIds) => void",
    "ResourceList.onEmptyAction": "(action) => void",
    "ResourceList.cells": "optional SchemaTableCells overrides",
    "load(input).type": "product | order | charge | invoice",
    "load(input).query": "string → keywords upstream",
    "load(input).filter": "string (status; maps to statuses[] or invoice status)",
    "load(input).page": "number — products, orders, charges",
    "load(input).cursor": "string — invoices",
    "load(input).extras.category_ids": "comma-separated ids → product categories[] (multi)",
    "load(input).extras.location_id": "product/charge location_ids[]",
    "load(input).extras.channel": "product/order channels[]",
    "load(input).extras.date_from / date_to": "orders dateFrom/dateTo; charges date_from/date_to",
    "load(input).extras.payment_method": "charges payment_methods[]",
    "load(input).extras.inventory": "product inventory in_stock | out_of_stock",
    "ResourcePage.items": "ResourceItem[]",
    "ResourcePage.hasMore": "boolean",
    "ResourcePage.total": "optional meta total",
    "ResourcePage.cursor": "invoices",
  },
  examples: [
    liveResourceListExample("product", "Products"),
    liveResourceListExample("order", "Orders"),
    liveResourceListExample("charge", "Charges"),
    liveResourceListExample("invoice", "Invoices"),
    {
      description: "App Studio load (`#/lib/resource`, shared with ResourcePicker)",
      code: `// src/lib/resource.ts — same load as ResourcePicker
import { loadResourcePage } from "#/lib/resource";
import { ResourceListProvider } from "@/components/displaying-data/resource-list";

<ResourceListProvider load={(input) => loadResourcePage({ data: input })}>
  {children}
</ResourceListProvider>`,
    },
    {
      description: "Product catalog route",
      code: `import { ResourceList } from "@/components/displaying-data/resource-list";

export function ProductsPage() {
  return (
    <ResourceList
      type="product"
      onRowClick={(row) => {
        console.log(row.id, row.resource);
      }}
    />
  );
}`,
    },
  ],
  related_components: ["data-table", "resource-picker", "form-builder", "empty", "pagination"],
};

export default resourceListDocs;
