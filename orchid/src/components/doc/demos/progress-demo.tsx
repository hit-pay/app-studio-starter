import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from '@/components/ui/progress'


function ProgressDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <Progress value={70}>
          <ProgressLabel>Invoice collection · INV-2048</ProgressLabel>
          <ProgressValue />
        </Progress>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Custom track
        </p>
        <Progress value={70} className="**:data-[slot=progress-track]:h-2">
          <ProgressLabel className="text-xs">Payout batch processing</ProgressLabel>
          <ProgressValue className="text-xs" />
        </Progress>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Recurring setup
        </p>
        <Progress value={2} max={5}>
          <ProgressLabel>Alex Turner plan</ProgressLabel>
          <ProgressValue>{(_formattedValue, value) => `${value}/5 steps`}</ProgressValue>
        </Progress>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Product stock
        </p>
        <Progress value={8} max={24}>
          <ProgressLabel>SKU-TEA-12</ProgressLabel>
          <ProgressValue>{(_formattedValue, value) => `${value}/24 units`}</ProgressValue>
        </Progress>
      </div>
    </>
  )
}

export { ProgressDemo }
