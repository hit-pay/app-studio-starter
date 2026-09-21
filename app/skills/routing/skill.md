---
name: routing
description: TanStack file routes under src/routes. Use when adding pages, splitting list/detail/settings, or after changing route files.
---

# Routing

Pages live in `src/routes/`. `index.tsx` is home. Add sibling files (`$id.tsx`, `new.tsx`, `settings.tsx`, …) when they make the UX clearer — list vs detail vs settings is cheap.

`src/routeTree.gen.ts` is generated. After route changes, run `bun run generate-routes`.

Inspect only the files needed for the request. Do not list the whole repository, scan `node_modules`, or dump `public/`.

The app is served under `/{APP_STUDIO_APP_ID}/…`. `studioAppId()` from `#/lib/utils` is that path segment.

Implement the states the feature needs: loading, empty, error, validation, mutation/success.
