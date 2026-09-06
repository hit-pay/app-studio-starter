<!-- Generated from content/docs/guides/installation-vite.mdx. Do not edit. -->

# Vite

Install Orchid in a new Vite React application.

Install Orchid in a new Vite React application using the supported `vite`
shadcn template.

## Create the application

```bash
bunx --bun shadcn@latest init -t vite
```

Enter the generated project directory when initialization finishes.

## Configure Orchid

Add the registry namespace to `components.json`:

```json
{
  "registries": {
    "@orchid": "https://orchid-ui-hitpay.vercel.app/r/{name}.json"
  }
}
```

Follow [Theming](https://orchid-ui-hitpay.vercel.app/llms/theming.md) to import or merge
`https://orchid-ui-hitpay.vercel.app/orchid-tokens.css` into the global
stylesheet configured in `components.json`.

## Verify the installation

```bash
bunx --bun shadcn@latest add @orchid/button
```

Import the installed component from `@/components/ui/button`.

Continue with [components.json](https://orchid-ui-hitpay.vercel.app/llms/components-json.md), [Theming](https://orchid-ui-hitpay.vercel.app/llms/theming.md), or the
[CLI reference](https://orchid-ui-hitpay.vercel.app/llms/cli.md).
