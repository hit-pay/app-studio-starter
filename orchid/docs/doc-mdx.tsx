import { MDXProvider } from "@mdx-js/react";
import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";
import { DocCodePanel } from "./doc-code-panel";

function mdxText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(mdxText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return mdxText(node.props.children);
  }
  return "";
}

function MdxPre({ children }: ComponentProps<"pre">) {
  const code = mdxText(children).replace(/\n$/, "");

  return (
    <div className="w-full min-w-0 max-w-full shrink-0">
      <DocCodePanel filename="usage.tsx" code={code} />
    </div>
  );
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
  code: ({ className, ...props }: ComponentProps<"code">) => {
    if (className?.includes("language-")) {
      return <code className={className} {...props} />;
    }

    return (
      <code
        className={cn(
          "rounded bg-oc-muted px-1 py-0.5 font-mono text-[0.9em] text-oc-foreground",
          className,
        )}
        {...props}
      />
    );
  },
  pre: MdxPre,
};

function DocMdx({ children }: { children: ReactNode }) {
  return (
    <MDXProvider components={components}>
      <div className="grid w-full min-w-0 gap-8">
        {Children.map(children, (child) =>
          isValidElement(child)
            ? cloneElement(
                child as ReactElement<{ components?: typeof components }>,
                { components },
              )
            : child,
        )}
      </div>
    </MDXProvider>
  );
}

export { DocMdx };
