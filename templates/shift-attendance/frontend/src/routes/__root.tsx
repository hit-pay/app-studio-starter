import type { QueryClient } from '@tanstack/react-query'
import { Link, Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import { useIsManager } from '@/lib/shifts'
import { useCurrentUser } from '@/lib/current-user'
import { AppLayout } from '@/components/layout/app-layout'
import { ConfirmationModalProvider } from '@/components/overlays/confirmation-modal'
import { buttonVariants } from '@ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@ui/dropdown-menu'
import { Toaster } from '@ui/toast'

function NotFound() {
  return (
    <main className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6">
      <p className="text-sm text-oc-muted-foreground">That page does not exist.</p>
    </main>
  )
}

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-2 py-1.5">
      <span className="text-[10px] leading-4.5 font-medium tracking-[0.3px] text-oc-muted-foreground uppercase">
        {label}
      </span>
      <span className="min-w-0 break-all text-sm leading-normal text-oc-foreground">{value}</span>
    </div>
  )
}

function CurrentUserAction() {
  const { data: user, error, isPending } = useCurrentUser()
  const name = user?.name?.trim() || user?.email || '…'
  const label = isPending ? '…' : name

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        nativeButton
        render={
          <button type="button" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            {label}
          </button>
        }
      />
      <DropdownMenuContent align="end" className="w-auto min-w-56 max-w-80">
        {error ? (
          <p className="px-2 py-1.5 text-sm text-oc-destructive">{error.message}</p>
        ) : user ? (
          <DropdownMenuGroup>
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ProfileField label="Name" value={user.name || '—'} />
            <ProfileField label="Email" value={user.email} />
            <ProfileField label="Role" value={user.role?.title || '—'} />
          </DropdownMenuGroup>
        ) : (
          <p className="px-2 py-1.5 text-sm text-oc-muted-foreground">…</p>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AppShell() {
  const manager = useIsManager()
  const navigationItems = [
    { id: 'schedule', label: 'Schedule', to: '/' },
    { id: 'clock', label: 'Clock in', to: '/clock' },
    { id: 'swaps', label: 'Swaps', to: '/swaps' },
    ...(manager
      ? [
          { id: 'timesheet', label: 'Timesheet', to: '/timesheet' },
          { id: 'team', label: 'Team', to: '/team' },
        ]
      : []),
  ]

  return (
    <Toaster>
      <ConfirmationModalProvider>
        <AppLayout
          className="h-full min-h-0"
          variant="tabs"
          appName={
            <Link to="/" className="min-w-0 truncate outline-none hover:opacity-80">
              Shift & Attendance
            </Link>
          }
          navigationItems={navigationItems}
          appBarActions={<CurrentUserAction />}
        >
          <Outlet />
        </AppLayout>
      </ConfirmationModalProvider>
    </Toaster>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: AppShell,
  notFoundComponent: NotFound,
})
