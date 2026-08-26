import { createFileRoute } from '@tanstack/react-router'
import { AlertTriangleIcon, CheckIcon, InfoIcon, XCircleIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import {
  Snackbar,
  SnackbarAction,
  SnackbarBody,
  SnackbarDescription,
  SnackbarIcon,
  SnackbarTitle,
} from '@/components/ui/snackbar'

export const Route = createFileRoute('/snackbar')({
  component: SnackbarExamplesPage,
})

const SMALL_MESSAGES = [
  { color: 'Default' as const, icon: <CheckIcon />, text: 'Invoice INV-2048 saved' },
  { color: 'Blue' as const, icon: <CheckIcon />, text: 'Payment link sent to Priya Nair' },
  { color: 'Red' as const, icon: <CheckIcon />, text: 'Unable to save customer data' },
  { color: 'Orange' as const, icon: <CheckIcon />, text: 'PayNow is slower than usual' },
  { color: 'Grey' as const, icon: <CheckIcon />, text: 'Draft invoice discarded' },
]

const DEFAULT_MESSAGES = [
  { color: 'Default' as const, icon: <CheckIcon />, text: 'Changes have been successfully saved' },
  { color: 'Blue' as const, icon: <CheckIcon />, text: 'Recurring plan activated for Alex Turner' },
  { color: 'Red' as const, icon: <CheckIcon />, text: 'Refund failed for INV-2048' },
  { color: 'Orange' as const, icon: <CheckIcon />, text: 'Stock is low for SKU-TEA-12' },
  { color: 'Grey' as const, icon: <CheckIcon />, text: 'POS terminal went offline' },
]

const BIG_COLORS = [
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

function SnackbarExamplesPage() {
  return (
    <DocExamplePage to="/snackbar">
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Small
        </p>
        <p className="text-xs text-oc-muted-foreground">
          Floating toast for create, edit, and delete. No close control and no action.
        </p>
        <div className="flex flex-wrap items-start gap-4">
          {SMALL_MESSAGES.map((item) => (
            <Snackbar key={item.color} color={item.color} size="Small">
              <SnackbarIcon>{item.icon}</SnackbarIcon>
              <SnackbarDescription>{item.text}</SnackbarDescription>
            </Snackbar>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="text-xs text-oc-muted-foreground">
          Floating toast. No close control and no action.
        </p>
        <div className="flex flex-wrap items-start gap-4">
          {DEFAULT_MESSAGES.map((item) => (
            <Snackbar key={item.color} color={item.color} size="Default">
              <SnackbarIcon>{item.icon}</SnackbarIcon>
              <SnackbarDescription>{item.text}</SnackbarDescription>
            </Snackbar>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Big · Bottom
        </p>
        <div className="space-y-4">
          {BIG_COLORS.map((item) => (
            <Snackbar key={item.color} color={item.color} size="Big" action="Bottom" onClose={() => {}}>
              <SnackbarIcon>{item.icon}</SnackbarIcon>
              <SnackbarBody>
                <div className="flex w-full flex-col gap-1">
                  <SnackbarTitle>{item.title}</SnackbarTitle>
                  <SnackbarDescription>
                    {item.description}
                    {'link' in item && item.link ? <a href="#examples">View payment channels.</a> : null}
                  </SnackbarDescription>
                </div>
                <SnackbarAction>
                  <Button size="Small" type="Secondary">
                    {item.secondary}
                  </Button>
                  <Button size="Small">{item.primary}</Button>
                </SnackbarAction>
              </SnackbarBody>
            </Snackbar>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Big · Right
        </p>
        <div className="space-y-4">
          {BIG_COLORS.map((item) => (
            <Snackbar key={item.color} color={item.color} size="Big" action="Right" onClose={() => {}}>
              <SnackbarIcon>{item.icon}</SnackbarIcon>
              <SnackbarBody>
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <SnackbarTitle>{item.title}</SnackbarTitle>
                  <SnackbarDescription>
                    {item.color === 'Blue'
                      ? 'Please consider using Cards or GrabPay immediately. '
                      : item.description}
                    {item.color === 'Blue' ? <a href="#examples">View payment channels.</a> : null}
                  </SnackbarDescription>
                </div>
                <SnackbarAction>
                  <Button size="Small" type="Secondary">
                    {item.secondary}
                  </Button>
                  <Button size="Small">{item.primary}</Button>
                </SnackbarAction>
              </SnackbarBody>
            </Snackbar>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Save and error
        </p>
        <div className="flex flex-wrap items-start gap-4">
          <Snackbar color="Default" size="Default">
            <SnackbarIcon>
              <CheckIcon />
            </SnackbarIcon>
            <SnackbarDescription>Customer data for Alex Turner saved</SnackbarDescription>
          </Snackbar>
          <Snackbar color="Red" size="Default">
            <SnackbarIcon>
              <XCircleIcon />
            </SnackbarIcon>
            <SnackbarDescription>Could not update product SKU-TEA-12</SnackbarDescription>
          </Snackbar>
        </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring
          </p>
          <Snackbar color="Default" size="Default">
            <SnackbarIcon>
              <CheckIcon />
            </SnackbarIcon>
            <SnackbarDescription>Subscription plan billed SGD 49.00 monthly</SnackbarDescription>
          </Snackbar>
        </div>
      </DocExamplePage>
  )
}
