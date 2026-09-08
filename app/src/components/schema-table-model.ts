export const SCHEMA_TABLE_COLUMN_TYPES = [
  "text",
  "amount",
  "date",
  "status",
  "image",
  "empty",
] as const;

export type SchemaTableColumnType = (typeof SCHEMA_TABLE_COLUMN_TYPES)[number];

export type SchemaTableOption = {
  value: string;
  label: string;
};

export type SchemaTableColumn = {
  key: string;
  title: string;
  type?: SchemaTableColumnType;
  sortable?: boolean;
  hidden?: boolean;
  locked?: boolean;
  icon?: boolean;
  search?: boolean;
};

export type SchemaTableFilter = {
  key: string;
  title: string;
  options: SchemaTableOption[];
};

export type SchemaTableTab = {
  key: string;
  title: string;
  value?: string | null;
};

export type SchemaTableSortField = {
  key: string;
  title: string;
};

export type SchemaTableRowAction = "edit" | "delete";

export const SCHEMA_TABLE_ACTION_ICONS = [
  "delete",
  "download",
  "publish",
  "duplicate",
  "add",
  "more",
] as const;

export type SchemaTableActionIcon = (typeof SCHEMA_TABLE_ACTION_ICONS)[number];

export type SchemaTableActionItem = {
  key: string;
  label: string;
  icon?: SchemaTableActionIcon;
  variant?: "default" | "destructive";
  disabled?: boolean;
  separator?: boolean;
};

export type SchemaTableButtonAction = SchemaTableActionItem & {
  presentation?: "button";
};

export type SchemaTableDropdownAction = Omit<
  SchemaTableActionItem,
  "separator"
> & {
  presentation: "dropdown";
  items: SchemaTableActionItem[];
};

export type SchemaTableSelectionAction =
  SchemaTableButtonAction | SchemaTableDropdownAction;

export type SchemaTableEmptyState = {
  title?: string;
  description?: string;
  actions?: SchemaTableButtonAction[];
};

export type SchemaTableSchema = {
  key?: string;
  mode?: "client" | "server";
  selection?: boolean;
  search?: { placeholder?: string; debounceMs?: number } | false;
  tabs?: SchemaTableTab[];
  tabKey?: string;
  filters?: SchemaTableFilter[];
  sort?:
    | {
        fields: SchemaTableSortField[];
        defaultKey?: string;
        defaultDir?: "asc" | "desc";
      }
    | false;
  pagination?: { pageSize?: number; pageSizes?: number[] } | false;
  editColumns?: boolean;
  rowActions?: SchemaTableRowAction[] | false;
  selectionActions?: SchemaTableSelectionAction[];
  emptyState?: SchemaTableEmptyState;
  columns: SchemaTableColumn[];
};

export type SchemaTableQuery = {
  search: string;
  tab: string;
  filters: Record<string, string>;
  sortKey: string | null;
  sortDir: "asc" | "desc";
  page: number;
  pageSize: number;
};

export type SchemaTableQueryChange =
  | { key: "search"; value: string }
  | { key: "tab"; value: string }
  | { key: "filters"; value: Record<string, string> }
  | {
      key: "sort";
      sortKey: string | null;
      sortDir: "asc" | "desc";
    }
  | { key: "page"; value: number }
  | { key: "pageSize"; value: number };

export type SchemaTableRow = Record<string, unknown> & { id: string };

export function defaultSchemaTableQuery(
  schema: SchemaTableSchema,
): SchemaTableQuery {
  const pageSize =
    schema.pagination === false
      ? Number.POSITIVE_INFINITY
      : (schema.pagination?.pageSize ?? 10);
  const sort = schema.sort === false ? null : schema.sort;
  return {
    search: "",
    tab: schema.tabs?.[0]?.key ?? "all",
    filters: {},
    sortKey: sort?.defaultKey ?? sort?.fields[0]?.key ?? null,
    sortDir: sort?.defaultDir ?? "asc",
    page: 1,
    pageSize,
  };
}

export function searchKeys(schema: SchemaTableSchema) {
  const fromColumns = schema.columns
    .filter((column) => column.search !== false)
    .map((column) => column.key);
  return fromColumns.length > 0
    ? fromColumns
    : schema.columns.map((column) => column.key);
}

