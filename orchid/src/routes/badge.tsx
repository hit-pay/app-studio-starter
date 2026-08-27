import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon } from 'lucide-react'
import { Badge, UserBadge } from '@/components/ui/badge'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/badge')({
  component: BadgeExamplesPage,
})

const COLORS = [
  'Blue',
  'Purple',
  'Orange',
  'Red',
  'LightRed',
  'White',
  'DarkBlue',
  'Grey',
  'Tosca',
  'Green',
] as const

const STYLES = ['Background', 'Border', 'Transparent'] as const

const COLOR_LABEL: Record<(typeof COLORS)[number], string> = {
  Blue: 'PayNow',
  Purple: 'Cards',
  Orange: 'GrabPay',
  Red: 'Failed',
  LightRed: 'Refunded',
  White: 'Draft',
  DarkBlue: 'HitPay',
  Grey: 'Void',
  Tosca: 'WeChat Pay',
  Green: 'Paid',
}

function BadgeExamplesPage() {
  return (
    <DocExamplePage to="/badge">
      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Global Badge
        </p>
        <div className="space-y-4">
          {COLORS.map((color) => (
            <div key={color} className="flex flex-wrap items-center gap-3">
              {STYLES.map((style) => (
                <Badge key={style} color={color} style={style}>
                  {COLOR_LABEL[color]}
                </Badge>
              ))}
              <Badge color={color} icon={<CircleIcon />}>
                {COLOR_LABEL[color]}
              </Badge>
              <Badge color={color} closable>
                {COLOR_LABEL[color]}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          User Type Badge
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <UserBadge role="Owner" />
          <UserBadge role="Admin" />
          <UserBadge role="Manager" />
          <UserBadge role="Cashier" />
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice status
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge color="Green">Paid</Badge>
          <Badge color="Orange">Pending</Badge>
          <Badge color="Grey">Draft</Badge>
          <Badge color="Red">Overdue</Badge>
          <Badge color="LightRed">Refunded</Badge>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Commerce filters
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Badge color="Blue" closable>
            Invoice
          </Badge>
          <Badge color="Purple" closable>
            Payment Link
          </Badge>
          <Badge color="Tosca" closable>
            Recurring
          </Badge>
          <Badge color="DarkBlue" closable>
            Point of Sale
          </Badge>
          <Badge color="Green" closable>
            Online Store
          </Badge>
        </div>
      </div>
    </DocExamplePage>
  )
}
