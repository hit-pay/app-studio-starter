import { createFileRoute } from '@tanstack/react-router'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const Route = createFileRoute('/tooltip')({
  component: TooltipExamplesPage,
})

function Tip({
  side,
  label,
  content,
}: {
  side: 'top' | 'bottom' | 'left' | 'right'
  label: string
  content: string
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="inline-flex w-fit"
        render={
          <Button variant="Secondary" size="Small">
            {label}
          </Button>
        }
      />
      <TooltipContent side={side}>{content}</TooltipContent>
    </Tooltip>
  )
}

function TooltipExamplesPage() {
  return (
    <TooltipProvider>
      <DocExamplePage to="/tooltip">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Placement
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Tip side="top" label="Top" content="Send payment link to Priya Nair" />
            <Tip side="bottom" label="Bottom" content="Charge SGD 48.00 on POS" />
            <Tip side="left" label="Left" content="Refund INV-2048" />
            <Tip side="right" label="Right" content="Void this sale" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Payment channels
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Tip side="top" label="PayNow" content="Instant SGD transfer via PayNow QR" />
            <Tip side="top" label="Cards" content="Visa, Mastercard, and AMEX" />
            <Tip side="top" label="GrabPay" content="Wallet checkout in Singapore" />
            <Tip side="top" label="WeChat Pay" content="Accept WeChat Pay in SGD" />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Commerce
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Tip side="bottom" label="Invoice" content="INV-2048 is overdue" />
            <Tip side="bottom" label="Recurring" content="Next charge for Alex Turner on 1 Sep" />
            <Tip side="bottom" label="Stock" content="SKU-TEA-12 has 24 units" />
          </div>
        </div>
      </DocExamplePage>
    </TooltipProvider>
  )
}
