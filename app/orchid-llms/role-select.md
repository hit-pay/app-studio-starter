<!-- Generated from content/docs/components/role-select.mdx. Do not edit. -->

# Role Select

Business role dropdown. Docs use a fake roles API.

## Example

```tsx
import { useState } from 'react'

import { RoleSelect } from '@/components/form/role-select'
import type { HitPayRole } from '#/lib/hitpay'
import { FieldGroup } from '@ui/form/field'

function RoleSelectDemo() {
  const [roleId, setRoleId] = useState<string | null>(null)
  const [role, setRole] = useState<HitPayRole | null>(null)

  return (
    <FieldGroup className="max-w-sm">
      <RoleSelect
        name="notify_role_id"
        value={roleId}
        description={role ? `Selected ${role.title}` : 'GET /api/apps/{appId}/roles'}
        onValueChange={(value, selected) => {
          setRoleId(typeof value === 'string' ? value : null)
          setRole(selected && !Array.isArray(selected) ? selected : null)
        }}
      />
    </FieldGroup>
  )
}

export { RoleSelectDemo }
```

Business role dropdown. Fetches `GET /api/apps/{appId}/roles` (same as App Studio). Docs serve a fake response for that path.

```tsx
import { RoleSelect } from '@/components/form/role-select'

<RoleSelect name="notify_role_id" />
```

Gate buttons with `useHitPayUser().user.role.title`. Use this select only to store a role id.
