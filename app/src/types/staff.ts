import type { UserRole } from './user'
import type { Location } from './location'

export type Staff = {
  id: string
  name: string | null
  role_id: string | null
  role: UserRole | null
  locations: Location[]
}
