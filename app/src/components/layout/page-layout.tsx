import type { ComponentProps, ReactNode } from "react";
import { LeftRegular } from "@mingcute/react/core-regular";

import { cn } from "@/lib/utils";
import { Button } from "@ui/actions/button";
import { CopyButton } from "@/components/actions/copy-button";

function Header({
  className,
  title,
  description,
  badge,
  copyValue,
  actions,
  onBack,
  loading = false,
  ...props
}: Omit<ComponentProps<"header">, "title"> &
  Pick<
    PageLayoutProps,
    | "actions"
    | "badge"
    | "copyValue"
    | "description"
    | "loading"
    | "onBack"
    | "title"
  >) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        "flex w-full min-w-0 shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {onBack && !loading ? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Back"
              className="-ml-1.5"
              onClick={onBack}
            >
              <LeftRegular />
            </Button>
          ) : null}
          {loading ? (
            <span className="h-6 min-w-0 flex-1 animate-pulse rounded bg-oc-neutral-soft" />
          ) : (
            <h1 className="min-w-0 wrap-break-word text-lg leading-6 font-medium text-oc-foreground">
              {title}
            </h1>
          )}
          {badge && !loading ? badge : null}
        </div>
        {loading ? (
          <span className="h-5 min-w-0 flex-1 animate-pulse rounded bg-oc-neutral-soft" />
        ) : description ? (
          <div
            className={cn(
              "flex min-w-0 items-center gap-2",
              onBack ? "pl-8" : undefined,
            )}
          >
            <div className="min-w-0 wrap-break-word text-sm leading-5 text-oc-muted-foreground">
              {description}
            </div>
            {copyValue ? <CopyButton value={copyValue} /> : null}
          </div>
        ) : null}
      </div>
      {actions && !loading ? (
        <div className="flex flex-wrap items-center justify-end gap-2 sm:shrink-0">
          {actions}
        </div>
      ) : null}
    </header>
  );
}

function Content({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="page-content"
      className={cn(
        "mt-5 min-h-0 flex-1 overflow-y-auto px-1 py-0.5 -mx-1",
        className,
      )}
      {...props}
    />
  );
}

type PageLayoutProps = Omit<ComponentProps<"section">, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  badge?: ReactNode;
  copyValue?: string;
  actions?: ReactNode;
  onBack?: () => void;
  loading?: boolean;
  headerClassName?: string;
  contentClassName?: string;
};

function PageLayout({
  title,
  description,
  badge,
  copyValue,
  actions,
  onBack,
  loading = false,
  children,
  className,
  headerClassName,
  contentClassName,
  ...props
}: PageLayoutProps) {
  return (
    <section
      data-slot="page-layout"
      className={cn(
        "flex h-full min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden px-4 py-5 sm:px-6",
        className,
      )}
      {...props}
    >
      <Header
        title={title}
        description={description}
        badge={badge}
        copyValue={copyValue}
        actions={actions}
        onBack={onBack}
        loading={loading}
        className={headerClassName}
      />
      <Content className={contentClassName}>{children}</Content>
    </section>
  );
}

export { PageLayout };
export type { PageLayoutProps };
