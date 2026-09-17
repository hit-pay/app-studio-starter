// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const resourcePickerRegistry = registry.items.find(
  (item: { name: string }) => item.name === "resource-picker",
);

const resourcePickerDocs = {
  ...resourcePickerRegistry,
  category: "components",
  props: {
    "ResourcePickerProvider.load": "ResourcePickerLoad (required)",
    "pick().type": "product | order | charge | invoice",
    "pick().action": ["add", "select"],
    "pick().multiple": "boolean | number (max selections)",
    "pick().query": "string (initial search → keywords upstream)",
    "pick().selectionIds": "ResourcePickerSelectionId[] (pre-selected ids + optional child ids)",
    "pick().filter.status": "string (maps to statuses[] or invoice status)",
    "pick().filter.locationId": "string (product/charge location_ids[] via extras)",
    "pick().filter.categoryId": "string (product categories[])",
    "load(input).page": "number — products, orders, charges",
    "load(input).cursor": "string — invoices (and meta.next_cursor when present)",
    "load(input).extras.category_ids": "comma-separated ids → product categories[] (multi)",
    "load(input).extras.location_id": "product/charge location_ids[]",
    "load(input).extras.channel": "product/ order channels[]",
    "load(input).extras.date_from / date_to": "orders dateFrom/dateTo; charges date_from/date_to",
    "load(input).extras.payment_method": "charges payment_methods[]",
    "load(input).extras.inventory": "product inventory in_stock | out_of_stock",
    "result[].id": "string",
    "result[].resource": "ResourcePickerRecord (optional snapshot)",
    "result[].children": "product variation rows",
  },
  examples: [
    {
      description: "Pick products",
      code: `function PickProductsExample() {
  const pick = useResourcePicker();

  return (
    <Button
      variant="outline"
      onClick={async () => {
        const items = await pick({ type: "product", multiple: 3 });
        if (items) {
          console.log(items);
        }
      }}
    >
      Add up to 3 products
    </Button>
  );
}

render(
  <ResourcePickerProvider load={demoLoad}>
    <PickProductsExample />
  </ResourcePickerProvider>,
);`,
    },
    {
      description: "App Studio load (`#/lib/resource`, shared with ResourceList)",
      code: `// src/lib/resource — HitPay products, orders, charges, invoices
import { loadResourcePickerPage } from "#/lib/resource";
import { ResourcePickerProvider } from "@/components/form/resource-picker";

<ResourcePickerProvider load={(input) => loadResourcePickerPage({ data: input })}>
  {children}
</ResourcePickerProvider>`,
    },
    {
      description: "Pre-selected variants",
      code: `const items = await pick({
  type: "product",
  multiple: true,
  selectionIds: [
    { id: "prod_1", children: [{ id: "var_a" }] },
    { id: "prod_2" },
  ],
});`,
    },
  ],
  related_components: ["dialog", "select", "form-builder", "data-table", "resource-list"],
};

export default resourcePickerDocs;
