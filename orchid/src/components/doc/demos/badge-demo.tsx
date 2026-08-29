import { useState } from 'react'
import { CircleIcon } from 'lucide-react'

import {
  Badge,
  BadgeRemove,
  UserBadge,
  type BadgeTone,
} from '@/components/ui/badge'

const VARIANTS = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const
const TONES = [
  'blue',
  'purple',
  'orange',
  'red',
  'light-red',
  'white',
  'dark-blue',
  'grey',
  'tosca',
  'green',
] as const
const APPEARANCES = ['soft', 'outline', 'ghost'] as const

const TONE_LABEL: Record<BadgeTone, string> = {
  blue: 'PayNow',
  purple: 'Cards',
  orange: 'GrabPay',
  red: 'Failed',
  'light-red': 'Refunded',
  white: 'Draft',
  'dark-blue': 'HitPay',
  grey: 'Void',
  tosca: 'WeChat Pay',
  green: 'Paid',
}

function RemovableBadge({ tone, children }: { tone: BadgeTone; children: string }) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <Badge tone={tone}>
      {children}
      <BadgeRemove onClick={() => setVisible(false)} />
    </Badge>
  )
}

function BadgeDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          shadcn-compatible variants
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {VARIANTS.map((variant) => (
            <Badge
              key={variant}
              variant={variant}
              render={variant === 'link' ? <a href="#usage" /> : undefined}
            >
              {variant}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Orchid tones
        </p>
        <div className="space-y-4">
          {TONES.map((tone) => (
            <div key={tone} className="flex flex-wrap items-center gap-3">
              {APPEARANCES.map((appearance) => (
                <Badge key={appearance} tone={tone} appearance={appearance}>
                  {TONE_LABEL[tone]}
                </Badge>
              ))}
              <Badge tone={tone}>
                <CircleIcon data-icon="inline-start" />
                {TONE_LABEL[tone]}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Removable
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <RemovableBadge tone="blue">Invoice</RemovableBadge>
          <RemovableBadge tone="purple">Payment Link</RemovableBadge>
          <RemovableBadge tone="tosca">Recurring</RemovableBadge>
          <RemovableBadge tone="dark-blue">Point of Sale</RemovableBadge>
          <RemovableBadge tone="green">Online Store</RemovableBadge>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          User role
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <UserBadge role="Owner" />
          <UserBadge role="Admin" />
          <UserBadge role="Manager" />
          <UserBadge role="Cashier" />
        </div>
      </div>
    </>
  )
}

export { BadgeDemo }
