import { createFileRoute } from '@tanstack/react-router'
import { ExternalLinkIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormSection, FormSectionGroup, FormSectionItem } from '@/components/ui/form-section'
import { Switch } from '@/components/ui/switch'
import { TooltipProvider } from '@/components/ui/tooltip'

export const Route = createFileRoute('/form-section')({
  component: FormSectionExamplesPage,
})

function FormSectionExamplesPage() {
  return (
    <TooltipProvider>
      <DocExamplePage
        to="/form-section"
        usage={`import {
  FormSection,
  FormSectionGroup,
  FormSectionItem,
} from '@/components/ui/form-section'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'

<FormSectionGroup>
  <FormSection
    title="Online Store"
    description="Configure storefront preferences."
    actions={<Button size="sm">Save</Button>}
  />
  <FormSectionItem
    title="Password protection"
    description="Require a password before visitors can view the store."
    actions={<Switch defaultChecked />}
  >
    <Input type="password" placeholder="Enter password" />
  </FormSectionItem>
  <FormSectionItem
    variant="Background"
    title="Guest checkout"
    description="Let customers pay without creating an account."
    actions={<Switch defaultChecked />}
  />
</FormSectionGroup>`}
      >
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <FormSection
            title="Online Store"
            description="Storefront URL, theme, and password protection."
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Badge and action
          </p>
          <FormSection
            title="Payment Channels"
            description="Upgrade to accept GrabPay, PayNow, and cards at checkout."
            badge={<Badge tone="purple">Upgrade</Badge>}
            actions={<Button variant="Primary">Upgrade Now</Button>}
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Notification
          </p>
          <FormSection
            title="Invoices"
            description="Overdue invoices that need a reminder."
            notification={2}
            hint="Unread items that need a response."
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Button group
          </p>
          <FormSection
            title="Online Store theme"
            description="Preview changes before they go live."
            actions={
              <>
                <Button variant="Secondary" size="Small">
                  Preview
                  <ExternalLinkIcon />
                </Button>
                <Button variant="Primary" size="Small">
                  Save
                </Button>
              </>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring
          </p>
          <FormSection
            title="Recurring"
            description="Monthly membership billed to saved payment methods."
            badge={<Badge tone="blue">Active</Badge>}
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            POS
          </p>
          <FormSection
            title="Point of Sale"
            description="Terminals, receipts, and in-store payment channels."
            actions={
              <Button variant="Secondary" size="Small">
                Manage terminals
              </Button>
            }
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            With form
          </p>
          <FormSectionGroup className="max-w-xl">
            <FormSection
              title="Online Store"
              description="These fields share the same left edge as the section title."
            />
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="store-name">Store name</FieldLabel>
                <Input id="store-name" placeholder="HitPay Studio" />
                <FieldDescription>Shown on invoices and receipts.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="store-url">Store URL</FieldLabel>
                <Input id="store-url" placeholder="your-store.hitpay.shop" />
              </Field>
              <FormSectionItem
                title="Password protection"
                description="Visitors must enter a password before they can view the store."
                actions={<Switch defaultChecked />}
              >
                <Input placeholder="Enter password" type="password" />
              </FormSectionItem>
              <FormSectionItem
                variant="Background"
                title="Guest checkout"
                description="Let customers pay without creating an account."
                actions={<Switch defaultChecked />}
              />
            </FieldGroup>
          </FormSectionGroup>
        </div>
      </DocExamplePage>
    </TooltipProvider>
  )
}
