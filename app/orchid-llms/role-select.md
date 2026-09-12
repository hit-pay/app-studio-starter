<!-- Generated from content/docs/components/role-select.mdx. Do not edit. -->

# Role Select

Business role dropdown. Docs use a fake roles API.

## Interactive example

The interactive example is rendered on the Orchid documentation page. Use the usage guidance below and verify the installed component source for the exact API.

Business role dropdown. Fetches `GET /api/apps/{appId}/roles` (same as App Studio). Docs serve a fake response for that path.

```tsx
import { RoleSelect } from '@/components/form/role-select'

<RoleSelect name="notify_role_id" />
```

Gate buttons with `useHitPayUser().user.role.title`. Use this select only to store a role id.
