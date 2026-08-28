import { createFileRoute } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page'

export const Route = createFileRoute('/installation')({
  component: InstallationPage,
})

const REGISTRY_URL = 'https://orchid-ui-hitpay.vercel.app/registry.json'
const TOKENS_URL = 'https://orchid-ui-hitpay.vercel.app/orchid-tokens.css'

const INSTALLATION_PROMPT = `Create a new application from scratch and use Orchid UI for its interface.

Project name: [PROJECT NAME]

Before creating files or running commands, ask the user:
"Which framework would you like to use?
1. Next.js
2. Vite + React
3. TanStack Start
4. React Router
5. Astro + React"

Wait for the user's answer. Do not select a default framework.

After the framework is chosen, work autonomously and use Bun as the package manager.

1. Use the shadcn project template that matches the selected framework:
   - next: Next.js
   - vite: Vite + React
   - start: TanStack Start
   - react-router: React Router
   - astro: Astro + React
2. Create the project with:
   bunx --bun shadcn@latest init -t [framework]
   Use the requested project name when prompted, then enter the generated project directory.
3. Keep the generated framework structure. Create or update components.json with:
   - "style": "base-nova"
   - "aliases.components": "@/components"
   - "aliases.ui": "@/components/ui"
   - "aliases.utils": "@/lib/utils"
   - "registries.@orchid": "https://orchid-ui-hitpay.vercel.app/r/{name}.json"
   Keep compatible generated settings and ensure @/* resolves to the source directory.
4. Fetch https://orchid-ui-hitpay.vercel.app/orchid-tokens.css and merge it once into the generated global stylesheet. Preserve the --oc-* variables and Tailwind @theme mappings without duplicating tokens.
5. Read https://orchid-ui-hitpay.vercel.app/registry.json. Install only the @orchid components needed for the app request below, using Bun and the shadcn CLI.
6. Import installed components from @/components/ui/<component>. Reuse Orchid components and compose missing patterns from Orchid primitives.
7. Use Orchid UI for all interface elements. Do not install or use official @shadcn components. The shadcn CLI is only the transport for the custom @orchid registry.
8. Use oc-* design tokens instead of shadcn tokens or hard-coded colors.
9. Run the project's typecheck and production build, fix setup-related errors, and summarize the project created, files changed, and components added.

App request:
[PASTE YOUR APP, SCREEN, OR COMPONENT REQUEST HERE]`

const AGENTS = [
  {
    name: 'Cursor',
    instruction: 'Open an empty parent folder, start an Agent chat, and paste the prompt below.',
  },
  {
    name: 'Claude Code',
    instruction: 'Start Claude Code where the new project should be created, then paste the prompt.',
  },
  {
    name: 'Other coding agents',
    instruction: 'Use any local agent that can create files and run terminal commands.',
  },
] as const

const FRAMEWORKS = [
  { name: 'Next.js', template: 'next' },
  { name: 'Vite + React', template: 'vite' },
  { name: 'TanStack Start', template: 'start' },
  { name: 'React Router', template: 'react-router' },
  { name: 'Astro + React', template: 'astro' },
] as const

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      variant="Secondary"
      style="Border"
      size="Small"
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied' : 'Copy prompt'}
    </Button>
  )
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-solid border-oc-border bg-oc-muted">
      <div className="flex items-center justify-between gap-3 border-b border-solid border-oc-border px-3 py-2">
        <span className="font-mono text-xs text-oc-muted-foreground">Installation prompt</span>
        <CopyButton value={code} />
      </div>
      <pre className="max-h-136 overflow-auto p-4 text-[13px] leading-5 text-oc-foreground">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-medium text-oc-foreground">{title}</h2>
      {children}
    </section>
  )
}

function InstallationPage() {
  return (
    <main className="flex h-full min-h-0 flex-col overflow-hidden bg-oc-background">
      <section className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-8 py-8">
        <PageHeader
          title="Installation"
          description="Create a new Orchid UI app with Cursor, Claude Code, or another local coding agent."
        />

        <Section title="1. Your agent asks you to choose a framework">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {FRAMEWORKS.map((framework) => (
              <div
                key={framework.template}
                className="rounded-xl border border-solid border-oc-border bg-oc-card p-4"
              >
                <h3 className="text-sm font-medium text-oc-card-foreground">{framework.name}</h3>
                <code className="mt-1 block text-xs text-oc-muted-foreground">
                  -t {framework.template}
                </code>
              </div>
            ))}
          </div>
        </Section>

        <Section title="2. Open an AI coding agent">
          <div className="grid gap-3 md:grid-cols-3">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="rounded-xl border border-solid border-oc-border bg-oc-card p-4"
              >
                <h3 className="text-sm font-medium text-oc-card-foreground">{agent.name}</h3>
                <p className="mt-1 text-sm leading-6 text-oc-muted-foreground">
                  {agent.instruction}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="3. Paste this prompt">
          <p className="max-w-3xl text-sm leading-6 text-oc-muted-foreground">
            Replace the project name and app request placeholders. The agent will ask which
            framework you prefer before it creates files, then configure Orchid and verify the
            build.
          </p>
          <CodeBlock code={INSTALLATION_PROMPT} />
        </Section>

        <Section title="4. Continue building">
          <p className="max-w-3xl text-sm leading-6 text-oc-muted-foreground">
            After the project is created, keep asking the same agent to build with Orchid UI.
            Components are installed in{' '}
            <code className="text-oc-foreground">src/components/ui</code> and imported from{' '}
            <code className="text-oc-foreground">@/components/ui/&lt;component&gt;</code>.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a
              className="text-oc-primary underline-offset-2 hover:underline"
              href={REGISTRY_URL}
              target="_blank"
              rel="noreferrer"
            >
              Component catalog
            </a>
            <a
              className="text-oc-primary underline-offset-2 hover:underline"
              href={TOKENS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Orchid CSS tokens
            </a>
            <a
              className="text-oc-primary underline-offset-2 hover:underline"
              href="https://ui.shadcn.com/docs/installation"
              target="_blank"
              rel="noreferrer"
            >
              shadcn CLI installation
            </a>
          </div>
        </Section>
      </section>
    </main>
  )
}
