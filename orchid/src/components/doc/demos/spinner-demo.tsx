import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

function SpinnerDemo() {
  return (
    <>
      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          Size
        </p>
        <div className="flex items-center gap-6">
          <Spinner className="size-3" />
          <Spinner className="size-4" />
          <Spinner className="size-8" />
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
          On a button
        </p>
        <Button disabled>
          <Spinner aria-label="Saving" />
          Saving invoice
        </Button>
      </div>
    </>
  );
}

export { SpinnerDemo };
