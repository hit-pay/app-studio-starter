import { CopyButton } from '@/components/copy-button'

function CopyButtonDemo() {
  return (
    <>
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <div className="flex items-center gap-2 text-sm leading-normal text-oc-foreground">
          <span>+65 8123 4567</span>
          <CopyButton value="+65 8123 4567" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice number
        </p>
        <div className="flex items-center gap-2 text-sm leading-normal text-oc-foreground">
          <span>INV-2026-0842</span>
          <CopyButton value="INV-2026-0842" />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Payment Link
        </p>
        <div className="flex items-center gap-2 text-sm leading-normal text-oc-foreground">
          <span>hitpay.shop/pay/pl_8f2a91</span>
          <CopyButton value="https://hitpay.shop/pay/pl_8f2a91" />
        </div>
      </div>
    </>
  )
}

export { CopyButtonDemo }
