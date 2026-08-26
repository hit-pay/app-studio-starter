import { createFileRoute } from '@tanstack/react-router'
import { CircleIcon } from 'lucide-react'
import { Chip, UserChip } from '@/components/ui/chip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/chip')({
  component: ChipExamplesPage,
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

const TYPES = ['Background', 'Border', 'Transparent'] as const

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

function ChipExamplesPage() {
  return (
    <DocExamplePage to="/chip">
      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Global Chip
        </p>
        <div className="space-y-4">
          {COLORS.map((color) => (
            <div key={color} className="flex flex-wrap items-center gap-3">
              {TYPES.map((type) => (
                <Chip key={type} color={color} type={type}>
                  {COLOR_LABEL[color]}
                </Chip>
              ))}
              <Chip color={color} icon={<CircleIcon />}>
                {COLOR_LABEL[color]}
              </Chip>
              <Chip color={color} closable>
                {COLOR_LABEL[color]}
              </Chip>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          User Type Chip
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <UserChip type="Owner" />
          <UserChip type="Admin" />
          <UserChip type="Manager" />
          <UserChip type="Cashier" />
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Invoice status
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Chip color="Green">Paid</Chip>
          <Chip color="Orange">Pending</Chip>
          <Chip color="Grey">Draft</Chip>
          <Chip color="Red">Overdue</Chip>
          <Chip color="LightRed">Refunded</Chip>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Commerce filters
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Chip color="Blue" closable>
            Invoice
          </Chip>
          <Chip color="Purple" closable>
            Payment Link
          </Chip>
          <Chip color="Tosca" closable>
            Recurring
          </Chip>
          <Chip color="DarkBlue" closable>
            Point of Sale
          </Chip>
          <Chip color="Green" closable>
            Online Store
          </Chip>
        </div>
      </div>
    </DocExamplePage>
  )
}
