import { createFileRoute } from '@tanstack/react-router'
import { CopyTooltip } from '@/components/ui/copy-tooltip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/copy-tooltip')({
  component: CopyTooltipExamplesPage,
})

function CopyTooltipExamplesPage() {
  return (
    <DocExamplePage to="/copy-tooltip">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <div className="flex items-center gap-2 text-sm leading-[1.5] text-oc-foreground">
          <span>+65 8123 4567</span>
          <CopyTooltip value="+65 8123 4567" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice number
        </p>
        <div className="flex items-center gap-2 text-sm leading-[1.5] text-oc-foreground">
          <span>INV-2026-0842</span>
          <CopyTooltip value="INV-2026-0842" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Payment Link
        </p>
        <div className="flex items-center gap-2 text-sm leading-[1.5] text-oc-foreground">
          <span>hitpay.shop/pay/pl_8f2a91</span>
          <CopyTooltip value="https://hitpay.shop/pay/pl_8f2a91" />
        </div>
      </div>
    </DocExamplePage>
  )
}
