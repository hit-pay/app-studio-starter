<!-- Generated from content/docs/components/button-group.mdx. Do not edit. -->

# Button Group

Attached controls, plus ghost and border icon toolbars. Compose overflow with DropdownMenu.

## Example

```tsx
import {
  DownRegular,
  CopyRegular,
  AddRegular,
  SendRegular,
  Delete2Regular,
  More1Regular,
  ArrowRightUpRegular,
} from '@mingcute/react/core-regular';

import { Button } from "@/base-ui/actions/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/base-ui/actions/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/base-ui/overlays/dropdown-menu";

const paymentLink = "https://hitpay.shop/pay/pl_8f2a91";

function IconToolbar({
  variant,
}: {
  variant: "ghost" | "border";
}) {
  return (
    <ButtonGroup variant={variant} aria-label="Payment link actions">
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton
          render={
            <Button variant="ghost" size="icon-xs" aria-label="More">
              <More1Regular />
            </Button>
          }
        />
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Mark invoice as paid</DropdownMenuItem>
          <DropdownMenuItem>Send reminder</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Void invoice</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="ghost"
        size="icon-xs"
        render={<a href={paymentLink} target="_blank" rel="noreferrer" />}
        aria-label="Open payment link"
      >
        <ArrowRightUpRegular />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Copy payment link"
        onClick={() => void navigator.clipboard.writeText(paymentLink)}
      >
        <CopyRegular />
      </Button>
    </ButtonGroup>
  );
}

function ButtonGroupDemo() {
  return (
    <>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <IconToolbar variant="ghost" />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <IconToolbar variant="border" />
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Split dropdown
        </p>
        <ButtonGroup>
          <Button>
            <AddRegular data-icon="inline-start" />
            Create invoice
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton
              render={
                <Button size="icon" aria-label="More invoice actions">
                  <DownRegular />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <CopyRegular />
                Duplicate invoice
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SendRegular />
                Create and send
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Delete2Regular />
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
            <CopyRegular />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export { ButtonGroupDemo };
```

Use `variant="ghost"` for a loose icon toolbar (Default). Use `variant="border"`
for the same toolbar inside a framed group; dividers render between children
automatically. Compose overflow actions with `DropdownMenu` and links with a
polymorphic `Button`.
