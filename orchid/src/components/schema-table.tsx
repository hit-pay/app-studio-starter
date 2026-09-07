import {
  Children,
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CheckIcon,
  CircleIcon,
  CopyIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  GripVerticalIcon,
  ImageIcon,
  ListFilterIcon,
  PencilIcon,
  PlusIcon,
  SearchIcon,
  Settings2Icon,
  Trash2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge, BadgeRemove } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  defaultColumnOrder,
  defaultHiddenKeys,
  defaultSchemaTableQuery,
  formatAmount,
  formatDate,
  moveColumn,
  orderedVisibleColumns,
  paginationItems,
  queryTable,
  syncColumnOrder,
  type SchemaTableActionIcon,
  type SchemaTableActionItem,
  type SchemaTableButtonAction,
  type SchemaTableColumn,
  type SchemaTableDropdownAction,
  type SchemaTableEmptyState,
  type SchemaTableFilter,
  type SchemaTableQuery,
  type SchemaTableQueryChange,
  type SchemaTableRow,
  type SchemaTableRowAction,
  type SchemaTableSchema,
  type SchemaTableSelectionAction,
} from "./schema-table-model";

const schemaTableActionIcons = {
  delete: Trash2Icon,
  download: DownloadIcon,
  publish: CheckIcon,
  duplicate: CopyIcon,
  add: PlusIcon,
  more: EllipsisVerticalIcon,
} satisfies Record<SchemaTableActionIcon, typeof CircleIcon>;

function SchemaTableActionIconView({ icon }: { icon?: SchemaTableActionIcon }) {
  if (!icon) return null;
  const Icon = schemaTableActionIcons[icon];
  return <Icon />;
}

type DataTableCellType = "Default" | "Checkbox" | "Image" | "Icon" | "Empty";

type DragSession = {
  key: string;
  neighborKey: string | null;
  startX: number;
  startA: number;
  startB: number;
  minA: number;
  minB: number;
  fromStart: boolean;
  frame: number;
  latestX: number;
};

type DataTableResizeContextValue = {
  enabled: boolean;
  widths: Record<string, number>;
  beginResize: (
    clientX: number,
    key: string,
    type: DataTableCellType,
    wrap: HTMLElement,
  ) => void;
};

const DataTableResizeContext =
  createContext<DataTableResizeContextValue | null>(null);

const MIN_WIDTH: Record<DataTableCellType, number> = {
  Default: 120,
  Checkbox: 32,
  Image: 50,
  Icon: 40,
  Empty: 80,
};

const DEFAULT_WIDTH: Record<DataTableCellType, number> = {
  Default: 160,
  Checkbox: 32,
  Image: 50,
  Icon: 40,
  Empty: 96,
};

function minWidthFor(type: string | undefined) {
  if (type && type in MIN_WIDTH) return MIN_WIDTH[type as DataTableCellType];
  return MIN_WIDTH.Default;
}

