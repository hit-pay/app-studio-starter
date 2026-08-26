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

const COLORS = [
  { color: 'Default' as const, icon: <CheckIcon /> },
  { color: 'Blue' as const, icon: <CheckIcon /> },
  { color: 'Red' as const, icon: <CheckIcon /> },
  { color: 'Orange' as const, icon: <CheckIcon /> },
  { color: 'Grey' as const, icon: <CheckIcon /> },
]

const BIG_COLORS = [
  { color: 'Default' as const, icon: <CheckIcon /> },
  { color: 'Blue' as const, icon: <InfoIcon /> },
  { color: 'Red' as const, icon: <XCircleIcon /> },
  { color: 'Orange' as const, icon: <AlertTriangleIcon /> },
  { color: 'Grey' as const, icon: <InfoIcon /> },
]

function SnackbarExamplesPage() {
  return (
    <DocExamplePage to="/snackbar">
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Small
          </p>
          <p className="text-xs text-muted-foreground">
            Floating toast untuk create / edit / delete. Tanpa close dan tanpa action.
          </p>
          <div className="flex flex-wrap items-start gap-4">
            {COLORS.map((item) => (
              <Snackbar key={item.color} color={item.color} size="Small">
                <SnackbarIcon>{item.icon}</SnackbarIcon>
                <SnackbarDescription>Changes have been successfully saved</SnackbarDescription>
              </Snackbar>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Default
          </p>
          <p className="text-xs text-muted-foreground">
            Floating toast. Tanpa close dan tanpa action.
          </p>
          <div className="flex flex-wrap items-start gap-4">
            {COLORS.map((item) => (
              <Snackbar key={item.color} color={item.color} size="Default">
                <SnackbarIcon>{item.icon}</SnackbarIcon>
                <SnackbarDescription>Changes have been successfully saved</SnackbarDescription>
              </Snackbar>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Big · Bottom
          </p>
          <div className="space-y-4">
            {BIG_COLORS.map((item) => (
              <Snackbar key={item.color} color={item.color} size="Big" action="Bottom" onClose={() => {}}>
                <SnackbarIcon>{item.icon}</SnackbarIcon>
                <SnackbarBody>
                  <div className="flex w-full flex-col gap-1">
                    <SnackbarTitle>Snackbar Title</SnackbarTitle>
                    <SnackbarDescription>
                      We&apos;re currently experiencing downtime issues with PayNow. You might face
                      significant delays in transactions. Please, consider using alternative payment
                      methods immediately. We apologize for the inconvenience.{' '}
                      <a href="#examples">It has link here.</a>
                    </SnackbarDescription>
                  </div>
                  <SnackbarAction>
                    <Button size="Small" type="Secondary">
                      Action
                    </Button>
                    <Button size="Small">Action</Button>
                  </SnackbarAction>
                </SnackbarBody>
              </Snackbar>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Big · Right
          </p>
          <div className="space-y-4">
            {BIG_COLORS.map((item) => (
              <Snackbar key={item.color} color={item.color} size="Big" action="Right" onClose={() => {}}>
                <SnackbarIcon>{item.icon}</SnackbarIcon>
                <SnackbarBody>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <SnackbarTitle>Snackbar Title</SnackbarTitle>
                    <SnackbarDescription>
                      Please consider using alternative payment methods immediately.{' '}
                      <a href="#examples">It has link here.</a>
                    </SnackbarDescription>
                  </div>
                  <SnackbarAction>
                    <Button size="Small" type="Secondary">
                      Action
                    </Button>
                    <Button size="Small">Action</Button>
                  </SnackbarAction>
                </SnackbarBody>
              </Snackbar>
            ))}
          </div>
        </div>
      </DocExamplePage>
  )
}
