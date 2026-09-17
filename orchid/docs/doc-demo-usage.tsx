import type { ComponentType } from "react";

import { DocCodePanel } from "./doc-code-panel";

const SKIP_SOURCE = new Set([
  "FormLayoutDemo",
  "IndexDemo",
  "InstallationDemo",
  "PageLayoutDemo",
  "SchemaFormDemo",
  "SchemaTableDemo",
]);

function DocDemoUsage({ filename, code }: { filename: string; code: string }) {
  return (
    <div className="flex min-w-0 shrink-0 flex-col gap-3">
      <p className="text-xs font-medium tracking-[0.18em] text-oc-muted-foreground uppercase">
        Usage
      </p>
      <DocCodePanel filename={filename} code={code} />
    </div>
  );
}

function withDemoUsage(
  Demo: ComponentType,
  source: string,
  filename: string,
) {
  const name = Demo.displayName ?? Demo.name;
  function WrappedDemo() {
    if (!source || SKIP_SOURCE.has(name)) {
      return <Demo />;
    }

    return (
      <>
        <Demo />
        <DocDemoUsage filename={filename} code={source} />
      </>
    );
  }

  WrappedDemo.displayName = name;
  return WrappedDemo;
}

export { DocDemoUsage, withDemoUsage };