function DataTable({
  className,
  resizable = true,
  ...props
}: ComponentProps<"div"> & { resizable?: boolean }) {
  const [widths, setWidths] = useState<Record<string, number>>({});
  const dragRef = useRef<DragSession | null>(null);

  const beginResize = useCallback(
    (
      clientX: number,
      key: string,
      type: DataTableCellType,
      wrap: HTMLElement,
    ) => {
      if (!resizable || dragRef.current) return;

      const heads = [
        ...wrap.querySelectorAll<HTMLElement>("[data-slot=data-table-head]"),
      ];
      const snapshot: Record<string, number> = {};
      for (const head of heads) {
        const column = head.dataset.column;
        if (column) snapshot[column] = head.getBoundingClientRect().width;
      }

      const index = heads.findIndex((head) => head.dataset.column === key);
      const fromStart = type === "Icon";
      const neighbor = fromStart ? heads[index - 1] : heads[index + 1];
      const neighborKey = neighbor?.dataset.column ?? null;

      setWidths(snapshot);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "col-resize";

      dragRef.current = {
        key,
        neighborKey,
        startX: clientX,
        startA: snapshot[key] ?? DEFAULT_WIDTH[type],
        startB: neighborKey ? (snapshot[neighborKey] ?? 0) : 0,
        minA: MIN_WIDTH[type],
        minB: minWidthFor(neighbor?.dataset.type),
        fromStart,
        frame: 0,
        latestX: clientX,
      };

      function apply(nextX: number) {
        const drag = dragRef.current;
        if (!drag) return;
        const delta = drag.fromStart
          ? drag.startX - nextX
          : nextX - drag.startX;
        let nextA = Math.round(drag.startA + delta);

        if (drag.neighborKey) {
          const maxA = drag.startA + drag.startB - drag.minB;
          nextA = Math.min(Math.max(nextA, drag.minA), maxA);
          const nextB = drag.startA + drag.startB - nextA;
          const neighborCol = drag.neighborKey;
          setWidths((current) => ({
            ...current,
            [drag.key]: nextA,
            [neighborCol]: nextB,
          }));
          return;
        }

        setWidths((current) => ({
          ...current,
          [drag.key]: Math.max(nextA, drag.minA),
        }));
      }

      function onMove(move: PointerEvent | MouseEvent) {
        const drag = dragRef.current;
        if (!drag) return;
        drag.latestX = move.clientX;
        if (drag.frame) return;
        drag.frame = requestAnimationFrame(() => {
          const active = dragRef.current;
          if (!active) return;
          active.frame = 0;
          apply(active.latestX);
        });
      }

      function onUp() {
        const drag = dragRef.current;
        if (drag?.frame) cancelAnimationFrame(drag.frame);
        dragRef.current = null;
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("mouseup", onUp);
        window.removeEventListener("pointercancel", onUp);
      }

      window.addEventListener("pointermove", onMove);
      window.addEventListener("mousemove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("mouseup", onUp);
      window.addEventListener("pointercancel", onUp);
    },
    [resizable],
  );

  return (
    <DataTableResizeContext.Provider
      value={{ enabled: resizable, widths, beginResize }}
    >
      <div
        data-slot="data-table-wrap"
        role="table"
        className={cn(
          "relative w-full overflow-x-auto rounded-lg border border-solid border-oc-border",
          className,
        )}
        {...props}
      />
    </DataTableResizeContext.Provider>
  );
}

function DataTableSelectionBar({
  className,
  count,
  onDeselectAll,
  children,
  ...props
}: ComponentProps<"div"> & {
  count: number;
  onDeselectAll?: () => void;
}) {
  const label = count === 1 ? "1 item selected" : `${count} items selected`;

  return (
    <div
      data-slot="data-table-selection-bar"
      className={cn(
        "sticky left-0 z-30 flex min-h-11 w-full items-center justify-between gap-3 border-b border-solid border-oc-border bg-oc-background px-3",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-2 text-[13px] leading-normal">
        <span className="font-medium text-oc-foreground">{label}</span>
        {onDeselectAll ? (
          <Button
            variant="Secondary"
            style="Transparent"
            size="Small"
            onClick={onDeselectAll}
          >
            Deselect All
          </Button>
        ) : null}
      </div>
      {children ? (
        <div className="flex shrink-0 items-center gap-1">{children}</div>
      ) : null}
    </div>
  );
}

function DataTableToolbar({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-toolbar"
      className={cn(
        "sticky left-0 z-30 flex min-h-11 w-full items-center justify-between gap-3 border-b border-solid border-oc-border bg-oc-background px-3",
        className,
      )}
      {...props}
    />
  );
}

function DataTableHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-header"
      role="rowgroup"
      className={cn("w-full min-w-full", className)}
      {...props}
    />
  );
}

function DataTableBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-body"
      role="rowgroup"
      className={cn("w-full min-w-full", className)}
      {...props}
    />
  );
}

function DataTableEmpty({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-empty"
      className={cn(
        "flex min-h-64 w-full flex-col items-center justify-center border-t-0 px-4 py-16",
        className,
      )}
      {...props}
    />
  );
}

function DataTableRow({
  className,
  children,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="data-table-row"
      role="row"
      className={cn(
        "group/data-table-row flex w-full min-w-full hover:**:data-[slot=data-table-cell]:bg-oc-neutral",
        className,
      )}
      {...props}
    >
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;
        const element = child as ReactElement<{ columnKey?: string }>;
        return cloneElement(element, {
          columnKey: element.props.columnKey ?? `col-${index}`,
        });
      })}
    </div>
  );
}

function columnEdgeClass(type: DataTableCellType) {
  return type === "Icon"
    ? "border-l border-solid border-oc-border"
    : "border-r border-solid border-oc-border last:border-r-0";
}

function stickyColumnClass(type: DataTableCellType, surface: "head" | "cell") {
  if (type !== "Checkbox" && type !== "Icon") return "";
  return cn(
    "sticky z-20",
    type === "Checkbox" && "left-0 shadow-[4px_0_8px_rgba(15,23,42,0.06)]",
    type === "Icon" && "right-0 shadow-[-4px_0_8px_rgba(15,23,42,0.06)]",
    surface === "head" && "bg-oc-neutral",
    surface === "cell" &&
      "bg-oc-background group-hover/data-table-row:bg-oc-neutral",
  );
}

function useColumnSize(key: string, type: DataTableCellType): CSSProperties {
  const ctx = useContext(DataTableResizeContext);
  const stored = ctx?.widths[key];
  const width = stored ?? DEFAULT_WIDTH[type];
  const minWidth = MIN_WIDTH[type];
  const flexible = (type === "Default" || type === "Empty") && stored == null;
  return flexible
    ? { minWidth, flexGrow: 1, flexShrink: 1, flexBasis: 0 }
    : {
        width,
        minWidth: width,
        maxWidth: width,
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: width,
      };
}

