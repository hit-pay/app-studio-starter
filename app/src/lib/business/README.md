# `lib/business`

UI vs backend split for business data (HitPay: locations, staff, etc.).

## Root (`#/lib/business`)

React hooks for pages/components. Safe to import from the browser.

- `useListLocations` — location list
- `useListStaffs` — staff list

Import: `import { useListLocations, useListStaffs } from '#/lib/business'`

## `server/` (`#/lib/business/server`)

Backend: `createServerFn` plus API calls (`request` from `#/lib/server/request`). Do not import this folder from UI components — use the root hooks.

- `listLocations`
- `listStaffs`

Import (from root hooks only): `import { listLocations } from '#/lib/business/server'`

## Types

Data shapes live in `#/types` (`Location`, `Staff`) and are shared by hooks and server.

## Adding a feature

1. Add a `createServerFn` under `server/`.
2. Wrap it with a root hook (loading / error / retry).
3. Export the hook from `index.ts` and the server fn from `server/index.ts`.
