import { createFileRoute } from '@tanstack/react-router'
import { SquareArrowOutUpRightIcon } from 'lucide-react'
import { CopyTooltip } from '@/components/ui/copy-tooltip'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  ButtonGroup,
  ButtonGroupDivider,
  ButtonGroupLink,
  ButtonGroupMenu,
  buttonGroupItemVariants,
} from '@/components/ui/button-group'

export const Route = createFileRoute('/button-group')({
  component: ButtonGroupExamplesPage,
})

function ExampleGroup({ type }: { type?: 'Default' | 'Border' }) {
  return (
    <ButtonGroup type={type}>
      <ButtonGroupMenu
        menu={
          <>
            <DropdownMenuItem>Mark invoice as paid</DropdownMenuItem>
            <DropdownMenuItem>Send reminder</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Void invoice</DropdownMenuItem>
          </>
        }
      />
      <ButtonGroupDivider />
      <ButtonGroupLink href="https://hitpay.shop/pay/pl_8f2a91" aria-label="Open payment link">
        <SquareArrowOutUpRightIcon />
      </ButtonGroupLink>
      <ButtonGroupDivider />
      <CopyTooltip
        value="https://hitpay.shop/pay/pl_8f2a91"
        aria-label="Copy payment link"
        className={buttonGroupItemVariants()}
      />
    </ButtonGroup>
  )
}

function InvoiceGroup() {
  return (
    <ButtonGroup type="Border">
      <ButtonGroupMenu
        menu={
          <>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
            <DropdownMenuItem>Duplicate INV-2026-0842</DropdownMenuItem>
            <DropdownMenuItem variant="destructive">Cancel Payment Link</DropdownMenuItem>
          </>
        }
      />
      <ButtonGroupDivider />
      <ButtonGroupLink href="https://hitpay.shop/invoices/INV-2026-0842" aria-label="Open invoice">
        <SquareArrowOutUpRightIcon />
      </ButtonGroupLink>
      <ButtonGroupDivider />
      <CopyTooltip
        value="INV-2026-0842"
        aria-label="Copy invoice number"
        className={buttonGroupItemVariants()}
      />
    </ButtonGroup>
  )
}

function ButtonGroupExamplesPage() {
  return (
    <DocExamplePage to="/button-group">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <ExampleGroup type="Default" />
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Border
        </p>
        <ExampleGroup type="Border" />
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