function startColumnResize(
  event: {
    clientX: number;
    stopPropagation: () => void;
    currentTarget: EventTarget;
  },
  key: string,
  type: DataTableCellType,
  beginResize: DataTableResizeContextValue["beginResize"] | undefined,
) {
  event.stopPropagation();
  const target = event.currentTarget as HTMLElement;
  const wrap = target.closest("[data-slot=data-table-wrap]");
  if (!(wrap instanceof HTMLElement) || !beginResize) return;
  beginResize(event.clientX, key, type, wrap);
}

function DataTableResizeHandle({
  fromStart,
  onResizeStart,
}: {
  fromStart: boolean;
  onResizeStart: (event: {
    clientX: number;
    stopPropagation: () => void;
    currentTarget: EventTarget;
  }) => void;
}) {
  return (
    <span
      data-slot="data-table-resize"
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize column"
      className={cn(
        "absolute inset-y-0 z-50 w-4 cursor-col-resize touch-none select-none hover:bg-oc-foreground/10",
        fromStart ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
      )}
      onPointerDown={onResizeStart}
      onMouseDown={onResizeStart}
    />
  );
}

function DataTableHead({
  className,
  type = "Default",
  columnKey = "col-0",
  resizable,
  style,
  children,
  ...props
}: ComponentProps<"div"> & {
  type?: DataTableCellType;
  columnKey?: string;
  resizable?: boolean;
}) {
  const ctx = useContext(DataTableResizeContext);
  const sizeStyle = useColumnSize(columnKey, type);
  const canResize = (resizable ?? ctx?.enabled) !== false;
  const fromStart = type === "Icon";

  return (
    <div
      data-slot="data-table-head"
      data-type={type}
      data-column={columnKey}
      role="columnheader"
      className={cn(
        "relative flex h-8.5 items-center bg-oc-neutral text-[10px] leading-4.5 font-medium tracking-[0.3px] text-oc-foreground uppercase",
        "border-b border-solid border-oc-border",
        columnEdgeClass(type),
        type === "Checkbox" || type === "Image" || type === "Icon"
          ? "justify-center px-1"
          : "justify-start px-3",
        type === "Checkbox" || type === "Image" || type === "Icon"
          ? "shrink-0"
          : "min-w-0",
        stickyColumnClass(type, "head"),
        className,
      )}
      {...props}
      style={{ ...style, ...sizeStyle }}
    >
      {type === "Default" || type === "Empty" ? (
        <span className="min-w-0 truncate">{children}</span>
      ) : (
        children
      )}
      {canResize ? (
        <DataTableResizeHandle
          fromStart={fromStart}
          onResizeStart={(event) =>
            startColumnResize(event, columnKey, type, ctx?.beginResize)
          }
        />
      ) : null}
    </div>
  );
}

function DataTableCell({
  className,
  type = "Default",
  columnKey = "col-0",
  children,
  style,
  ...props
}: ComponentProps<"div"> & {
  type?: DataTableCellType;
  columnKey?: string;
}) {
  const sizeStyle = useColumnSize(columnKey, type);

  return (
    <div
      data-slot="data-table-cell"
      data-type={type}
      data-column={columnKey}
      role="cell"
      className={cn(
        "relative flex min-h-11 items-center bg-oc-background text-[13px] leading-normal text-oc-foreground",
        "border-b border-solid border-oc-border",
        columnEdgeClass(type),
        type === "Checkbox" || type === "Image" || type === "Icon"
          ? "justify-center px-1"
          : "justify-start px-3",
        type === "Checkbox" || type === "Image" || type === "Icon"
          ? "shrink-0"
          : "min-w-0",
        type === "Icon" &&
          "*:opacity-0 group-hover/data-table-row:*:opacity-100 group-focus-within/data-table-row:*:opacity-100 has-data-popup-open:*:opacity-100",
        stickyColumnClass(type, "cell"),
        className,
      )}
      {...props}
      style={{ ...style, ...sizeStyle }}
    >
      {type === "Empty" && children == null ? "–" : children}
    </div>
  );
}

function DataTableCellImage({
  className,
  src,
  alt = "",
  ...props
}: ComponentProps<"span"> & { src?: string; alt?: string }) {
  return (
    <span
      data-slot="data-table-cell-image"
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center overflow-clip rounded bg-oc-muted",
        className,
      )}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <ImageIcon className="size-4 text-oc-muted-foreground" />
      )}
    </span>
  );
}

function DataTableCellText({
  className,
  icon,
  children,
  ...props
}: ComponentProps<"span"> & { icon?: ReactNode }) {
  return (
    <span
      data-slot="data-table-cell-text"
      className={cn("flex min-w-0 items-center gap-1", className)}
      {...props}
    >
      {icon ? (
        <span className="inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-4">
          {icon}
        </span>
      ) : null}
      <span className="min-w-0 truncate">{children}</span>
    </span>
  );
}

