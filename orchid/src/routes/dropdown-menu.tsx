import { createFileRoute } from '@tanstack/react-router'
import {
  CircleIcon,
  CreditCardIcon,
  LinkIcon,
  PencilIcon,
  RepeatIcon,
  SendIcon,
  StoreIcon,
  Trash2Icon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const Route = createFileRoute('/dropdown-menu')({
  component: DropdownExamplesPage,
})

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

function DropdownExamplesPage() {
  return (
    <DocExamplePage to="/dropdown-menu">
      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Dropdown Menu
        </p>
        <OpenButton>
          <DropdownMenuItem>
            <PencilIcon />
            Edit invoice
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SendIcon />
            Send payment link
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
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
              <LinkIcon />
              Payment Link
            </DropdownMenuItem>
            <DropdownMenuItem>
              <RepeatIcon />
              Recurring
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel>Sales</DropdownMenuLabel>
            <DropdownMenuItem>
              <StoreIcon />
              Online Store
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCardIcon />
              Point of Sale
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Trash2Icon />
            Delete invoice
          </DropdownMenuItem>
        </OpenButton>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Dropdown in Button
        </p>
        <Button
          variant="Secondary"
          size="Small"
          menu={
            <>
              <DropdownMenuItem>
                <PencilIcon />
                Edit INV-2048
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SendIcon />
                Resend to Priya Nair
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Trash2Icon />
                Refund SGD 128.00
              </DropdownMenuItem>
            </>
          }
        >
          <CircleIcon />
          More
        </Button>
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
    </DocExamplePage>
  )
}
