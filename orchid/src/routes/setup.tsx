import { createFileRoute } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'
import { CheckIcon, CopyIcon } from 'lucide-react'

import orchidStyles from '@/styles.css?raw'
import { PageTitle } from '@/components/ui/page-title'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/setup')({
  component: SetupGuidePage,
})

const COMPONENTS_JSON = `{
  "style": "base-nova",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "css": "src/styles.css",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/orchid-ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {
    "@orchid": "https://orchid-ui-hitpay.vercel.app/r/{name}.json"
  }
}`

const MCP_STDIO_JSON = `{
  "mcpServers": {
    "shadcn": {
      "command": "bunx",
      "args": ["--bun", "shadcn", "mcp"]
    }
  }
}`

const MCP_VSCODE_JSON = `{
  "servers": {
    "shadcn": {
      "command": "bunx",
      "args": ["--bun", "shadcn", "mcp"]
    }
  }
}`

const MCP_CODEX_TOML = `[mcp_servers.shadcn]
command = "bunx"
args = ["--bun", "shadcn", "mcp"]`

const MCP_INIT = `bunx shadcn mcp init --client cursor
bunx shadcn mcp init --client claude
bunx shadcn mcp init --client vscode
bunx shadcn mcp init --client codex`

const HARNESSES: { name: string; file: string; note: string }[] = [
  { name: 'Cursor', file: '.cursor/mcp.json', note: 'Project MCP. Enable the server in Cursor Settings.' },
  { name: 'Claude Code', file: '.mcp.json', note: 'Project MCP. Restart, then /mcp to confirm Connected.' },
  { name: 'VS Code + Copilot', file: '.vscode/mcp.json', note: 'Uses servers (not mcpServers). Open the file and Start.' },
  { name: 'Codex', file: '.codex/config.toml', note: 'Project file. CLI cannot write ~/.codex/config.toml.' },
  { name: 'Windsurf / OpenCode / others', file: 'client MCP config', note: 'Same stdio command: bunx --bun shadcn mcp.' },
]

const COLOR_TOKENS: { token: string; utility: string; value: string; dark: string }[] = [
  { token: '--oc-background', utility: 'bg-oc-background', value: '#fff', dark: '#0c1018' },
  { token: '--oc-foreground', utility: 'text-oc-foreground', value: '#03102f', dark: '#eef1f6' },
  { token: '--oc-card', utility: 'bg-oc-card', value: '#fff', dark: '#141924' },
  { token: '--oc-card-foreground', utility: 'text-oc-card-foreground', value: '#03102f', dark: '#eef1f6' },
  { token: '--oc-primary', utility: 'bg-oc-primary', value: '#2465de', dark: '#4d8af0' },
  { token: '--oc-primary-foreground', utility: 'text-oc-primary-foreground', value: '#fff', dark: '#fff' },
  { token: '--oc-primary-300', utility: 'text-oc-primary-300', value: '#80acfe', dark: '#8eb6ff' },
  { token: '--oc-secondary', utility: 'bg-oc-secondary', value: '#f2f2f2', dark: '#1c2230' },
  { token: '--oc-secondary-foreground', utility: 'text-oc-secondary-foreground', value: '#61667c', dark: '#a8adbd' },
  { token: '--oc-muted', utility: 'bg-oc-muted', value: '#f8f9fc', dark: '#121722' },
  { token: '--oc-muted-foreground', utility: 'text-oc-muted-foreground', value: '#61667c', dark: '#8b91a3' },
  { token: '--oc-accent', utility: 'bg-oc-accent', value: '#f2f2f4', dark: '#1c2230' },
  { token: '--oc-accent-foreground', utility: 'text-oc-accent-foreground', value: '#03102f', dark: '#eef1f6' },
  { token: '--oc-border', utility: 'border-oc-border', value: '#e5e6ea', dark: '#2a3142' },
  { token: '--oc-destructive', utility: 'text-oc-destructive', value: '#dc3545', dark: '#f05a68' },
  { token: '--oc-destructive-soft', utility: 'bg-oc-destructive-soft', value: '#f9e9e9', dark: '#3a1c20' },
  { token: '--oc-destructive-border', utility: 'border-oc-destructive-border', value: '#e7a6a6', dark: '#8a3d46' },
  { token: '--oc-success', utility: 'text-oc-success', value: '#2bc37d', dark: '#3dd68c' },
  { token: '--oc-success-soft', utility: 'bg-oc-success-soft', value: '#e6f9f0', dark: '#143528' },
  { token: '--oc-success-border', utility: 'border-oc-success-border', value: '#b3eed2', dark: '#2a6b4c' },
  { token: '--oc-warning', utility: 'text-oc-warning', value: '#f4b840', dark: '#f5c35a' },
  { token: '--oc-warning-soft', utility: 'bg-oc-warning-soft', value: '#fff9ec', dark: '#3a2d12' },
  { token: '--oc-warning-border', utility: 'border-oc-warning-border', value: '#f4b840', dark: '#8a6a28' },
  { token: '--oc-info-soft', utility: 'bg-oc-info-soft', value: '#e5eeff', dark: '#172844' },
  { token: '--oc-info-border', utility: 'border-oc-info-border', value: '#b3cdfe', dark: '#3d5f99' },
  { token: '--oc-neutral', utility: 'bg-oc-neutral', value: '#fcfcfd', dark: '#10151f' },
  { token: '--oc-neutral-soft', utility: 'bg-oc-neutral-soft', value: '#f2f2f4', dark: '#1c2230' },
  { token: '--oc-neutral-border', utility: 'border-oc-neutral-border', value: '#cbcdd4', dark: '#3a4154' },
  { token: '--oc-neutral-strong', utility: 'text-oc-neutral-strong', value: '#484d61', dark: '#c5c9d4' },
]

function CopyAllButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <Button
      type="Secondary"
      style="Border"
      size="Small"
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1600)
      }}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      {copied ? 'Copied' : label}
    </Button>
  )
}

function CodeBlock({
  code,
  filename,
  copyLabel = 'Copy',
  maxHeight,
}: {
  code: string
  filename?: string
  copyLabel?: string
  maxHeight?: string
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-solid border-oc-border bg-oc-muted">
      <div className="flex items-center justify-between gap-3 border-b border-solid border-oc-border px-3 py-2">
        <span className="truncate font-mono text-xs text-oc-muted-foreground">
          {filename ?? ' '}
        </span>
        <CopyAllButton value={code} label={copyLabel} />
      </div>
      <pre
        className="overflow-auto p-4 text-[13px] leading-5 text-oc-foreground"
        style={maxHeight ? { maxHeight } : undefined}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-base font-medium text-oc-foreground">{title}</h2>
      {children}
    </section>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="max-w-3xl text-sm leading-6 text-oc-muted-foreground">{children}</p>
}

function SetupGuidePage() {
  return (
    <main className="bg-oc-background">
      <section className="flex flex-col gap-12 px-8 py-12">
        <PageTitle
          title="Setup"
          description="Install Orchid tokens, point any AI harness at the registry, and add components."
        />

        <Section title="1. CSS variables">
          <P>
            Orchid colors use an <code className="text-oc-foreground">oc-</code> prefix so they do
            not collide with default shadcn tokens. Put hex values on{' '}
            <code className="text-oc-foreground">:root</code> as{' '}
            <code className="text-oc-foreground">--oc-*</code>, then expose them to Tailwind in{' '}
            <code className="text-oc-foreground">@theme inline</code> as{' '}
            <code className="text-oc-foreground">--color-oc-*</code>. That yields utilities like{' '}
            <code className="text-oc-foreground">bg-oc-primary</code> and{' '}
            <code className="text-oc-foreground">text-oc-foreground</code>.
          </P>
          <P>
            Paste this file into your app CSS (for example{' '}
            <code className="text-oc-foreground">src/styles.css</code>). It is tokens only —{' '}
            <code className="text-oc-foreground">@theme</code>,{' '}
            <code className="text-oc-foreground">:root</code>, and button gradients. Load Inter
            (weights 400–700) in the app and apply{' '}
            <code className="text-oc-foreground">font-inter</code>,{' '}
            <code className="text-oc-foreground">bg-oc-background</code>, and{' '}
            <code className="text-oc-foreground">text-oc-foreground</code> on{' '}
            <code className="text-oc-foreground">html</code>/<code className="text-oc-foreground">body</code>{' '}
            yourself. Add <code className="text-oc-foreground">class="dark"</code> on{' '}
            <code className="text-oc-foreground">html</code> to use the dark tokens.
          </P>
          <CodeBlock
            code={orchidStyles}
            filename="src/styles.css"
            copyLabel="Copy all CSS"
            maxHeight="28rem"
          />
          <div className="overflow-x-auto rounded-xl border border-solid border-oc-border">
            <table className="w-full min-w-xl text-left text-sm">
              <thead className="bg-oc-muted text-oc-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">CSS variable</th>
                  <th className="px-4 py-2 font-medium">Tailwind</th>
                  <th className="px-4 py-2 font-medium">Light</th>
                  <th className="px-4 py-2 font-medium">Dark</th>
                </tr>
              </thead>
              <tbody>
                {COLOR_TOKENS.map((row) => (
                  <tr key={row.token} className="border-t border-solid border-oc-border">
                    <td className="px-4 py-2 font-mono text-[13px] text-oc-foreground">{row.token}</td>
                    <td className="px-4 py-2 font-mono text-[13px] text-oc-muted-foreground">
                      {row.utility}
                    </td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center gap-2 font-mono text-[13px]">
                        <span
                          className="size-3.5 rounded-sm border border-solid border-oc-border"
                          style={{ background: row.value }}
                        />
                        {row.value}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span className="inline-flex items-center gap-2 font-mono text-[13px]">
                        <span
                          className="size-3.5 rounded-sm border border-solid border-oc-border"
                          style={{ background: row.dark }}
                        />
                        {row.dark}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            Button gradients use extra tokens such as{' '}
            <code className="text-oc-foreground">--oc-primary-button-default-start</code> and
            shadows like <code className="text-oc-foreground">--oc-primary-button-shadow</code>.
            Those live in the same <code className="text-oc-foreground">:root</code> block. Prefer
            tokens over raw colors like <code className="text-oc-foreground">bg-blue-500</code>.
          </P>
        </Section>

        <Section title="2. Point shadcn at Orchid">
          <P>
            In the consuming app, set the <code className="text-oc-foreground">ui</code> alias to
            your kit folder (for example <code className="text-oc-foreground">src/orchid-ui</code>
            ) and register the catalog. Keep{' '}
            <code className="text-oc-foreground">style: "base-nova"</code> — Orchid is Base UI, not
            Radix.
          </P>
          <CodeBlock code={COMPONENTS_JSON} filename="components.json" />
          <P>
            Catalog JSON:{' '}
            <a
              className="text-oc-primary underline-offset-2 hover:underline"
              href="https://orchid-ui-hitpay.vercel.app/registry.json"
            >
              orchid-ui-hitpay.vercel.app/registry.json
            </a>
            . Item files use the template{' '}
            <code className="text-oc-foreground">/r/{'{name}'}.json</code>. Do not add components
            from <code className="text-oc-foreground">@shadcn</code> / ui.shadcn.com.
          </P>
        </Section>

        <Section title="3. AI harness (MCP)">
          <P>
            Orchid is meant for any MCP client — Cursor, Claude Code, VS Code Copilot, Codex,
            Windsurf, OpenCode, and similar harnesses. The shadcn MCP server reads registries from{' '}
            <code className="text-oc-foreground">components.json</code>. Search and list{' '}
            <code className="text-oc-foreground">@orchid</code> only. Official notes:{' '}
            <a
              className="text-oc-primary underline-offset-2 hover:underline"
              href="https://ui.shadcn.com/docs/mcp"
            >
              ui.shadcn.com/docs/mcp
            </a>
            .
          </P>
          <P>Generate the client file from the app directory, then restart the harness:</P>
          <CodeBlock code={MCP_INIT} />
          <div className="overflow-x-auto rounded-xl border border-solid border-oc-border">
            <table className="w-full min-w-xl text-left text-sm">
              <thead className="bg-oc-muted text-oc-muted-foreground">
                <tr>
                  <th className="px-4 py-2 font-medium">Harness</th>
                  <th className="px-4 py-2 font-medium">Config file</th>
                  <th className="px-4 py-2 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {HARNESSES.map((row) => (
                  <tr key={row.name} className="border-t border-solid border-oc-border">
                    <td className="px-4 py-2 font-medium text-oc-foreground">{row.name}</td>
                    <td className="px-4 py-2 font-mono text-[13px] text-oc-foreground">{row.file}</td>
                    <td className="px-4 py-2 text-oc-muted-foreground">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <P>
            Manual stdio config (Cursor, Claude Code, and most JSON MCP clients):
          </P>
          <CodeBlock code={MCP_STDIO_JSON} />
          <P>
            VS Code Copilot uses <code className="text-oc-foreground">servers</code> instead of{' '}
            <code className="text-oc-foreground">mcpServers</code>:
          </P>
          <CodeBlock code={MCP_VSCODE_JSON} />
          <P>Codex TOML (project <code className="text-oc-foreground">.codex/config.toml</code>):</P>
          <CodeBlock code={MCP_CODEX_TOML} />
          <P>
            If MCP tools never appear, check the harness file, restart the client, and confirm{' '}
            <code className="text-oc-foreground">shadcn</code> is installed. You can still add
            components from the catalog JSON without MCP.
          </P>
        </Section>

        <Section title="4. Add a component">
          <P>From the app directory:</P>
          <CodeBlock code="bunx shadcn add @orchid/button" />
          <P>Several at once:</P>
          <CodeBlock code="bunx shadcn add @orchid/button @orchid/input @orchid/field" />
          <P>
            Every Orchid UI item. The CLI flag{' '}
            <code className="text-oc-foreground">--all</code> only installs the default shadcn kit
            — it cannot target <code className="text-oc-foreground">@orchid</code>.
          </P>
          <CodeBlock
            code={`bunx shadcn add \\
  @orchid/button @orchid/dropdown-menu @orchid/snackbar @orchid/chip \\
  @orchid/accordion @orchid/progress-bar @orchid/list-item @orchid/input-stepper \\
  @orchid/avatar @orchid/tooltip @orchid/tab-menu @orchid/clickable-option \\
  @orchid/overview-item @orchid/sub-header @orchid/page-title @orchid/box-detail \\
  @orchid/group-icon @orchid/copy-tooltip @orchid/customer-card @orchid/checkbox \\
  @orchid/radio-group @orchid/toggle @orchid/slider @orchid/empty-page \\
  @orchid/label @orchid/separator @orchid/field @orchid/input @orchid/textarea \\
  @orchid/select @orchid/input-group @orchid/popover @orchid/calendar \\
  @orchid/date-picker @orchid/modal`}
          />
          <P>
            After this catalog is deployed, you can also install the same set as one item:
          </P>
          <CodeBlock code="bunx shadcn add @orchid/all" />
          <P>
            Files land in the <code className="text-oc-foreground">ui</code> alias. Import from{' '}
            <code className="text-oc-foreground">@/ui/button</code> (or{' '}
            <code className="text-oc-foreground">@/orchid-ui/button</code>). Names match the
            registry item, for example <code className="text-oc-foreground">dropdown-menu</code>,{' '}
            <code className="text-oc-foreground">date-picker</code>,{' '}
            <code className="text-oc-foreground">empty-page</code>.
          </P>
          <CodeBlock
            code={`import { Button } from '@/ui/button'

<Button type="Primary">Save</Button>
<Button type="Secondary" style="Border">Cancel</Button>`}
          />
          <P>
            <code className="text-oc-foreground">type</code> is visual (Primary | Secondary |
            Destructive). Use <code className="text-oc-foreground">htmlType</code> for submit.
            Triggers use Base UI <code className="text-oc-foreground">render</code> with the Orchid
            Button, not <code className="text-oc-foreground">asChild</code> or{' '}
            <code className="text-oc-foreground">@radix-ui/*</code>.
          </P>
        </Section>
      </section>
    </main>
  )
}
