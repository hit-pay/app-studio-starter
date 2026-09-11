<!-- Generated from content/docs/components/staff-select.mdx. Do not edit. -->

# Staff Select

App-member dropdown. Docs use a fake staff-app-members API.

## Example

```tsx
import { useState } from 'react'

import { StaffSelect } from '@/components/form/staff-select'
import type { HitPayStaffAppMember } from '#/lib/hitpay'
import { FieldGroup } from '@ui/form/field'

function StaffSelectDemo() {
  const [assigneeId, setAssigneeId] = useState<string | null>(null)
  const [assignee, setAssignee] = useState<HitPayStaffAppMember | null>(null)
  const [reviewerIds, setReviewerIds] = useState<string[]>([])

  return (
    <FieldGroup className="max-w-sm">
      <StaffSelect
        name="assignee_id"
        value={assigneeId}
        description={
          assignee
            ? `${assignee.email} · ${assignee.role?.title}`
            : 'GET /api/apps/{appId}/staff-app-members'
        }
        onValueChange={(value, selected) => {
          setAssigneeId(typeof value === 'string' ? value : null)
          setAssignee(selected && !Array.isArray(selected) ? selected : null)
        }}
      />
      <StaffSelect
        name="reviewer_ids"
        label="Reviewers"
        multiple
        roleTitles={['Manager', 'Admin']}
        value={reviewerIds}
        description="Same path, filtered to Manager and Admin."
        onValueChange={(value) => setReviewerIds(Array.isArray(value) ? value : [])}
      />
    </FieldGroup>
  )
}

export { StaffSelectDemo }
```

App-member dropdown. Fetches `GET /api/apps/{appId}/staff-app-members` (same as App Studio). Docs serve a fake response for that path.

```tsx
import { StaffSelect } from '@/components/form/staff-select'

<StaffSelect name="assignee_id" />
```

Do not fetch staff on the screen. Do not call `/v1/staffs`. Persist `id` plus name snapshot. Optional: `multiple`, `roleTitles`, `locationId`.
