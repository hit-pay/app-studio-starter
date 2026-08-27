import { createFileRoute } from '@tanstack/react-router'
import { AlertTriangleIcon, CheckIcon, InfoIcon, XCircleIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import {
  Banner,
  BannerAction,
  BannerBody,
  BannerDescription,
  BannerIcon,
  BannerTitle,
} from '@/components/ui/banner'
import { Button } from '@/components/ui/button'
import { PageTitle } from '@/components/ui/page-title'

export const Route = createFileRoute('/banner')({
  component: BannerExamplesPage,
})

const BANNER_COLORS = [
  {
    color: 'Default' as const,
    icon: <CheckIcon />,
    title: 'Invoice created',
    description:
      'INV-2048 for SGD 128.00 was created and sent to Priya Nair. You can track status under Commerce → Invoice.',
    secondary: 'View invoice',
    primary: 'Send reminder',
  },
  {
    color: 'Blue' as const,
    icon: <InfoIcon />,
    title: 'PayNow delay',
    description:
      'We are currently experiencing downtime issues with PayNow. You might face significant delays in transactions. Please consider using Cards or GrabPay immediately. We apologize for the inconvenience. ',
    link: true,
    secondary: 'View status',
    primary: 'Switch channel',
  },
  {
    color: 'Red' as const,
    icon: <XCircleIcon />,
    title: 'Refund failed',
    description:
      'We could not refund SGD 48.00 on INV-2048. The card issuer declined the request. Retry or contact the customer.',
    secondary: 'Contact customer',
    primary: 'Retry refund',
  },
  {
    color: 'Orange' as const,
    icon: <AlertTriangleIcon />,
    title: 'Low stock',
    description:
      'SKU-TEA-12 has 3 units left in Online Store. Restock before the weekend promotion goes live.',
    secondary: 'Dismiss',
    primary: 'Update stock',
  },
  {
    color: 'Grey' as const,
    icon: <InfoIcon />,
    title: 'Terminal offline',
    description:
      'POS terminal HP-POS-04 is offline. In-person charges will fail until the device reconnects.',
    secondary: 'Ignore',
    primary: 'Retry connection',
  },
]

function BannerExamplesPage() {
  return (
    <DocExamplePage
      to="/banner"
      usage={`import {
  Banner,
  BannerIcon,
  BannerBody,
  BannerTitle,
  BannerDescription,
  BannerAction,
} from '@/orchid-ui/banner'
import { Button } from '@/orchid-ui/button'
import { CheckIcon } from 'lucide-react'

<Banner color="Default" onClose={() => {}}>
  <BannerIcon>
    <CheckIcon />
  </BannerIcon>
  <BannerBody>
    <BannerTitle>Invoice created</BannerTitle>
    <BannerDescription>
      INV-2048 for SGD 128.00 was created and sent to Priya Nair.
    </BannerDescription>
  </BannerBody>
  <BannerAction>
    <Button variant="Secondary" size="Small">View invoice</Button>
    <Button variant="Primary" size="Small">Send reminder</Button>
  </BannerAction>
</Banner>`}
    >
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Above page header
        </p>
        <p className="text-xs text-oc-muted-foreground">
          In-page banner. Place it above Page Title, not as a floating toast.
        </p>
        <div className="flex flex-col gap-6">
          <Banner color="Blue" action="Right" onClose={() => {}}>
            <BannerIcon>
              <InfoIcon />
            </BannerIcon>
            <BannerBody>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <BannerTitle>PayNow delay</BannerTitle>
                <BannerDescription>
                  Please consider using Cards or GrabPay immediately.{' '}
                  <a href="#examples">View payment channels.</a>
                </BannerDescription>
              </div>
              <BannerAction>
                <Button size="Small" variant="Secondary">
                  View status
                </Button>
                <Button size="Small">Switch channel</Button>
              </BannerAction>
            </BannerBody>
          </Banner>
          <PageTitle
            title="Invoices"
            description="Create, send, and track invoices across payment channels."
            actions={
              <Button variant="Primary" size="Default">
                Create invoice
              </Button>
            }
          />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Actions below
        </p>
        <div className="space-y-4">
          {BANNER_COLORS.map((item) => (
            <Banner key={item.color} color={item.color} action="Bottom" onClose={() => {}}>
              <BannerIcon>{item.icon}</BannerIcon>
              <BannerBody>
                <div className="flex w-full flex-col gap-1">
                  <BannerTitle>{item.title}</BannerTitle>
                  <BannerDescription>
                    {item.description}
                    {'link' in item && item.link ? <a href="#examples">View payment channels.</a> : null}
                  </BannerDescription>
                </div>
                <BannerAction>
                  <Button size="Small" variant="Secondary">
                    {item.secondary}
                  </Button>
                  <Button size="Small">{item.primary}</Button>
                </BannerAction>
              </BannerBody>
            </Banner>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Actions right
        </p>
        <div className="space-y-4">
          {BANNER_COLORS.map((item) => (
            <Banner key={item.color} color={item.color} action="Right" onClose={() => {}}>
              <BannerIcon>{item.icon}</BannerIcon>
              <BannerBody>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <BannerTitle>{item.title}</BannerTitle>
                  <BannerDescription>
                    {item.color === 'Blue'
                      ? 'Please consider using Cards or GrabPay immediately. '
                      : item.description}
                    {item.color === 'Blue' ? <a href="#examples">View payment channels.</a> : null}
                  </BannerDescription>
                </div>
                <BannerAction>
                  <Button size="Small" variant="Secondary">
                    {item.secondary}
                  </Button>
                  <Button size="Small">{item.primary}</Button>
                </BannerAction>
              </BannerBody>
            </Banner>
          ))}
        </div>
      </div>
    </DocExamplePage>
  )
}
