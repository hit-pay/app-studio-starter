import { Outlet, createRootRoute } from '@tanstack/react-router'
import { DocHeader } from '@/components/doc/doc-header'
import { DocSidebar } from '@/components/doc/doc-sidebar'

function NotFound() {
  return (
    <p className="px-8 py-12 text-sm text-oc-muted-foreground">That page does not exist.</p>
  )
}

function RootLayout() {
  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-oc-muted p-3">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl bg-oc-background shadow-[0_1px_3px_rgba(0,0,0,0.1),0_3px_22px_rgba(38,42,50,0.09)]">
        <DocHeader />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <DocSidebar />
          <div className="min-h-0 flex-1 overflow-auto bg-oc-background">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})
