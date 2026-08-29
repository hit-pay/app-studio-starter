import { Slider } from "@/components/ui/slider";

function SliderDemo() {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Default
          </p>
          <p className="text-xs text-oc-muted-foreground">
            Point of Sale tip (SGD)
          </p>
          <Slider defaultValue={8} max={20} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Dragged
          </p>
          <p className="text-xs text-oc-muted-foreground">
            Online Store discount (%)
          </p>
          <Slider defaultValue={15} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Range
          </p>
          <p className="text-xs text-oc-muted-foreground">
            Invoice amount filter (SGD)
          </p>
          <Slider defaultValue={[25, 75]} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Multiple thumbs
          </p>
          <p className="text-xs text-oc-muted-foreground">Payout bands</p>
          <Slider defaultValue={[20, 40, 70]} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Low-stock alert
          </p>
          <p className="text-xs text-oc-muted-foreground">
            SKU HP-MUG-001 reorder at units
          </p>
          <Slider defaultValue={12} max={100} />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
            Recurring retry window
          </p>
          <p className="text-xs text-oc-muted-foreground">
            Days to retry a failed Cards charge
          </p>
          <Slider defaultValue={3} max={14} />
        </div>
      </div>
    </>
  );
}

export { SliderDemo };
