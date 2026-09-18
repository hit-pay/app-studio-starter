export type CurrentUserRole = {
  id: string
  title: string
}

export type CurrentUser = {
  id: string
  email: string
  name: string | null
  role: CurrentUserRole | null
}
