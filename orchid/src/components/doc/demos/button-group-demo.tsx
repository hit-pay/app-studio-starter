import {
  ChevronDownIcon,
  CopyIcon,
  PlusIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ButtonGroupDemo() {
  return (
    <>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Split dropdown
        </p>
        <ButtonGroup>
          <Button>
            <PlusIcon data-icon="inline-start" />
            Create invoice
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton
              render={
                <Button size="icon" aria-label="More invoice actions">
                  <ChevronDownIcon />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <CopyIcon />
                Duplicate invoice
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SendIcon />
                Create and send
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Discard draft
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Horizontal
        </p>
        <ButtonGroup aria-label="Reporting period">
          <Button variant="outline">Day</Button>
          <Button variant="outline">Week</Button>
          <Button variant="outline">Month</Button>
        </ButtonGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Vertical
        </p>
        <ButtonGroup orientation="vertical" aria-label="Invoice actions">
          <Button variant="outline">View invoice</Button>
          <Button variant="outline">Send reminder</Button>
          <Button variant="outline">Download PDF</Button>
        </ButtonGroup>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Text and separator
        </p>
        <ButtonGroup>
          <ButtonGroupText>INV-2048</ButtonGroupText>
          <ButtonGroupSeparator />
          <Button
            variant="outline"
            size="icon"
            aria-label="Copy invoice number"
          >
            <CopyIcon />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export { ButtonGroupDemo };