function cellString(value: unknown) {
  if (value == null) return "";
  if (typeof value === "number") return String(value);
  return String(value);
}

export function matchesSearch(
  row: SchemaTableRow,
  query: string,
  keys: string[],
) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return keys.some((key) =>
    cellString(row[key]).toLowerCase().includes(needle),
  );
}

export function matchesTab(
  row: SchemaTableRow,
  schema: SchemaTableSchema,
  tabKey: string,
) {
  const tab = schema.tabs?.find((item) => item.key === tabKey);
  const field = schema.tabKey ?? "status";
  if (!tab || tab.value == null || tab.value === "") return true;
  return cellString(row[field]) === tab.value;
}

export function matchesFilters(
  row: SchemaTableRow,
  filters: Record<string, string>,
) {
  return Object.entries(filters).every(([key, value]) => {
    if (!value) return true;
    return cellString(row[key]) === value;
  });
}

export function compareRows(
  left: SchemaTableRow,
  right: SchemaTableRow,
  sortKey: string,
  sortDir: "asc" | "desc",
) {
  const a = left[sortKey];
  const b = right[sortKey];
  let result = 0;
  if (typeof a === "number" && typeof b === "number") result = a - b;
  else
    result = cellString(a).localeCompare(cellString(b), undefined, {
      numeric: true,
    });
  return sortDir === "asc" ? result : -result;
}

export function defaultColumnOrder(schema: SchemaTableSchema) {
  return schema.columns
    .filter((column) => !column.locked)
    .map((column) => column.key);
}

export function defaultHiddenKeys(schema: SchemaTableSchema) {
  return schema.columns
    .filter((column) => column.hidden && !column.locked)
    .map((column) => column.key);
}

export function orderedVisibleColumns(
  schema: SchemaTableSchema,
  columnOrder: string[],
  hiddenKeys: string[],
) {
  const byKey = new Map(schema.columns.map((column) => [column.key, column]));
  const hidden = new Set(hiddenKeys);
  const locked = schema.columns.filter((column) => column.locked);
  const active = columnOrder
    .map((key) => byKey.get(key))
    .filter(
      (column): column is SchemaTableColumn =>
        column != null && !column.locked && !hidden.has(column.key),
    );
  return [...locked, ...active];
}

export function moveColumn(order: string[], fromKey: string, toKey: string) {
  if (fromKey === toKey) return order;
  const next = order.filter((key) => key !== fromKey);
  const index = next.indexOf(toKey);
  if (index === -1) return [...next, fromKey];
  next.splice(index, 0, fromKey);
  return next;
}

export function syncColumnOrder(schema: SchemaTableSchema, order: string[]) {
  const allowed = defaultColumnOrder(schema);
  const allowedSet = new Set(allowed);
  const next = order.filter((key) => allowedSet.has(key));
  for (const key of allowed) {
    if (!next.includes(key)) next.push(key);
  }
  return next;
}

export function queryTable({
  schema,
  data,
  query,
  total,
}: {
  schema: SchemaTableSchema;
  data: SchemaTableRow[];
  query: SchemaTableQuery;
  total?: number;
}) {
  const keys = searchKeys(schema);
  const filtered =
    schema.mode === "server"
      ? data
      : data
          .filter((row) => matchesSearch(row, query.search, keys))
          .filter((row) => matchesTab(row, schema, query.tab))
          .filter((row) => matchesFilters(row, query.filters));

  const sorted =
    schema.mode === "server" || !query.sortKey
      ? filtered
      : [...filtered].sort((left, right) =>
          compareRows(left, right, query.sortKey!, query.sortDir),
        );

  const filteredCount =
    schema.mode === "server" ? (total ?? data.length) : sorted.length;
  const pageSize =
    query.pageSize === Number.POSITIVE_INFINITY
      ? sorted.length || 1
      : query.pageSize;
  const pageCount = Math.max(1, Math.ceil(filteredCount / pageSize) || 1);
  const page = Math.min(query.page, pageCount);
  const start = (page - 1) * pageSize;
  const rows =
    schema.mode === "server" ? data : sorted.slice(start, start + pageSize);

  return { rows, filteredCount, pageCount, page, pageSize };
}

