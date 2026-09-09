export const DOC_COMPONENTS = [
  {
    to: "/base-ui/button" as const,
    name: "Button",
    description:
      "Standard variants, sizes, icon buttons, native props, and polymorphic rendering.",
  },
  {
    to: "/base-ui/button-group" as const,
    name: "Button Group",
    description:
      "Group related controls horizontally or vertically, including split dropdown buttons.",
  },
  {
    to: "/base-ui/dropdown-menu" as const,
    name: "Dropdown Menu",
    description:
      "shadcn-compatible items, selection, submenus, and shortcuts with Orchid styling.",
  },
  {
    to: "/base-ui/toast" as const,
    name: "Toast",
    description:
      "shadcn-compatible toast manager with semantic types, actions, close, and placement.",
  },
  {
    to: "/base-ui/alert" as const,
    name: "Alert",
    description:
      "In-page notification with semantic variants and an optional action.",
  },
  {
    to: "/base-ui/empty" as const,
    name: "Empty",
    description:
      "shadcn-compatible compound empty state with Orchid media variants.",
  },
  {
    to: "/base-ui/list-item" as const,
    name: "List Item",
    description:
      "Generic row: compose title, media, logo, meta, copy fields, tokens, and actions.",
  },
  {
    to: "/base-ui/badge" as const,
    name: "Badge",
    description:
      "Standard variants with Orchid tones, appearances, removal, and user roles.",
  },
  {
    to: "/base-ui/accordion" as const,
    name: "Accordion",
    description:
      "Composable expand-and-collapse sections with shadcn-compatible primitives.",
  },
  {
    to: "/base-ui/progress" as const,
    name: "Progress",
    description:
      "shadcn-compatible progress with composable label, value, track, and indicator.",
  },
  {
    to: "/base-ui/avatar" as const,
    name: "Avatar",
    description:
      "Image, fallback, badge, and group primitives with Orchid styling.",
  },
  {
    to: "/base-ui/tooltip" as const,
    name: "Tooltip",
    description:
      "shadcn-compatible hover and focus tooltip with Orchid styling.",
  },
  {
    to: "/base-ui/tabs" as const,
    name: "Tabs",
    description:
      "shadcn-compatible horizontal or vertical tabs with default and line variants.",
  },
  {
    to: "/base-ui/skeleton" as const,
    name: "Skeleton",
    description: "shadcn-compatible placeholder pulse with Orchid styling.",
  },
  {
    to: "/base-ui/spinner" as const,
    name: "Spinner",
    description:
      "shadcn-compatible indeterminate loading icon sized through className.",
  },
  {
    to: "/base-ui/dialog" as const,
    name: "Dialog",
    description:
      "shadcn-compatible dialog primitives with Orchid sizes and persistent mode.",
  },
  {
    to: "/base-ui/sheet" as const,
    name: "Sheet",
    description:
      "shadcn-compatible compound edge panel with four sides and Orchid styling.",
  },
  {
    to: "/base-ui/breadcrumb" as const,
    name: "Breadcrumb",
    description: "Hierarchy of links to the current page.",
  },
  {
    to: "/base-ui/pagination" as const,
    name: "Pagination",
    description:
      "shadcn-compatible page links with previous, next, ellipsis, and an optional range label.",
  },
  {
    to: "/base-ui/table" as const,
    name: "Table",
    description: "shadcn-compatible semantic HTML table with Orchid styling.",
  },
  {
    to: "/base-ui/command" as const,
    name: "Command",
    description:
      "shadcn-compatible cmdk palette with keyboard navigation and Orchid styling.",
  },
  {
    to: "/base-ui/kbd" as const,
    name: "Kbd",
    description: "shadcn-compatible keyboard key and grouped shortcut display.",
  },
  {
    to: "/base-ui/collapsible" as const,
    name: "Collapsible",
    description:
      "shadcn-compatible expand-and-collapse primitives with Orchid styling.",
  },
  {
    to: "/base-ui/scroll-area" as const,
    name: "Scroll Area",
    description:
      "shadcn-compatible bounded scroll area with Orchid scrollbar styling.",
  },
  {
    to: "/base-ui/card" as const,
    name: "Card",
    description:
      "shadcn-compatible content card with header, title, description, action, and footer.",
  },
  {
    to: "/base-ui/resizable" as const,
    name: "Resizable",
    description:
      "shadcn-compatible split panes with a drag handle in Orchid styling.",
  },
  {
    to: "/base-ui/aspect-ratio" as const,
    name: "Aspect Ratio",
    description:
      "shadcn-compatible box that keeps a width/height ratio, such as 16/9.",
  },
  {
    to: "/base-ui/chart" as const,
    name: "Chart",
    description:
      "shadcn-compatible Recharts wrapper with Orchid tooltip, legend, and chart tokens.",
  },
  {
    to: "/base-ui/attachment" as const,
    name: "Attachment",
    description:
      "shadcn-compatible file and image attachment with upload state, media, and a vertical group.",
  },
] as const;

