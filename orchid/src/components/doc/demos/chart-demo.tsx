import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@ui/displaying-data/chart'

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
        <div className="rounded-xl border border-solid border-oc-border bg-oc-background p-5">
          <p className="text-sm font-medium text-oc-foreground">Weekly sales</p>
          <p className="mt-1 text-sm text-oc-muted-foreground">Last 7 days · SGD</p>
          <div className="mt-4">
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
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Line
        </p>
        <div className="rounded-xl border border-solid border-oc-border bg-oc-background p-5">
          <p className="text-sm font-medium text-oc-foreground">Sales trend</p>
          <p className="mt-1 text-sm text-oc-muted-foreground">Same week, line series.</p>
          <div className="mt-4">
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
          </div>
        </div>
      </div>
    </div>
  )
}

export { ChartDemo }