export function paginationItems(
  page: number,
  pageCount: number,
): Array<number | "ellipsis"> {
  if (pageCount <= 6) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }
  if (page <= 3) {
    return [1, 2, 3, 4, "ellipsis", pageCount];
  }
  if (page >= pageCount - 2) {
    return [
      1,
      "ellipsis",
      pageCount - 3,
      pageCount - 2,
      pageCount - 1,
      pageCount,
    ];
  }
  return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", pageCount];
}

export function formatAmount(value: unknown) {
  const amount = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(amount)) return cellString(value);
  return `SGD ${amount.toFixed(2)}`;
}

export function formatDate(value: unknown) {
  const raw = cellString(value);
  const date = new Date(raw);
  if (Number.isNaN(date.getTime())) return raw;
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export const SCHEMA_TABLE_EXAMPLE_SCHEMA: SchemaTableSchema = {
  key: "products",
  mode: "client",
  selection: true,
  search: { placeholder: "Search products" },
  tabKey: "status",
  tabs: [
    { key: "all", title: "All" },
    { key: "published", title: "Published", value: "Published" },
    { key: "draft", title: "Draft", value: "Draft" },
  ],
  filters: [
    {
      key: "category",
      title: "Category",
      options: [
        { value: "Apparel", label: "Apparel" },
        { value: "Membership", label: "Membership" },
        { value: "Workshop", label: "Workshop" },
      ],
    },
    {
      key: "inventory",
      title: "Inventory",
      options: [
        { value: "In stock", label: "In stock" },
        { value: "Inventory not tracked", label: "Inventory not tracked" },
      ],
    },
    {
      key: "source",
      title: "Source",
      options: [
        { value: "Manual", label: "Manual" },
        { value: "Import", label: "Import" },
      ],
    },
    {
      key: "channel",
      title: "Channel",
      options: [
        { value: "Online Store", label: "Online Store" },
        { value: "POS", label: "POS" },
      ],
    },
  ],
  sort: {
    fields: [
      { key: "created", title: "Created" },
      { key: "name", title: "Product name" },
      { key: "amount", title: "Price" },
    ],
    defaultKey: "created",
    defaultDir: "desc",
  },
  pagination: { pageSize: 10, pageSizes: [10, 20, 50] },
  rowActions: ["edit", "delete"],
  selectionActions: [
    { key: "publish", label: "Publish", icon: "publish" },
    {
      key: "more",
      label: "More actions",
      icon: "more",
      presentation: "dropdown",
      items: [
        { key: "duplicate", label: "Duplicate", icon: "duplicate" },
        {
          key: "delete",
          label: "Delete",
          icon: "delete",
          variant: "destructive",
          separator: true,
        },
      ],
    },
  ],
  emptyState: {
    title: "No products to display",
    description: "Add a product to start building your catalog.",
    actions: [{ key: "add", label: "Add product", icon: "add" }],
  },
  columns: [
    { key: "image", title: "Image", type: "image", search: false },
    {
      key: "name",
      title: "Product name",
      type: "text",
      icon: true,
      locked: true,
    },
    {
      key: "inventory",
      title: "Available quantity",
      type: "text",
      search: false,
    },
    { key: "category", title: "Category", type: "text" },
    { key: "amount", title: "Amount", type: "amount", search: false },
    { key: "status", title: "Status", type: "status", search: false },
  ],
};

const NAMES = [
  "Classic White Tee",
  "Studio Membership",
  "Weekend Workshop",
  "Gift Card SGD 50",
  "HitPay Mini",
  "Ari test product with variant",
  "Canvas Tote",
  "Black Cap",
];

export const SCHEMA_TABLE_EXAMPLE_ROWS: SchemaTableRow[] = Array.from(
  { length: 36 },
  (_, index) => {
    const published = index % 3 !== 2;
    return {
      id: `p-${index + 1}`,
      name: NAMES[index % NAMES.length],
      image: undefined,
      inventory: index % 4 === 0 ? "In stock" : "Inventory not tracked",
      category:
        index % 5 === 0
          ? "Apparel"
          : index % 5 === 1
            ? "Membership"
            : "Workshop",
      amount: [10, 20.02, 128, 350, 50][index % 5],
      status: published ? "Published" : "Draft",
      channel: index % 2 === 0 ? "Online Store" : "POS",
      source: index % 3 === 0 ? "Import" : "Manual",
      created: `2026-09-${String((index % 27) + 1).padStart(2, "0")}`,
    };
  },
);
