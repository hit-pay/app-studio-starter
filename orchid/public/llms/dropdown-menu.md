<!-- Generated from content/docs/components/dropdown-menu.mdx. Do not edit. -->

# Dropdown Menu

shadcn-compatible items, selection, submenus, and shortcuts with Orchid styling.

## Example

```tsx
import { useState } from 'react'
import {
  DownRegular,
  BankCardRegular,
  LinkRegular,
  PencilRegular,
  RepeatRegular,
  SendRegular,
  StoreRegular,
  Delete2Regular,
} from '@mingcute/react/core-regular'
import { Button } from '@/components/ui/button'
import { ButtonGroup } from '@/components/ui/button-group'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function OpenButton({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        className="inline-flex w-fit"
        render={
          <Button variant="Secondary" size="Small">
            Invoice actions
          </Button>
        }
      />
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownMenuDemo() {
  const [showArchived, setShowArchived] = useState(false)
  const [currency, setCurrency] = useState('sgd')

  return (
    <>
      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Dropdown Menu
        </p>
        <OpenButton>
          <DropdownMenuItem>
            <PencilRegular />
            Edit invoice
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SendRegular />
            Send payment link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Delete2Regular />
            Void invoice
          </DropdownMenuItem>
        </OpenButton>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Dropdown
        </p>
        <OpenButton>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Commerce</DropdownMenuLabel>
            <DropdownMenuItem>
              <LinkRegular />
              Payment Link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RepeatRegular />
              Recurring
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sales</DropdownMenuLabel>
            <DropdownMenuItem>
              <StoreRegular />
              Online Store
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BankCardRegular />
              Point of Sale
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Delete2Regular />
            Delete invoice
          </DropdownMenuItem>
        </OpenButton>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Split button
        </p>
        <ButtonGroup>
          <Button variant="secondary" size="sm">
            Invoice actions
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton
              render={
                <Button variant="secondary" size="icon-sm" aria-label="More invoice actions">
                  <DownRegular />
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <PencilRegular />
                Edit INV-2048
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SendRegular />
                Resend to Priya Nair
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Delete2Regular />
                Refund SGD 128.00
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Payment channels
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger
            nativeButton
            className="inline-flex w-fit"
            render={
              <Button variant="Secondary" size="Small">
                Enable channel
              </Button>
            }
          />
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Singapore</DropdownMenuLabel>
              <DropdownMenuItem>PayNow</DropdownMenuItem>
              <DropdownMenuItem>Cards</DropdownMenuItem>
              <DropdownMenuItem>GrabPay</DropdownMenuItem>
              <DropdownMenuItem>WeChat Pay</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Selection and submenu
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            View options
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={showArchived}
              onCheckedChange={setShowArchived}
            >
              Show archived
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Currency</DropdownMenuLabel>
            <DropdownMenuRadioGroup value={currency} onValueChange={setCurrency}>
              <DropdownMenuRadioItem value="sgd">SGD</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="usd">USD</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>More tools</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Duplicate invoice</DropdownMenuItem>
                <DropdownMenuItem>Download PDF</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}

export { DropdownMenuDemo }
```

## Usage

```tsx
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger render={<Button variant="outline" />}>
    Open menu
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```
