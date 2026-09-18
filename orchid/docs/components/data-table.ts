// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const dataTableRegistry = registry.items.find(
  (item: { name: string }) => item.name === "data-table",
);

const dataTableDocs = {
  ...dataTableRegistry,
  category: "components",
  props: {
    table: "SchemaTableApi from useDataTable (required)",
    cells: "custom cell render by column key",
    toolbarExtra: "ReactNode",
    onRowClick: "(row) => void",
    onRowAction: "(action: 'edit' | 'delete', row) => void",
    onSelectionAction: "(action, selectedIds) => void",
    onEmptyAction: "(action) => void",
    className: "string",
    "useDataTable.schema": "SchemaTableSchema (required)",
    "useDataTable.data": "rows with id: string",
    "useDataTable.total": "number — server filtered total",
    "useDataTable.onQueryChange": "(query, change) => void — refetch in server mode",
    "schema.mode": {
      server: "default — page in data + total; refetch on query change",
      client: "filter/sort/paginate in the browser",
    },
    "schema.selection": "boolean",
    "schema.search": "{ placeholder?, debounceMs? } | false",
    "schema.tabs": "{ key, title, value? }[]",
    "schema.tabKey": "string — default status",
    "schema.filters": "{ key, title, options }[]",
    "schema.sort": "{ fields, defaultKey?, defaultDir? } | false",
    "schema.pagination": "{ pageSize?, pageSizes? } | false",
    "schema.editColumns": "boolean — default off",
    "schema.rowActions": {
      edit: "edit in ⋮ menu",
      delete: "delete in ⋮ menu",
    },
    "schema.selectionActions": "bulk actions when rows are selected",
    "schema.emptyState": "{ title?, description?, media?, actions? }",
    "schema.columns": "SchemaTableColumn[] (required)",
    "columns[].key": "string (required)",
    "columns[].title": "string (required)",
    "columns[].type": {
      text: "default",
      amount: "SGD",
      date: "formatted date",
      status: "Badge",
      image: "thumbnail URL",
      empty: "spacer",
    },
    "columns[].sortable": "boolean",
    "columns[].hidden": "boolean",
    "columns[].locked": "boolean",
    "columns[].icon": "boolean",
    "columns[].search": "boolean — default true",
  },
  examples: [
    {
      description: "Schema-driven table",
      code: `function DataTableExample() {
  const table = useDataTable({
    schema: SCHEMA_TABLE_EXAMPLE_SCHEMA,
    data: SCHEMA_TABLE_EXAMPLE_ROWS,
  });

  return (
    <DataTable
      table={table}
      onRowAction={() => undefined}
      onRowClick={() => undefined}
    />
  );
}

render(<DataTableExample />);`,
    },
    {
      description: "Invoices with row actions",
      code: `function InvoiceTableExample() {
  const table = useDataTable({
    schema: {
      key: "invoices",
      mode: "client",
      search: { placeholder: "Search invoices" },
      rowActions: ["edit", "delete"],
      pagination: { pageSize: 5 },
      columns: [
        { key: "name", title: "Customer", type: "text", locked: true },
        { key: "amount", title: "Amount", type: "amount", search: false },
        { key: "status", title: "Status", type: "status", search: false },
      ],
    },
    data: [
      { id: "inv-2048", name: "Priya Nair", amount: 128, status: "Paid" },
      { id: "inv-2049", name: "Alex Turner", amount: 48, status: "Pending" },
    ],
  });

  return (
    <DataTable
      table={table}
      onRowAction={() => undefined}
      onRowClick={() => undefined}
    />
  );
}

render(<InvoiceTableExample />);`,
    },
  ],
  related_components: ["data-list", "detail-card", "empty", "pagination"],
};

export default dataTableDocs;
