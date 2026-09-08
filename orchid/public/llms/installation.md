<!-- Generated from content/docs/guides/installation.mdx. Do not edit. -->

# Installation

What Orchid is, how to initialize a project, and how to add components with the shadcn CLI.

Orchid is an open-code component collection for application and business
interfaces. You install its source into your project and retain full ownership
of the resulting code.

It combines shadcn-compatible UI primitives with higher-level components for
forms, data tables, page layouts, sidebars, confirmations, and common business
workflows. Orchid uses the shadcn CLI as its installer. It does not provide a
separate Orchid CLI.

Registry items that target `@ui` land in `src/components/ui`. Higher-level
blocks that target `@components` land in `src/components`. The registry
declares these destinations, so the CLI places each file automatically.

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

## Add a component

```bash
bunx --bun shadcn@latest add @orchid/button
```

The namespace keeps Orchid items separate from the default shadcn registry.
Registry dependencies are installed automatically. Import from
`@/components/ui/button`.

## Add the complete catalog

```bash
bunx --bun shadcn@latest add @orchid/all
```

Prefer individual items when you only need part of the catalog. Use `all` for
an application starter that keeps the full component set.

Orchid maintainers build the published registry with `bun run registry:build`.
Consumer applications do not need this command.
