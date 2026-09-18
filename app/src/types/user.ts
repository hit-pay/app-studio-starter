export type UserRole = {
  id: string
  title: string
}

export type User = {
  id: string
  email: string
  name: string | null
  role: UserRole | null
}
