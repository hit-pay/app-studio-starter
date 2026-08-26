import { createFileRoute } from '@tanstack/react-router'
import { BanknoteIcon, FileTextIcon, PlusIcon, UserPlusIcon } from 'lucide-react'
import { DocExamplePage } from '@/components/doc/doc-example-page'
import { Button } from '@/components/ui/button'
import { EmptyPage } from '@/components/ui/empty-page'

export const Route = createFileRoute('/empty-page')({
  component: EmptyPageExamplesPage,
})

function EmptyPageExamplesPage() {
  return (
    <DocExamplePage to="/empty-page">
      <div className="grid gap-12 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Add New
          </p>
          <EmptyPage
            type="Default"
            title="No data to display"
            description="Some description here..."
            actions={
              <>
                <Button type="Secondary" size="Small">
                  <FileTextIcon />
                  Learn more
                </Button>
                <Button type="Primary" size="Small">
                  <PlusIcon />
                  Add New
                </Button>
              </>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Upgrade
          </p>
          <EmptyPage
            type="Upgrade"
            title="Upgrade your plan"
            description="You can upgrade the plan if you want to use this feature"
            actions={
              <Button type="Primary" size="Small">
                Upgrade now
              </Button>
            }
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Search not found
          </p>
          <EmptyPage
            type="Search"
            title="Data not found"
            description="Try to search or filter something else"
          />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            2 Actions
          </p>
          <EmptyPage
            type="Default"
            title="No data to display"
            description="Some description here..."
            actions={
              <>
                <Button type="Secondary" size="Small">
                  <UserPlusIcon />
                  Beneficiaries
                </Button>
                <Button type="Primary" size="Small">
                  <BanknoteIcon />
                  Send Money
                </Button>
              </>
            }
          />
        </div>
      </div>
    </DocExamplePage>
  )
}
