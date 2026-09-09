<!-- Generated from content/docs/components/command.mdx. Do not edit. -->

# Command

shadcn-compatible cmdk palette with keyboard navigation and Orchid styling.

## Example

```tsx
import { useState } from "react";
import {
  FileRegular,
  StoreRegular,
  User3Regular,
} from '@mingcute/react/core-regular';
import { Button } from "@/base-ui/actions/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/base-ui/overlays/command";
import { toast } from "@/base-ui/feedback/toast";

function CommandDemo() {
  const [open, setOpen] = useState(false);

  function go(value: string) {
    setOpen(false);
    toast.add({ title: value, type: "success" });
  }

  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Palette
        </p>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Search
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Search invoices, customers, pages…" />
            <CommandList>
              <CommandEmpty>No results</CommandEmpty>
              <CommandGroup heading="Pages">
                <CommandItem
                  value="invoices"
                  keywords={["billing"]}
                  onSelect={go}
                >
                  <FileRegular className="size-4 text-oc-muted-foreground" />
                  Invoices
                  <CommandShortcut>I</CommandShortcut>
                </CommandItem>
                <CommandItem
                  value="outlets"
                  keywords={["pos", "store"]}
                  onSelect={go}
                >
                  <StoreRegular className="size-4 text-oc-muted-foreground" />
                  Outlets
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Customers">
                <CommandItem value="alex turner" onSelect={go}>
                  <User3Regular className="size-4 text-oc-muted-foreground" />
                  Alex Turner
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </div>
    </>
  );
}

export { CommandDemo };
```
