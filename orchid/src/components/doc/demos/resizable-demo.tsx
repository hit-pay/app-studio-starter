import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'

function ResizableDemo() {
  return (
    <div className="h-56 overflow-hidden rounded-lg border border-solid border-oc-border">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel defaultSize={36} minSize={20}>
          <div className="flex h-full items-center justify-center px-4 text-sm text-oc-muted-foreground">
            Catalog
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={64} minSize={30}>
          <div className="flex h-full items-center justify-center px-4 text-sm text-oc-muted-foreground">
            Detail
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export { ResizableDemo }
