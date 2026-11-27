export const ROLES = ['Owner', 'Admin', 'Manager', 'Cashier'] as const
export type RoleTitle = (typeof ROLES)[number]

export type UserRole = { id: string; title: string }

export type User = {
  id: string
  email: string
  name: string | null
  role: UserRole | null
}

export type Location = { id: string; name: string | null }

export type Staff = {
  id: string
  name: string | null
  role_id: string | null
  role: UserRole | null
  locations: Location[]
}

export type FileMeta = {
  id: string
  entityType: string | null
  entityId: string | null
  name: string
  mimeType: string
  size: number
  createdAt: string
}
