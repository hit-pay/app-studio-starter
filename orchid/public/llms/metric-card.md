<!-- Generated from content/docs/components/metric-card.mdx. Do not edit. -->

# Metric Card

Dashboard KPI card: icon, title, value, and optional percent change.

## Example

```tsx
import {
  CurrencyDollarRegular,
  LinkRegular,
  RepeatRegular,
  RefreshAnticlockwise1Regular,
  ShoppingBag1Regular,
  CheckboxRegular,
  StoreRegular,
  GroupRegular,
} from '@mingcute/react/core-regular';
import { MetricCard } from "@/components/metric-card";
import { TooltipProvider } from "@/components/ui/tooltip";

function MetricCardDemo() {
  return (
    <TooltipProvider>
      <>
        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            4 items
          </p>
          <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              icon={<CurrencyDollarRegular />}
              iconColor="blue"
              title="Gross volume"
              content="SGD 11,170.00"
              info
              tooltip="PayNow, Cards, and Payment Link volume this period"
              percentValue={10}
              percentTooltip="Compared to last month"
            />
            <MetricCard
              icon={<CurrencyDollarRegular />}
              iconColor="blue"
              title="This month"
              content="SGD 1,870.00"
              percentValue={4}
              percentTooltip="Compared to last month"
            />
            <MetricCard
              icon={<CheckboxRegular />}
              iconColor="green"
              title="Paid invoices"
              content="20"
              percentValue={12}
            />
            <MetricCard
              icon={<RefreshAnticlockwise1Regular />}
              iconColor="red"
              title="Refunded"
              content="3"
              percentValue={-2}
            />
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <MetricCard
            icon={<ShoppingBag1Regular />}
            title="Online Store sales"
            content="SGD 12,480.00"
            info
            tooltip="SKU sales before fees"
            percentValue={12}
            percentTooltip="Vs last period"
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Footer
          </p>
          <MetricCard
            icon={<GroupRegular />}
            title="Customers"
            content="86"
            footer="Customer Data updated just now"
          />
        </div>

        <div className="space-y-4">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Commerce mix
          </p>
          <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <MetricCard
              icon={<LinkRegular />}
              iconColor="blue"
              title="Payment Links"
              content="SGD 4,260.00"
              percentValue={8}
            />
            <MetricCard
              icon={<RepeatRegular />}
              iconColor="green"
              title="Recurring"
              content="SGD 2,140.00"
              percentValue={6}
            />
            <MetricCard
              icon={<StoreRegular />}
              iconColor="blue"
              title="Point of Sale"
              content="SGD 3,890.00"
              percentValue={3}
            />
          </div>
        </div>
      </>
    </TooltipProvider>
  );
}

export { MetricCardDemo };
```
