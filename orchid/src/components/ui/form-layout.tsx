"use client";

import { useEffect, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";

type FormLayoutAction = {
  label?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

type FormLayoutActions = {
  cancel?: FormLayoutAction;
  save?: FormLayoutAction;
};

type FormLayoutCommonProps = {
  title: string;
  description?: string;
  formId?: string;
  actions?: FormLayoutActions;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
};

type FormLayoutPageProps = FormLayoutCommonProps & {
  mode?: "page";
  open?: never;
  onOpenChange?: never;
  size?: never;
  persistent?: never;
};

type FormLayoutModalProps = FormLayoutCommonProps & {
  mode: "modal";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: "sm" | "default" | "lg";
  persistent?: boolean;
};

type FormLayoutProps = FormLayoutPageProps | FormLayoutModalProps;

function FormActions({
  formId,
  actions = {},
  onCancel,
}: {
  formId?: string;
  actions?: FormLayoutActions;
  onCancel?: () => void;
}) {
  const cancel = actions.cancel?.onClick ?? onCancel;

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="min-w-25"
        disabled={actions.cancel?.disabled || actions.cancel?.loading}
        aria-busy={actions.cancel?.loading || undefined}
        onClick={cancel}
      >
        {actions.cancel?.icon}
        {actions.cancel?.label ?? "Cancel"}
      </Button>
      <Button
        type={formId ? "submit" : "button"}
        form={formId}
        className="min-w-25"
        disabled={actions.save?.disabled || actions.save?.loading}
        aria-busy={actions.save?.loading || undefined}
        onClick={actions.save?.onClick}
      >
        {actions.save?.icon}
        {actions.save?.label ?? "Save"}
      </Button>
    </>
  );
}

function PageFormLayout({
  title,
  description,
  formId,
  actions,
  onClose,
  children,
  className,
}: FormLayoutPageProps) {
  useEffect(() => {
    if (!onClose) return;
    const close = onClose;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
          target.isContentEditable)
      ) {
        return;
      }
      close();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <section
      data-slot="form-layout"
      data-mode="page"
      className={cn(
        "flex h-full min-h-0 w-full flex-1 flex-col overflow-hidden bg-oc-background",
        className,
      )}
    >
      <header className="relative z-10 flex h-12 shrink-0 items-center justify-between gap-3 border-b border-oc-border bg-oc-background px-4 md:px-6">
        {onClose ? (
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1 text-sm text-oc-muted-foreground outline-none hover:text-oc-foreground"
            onClick={onClose}
          >
            Close
            <Kbd>Esc</Kbd>
          </button>
        ) : (
          <span />
        )}
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2">
          <FormActions formId={formId} actions={actions} onCancel={onClose} />
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
        <div className="mx-auto w-full max-w-xl">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-oc-foreground">
              {title}
            </h1>
            {description ? (
              <p className="mt-1 text-sm text-oc-muted-foreground">
                {description}
              </p>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </section>
  );
}

function ModalFormLayout({
  open,
  onOpenChange,
  title,
  description,
  formId,
  actions,
  onClose,
  children,
  className,
  size = "default",
  persistent = false,
}: FormLayoutModalProps) {
  const close = () => {
    actions?.cancel?.onClick?.();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && open) onClose?.();
        onOpenChange(nextOpen);
      }}
      persistent={persistent}
    >
      <DialogContent
        size={size}
        data-slot="form-layout"
        data-mode="modal"
        className={cn("gap-0 overflow-hidden p-0", className)}
      >
        <div className="border-b border-oc-border px-5 py-4 pr-12">
          <DialogTitle>{title}</DialogTitle>
          {description ? (
            <DialogDescription className="mt-2">
              {description}
            </DialogDescription>
          ) : null}
        </div>

        <div className="min-h-0 overflow-y-auto px-5 py-5">{children}</div>

        <div className="flex flex-col-reverse gap-2 border-t border-oc-border bg-oc-muted/50 p-4 sm:flex-row sm:justify-end">
          <FormActions
            formId={formId}
            actions={{
              ...actions,
              cancel: { ...actions?.cancel, onClick: close },
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function FormLayout(props: FormLayoutProps) {
  if (props.mode === "modal") {
    return <ModalFormLayout {...props} />;
  }

  return <PageFormLayout {...props} />;
}

export {
  FormLayout,
  type FormLayoutAction,
  type FormLayoutActions,
  type FormLayoutProps,
};
