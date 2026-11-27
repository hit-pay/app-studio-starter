---
name: routing
description: Add or change pages and navigation in the frontend with TanStack Router. Use when a feature needs a new page, a page with an id in its address, or links between pages.
---

# Routing

Pages are files in `frontend/src/routes` (TanStack Router, file-based):

* `index.tsx` → `/`
* `shifts.tsx` → `/shifts`
* `shifts.$shiftId.tsx` → `/shifts/:shiftId`

```tsx
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/shifts/$shiftId')({ component: ShiftPage })

function ShiftPage() {
  const { shiftId } = Route.useParams()
  return <Link to="/shifts">All shifts</Link>
}
```

* Add a page only when it makes the app clearer; a dialog or a tab is often enough.
* `__root.tsx` already wraps every page in `AppLayout`, `Toaster` and `ConfirmationModalProvider`. Add navigation there.
* After adding or renaming a page, run `bun run generate-routes` (the build also does it).
* Load data with TanStack Query in the page (see `skills/api/skill.md`), not in route loaders.
