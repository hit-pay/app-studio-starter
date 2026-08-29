import { ChevronDownIcon } from "lucide-react";
import { Checkbox, CheckboxGroup } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

function CollapsibleDemo() {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="max-w-sm space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <Collapsible>
            <CollapsibleTrigger>
              Advanced
              <ChevronDownIcon className="size-4 shrink-0 text-oc-muted-foreground transition-transform group-data-open/collapsible:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-col gap-3">
              <Field>
                <FieldLabel htmlFor="collapsible-memo">Memo</FieldLabel>
                <Input
                  id="collapsible-memo"
                  defaultValue="Studio membership — March"
                />
              </Field>
            </CollapsibleContent>
          </Collapsible>
        </div>

        <div className="max-w-sm space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Open
          </p>
          <Collapsible defaultOpen>
            <CollapsibleTrigger>
              Filters
              <ChevronDownIcon className="size-4 shrink-0 text-oc-muted-foreground transition-transform group-data-open/collapsible:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CheckboxGroup defaultValue={["paid"]}>
                <Field orientation="horizontal">
                  <Checkbox id="filter-paid" value="paid" />
                  <FieldLabel htmlFor="filter-paid">Paid</FieldLabel>
                </Field>
                <Field orientation="horizontal">
                  <Checkbox id="filter-pending" value="pending" />
                  <FieldLabel htmlFor="filter-pending">Pending</FieldLabel>
                </Field>
              </CheckboxGroup>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </>
  );
}

export { CollapsibleDemo };
