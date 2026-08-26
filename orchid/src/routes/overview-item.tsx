import { createFileRoute } from '@tanstack/react-router'
import {
  CircleDollarSignIcon,
  CoinsIcon,
  RotateCcwIcon,
  ShoppingBagIcon,
  SquareCheckIcon,
  UsersIcon,
} from 'lucide-react'
import { OverviewItem } from '@/components/ui/overview-item'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DocExamplePage } from '@/components/doc/doc-example-page'

export const Route = createFileRoute('/overview-item')({
  component: OverviewItemExamplesPage,
})

function OverviewItemExamplesPage() {
  return (
    <TooltipProvider>
      <DocExamplePage to="/overview-item">
          <div className="space-y-4">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              4 items
            </p>
            <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <OverviewItem
                icon={<CoinsIcon />}
                iconColor="Blue"
                title="Total revenue"
                content="SGD 11,170.00"
                info
                tooltip="Total revenue this period"
                percentValue={10}
                percentTooltip="Compared to last month"
              />
              <OverviewItem
                icon={<CircleDollarSignIcon />}
                iconColor="Blue"
                title="This month"
                content="SGD 1,870.00"
                percentValue={4}
                percentTooltip="Compared to last month"
              />
              <OverviewItem
                icon={<SquareCheckIcon />}
                iconColor="Green"
                title="Completed"
                content="20"
                percentValue={12}
              />
              <OverviewItem
                icon={<RotateCcwIcon />}
                iconColor="Red"
                title="Refunded"
                content="3"
                percentValue={-2}
              />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Default
            </p>
            <OverviewItem
              icon={<ShoppingBagIcon />}
              title="Gross volume"
              content="SGD 12,480.00"
              info
              tooltip="Total volume before fees"
              percentValue={12}
              percentTooltip="Vs last period"
            />
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
              Footer
            </p>
            <OverviewItem
              icon={<UsersIcon />}
              title="Customers"
              content="86"
              footer="Updated just now"
            />
          </div>
        </DocExamplePage>
    </TooltipProvider>
  )
}
