import { useState, type ReactNode } from "react";
import {
  CheckIcon,
  CircleHelpIcon,
  Trash2Icon,
  TriangleAlertIcon,
  XIcon,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AlertDialogDemo() {
  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
        <IntentAlertDialog
          label="Delete"
          trigger="Delete payment link"
          icon={<Trash2Icon />}
          iconClassName="bg-oc-destructive-soft text-oc-destructive"
          action="Delete"
          actionVariant="destructive"
        />
        <IntentAlertDialog
          label="Warning"
          trigger="Continue with warning"
          icon={<TriangleAlertIcon />}
          iconClassName="bg-oc-warning-soft text-oc-warning"
          action="Continue"
          actionVariant="destructive"
        />
        <IntentAlertDialog
          label="Success"
          trigger="Show success"
          icon={<CheckIcon />}
          iconClassName="bg-oc-success-soft text-oc-success"
          action="OK"
          showCancel={false}
        />
        <IntentAlertDialog
          label="Question"
          trigger="Ask a question"
          icon={<CircleHelpIcon />}
          iconClassName="bg-oc-info-soft text-oc-primary"
          action="Yes"
          cancel="No"
        />
        <ConfirmPhraseAlertDialog />
      </div>
    </>
  );
}

function IntentAlertDialog({
  label,
  trigger,
  icon,
  iconClassName,
  action,
  actionVariant = "default",
  cancel = "Cancel",
  showCancel = true,
}: {
  label: string;
  trigger: string;
  icon: ReactNode;
  iconClassName: string;
  action: string;
  actionVariant?: "default" | "destructive";
  cancel?: string;
  showCancel?: boolean;
}) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        {label}
      </p>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>
          {trigger}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogCancel
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 text-oc-muted-foreground"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col items-center gap-4 py-4 text-center">
            <span
              className={`inline-flex size-12 items-center justify-center rounded-full [&_svg]:size-6 ${iconClassName}`}
            >
              {icon}
            </span>
            <AlertDialogDescription className="max-w-64 text-center text-oc-foreground">
              Do you want to delete this payment link? The action can&apos;t be
              undone.
            </AlertDialogDescription>
          </div>
          <AlertDialogFooter className="sm:justify-center">
            {showCancel ? (
              <AlertDialogCancel className="min-w-28">
                {cancel}
              </AlertDialogCancel>
            ) : null}
            <AlertDialogAction className="min-w-28" variant={actionVariant}>
              {action}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function ConfirmPhraseAlertDialog() {
  const [phrase, setPhrase] = useState("");
  const confirmation = "payment-link";

  return (
    <div className="space-y-4 md:col-span-2">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        Type to confirm
      </p>
      <AlertDialog onOpenChange={() => setPhrase("")}>
        <AlertDialogTrigger render={<Button variant="destructive" />}>
          Delete with confirmation
        </AlertDialogTrigger>
        <AlertDialogContent size="Medium">
          <AlertDialogCancel
            variant="ghost"
            size="icon-sm"
            className="absolute top-2 right-2 text-oc-muted-foreground"
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </AlertDialogCancel>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4 py-2">
            <AlertDialogDescription className="text-oc-foreground">
              Do you want to delete this payment link? The action can&apos;t be
              undone.
            </AlertDialogDescription>
            <label className="block space-y-2 text-sm text-oc-foreground">
              <span>
                Type <strong>{confirmation}</strong> to confirm
              </span>
              <Input
                value={phrase}
                onChange={(event) => setPhrase(event.currentTarget.value)}
                placeholder="Type here..."
              />
            </label>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-w-28">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="min-w-28"
              variant="destructive"
              disabled={phrase.trim() !== confirmation}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { AlertDialogDemo };
