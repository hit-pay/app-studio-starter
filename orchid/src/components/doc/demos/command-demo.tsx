import { useState } from "react";
import { FileTextIcon, StoreIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/command";
import { toast } from "@/components/ui/toast";

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
                  <FileTextIcon className="size-4 text-oc-muted-foreground" />
                  Invoices
                  <CommandShortcut>I</CommandShortcut>
                </CommandItem>
                <CommandItem
                  value="outlets"
                  keywords={["pos", "store"]}
                  onSelect={go}
                >
                  <StoreIcon className="size-4 text-oc-muted-foreground" />
                  Outlets
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Customers">
                <CommandItem value="alex turner" onSelect={go}>
                  <UserIcon className="size-4 text-oc-muted-foreground" />
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
