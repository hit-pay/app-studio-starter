import { DocCodePanel } from "@/components/doc/doc-code-panel";

const AI_PROMPT =
  "Read https://orchid-ui-hitpay.vercel.app/llms.txt in full. Follow its Markdown doc links under /llms/*.md (not the HTML example pages) for Orchid installation, MCP setup, components, and usage guidance. After `@orchid` is in components.json, install the complete catalog with `bunx --bun shadcn@latest add @orchid/all`. Do not install a subset. Do not skip items. Prefer installed Orchid blocks over hand-built replacements.";

function IndexDemo() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
      <div>
        <h2 className="text-sm font-medium text-oc-foreground">
          Guide your AI agent
        </h2>
        <p className="mt-1 text-sm text-oc-muted-foreground">
          Copy and paste this prompt before asking an AI agent to build with
          Orchid.
        </p>
      </div>
      <DocCodePanel filename="prompt.txt" code={AI_PROMPT} />
    </div>
  );
}

export { IndexDemo };