type SchemaTableApi = {
  schema: SchemaTableSchema;
  data: SchemaTableRow[];
  query: SchemaTableQuery;
  rows: SchemaTableRow[];
  filteredCount: number;
  pageCount: number;
  page: number;
  pageSize: number;
  selected: string[];
  setSearch: (search: string) => void;
  setTab: (tab: string) => void;
  setFilters: (filters: Record<string, string>) => void;
  setSort: (sortKey: string, sortDir?: "asc" | "desc") => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  clearAll: () => void;
  clearSelection: () => void;
  toggleRow: (id: string) => void;
  togglePage: () => void;
  visibleColumns: SchemaTableColumn[];
  columnOrder: string[];
  hiddenKeys: string[];
  toggleColumnVisibility: (key: string) => void;
  reorderColumns: (fromKey: string, toKey: string) => void;
};

function mergeQuery(
  current: SchemaTableQuery,
  patch: Partial<SchemaTableQuery>,
): SchemaTableQuery {
  const next = { ...current, ...patch };
  const resetPage =
    patch.search != null ||
    patch.tab != null ||
    patch.filters != null ||
    patch.sortKey != null ||
    patch.sortDir != null ||
    patch.pageSize != null;
  if (resetPage && patch.page == null) next.page = 1;
  return next;
}

