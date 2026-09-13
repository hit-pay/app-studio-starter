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
