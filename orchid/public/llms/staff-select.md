<!-- Generated from content/docs/components/staff-select.mdx. Do not edit. -->

# Staff Select

App-member dropdown. Docs use a fake staff-app-members API.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

App-member dropdown. Fetches `GET /api/apps/{appId}/staff-app-members` (same as App Studio). Docs serve a fake response for that path.

```tsx
import { StaffSelect } from '@/components/form/staff-select'

<StaffSelect name="assignee_id" />
```

Do not fetch staff on the screen. Do not call `/v1/staffs`. Persist `id` plus name snapshot. Optional: `multiple`, `roleTitles`, `locationId`.
