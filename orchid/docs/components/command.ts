// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const commandRegistry = registry.items.find(
  (item: { name: string }) => item.name === "command",
);

const commandDocs = {
  ...commandRegistry,
  category: "components",
  props: {
    open: "boolean",
    onOpenChange: "function",
    title: "string",
    description: "string",
    placeholder: "string",
    empty: "ReactNode",
    groups: "CommandGroup[]",
    "items[].value": "string",
    "items[].keywords": "string[]",
    "items[].shortcut": "string",
    "items[].onSelect": "function",
  },
  examples: [
    {
      description: "Controlled palette",
      code: `function CommandExample() {
  const [open, setOpen] = useState(false);
  const COMMAND_GROUPS = [
    {
      heading: "Pages",
      items: [
        {
          value: "invoices",
          label: "Invoices",
          keywords: ["billing"],
          shortcut: "I",
          onSelect: () => undefined,
        },
        {
          value: "outlets",
          label: "Outlets",
          keywords: ["pos", "store"],
          onSelect: () => undefined,
        },
      ],
    },
    {
      heading: "Customers",
      items: [
        {
          value: "alex-turner",
          label: "Alex Turner",
          onSelect: () => undefined,
        },
      ],
    },
  ];

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Search
      </Button>
      <Command
        open={open}
        onOpenChange={setOpen}
        placeholder="Search invoices, customers, pages…"
        groups={COMMAND_GROUPS}
      />
    </>
  );
}

render(<CommandExample />);`,
    },
  ],
  related_components: ["dialog", "select", "dropdown-menu"],
};

export default commandDocs;
