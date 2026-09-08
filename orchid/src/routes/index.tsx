import { createFileRoute } from "@tanstack/react-router";

import { IndexDemo } from "@/components/doc/demos/index-demo";

export const Route = createFileRoute("/")({ component: IndexPage });

function IndexPage() {
  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-oc-background">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-8 py-8">
        <IndexDemo />
      </div>
    </main>
  );
}
