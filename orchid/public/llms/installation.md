<!-- Generated from content/docs/guides/installation.mdx. Do not edit. -->

# Installation

What Orchid is, how to initialize a project, and how to add components with the shadcn CLI.

Orchid is an open-code component collection for application and business
interfaces. You install its source into your project and retain full ownership
of the resulting code.

It combines UI primitives with higher-level components for
forms, data tables, page layouts, sidebars, confirmations, and common business
workflows. Orchid uses the shadcn CLI as its installer. It does not provide a
separate Orchid CLI.

Base items install under `src/ui/{category}` and import from
`@ui/{category}/<name>`. Blocks install under `src/components/{category}`
and import from `@/components/{category}/<name>`. Categories match the catalog
groups (actions, displaying-data, feedback, form, layout, navigation, overlays,
utils). The CLI writes the source into your application.

## Guidance for AI agents

Use a component block when one matches the job. Blocks live under
`@/components/{category}` and are the preferred building blocks for screens.
Use base primitives from `@ui/{category}` only when no Orchid block covers the
job; do not recreate a block by composing its internal primitives.

Before implementing a screen, read the relevant component page and verify the
installed source for the exact props and exports. The examples in this
documentation are usage patterns, not a complete TypeScript API signature.
Preserve existing `components.json`, path aliases, and MCP configuration when
adding Orchid.

## Prerequisites

Use a current JavaScript runtime and a project supported by the shadcn CLI. The
examples use Bun. Orchid uses Tailwind CSS v4 and is distributed as open code:
the CLI writes component source into your application.

## Create the application

Initialize a project with one of the supported shadcn templates:

```bash
bunx --bun shadcn@latest init -t vite
```

Supported template values:

- `next` — Next.js
- `vite` — Vite + React
- `start` — TanStack Start
- `react-router` — React Router
- `astro` — Astro + React

Enter the generated project directory when initialization finishes.

## Configure the registry

Add the `@orchid` namespace to `components.json`:

```json
{
  "registries": {
    "@orchid": "https://orchid-ui-hitpay.vercel.app/r/{name}.json"
  }
}
```

The complete catalog is at
[registry.json](https://orchid-ui-hitpay.vercel.app/registry.json). Then follow
[Theming](https://orchid-ui-hitpay.vercel.app/llms/theming.md) to import
`https://orchid-ui-hitpay.vercel.app/orchid-tokens.css` into the global
stylesheet configured in `components.json`.

## Add the complete catalog

```bash
bunx --bun shadcn@latest add @orchid/all
```

Use this for a new application. Do not install a subset. The namespace keeps
Orchid items separate from the default shadcn registry. Registry dependencies
are installed automatically. Import a base item from `@ui/actions/button`
and a block from `@/components/form/form-builder`.

Orchid maintainers build the published registry with `bun run registry:build`.
Consumer applications do not need this command.
