import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import { ResourceListProvider, ResourcePickerProvider } from '#/business'
import { useCurrentUser } from '#/lib/current-user'
import { AppLayout } from '@/components/layout/app-layout'
import { ConfirmationModalProvider } from '@/components/overlays/confirmation-modal'
import { buttonVariants } from '@ui/button'
import { Toaster } from '@ui/toast'

import '../styles.css'

function NotFound() {
  return (
    <main className="flex h-full min-h-0 w-full flex-1 items-center justify-center px-6">
      <p className="text-sm text-oc-muted-foreground">That page does not exist.</p>
    </main>
  )
}

function CurrentUserAction() {
  const { user, loading } = useCurrentUser()
  const name = user?.name?.trim() || user?.email || '…'
  const label = loading ? '…' : `Signed in as ${name}`

  return (
    <Link to="/current-user" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
      {label}
    </Link>
  )
}

function AppShell() {
  return (
    <Toaster>
      <ConfirmationModalProvider>
        <ResourcePickerProvider>
          <ResourceListProvider>
            <AppLayout
              className="h-full min-h-0"
              appName={
                <Link to="/" className="min-w-0 truncate outline-none hover:opacity-80">
                  App
                </Link>
              }
              appBarActions={<CurrentUserAction />}
            >
              <Outlet />
            </AppLayout>
          </ResourceListProvider>
        </ResourcePickerProvider>
      </ConfirmationModalProvider>
    </Toaster>
  )
}

export const Route = createRootRoute({
  ssr: false,
  component: AppShell,
  notFoundComponent: NotFound,
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'App' },
    ],
    links: [
      { rel: 'icon', href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="%232465de"/></svg>' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <HeadContent />
      </head>
      <body className="h-full">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
