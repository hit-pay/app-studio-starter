<!-- Generated from content/docs/guides/installation-react-router.mdx. Do not edit. -->

# React Router

Install Orchid in a new React Router application.

Install Orchid in a new React Router application using the supported
`react-router` shadcn template.

## Create the application

```bash
bunx --bun shadcn@latest init -t react-router
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
