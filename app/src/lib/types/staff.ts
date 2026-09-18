import type { CurrentUserRole } from './current-user'
import type { Location } from './location'

export type Staff = {
  id: string
  name: string | null
  role_id: string | null
  role: CurrentUserRole | null
  locations: Location[]
}