function useSchemaTable({
  schema,
  data,
  total,
  onQueryChange,
}: {
  schema: SchemaTableSchema;
  data: SchemaTableRow[];
  total?: number;
  onQueryChange?: (
    query: SchemaTableQuery,
    change: SchemaTableQueryChange,
  ) => void;
}): SchemaTableApi {
  const [query, setQuery] = useState(() => defaultSchemaTableQuery(schema));
  const [selected, setSelected] = useState<string[]>([]);
  const [columnOrder, setColumnOrder] = useState(() =>
    defaultColumnOrder(schema),
  );
  const [hiddenKeys, setHiddenKeys] = useState(() => defaultHiddenKeys(schema));
  const queryRef = useRef(query);
  const onQueryChangeRef = useRef(onQueryChange);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  queryRef.current = query;
  onQueryChangeRef.current = onQueryChange;

  const cancelPendingSearch = useCallback(() => {
    if (searchTimerRef.current !== null) {
      clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }
  }, []);

  useEffect(() => cancelPendingSearch, [cancelPendingSearch]);

  const order = syncColumnOrder(schema, columnOrder);
  const visibleColumns = useMemo(
    () => orderedVisibleColumns(schema, order, hiddenKeys),
    [schema, order, hiddenKeys],
  );

  function commit(
    patch: Partial<SchemaTableQuery>,
    change: SchemaTableQueryChange,
  ) {
    cancelPendingSearch();
    const next = mergeQuery(queryRef.current, patch);
    queryRef.current = next;
    setQuery(next);
    onQueryChangeRef.current?.(next, change);
  }

  function setSearch(search: string) {
    cancelPendingSearch();
    const next = mergeQuery(queryRef.current, { search });
    queryRef.current = next;
    setQuery(next);

    const change = { key: "search", value: search } as const;
    const debounceMs =
      schema.mode === "server"
        ? Math.max(
            0,
            schema.search === false ? 0 : (schema.search?.debounceMs ?? 300),
          )
        : 0;

    if (!search || debounceMs === 0) {
      onQueryChangeRef.current?.(next, change);
      return;
    }

    searchTimerRef.current = setTimeout(() => {
      searchTimerRef.current = null;
      onQueryChangeRef.current?.(queryRef.current, change);
    }, debounceMs);
  }

  const result = useMemo(
    () => queryTable({ schema, data, query, total }),
    [schema, data, query, total],
  );

  const pageIds = result.rows.map((row) => row.id);
  const selectedOnPage = pageIds.filter((id) => selected.includes(id));

  return {
    schema,
    data,
    query,
    ...result,
    selected,
    setSearch,
    setTab: (tab) => commit({ tab }, { key: "tab", value: tab }),
    setFilters: (filters) =>
      commit({ filters }, { key: "filters", value: filters }),
    setSort: (sortKey, sortDir) =>
      commit(
        { sortKey, sortDir: sortDir ?? queryRef.current.sortDir },
        {
          key: "sort",
          sortKey,
          sortDir: sortDir ?? queryRef.current.sortDir,
        },
      ),
    setPage: (page) => commit({ page }, { key: "page", value: page }),
    setPageSize: (pageSize) =>
      commit({ pageSize }, { key: "pageSize", value: pageSize }),
    clearAll: () =>
      commit({ search: "", filters: {} }, { key: "filters", value: {} }),
    clearSelection: () => setSelected([]),
    toggleRow: (id) =>
      setSelected((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      ),
    togglePage: () =>
      setSelected((current) =>
        selectedOnPage.length === pageIds.length
          ? current.filter((id) => !pageIds.includes(id))
          : [...new Set([...current, ...pageIds])],
      ),
    visibleColumns,
    columnOrder: order,
    hiddenKeys,
    toggleColumnVisibility: (key) => {
      const column = schema.columns.find((item) => item.key === key);
      if (!column || column.locked) return;
      setHiddenKeys((current) =>
        current.includes(key)
          ? current.filter((item) => item !== key)
          : [...current, key],
      );
    },
    reorderColumns: (fromKey, toKey) => {
      setColumnOrder((current) =>
        moveColumn(syncColumnOrder(schema, current), fromKey, toKey),
      );
    },
  };
}

function ToolbarIcon({
  label,
  active,
  children,
  className,
  ...props
}: {
  label: string;
  active?: boolean;
  children: ReactNode;
} & Omit<
  ComponentProps<typeof Button>,
  "children" | "variant" | "style" | "size" | "iconOnly"
>) {
  return (
    <Button
      variant="Secondary"
      style="Border"
      size="Small"
      iconOnly
      aria-label={label}
      aria-pressed={active}
      className={cn(active && "border-oc-primary text-oc-primary", className)}
      {...props}
    >
      {children}
    </Button>
  );
}

function cellContent(column: SchemaTableColumn, row: SchemaTableRow) {
  const value = row[column.key];
  if (column.type === "image") {
    return (
      <DataTableCellImage
        alt={String(row.name ?? "")}
        src={typeof value === "string" ? value : undefined}
      />
    );
  }
  if (column.type === "amount")
    return <DataTableCellText>{formatAmount(value)}</DataTableCellText>;
  if (column.type === "date")
    return <DataTableCellText>{formatDate(value)}</DataTableCellText>;
  if (column.type === "status") {
    const label = String(value ?? "");
    return (
      <Badge tone={label === "Published" ? "green" : "grey"}>
        {label || "–"}
      </Badge>
    );
  }
  return (
    <DataTableCellText icon={column.icon ? <CircleIcon /> : undefined}>
      {value == null || value === "" ? "N/A" : String(value)}
    </DataTableCellText>
  );
}

function tableCellType(column: SchemaTableColumn) {
  return column.type === "image" ? "Image" : "Default";
}

function filterLabel(filter: SchemaTableFilter, value: string) {
  return (
    filter.options.find((option) => option.value === value)?.label ?? value
  );
}

function SchemaTableSearch({ table }: { table: SchemaTableApi }) {
  const config = table.schema.search;
  if (config === false) return null;
  const [open, setOpen] = useState(Boolean(table.query.search));
  const placeholder = config?.placeholder ?? "Search";

  if (!open) {
    return (
      <ToolbarIcon label="Search" onClick={() => setOpen(true)}>
        <SearchIcon />
      </ToolbarIcon>
    );
  }

  return (
    <div className="flex min-w-40 flex-1 items-center gap-2 sm:max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput
          autoFocus
          value={table.query.search}
          placeholder={placeholder}
          onChange={(event) => table.setSearch(event.target.value)}
        />
      </InputGroup>
      <InputGroupButton
        type="button"
        onClick={() => {
          table.setSearch("");
          setOpen(false);
        }}
      >
        Clear
      </InputGroupButton>
    </div>
  );
}

function SchemaTableFilterPopover({ table }: { table: SchemaTableApi }) {
  const filters = table.schema.filters;
  if (!filters?.length) return null;
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(table.query.filters);
  const active = Object.values(table.query.filters).some(Boolean);
  const preview = queryTable({
    schema: table.schema,
    data: table.data,
    query: { ...table.query, filters: draft, page: 1 },
  });
  const countLabel = `${preview.filteredCount} result${preview.filteredCount === 1 ? "" : "s"}`;

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setDraft(table.query.filters);
      }}
    >
      <PopoverTrigger
        nativeButton
        render={
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            iconOnly
            aria-label="Filter"
            aria-pressed={active || open}
            className={
              active || open ? "border-oc-primary text-oc-primary" : undefined
            }
          >
            <ListFilterIcon />
          </Button>
        }
      />
      <PopoverContent align="end" className="w-70 gap-3 p-3">
        {filters.map((filter) => (
          <Field key={filter.key}>
            <FieldLabel>{filter.title}</FieldLabel>
            <Select
              value={draft[filter.key] || null}
              onValueChange={(value) =>
                setDraft((current) => ({
                  ...current,
                  [filter.key]: String(value ?? ""),
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder={filter.title} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        ))}
        <div className="flex gap-2 pt-1">
          <Button
            variant="Secondary"
            style="Border"
            className="flex-1"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="Primary"
            className="flex-1"
            onClick={() => {
              table.setFilters(draft);
              setOpen(false);
            }}
          >
            {countLabel}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

function SchemaTableSortMenu({ table }: { table: SchemaTableApi }) {
  const sort = table.schema.sort;
  if (sort === false || !sort?.fields.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        render={
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            iconOnly
            aria-label="Sort"
          >
            <ArrowUpDownIcon />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Sort by</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={table.query.sortKey ?? ""}
            onValueChange={(value) => table.setSort(String(value))}
          >
            {sort.fields.map((field) => (
              <DropdownMenuRadioItem key={field.key} value={field.key}>
                {field.title}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={table.query.sortDir}
          onValueChange={(value) => {
            if (table.query.sortKey)
              table.setSort(table.query.sortKey, value as "asc" | "desc");
          }}
        >
          <DropdownMenuRadioItem value="asc">
            <ArrowDownIcon />
            Ascending
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc">
            <ArrowUpIcon />
            Descending
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SchemaTableEditColumns({ table }: { table: SchemaTableApi }) {
  const [open, setOpen] = useState(false);
  const [dragKey, setDragKey] = useState<string | null>(null);

  if (table.schema.editColumns === false) return null;
  const locked = table.schema.columns.filter((column) => column.locked);
  const byKey = new Map(
    table.schema.columns.map((column) => [column.key, column]),
  );
  const active = table.columnOrder
    .map((key) => byKey.get(key))
    .filter(
      (column): column is SchemaTableColumn => column != null && !column.locked,
    );
  const hidden = new Set(table.hiddenKeys);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        nativeButton
        render={
          <Button
            variant="Secondary"
            style="Border"
            size="Small"
            aria-label="Edit column"
            aria-pressed={open}
            className={cn(
              "max-sm:size-7 max-sm:min-w-7 max-sm:px-0",
              open && "border-oc-primary text-oc-primary",
            )}
          >
            <Settings2Icon />
            <span className="hidden sm:inline">Edit Column</span>
          </Button>
        }
      />
      <PopoverContent
        align="end"
        className="max-h-80 w-72 gap-0 overflow-y-auto p-2"
      >
        {locked.length > 0 ? (
          <div className="flex flex-col gap-0.5 pb-1">
            <p className="px-2 py-1 text-[10px] leading-4.5 font-medium tracking-[0.3px] text-oc-muted-foreground uppercase">
              Fixed columns
            </p>
            {locked.map((column) => (
              <div
                key={column.key}
                className="flex min-h-8 items-center px-2 text-xs text-oc-foreground"
              >
                {column.title}
              </div>
            ))}
          </div>
        ) : null}
        {locked.length > 0 && active.length > 0 ? (
          <div className="my-1 h-px bg-oc-border" />
        ) : null}
        {active.length > 0 ? (
          <div className="flex flex-col gap-0.5">
            <p className="px-2 py-1 text-[10px] leading-4.5 font-medium tracking-[0.3px] text-oc-muted-foreground uppercase">
              Active columns
            </p>
            {active.map((column) => {
              const visible = !hidden.has(column.key);
              return (
                <div
                  key={column.key}
                  draggable
                  onDragStart={() => setDragKey(column.key)}
                  onDragEnd={() => setDragKey(null)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={() => {
                    if (dragKey) table.reorderColumns(dragKey, column.key);
                    setDragKey(null);
                  }}
                  className={cn(
                    "flex min-h-8 cursor-grab items-center gap-2 rounded-md px-2 text-xs text-oc-foreground active:cursor-grabbing",
                    dragKey === column.key && "opacity-50",
                  )}
                >
                  <Checkbox
                    checked={visible}
                    aria-label={column.title}
                    onCheckedChange={() =>
                      table.toggleColumnVisibility(column.key)
                    }
                    onPointerDown={(event) => event.stopPropagation()}
                  />
                  <span className="min-w-0 flex-1">{column.title}</span>
                  <GripVerticalIcon className="size-3.5 shrink-0 text-oc-muted-foreground" />
                </div>
              );
            })}
          </div>
        ) : null}
      </PopoverContent>
    </Popover>
  );
}

function SchemaTableChips({ table }: { table: SchemaTableApi }) {
  const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];
  if (table.query.search.trim()) {
    chips.push({
      key: "search",
      label: `Search for: ${table.query.search.trim()}`,
      onRemove: () => table.setSearch(""),
    });
  }
  for (const filter of table.schema.filters ?? []) {
    const value = table.query.filters[filter.key];
    if (!value) continue;
    chips.push({
      key: filter.key,
      label: `${filter.title} : ${filterLabel(filter, value)}`,
      onRemove: () => {
        const next = { ...table.query.filters };
        delete next[filter.key];
        table.setFilters(next);
      },
    });
  }
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-solid border-oc-border px-3 py-2">
      {chips.map((chip) => (
        <Badge key={chip.key} tone="grey">
          {chip.label}
          <BadgeRemove onClick={chip.onRemove} />
        </Badge>
      ))}
      <Button
        variant="Secondary"
        style="Transparent"
        size="Small"
        onClick={table.clearAll}
      >
        Clear all
      </Button>
    </div>
  );
}

function SchemaTableTabs({ table }: { table: SchemaTableApi }) {
  const tabs = table.schema.tabs;
  if (!tabs?.length) return <span />;

  return (
    <>
      <div className="min-w-0 max-w-44 md:hidden">
        <Select
          value={table.query.tab}
          onValueChange={(value) => {
            if (value) table.setTab(String(value));
          }}
        >
          <SelectTrigger className="h-7 text-xs" aria-label="Filter">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {tabs.map((tab) => (
              <SelectItem key={tab.key} value={tab.key}>
                {tab.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden min-w-0 flex-wrap gap-1 md:flex">
        {tabs.map((tab) => (
          <Button
            key={tab.key}
            variant="Secondary"
            style={table.query.tab === tab.key ? "Default" : "Transparent"}
            size="Small"
            onClick={() => table.setTab(tab.key)}
          >
            {tab.title}
          </Button>
        ))}
      </div>
    </>
  );
}

function SchemaTable({
  table,
  onRowAction,
  onSelectionAction,
  onEmptyAction,
  className,
}: {
  table: SchemaTableApi;
  onRowAction?: (action: SchemaTableRowAction, row: SchemaTableRow) => void;
  onSelectionAction?: (
    action: SchemaTableActionItem,
    selectedIds: string[],
  ) => void;
  onEmptyAction?: (action: SchemaTableActionItem) => void;
  className?: string;
}) {
  const columns = table.visibleColumns;
  const actions =
    table.schema.rowActions === false ? [] : (table.schema.rowActions ?? []);
  const pageIds = table.rows.map((row) => row.id);
  const selectedOnPage = pageIds.filter((id) => table.selected.includes(id));
  const allSelected =
    pageIds.length > 0 && selectedOnPage.length === pageIds.length;
  const someSelected = selectedOnPage.length > 0 && !allSelected;
  const pages = paginationItems(table.page, table.pageCount);
  const pageSizes =
    table.schema.pagination === false
      ? []
      : (table.schema.pagination?.pageSizes ?? [10, 20, 50]);

  return (
    <div
      data-slot="schema-table"
      className={cn("flex flex-col gap-3", className)}
    >
      <DataTable>
        {table.selected.length > 0 ? (
          <DataTableSelectionBar
            count={table.selected.length}
            onDeselectAll={table.clearSelection}
          >
            {table.schema.selectionActions?.map((action) => {
              if (action.presentation === "dropdown") {
                return (
                  <DropdownMenu key={action.key}>
                    <DropdownMenuTrigger
                      nativeButton
                      disabled={action.disabled}
                      className="inline-flex"
                      render={
                        <Button
                          variant={
                            action.variant === "destructive"
                              ? "Destructive"
                              : "Secondary"
                          }
                          style="Transparent"
                          size="Small"
                          iconOnly={Boolean(action.icon)}
                          aria-label={action.label}
                        >
                          <SchemaTableActionIconView icon={action.icon} />
                          {!action.icon ? action.label : null}
                        </Button>
                      }
                    />
                    <DropdownMenuContent align="end">
                      {action.items.map((item) => (
                        <Fragment key={item.key}>
                          {item.separator ? <DropdownMenuSeparator /> : null}
                          <DropdownMenuItem
                            variant={item.variant}
                            disabled={item.disabled}
                            onClick={() =>
                              onSelectionAction?.(item, [...table.selected])
                            }
                          >
                            <SchemaTableActionIconView icon={item.icon} />
                            {item.label}
                          </DropdownMenuItem>
                        </Fragment>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }
              return (
                <Button
                  key={action.key}
                  variant={
                    action.variant === "destructive"
                      ? "Destructive"
                      : "Secondary"
                  }
                  style="Transparent"
                  size="Small"
                  disabled={action.disabled}
                  onClick={() =>
                    onSelectionAction?.(action, [...table.selected])
                  }
                >
                  <SchemaTableActionIconView icon={action.icon} />
                  {action.label}
                </Button>
              );
            })}
          </DataTableSelectionBar>
        ) : (
          <DataTableToolbar>
            {table.schema.tabs?.length ? (
              <SchemaTableTabs table={table} />
            ) : (
              <span />
            )}
            <div className="flex min-w-0 items-center justify-end gap-2">
              <SchemaTableSearch table={table} />
              <SchemaTableFilterPopover table={table} />
              <SchemaTableSortMenu table={table} />
              <SchemaTableEditColumns table={table} />
            </div>
          </DataTableToolbar>
        )}
        {table.selected.length === 0 ? (
          <SchemaTableChips table={table} />
        ) : null}
        <DataTableHeader>
          <DataTableRow>
            {table.schema.selection ? (
              <DataTableHead type="Checkbox">
                <Checkbox
                  aria-label="Select page"
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={() => table.togglePage()}
                />
              </DataTableHead>
            ) : null}
            {columns.map((column) => (
              <DataTableHead
                key={column.key}
                type={tableCellType(column) === "Image" ? "Image" : "Default"}
              >
                {column.title}
              </DataTableHead>
            ))}
            {actions.length > 0 ? <DataTableHead type="Icon" /> : null}
          </DataTableRow>
        </DataTableHeader>
        <DataTableBody>
          {table.rows.length === 0 ? (
            <DataTableEmpty>
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="search">
                    <SearchIcon />
                  </EmptyMedia>
                  <EmptyTitle>
                    {table.schema.emptyState?.title ?? "No data to display"}
                  </EmptyTitle>
                  {table.schema.emptyState?.description ? (
                    <EmptyDescription>
                      {table.schema.emptyState.description}
                    </EmptyDescription>
                  ) : null}
                </EmptyHeader>
                {table.schema.emptyState?.actions?.length ? (
                  <EmptyContent>
                    {table.schema.emptyState.actions.map((action) => (
                      <Button
                        key={action.key}
                        variant={action.variant ?? "default"}
                        size="sm"
                        disabled={action.disabled}
                        onClick={() => onEmptyAction?.(action)}
                      >
                        <SchemaTableActionIconView icon={action.icon} />
                        {action.label}
                      </Button>
                    ))}
                  </EmptyContent>
                ) : null}
              </Empty>
            </DataTableEmpty>
          ) : (
            table.rows.map((row) => (
              <DataTableRow key={row.id}>
                {table.schema.selection ? (
                  <DataTableCell type="Checkbox">
                    <Checkbox
                      aria-label={`Select ${String(row.name ?? row.id)}`}
                      checked={table.selected.includes(row.id)}
                      onCheckedChange={() => table.toggleRow(row.id)}
                    />
                  </DataTableCell>
                ) : null}
                {columns.map((column) => (
                  <DataTableCell key={column.key} type={tableCellType(column)}>
                    {cellContent(column, row)}
                  </DataTableCell>
                ))}
                {actions.length > 0 ? (
                  <DataTableCell type="Icon">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        nativeButton
                        className="inline-flex"
                        render={
                          <Button
                            variant="Secondary"
                            style="Transparent"
                            size="Small"
                            iconOnly
                            aria-label={`Actions for ${String(row.name ?? row.id)}`}
                          >
                            <EllipsisVerticalIcon />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        {actions.includes("edit") ? (
                          <DropdownMenuItem
                            onClick={() => onRowAction?.("edit", row)}
                          >
                            <PencilIcon />
                            Edit
                          </DropdownMenuItem>
                        ) : null}
                        {actions.includes("delete") ? (
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => onRowAction?.("delete", row)}
                          >
                            <Trash2Icon />
                            Delete
                          </DropdownMenuItem>
                        ) : null}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </DataTableCell>
                ) : null}
              </DataTableRow>
            ))
          )}
        </DataTableBody>
      </DataTable>
      {table.schema.pagination !== false && table.filteredCount > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="hidden min-w-32 sm:block" />
          <Pagination className="w-auto flex-1">
            <PaginationPrevious
              href={`?page=${Math.max(1, table.page - 1)}`}
              aria-disabled={table.page <= 1}
              tabIndex={table.page <= 1 ? -1 : undefined}
              onClick={(event) => {
                event.preventDefault();
                table.setPage(table.page - 1);
              }}
            />
            <PaginationContent>
              {pages.map((item, index) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`e-${index}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href={`?page=${item}`}
                      isActive={item === table.page}
                      onClick={(event) => {
                        event.preventDefault();
                        table.setPage(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
            </PaginationContent>
            <PaginationNext
              href={`?page=${Math.min(table.pageCount, table.page + 1)}`}
              aria-disabled={table.page >= table.pageCount}
              tabIndex={table.page >= table.pageCount ? -1 : undefined}
              onClick={(event) => {
                event.preventDefault();
                table.setPage(table.page + 1);
              }}
            />
          </Pagination>
          {pageSizes.length > 0 ? (
            <div className="flex items-center gap-2 text-[13px] text-oc-muted-foreground">
              Item per page:
              <Select
                value={String(table.pageSize)}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger size="Inline">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {pageSizes.map((size) => (
                    <SelectItem key={size} value={String(size)}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export {
  SchemaTable,
  SCHEMA_TABLE_EXAMPLE_ROWS,
  SCHEMA_TABLE_EXAMPLE_SCHEMA,
  useSchemaTable,
  type SchemaTableActionIcon,
  type SchemaTableActionItem,
  type SchemaTableButtonAction,
  type SchemaTableDropdownAction,
  type SchemaTableEmptyState,
  type SchemaTableApi,
  type SchemaTableQuery,
  type SchemaTableQueryChange,
  type SchemaTableRow,
  type SchemaTableSelectionAction,
  type SchemaTableSchema,
};
