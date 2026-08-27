import { createFileRoute } from '@tanstack/react-router'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import { CopyButton } from '@/components/ui/copy-button'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  IconGroup,
  IconGroupDivider,
  IconGroupLink,
  IconGroupMenu,
  iconGroupItemVariants,
} from '@/components/ui/icon-group'

export const Route = createFileRoute('/icon-group')({
  component: IconGroupExamplesPage,
})

function ExampleGroup({ style }: { style?: 'Default' | 'Border' }) {
  return (
    <IconGroup style={style}>
      <IconGroupMenu
        menu={
          <>
            <DropdownMenuItem>Mark invoice as paid</DropdownMenuItem>
            <DropdownMenuItem>Send reminder</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Void invoice</DropdownMenuItem>
          </>
        }
      />
      <IconGroupDivider />
      <IconGroupLink href="https://hitpay.shop/pay/pl_8f2a91" aria-label="Open payment link">
        <SquareArrowOutUpRightIcon />
      </IconGroupLink>
      <IconGroupDivider />
      <CopyButton
        value="https://hitpay.shop/pay/pl_8f2a91"
        aria-label="Copy payment link"
        className={iconGroupItemVariants()}
      />
    </IconGroup>
  )
}

function InvoiceGroup() {
  return (
    <IconGroup style="Border">
      <IconGroupMenu
        menu={
          <>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
            <DropdownMenuItem>Duplicate INV-2026-0842</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Cancel Payment Link</DropdownMenuItem>
          </>
        }
      />
      <IconGroupDivider />
      <IconGroupLink href="https://hitpay.shop/invoices/INV-2026-0842" aria-label="Open invoice">
        <SquareArrowOutUpRightIcon />
      </IconGroupLink>
      <IconGroupDivider />
      <CopyButton
        value="INV-2026-0842"
        aria-label="Copy invoice number"
        className={iconGroupItemVariants()}
      />
    </IconGroup>
  )
}

function IconGroupExamplesPage() {
  return (
    <DocExamplePage to="/icon-group">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <ExampleGroup style="Default" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <ExampleGroup style="Border" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice actions
        </p>
        <InvoiceGroup />
      </div>
    </DocExamplePage>
  )
}
