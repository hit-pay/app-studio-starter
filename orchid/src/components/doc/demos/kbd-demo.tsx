import { Kbd, KbdGroup } from '@/components/ui/kbd'


function KbdDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Default
        </p>
        <p className="flex flex-wrap items-center gap-2 text-sm leading-normal text-oc-foreground">
          Close
          <Kbd>Esc</Kbd>
        </p>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Group
        </p>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
    </>
  )
}

export { KbdDemo }