export function docComponentsByName() {
  return [...DOC_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_FORMS = [
  {
    to: "/base-ui/field" as const,
    name: "Field",
    description:
      "shadcn-compatible label, description, error, and grouped field composition.",
  },
  {
    to: "/base-ui/label" as const,
    name: "Label",
    description: "shadcn-compatible accessible label with Orchid typography.",
  },
  {
    to: "/base-ui/input" as const,
    name: "Input",
    description: "shadcn-compatible text and file input with Orchid states.",
  },
  {
    to: "/base-ui/input-group" as const,
    name: "Input Group",
    description:
      "shadcn-compatible input, textarea, addon, and button composition.",
  },
  {
    to: "/base-ui/textarea" as const,
    name: "Textarea",
    description:
      "shadcn-compatible auto-sizing textarea with Orchid form styling.",
  },
  {
    to: "/base-ui/select" as const,
    name: "Select",
    description:
      "shadcn-compatible Base UI select with groups, states, and Orchid styling.",
  },
  {
    to: "/base-ui/combobox" as const,
    name: "Combobox",
    description:
      "shadcn-compatible searchable select with Orchid chips and bulk selection helpers.",
  },
  {
    to: "/base-ui/checkbox" as const,
    name: "Checkbox",
    description:
      "shadcn-compatible checkbox with Orchid states and an optional group helper.",
  },
  {
    to: "/base-ui/radio-group" as const,
    name: "Radio Group",
    description:
      "shadcn-compatible radio group and item primitives with Orchid styling.",
  },
  {
    to: "/base-ui/switch" as const,
    name: "Switch",
    description: "shadcn-compatible switch in default and small Orchid sizes.",
  },
  {
    to: "/base-ui/slider" as const,
    name: "Slider",
    description:
      "shadcn-compatible single, range, or vertical slider with Orchid styling.",
  },
  {
    to: "/base-ui/calendar" as const,
    name: "Calendar",
    description:
      "Single, range, and multiple date selection used by Date Picker.",
  },
  {
    to: "/base-ui/form-section" as const,
    name: "Form Section",
    description: "Heading plus FormSectionGroup and FormSectionItem.",
  },
] as const;

export function docFormsByName() {
  return [...DOC_FORMS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_BLOCKS = [
  {
    to: "/components/sidebar" as const,
    name: "Sidebar",
    description:
      "JSON-configured navigation that opens nested items in a back-enabled Sub Sidebar.",
  },
  {
    to: "/components/sub-sidebar" as const,
    name: "Sub Sidebar",
    description:
      "JSON-configured flat child navigation with a blue active state.",
  },
  {
    to: "/components/choice-card" as const,
    name: "Choice Card",
    description: "Selectable cards with left or center icon, no radio dot.",
  },
  {
    to: "/components/copy-button" as const,
    name: "Copy Button",
    description: "Copy icon that writes a value and shows Copied!.",
  },
  {
    to: "/components/customer-card" as const,
    name: "Customer Card",
    description: "Small, Big, and Float customer or beneficiary cards.",
  },
  {
    to: "/components/date-picker" as const,
    name: "Date Picker",
    description:
      "Shadcn-style Popover and Calendar composition with optional Orchid helpers.",
  },
  {
    to: "/components/detail-list" as const,
    name: "Detail List",
    description: "Detail card with grid columns, colspan, and stacked rows.",
  },
  {
    to: "/components/icon-group" as const,
    name: "Icon Group",
    description:
      "Icon cluster with Default and Border; dropdown, link, and copy.",
  },
  {
    to: "/components/quantity-input" as const,
    name: "Quantity Input",
    description: "Minus/plus stepper; click the value to type.",
  },
  {
    to: "/components/metric-card" as const,
    name: "Metric Card",
    description:
      "Dashboard KPI card: icon, title, value, and optional percent change.",
  },
  {
    to: "/components/app-layout" as const,
    name: "App Layout",
    description:
      "Embedded application frame with optional app name, tabs, and sidebar.",
  },
  {
    to: "/components/page-layout" as const,
    name: "Page Layout",
    description:
      "Standard route page with built-in responsive padding, header, and scrollable content.",
  },
  {
    to: "/components/form-layout" as const,
    name: "Form Layout",
    description: "Create and edit form shell with page and modal modes.",
  },
  {
    to: "/components/form-builder" as const,
    name: "Form Builder",
    description:
      "Schema-driven form. Types include date, datetime, file, quantity, switch. Prefer this over assembling fields by hand.",
  },
  {
    to: "/components/data-table" as const,
    name: "Data Table",
    description:
      "Schema-driven table: search, tabs, filter, sort, Edit Column, pagination. Prefer this over Table for lists.",
  },
  {
    to: "/components/confirmation-modal" as const,
    name: "Confirmation Modal",
    description:
      "Prebuilt Promise-based confirmation modal invoked with useConfirmationModal.",
  },
] as const;

export function docBlocksByName() {
  return [...DOC_BLOCKS].sort((a, b) => a.name.localeCompare(b.name));
}

export const DOC_ALL_COMPONENTS = [
  ...DOC_COMPONENTS,
  ...DOC_FORMS,
  ...DOC_BLOCKS,
] as const;

export function docAllComponentsByName() {
  return [...DOC_ALL_COMPONENTS].sort((a, b) => a.name.localeCompare(b.name));
}

export function docBaseComponentsByName() {
  return [...DOC_COMPONENTS, ...DOC_FORMS].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

const BASE_BY_TO = new Map(
  [...DOC_COMPONENTS, ...DOC_FORMS].map((item) => [item.to, item]),
);

function baseGroup(
  label: string,
  tos: readonly (
    | (typeof DOC_COMPONENTS)[number]["to"]
    | (typeof DOC_FORMS)[number]["to"]
  )[],
) {
  return {
    label,
    items: tos
      .map((to) => BASE_BY_TO.get(to))
      .filter((item): item is NonNullable<typeof item> => item != null)
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/** AlignUI-style groups for Base Components. */
export const DOC_BASE_GROUPS = [
  baseGroup("Actions", ["/base-ui/button", "/base-ui/button-group"]),
  baseGroup("Displaying Data", [
    "/base-ui/attachment",
    "/base-ui/avatar",
    "/base-ui/badge",
    "/base-ui/chart",
    "/base-ui/empty",
    "/base-ui/list-item",
    "/base-ui/table",
  ]),
  baseGroup("Feedback", [
    "/base-ui/alert",
    "/base-ui/progress",
    "/base-ui/skeleton",
    "/base-ui/spinner",
    "/base-ui/toast",
  ]),
  baseGroup("Form", [
    "/base-ui/calendar",
    "/base-ui/checkbox",
    "/base-ui/combobox",
    "/base-ui/field",
    "/base-ui/form-section",
    "/base-ui/input",
    "/base-ui/input-group",
    "/base-ui/label",
    "/base-ui/radio-group",
    "/base-ui/select",
    "/base-ui/slider",
    "/base-ui/switch",
    "/base-ui/textarea",
  ]),
  baseGroup("Layout", [
    "/base-ui/accordion",
    "/base-ui/aspect-ratio",
    "/base-ui/card",
    "/base-ui/collapsible",
    "/base-ui/resizable",
    "/base-ui/scroll-area",
    "/base-ui/tabs",
  ]),
  baseGroup("Navigation", ["/base-ui/breadcrumb", "/base-ui/pagination"]),
  baseGroup("Overlays", [
    "/base-ui/command",
    "/base-ui/dialog",
    "/base-ui/dropdown-menu",
    "/base-ui/sheet",
    "/base-ui/tooltip",
  ]),
  baseGroup("Utils", ["/base-ui/kbd"]),
] as const;

const BLOCK_BY_TO = new Map(DOC_BLOCKS.map((item) => [item.to, item]));

function blockGroup(
  label: string,
  tos: readonly (typeof DOC_BLOCKS)[number]["to"][],
) {
  return {
    label,
    items: tos
      .map((to) => BLOCK_BY_TO.get(to))
      .filter((item): item is NonNullable<typeof item> => item != null)
      .sort((a, b) => a.name.localeCompare(b.name)),
  };
}

/** AlignUI-style groups for Components & Blocks. Empty groups are omitted. */
export const DOC_BLOCK_GROUPS = [
  blockGroup("Actions", ["/components/copy-button", "/components/icon-group"]),
  blockGroup("Displaying Data", [
    "/components/customer-card",
    "/components/data-table",
    "/components/detail-list",
    "/components/metric-card",
  ]),
  blockGroup("Form", [
    "/components/choice-card",
    "/components/date-picker",
    "/components/form-builder",
    "/components/quantity-input",
  ]),
  blockGroup("Layout", ["/components/app-layout", "/components/form-layout", "/components/page-layout"]),
  blockGroup("Navigation", ["/components/sidebar", "/components/sub-sidebar"]),
  blockGroup("Overlays", ["/components/confirmation-modal"]),
].filter((group) => group.items.length > 0);

export const DOC_GUIDES = [
  {
    to: "/installation" as const,
    name: "Installation",
    description:
      "What Orchid is, how to initialize a project, and how to add components with the shadcn CLI.",
  },
  {
    to: "/components-json" as const,
    name: "components.json",
    description:
      "Configure aliases, Tailwind CSS, and the Orchid registry namespace.",
  },
  {
    to: "/theming" as const,
    name: "Theming",
    description:
      "Install Orchid tokens and customize light and dark themes with Tailwind CSS v4.",
  },
] as const;

export const DOC_GUIDE_ITEMS = DOC_GUIDES;

export const DOC_CRUMBS: Record<string, string> = {
  "/": "Home",
  "/components": "Components & Blocks",
  "/base-ui": "Base Components",
  ...Object.fromEntries(DOC_GUIDE_ITEMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_COMPONENTS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_FORMS.map((item) => [item.to, item.name])),
  ...Object.fromEntries(DOC_BLOCKS.map((item) => [item.to, item.name])),
};
