<!-- Generated from content/docs/guides/installation.mdx. Do not edit. -->

# Installation

Install Orchid with the shadcn CLI in a supported framework.

Orchid installs through the shadcn CLI and the `@orchid` registry. Choose the
framework guide that matches your application.

## Supported frameworks

- [Next.js](https://orchid-ui-hitpay.vercel.app/llms/installation-next.md)
- [Vite](https://orchid-ui-hitpay.vercel.app/llms/installation-vite.md)
- [TanStack Start](https://orchid-ui-hitpay.vercel.app/llms/installation-tanstack-start.md)
- [React Router](https://orchid-ui-hitpay.vercel.app/llms/installation-react-router.md)
- [Astro](https://orchid-ui-hitpay.vercel.app/llms/installation-astro.md)

## Prerequisites

Use a current JavaScript runtime and a project supported by the shadcn CLI. The
examples use Bun. Orchid uses Tailwind CSS v4 and is distributed as open code:
the CLI writes component source into your application.

## Registry

Every installation configures this namespace in `components.json`:

```json
{
  "registries": {
    "@orchid": "https://orchid-ui-hitpay.vercel.app/r/{name}.json"
  }
}
```

The complete registry catalog is available at
[registry.json](https://orchid-ui-hitpay.vercel.app/registry.json). After
initialization, follow the selected framework guide to install tokens and add
`@orchid/button` as a smoke test.
