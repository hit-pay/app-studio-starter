import { MDXProvider } from "@mdx-js/react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { DocCodePanel } from "./doc-code-panel";

function MdxPre({ children }: ComponentProps<"pre">) {
  const code =
    typeof children === "object" &&
    children !== null &&
    "props" in children &&
    typeof children.props === "object" &&
    children.props !== null &&
    "children" in children.props
      ? String(children.props.children).replace(/\n$/, "")
      : String(children);

  return <DocCodePanel filename="usage.tsx" code={code} />;
}

const components = {
  h2: ({ className, ...props }: ComponentProps<"h2">) => (
    <h2
      className={cn("text-lg font-semibold text-oc-foreground", className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<"h3">) => (
    <h3
      className={cn("text-base font-medium text-oc-foreground", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<"p">) => (
    <p
      className={cn(
        "text-sm leading-normal text-oc-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: ComponentProps<"a">) => (
    <a
      className={cn(
        "font-medium text-oc-primary underline underline-offset-4",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ComponentProps<"ul">) => (
    <ul
      className={cn(
        "list-disc space-y-2 pl-5 text-sm leading-normal text-oc-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ComponentProps<"ol">) => (
    <ol
      className={cn(
        "list-decimal space-y-2 pl-5 text-sm leading-normal text-oc-muted-foreground",
        className,
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code
      className={cn(
        "rounded bg-oc-muted px-1 py-0.5 font-mono text-[0.9em] text-oc-foreground",
        className,
      )}
      {...props}
    />
  ),
  pre: MdxPre,
};

function DocMdx({ children }: { children: ReactNode }) {
  return (
    <MDXProvider components={components}>
      <div className="flex min-w-0 flex-col gap-8">{children}</div>
    </MDXProvider>
  );
}

export { DocMdx };
