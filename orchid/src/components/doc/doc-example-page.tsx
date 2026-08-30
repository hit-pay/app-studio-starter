import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import {
  DOC_BLOCKS,
  DOC_COMPONENTS,
  DOC_FORMS,
  DOC_GUIDE_ITEMS,
} from "./doc-components";
import { DocCodePanel } from "./doc-code-panel";

type DocPath =
  | (typeof DOC_COMPONENTS)[number]["to"]
  | (typeof DOC_FORMS)[number]["to"]
  | (typeof DOC_BLOCKS)[number]["to"]
  | (typeof DOC_GUIDE_ITEMS)[number]["to"]
  | "/";

function DocExamplePage({
  to,
  usage,
  extraUsage,
  className,
  bodyClassName,
  fill = false,
  children,
}: {
  to: DocPath;
  usage?: string;
  extraUsage?: Array<{ title: string; filename: string; code: string }>;
  className?: string;
  bodyClassName?: string;
  fill?: boolean;
  children: ReactNode;
}) {
  const item =
    to === "/"
      ? { name: "Examples", description: "Browse Orchid UI components." }
      : (DOC_GUIDE_ITEMS.find((entry) => entry.to === to) ??
        DOC_COMPONENTS.find((entry) => entry.to === to) ??
        DOC_FORMS.find((entry) => entry.to === to) ??
        DOC_BLOCKS.find((entry) => entry.to === to));

  if (fill) {
    return (
      <main className="flex h-full min-h-0 flex-col overflow-hidden bg-oc-background">
        {children}
      </main>
    );
  }

  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-oc-background">
      <section
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-8 overflow-hidden px-8 py-8",
          className,
        )}
      >
        {item ? (
          <div className="shrink-0">
            <header className="flex w-full min-w-0 shrink-0 flex-col items-stretch gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex min-w-0 flex-wrap items-center gap-2">
                  <h1 className="min-w-0 wrap-break-word text-lg leading-6 font-medium text-oc-foreground">
                    {item.name}
                  </h1>
                </div>
                <div className="flex min-w-0 items-center gap-2">
                  <p className="min-w-0 wrap-break-word text-sm leading-5 text-oc-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </header>
          </div>
        ) : null}
        <div
          className={cn(
            "-mx-1 flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-1",
            bodyClassName,
          )}
        >
          {children}
          {usage ? (
            <div className="flex min-w-0 flex-col gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
                Usage
              </p>
              <DocCodePanel filename="usage.tsx" code={usage} />
            </div>
          ) : null}
          {extraUsage?.map((item) => (
            <div key={item.filename} className="flex min-w-0 flex-col gap-3">
              <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
                {item.title}
              </p>
              <DocCodePanel filename={item.filename} code={item.code} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export { DocExamplePage };
