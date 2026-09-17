// @ts-ignore — registry metadata is JSON consumed by the Vite/Vercel bundler.
import registry from "../../registry.json" with { type: "json" };

const dropdownMenuRegistry = registry.items.find(
  (item: { name: string }) => item.name === "dropdown-menu",
);

const dropdownMenuDocs = {
  ...dropdownMenuRegistry,
  category: "ui",
  props: {
    variant: ["default", "destructive"],
    side: ["top", "bottom", "left", "right"],
    align: ["start", "center", "end"],
  },
  examples: [
    {
      description: "Invoice actions",
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="secondary" size="sm" />}>
    Invoice actions
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuItem>
      <EditIcon />
      Edit invoice
      <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      <SendIcon />
      Send payment link
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="destructive">
      <DeleteIcon />
      Void invoice
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      description: "Grouped menu",
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="secondary" size="sm" />}>
    Create
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start">
    <DropdownMenuGroup>
      <DropdownMenuLabel>Commerce</DropdownMenuLabel>
      <DropdownMenuItem>Payment Link</DropdownMenuItem>
      <DropdownMenuItem>Recurring</DropdownMenuItem>
    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuLabel>Sales</DropdownMenuLabel>
      <DropdownMenuItem>Online Store</DropdownMenuItem>
      <DropdownMenuItem>Point of Sale</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
    {
      description: "Submenu",
      code: `<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    More tools
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuItem>Duplicate invoice</DropdownMenuItem>
        <DropdownMenuItem>Download PDF</DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  </DropdownMenuContent>
</DropdownMenu>`,
    },
  ],
  related_components: ["button-group", "button", "data-table"],
};

export default dropdownMenuDocs;
