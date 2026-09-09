<!-- Generated from content/docs/components/chart.mdx. Do not edit. -->

# Chart

shadcn-compatible Recharts wrapper with Orchid tooltip, legend, and chart tokens.

## Example

```tsx
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/base-ui/layout/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/base-ui/displaying-data/chart'

const weekly = [
  { day: 'Mon', sales: 1860, refunds: 80 },
  { day: 'Tue', sales: 2140, refunds: 120 },
  { day: 'Wed', sales: 1980, refunds: 90 },
  { day: 'Thu', sales: 2450, refunds: 70 },
  { day: 'Fri', sales: 2780, refunds: 150 },
  { day: 'Sat', sales: 3120, refunds: 110 },
  { day: 'Sun', sales: 1640, refunds: 40 },
]

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'var(--oc-chart-1)',
  },
  refunds: {
    label: 'Refunds',
    color: 'var(--oc-chart-2)',
  },
} satisfies ChartConfig

function ChartDemo() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Bar
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Weekly sales</CardTitle>
            <CardDescription>Last 7 days · SGD</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-48 w-full">
              <BarChart accessibilityLayer data={weekly}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                <Bar dataKey="refunds" fill="var(--color-refunds)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Line
        </p>
        <Card>
          <CardHeader>
            <CardTitle>Sales trend</CardTitle>
            <CardDescription>Same week, line series.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-48 w-full">
              <LineChart accessibilityLayer data={weekly}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Line
                  dataKey="sales"
                  type="monotone"
                  stroke="var(--color-sales)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="refunds"
                  type="monotone"
                  stroke="var(--color-refunds)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { ChartDemo }
```

Use `ChartContainer` + Recharts (`BarChart`, `LineChart`, `AreaChart`, `PieChart`). Series colors come from `config` as `--color-{key}`. Prefer `--oc-chart-1` through `--oc-chart-5`. Wrap dashboard charts in `Card`. Do not call `npx shadcn add chart`.
